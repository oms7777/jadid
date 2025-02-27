"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Heading from "@/app/components/Heading";
import Button from "@/app/components/Button";

interface Service {
  id: string;
  category: string;
  subcategory: string[];
  price: number;
}

interface Profile {
  image: string;
  description: string;
  location: string;
}

interface Reservation {
  id: string;
  clientName: string;
  date: string;
  time: string;
  serviceTitle: string;
}

interface Availability {
  dates: string[]; // Array of dates
  times: { [key: string]: string[] }; // Mapping of each date to its available times
}

const ProviderDashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [availability, setAvailability] = useState<Availability | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session || session.user.isProvider === undefined) return; // ✅ Wait for session to load
    if (!session?.user?.isProvider) {
      router.push("/");
      return;
    }

    // Fetch provider services
    axios.get("/api/providers/my-services").then((response) => {
      setServices(response.data);
    });

    // Fetch provider profile
    axios.get("/api/providers/profile").then((response) => {
      setProfile({
        image: response.data.profileImage,
        description: response.data.description,
        location: response.data.location,
      });
    });

    // Fetch provider reservations
    axios.get("/api/providers/reservations").then((response) => {
      setReservations(response.data);
    });

    // Fetch provider availability
    axios.get("/api/providers/availability")
    .then((response) => {
      console.log("Fetched Availability:", response.data); // Log to verify the structure
      setAvailability(response.data); // Make sure response.data is the structure you expect
    })
    .catch((error) => {
      console.error("Error fetching availability:", error);
    });
}, []);

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-20">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-5xl overflow-auto">
        <Heading title="📌 Espace Maalem" subtitle={`Bonjour, ${session?.user?.name}!`} />

        <div className="mt-6 flex justify-between">
          <Button label="Ajouter un service" onClick={() => router.push("/providers/add-service")} />
          <Button label="Modifier le profil" onClick={() => router.push("/providers/profile")} />
          <Button label="Définir disponibilités" onClick={() => router.push("/providers/availability")} />
        </div>

        {/* ✅ Profile Section */}
        {profile ? (
          <div className="mt-8 p-6 border rounded-md bg-gray-100">
            <h2 className="text-xl font-bold">👤 Mon Profil</h2>
            <div className="flex items-center mt-4">
              <img
                src={profile.image || "/default-profile.jpg"}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div>
                <p><strong>Description:</strong> {profile.description || "Aucune description ajoutée"}</p>
                <p><strong>Localisation:</strong> {profile.location || "Non renseigné"}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-8 p-6 border rounded-md bg-gray-100">
            <p className="text-center text-gray-500">Aucun profil trouvé.</p>
          </div>
        )}

        {/* ✅ Services Section */}
        <h2 className="text-xl font-bold mt-8">📋 Mes Services</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.length > 0 ? (
            services.map((service) => (
              <div key={service.id} className="p-4 border rounded-md bg-gray-100">
                <h3 className="font-semibold">{service.category}</h3>
                <p className="text-sm text-gray-500">{service.subcategory.join(", ")}</p>
                <p className="font-bold">{service.price} Dhs</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Aucun service enregistré.</p>
          )}
        </div>

        {/* ✅ Availability Section */}
        <h2 className="text-xl font-bold mt-8">📆 Mes Disponibilités</h2>
        {Array.isArray(availability) && availability.length > 0 ? (
          <div className="mt-4 p-4 border rounded-md bg-gray-100">
            {availability.map(({ date, times }) => (
              <div key={date} className="mt-2 p-3 border rounded-md bg-white">
                <h4 className="text-md font-semibold">{new Date(date).toLocaleDateString()}</h4>
                <p className="text-gray-700">
                  {Array.isArray(times) && times.length > 0 ? times.join(", ") : "Aucun horaire défini."}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucune disponibilité définie.</p>
        )}


        {/* ✅ Reservations Section */}
        <h2 className="text-xl font-bold mt-8">📆 Réservations en attente</h2>
        <div className="mt-4">
          {reservations.length > 0 ? (
            reservations.map((reservation) => (
              <div key={reservation.id} className="p-4 border rounded-md bg-gray-100">
                <p><strong>Client:</strong> {reservation.clientName}</p>
                <p><strong>Service:</strong> {reservation.serviceTitle}</p>
                <p><strong>Date:</strong> {reservation.date}</p>
                <p><strong>Heure:</strong> {reservation.time}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Aucune réservation pour l’instant.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProviderDashboard;
