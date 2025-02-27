"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type Reservation = {
  id: string;
  providerName: string;
  providerId: string;
  service: string;
  date: string;
  time: string;
  status: "in_progress" | "completed";
  rating?: number;
  review?: string;
};

const ClientDashboard = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    axios
      .get("/api/reservations")
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des réservations :", error);
        toast.error("Erreur lors du chargement des réservations.");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleRateReservation = (reservationId: string) => {
    router.push(`/reservations/${reservationId}/rate`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        Chargement...
      </div>
    );
  }

  const inProgressReservations = reservations.filter(
    (res) => res.status === "in_progress"
  );
  const completedReservations = reservations.filter(
    (res) => res.status === "completed"
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Mon Espace</h1>

      {/* Section Profil */}
      <section className="mb-8 bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Mon Profil</h2>
        <p>Vous pouvez mettre à jour vos informations.</p>
        <button
          onClick={() => router.push("/profile/edit")}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Modifier mon profil
        </button>
      </section>

      {/* Section Réservations en cours */}
      <section className="mb-8 bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Réservations en cours</h2>
        {inProgressReservations.length > 0 ? (
          <ul>
            {inProgressReservations.map((res) => (
              <li
                key={res.id}
                className="border p-4 rounded-md mb-2 shadow-sm"
              >
                <p><strong>Prestataire :</strong> {res.providerName}</p>
                <p><strong>Service :</strong> {res.service}</p>
                <p><strong>Date :</strong> {new Date(res.date).toLocaleDateString()}</p>
                <p><strong>Heure :</strong> {res.time}</p>
                <p className="text-blue-600">En cours</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune réservation en cours.</p>
        )}
      </section>

      {/* Section Réservations terminées */}
      <section className="bg-white shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Réservations terminées</h2>
        {completedReservations.length > 0 ? (
          <ul>
            {completedReservations.map((res) => (
              <li
                key={res.id}
                className="border p-4 rounded-md mb-2 flex justify-between items-center shadow-sm"
              >
                <div>
                  <p><strong>Prestataire :</strong> {res.providerName}</p>
                  <p><strong>Service :</strong> {res.service}</p>
                  <p><strong>Date :</strong> {new Date(res.date).toLocaleDateString()}</p>
                  <p><strong>Heure :</strong> {res.time}</p>
                </div>
                <div>
                  {res.rating ? (
                    <p>Note : {res.rating}/5</p>
                  ) : (
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => handleRateReservation(res.id)}
                    >
                      Noter & Avis
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Aucune réservation terminée.</p>
        )}
      </section>
    </div>
  );
};

export default ClientDashboard;
