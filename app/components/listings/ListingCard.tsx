'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';

interface Service {
  id: string;
  price: number;
  category: string;
  subcategory: string[] | string;
}

interface ListingCardProps {
  data: {
    id: string;
    name: string;
    profileImage: string;
    description: string;
    location: string;
    services: Service[];
    availability?: { date: string; times: string[] }[];
  };
}

const ListingCard: React.FC<ListingCardProps> = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Récupère les paramètres actuels dans l'URL

  // On vérifie que searchParams existe et on le convertit en chaîne
  const queryString = searchParams ? searchParams.toString() : "";
  const url = `/providers/${data.id}?${queryString}`;

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden p-4 w-full max-w-sm border border-gray-200 flex flex-col items-center text-center transition transform hover:scale-105">
      {/* Image du provider */}
      <div className="w-20 h-20 rounded-full overflow-hidden border mb-3">
        <img
          src={data.profileImage || "/default-profile.jpg"}
          alt="Provider Profile"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Infos du provider */}
      <div className="p-4">
        <h3 className="text-xl font-bold text-gray-800">{data.name || 'Prestataire Inconnu'}</h3>
        <p className="text-gray-500 text-sm mt-1">{data.location || 'Localisation inconnue'}</p>
        {data.description && (
          <p className="text-gray-600 mt-3 text-sm">{data.description}</p>
        )}
      </div>

      {/* Infos sur les services */}
      {(data.services ?? []).map((service) => {
        const subcategories = Array.isArray(service.subcategory)
          ? service.subcategory
          : JSON.parse(service.subcategory || "[]");

        return (
          <div key={service.id} className="mt-4 bg-gray-100 p-3 rounded-lg">
            <p className="text-blue-500 font-semibold">
              {service.category} - {subcategories.join(", ")}
            </p>
            <p className="text-lg font-bold text-gray-800">{service.price} Dhs</p>
          </div>
        );
      })}

      {/* Disponibilité */}
      {data.availability && data.availability.length > 0 ? (
        <p className="text-green-600 mt-2 font-semibold">
          ✅ Disponible le {new Date(data.availability[0].date).toLocaleDateString()} à {data.availability[0].times[0]}
        </p>
      ) : (
        <p className="text-red-500 mt-2 font-semibold">❌ Aucune disponibilité</p>
      )}

      {/* Bouton de redirection */}
      <button
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition"
        onClick={() => router.push(url)}
      >
        📅 Voir le profil et réserver
      </button>
    </div>
  );
};

export default ListingCard;
