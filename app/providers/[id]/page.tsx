"use client";

import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import { useRouter } from "next/navigation";


interface Service {
  id: string;
  price: number;
  category: string;
  subcategory: string[];
}

interface Availability {
  date: string;
  times: string[];
}

interface Provider {
  id: string;
  name: string;
  profileImage: string;
  description: string;
  location: string;
  services: Service[];
  availability: Availability[];
}

const ProviderProfile = () => {
  const params = useParams();
  const searchParams = useSearchParams() || new URLSearchParams();
  const providerId = params?.id ? String(params.id) : null;
  const router = useRouter();


  // Récupération des paramètres préremplis lors de la recherche
  // Exemple d'URL : /providers/67b31187ab55cfa26528ca62?category=Ménage&subcategory=Ménage%20à%20domicile&date=2025-02-23&time=14:30
  const searchCategory = (searchParams.get("category") || "").trim();
  const searchSubcategory = (searchParams.get("subcategory") || "").trim();
  const searchDate = searchParams.get("date") || "";
  const searchTime = searchParams.get("time") || "";

  const [provider, setProvider] = useState<Provider | null>(null);
  const [loading, setLoading] = useState(true);
  const [reservationModalOpen, setReservationModalOpen] = useState(false);

  useEffect(() => {
    if (!providerId) {
      console.error("❌ No Provider ID Found!");
      setLoading(false);
      return;
    }

    const fetchProvider = async () => {
      try {
        console.log("🔍 Fetching provider with ID:", providerId);
        const response = await axios.get(`/api/providers/${providerId}`);
        const formattedData = {
          ...response.data,
          services: response.data.services.map((service: any) => ({
            ...service,
            subcategory:
              typeof service.subcategory === "string"
                ? JSON.parse(service.subcategory)
                : service.subcategory,
          })),
        };
        setProvider(formattedData);
      } catch (error) {
        console.error("❌ Error fetching provider:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [providerId]);

  if (loading)
    return <p className="text-center text-gray-500 mt-20">Chargement...</p>;
  if (!provider)
    return <p className="text-center text-gray-500 mt-20">Aucun prestataire trouvé.</p>;

  // On essaie de trouver le service en fonction des critères de recherche
  let filteredService = provider.services.find(
    (service) =>
      service.category.toLowerCase() === searchCategory.toLowerCase() &&
      service.subcategory.some(
        (sub) => sub.toLowerCase() === searchSubcategory.toLowerCase()
      )
  );

  // Si aucun paramètre n'est fourni ou si le service n'est pas trouvé, on prend le premier service par défaut
  if (!filteredService) {
    console.warn("Aucun service correspondant trouvé, utilisation du premier service.");
    filteredService = provider.services[0];
  }

  const handleReservation = () => {
    // Construisez l'URL de paiement en ajoutant toutes les infos requises
    const paymentUrl = `/payment?providerId=${provider.id}&serviceId=${filteredService.id}&date=${encodeURIComponent(searchDate)}&time=${encodeURIComponent(searchTime)}&price=${filteredService.price}`;
    router.push(paymentUrl);
  };
  

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Partie gauche : Profil du prestataire */}
        <div className="flex-1">
          <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
            <div className="flex items-center gap-4">
              <img
                src={provider.profileImage || "/default-profile.jpg"}
                alt={provider.name}
                className="w-24 h-24 rounded-full object-cover border"
              />
              <div>
                <h2 className="text-2xl font-bold">{provider.name}</h2>
                <p className="text-gray-600">{provider.location}</p>
              </div>
            </div>
            <p className="text-gray-500 mt-4">{provider.description}</p>
          </div>
        </div>

        {/* Partie droite : Panneau latéral avec les détails de réservation */}
        <div className="w-full md:w-1/3">
          <div className="bg-white shadow-lg rounded-lg p-6 sticky top-10">
            <h3 className="text-xl font-semibold mb-4">Détails du service</h3>
            <p className="text-gray-600">
              Prix:{" "}
              <span className="font-bold text-lg">
                {filteredService.price} Dhs
              </span>
            </p>
            <div className="mt-4">
              <p className="text-gray-600">
                Date: <span className="font-bold">{searchDate || "Non définie"}</span>
              </p>
              <p className="text-gray-600">
                Heure: <span className="font-bold">{searchTime || "Non définie"}</span>
              </p>
            </div>
            <button
              className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={() => setReservationModalOpen(true)}
            >
              Réserver
            </button>
          </div>
        </div>
      </div>

      {/* Modal de réservation */}
      {reservationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Réserver le service</h3>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setReservationModalOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <p>
                Vous allez réserver le service pour le{" "}
                <span className="font-bold">{searchDate || "Non définie"}</span> à{" "}
                <span className="font-bold">{searchTime || "Non définie"}</span>.
              </p>
              <button
                className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                onClick={handleReservation}
                disabled={!searchDate || !searchTime}
              >
                Confirmer la réservation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderProfile;
