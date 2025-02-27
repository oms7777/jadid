// pages/providers.tsx

"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import Heading from "@/app/components/Heading";
import Link from "next/link";
import ListingCard from "../components/listings/ListingCard";
import qs from "query-string"; // Pour formater les query parameters

const ProvidersPage = () => {
  const searchParams = useSearchParams() ?? new URLSearchParams();
  const [providers, setProviders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        setLoading(true);

        const queryParams = qs.stringify({
          category: searchParams.get("category") || "",
          subcategory: searchParams.get("subcategory") || "",
          clientAddress: searchParams.get("clientAddress") || "",
          date: searchParams.get("date") || "",
          time: searchParams.get("time") || "",
        });

        console.log("🔎 Fetching providers with:", queryParams);

        const response = await axios.get(`/api/providers?${queryParams}`);

        console.log("✅ Providers API Response:", response.data);

        setProviders(response.data);
      } catch (error) {
        console.error("❌ Error fetching providers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [searchParams]);

  // Récupération de la chaîne de query de l'URL de la page listing.
  const queryString = searchParams.toString();

  return (
    <div className="container mx-auto py-10 flex flex-col items-center">
      <Heading title="Choisissez un prestataire" subtitle="Basé sur vos critères de recherche" />
      {loading ? (
        <p className="text-center text-gray-500">Chargement des prestataires...</p>
      ) : providers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider) => {
            // Construire l'URL en ajoutant les query parameters
            const url = `/providers/${provider.id}${queryString ? "?" + queryString : ""}`;
            return (
              <Link key={provider.id} href={url}>
                <ListingCard data={provider} />
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucun prestataire disponible à cette date et heure.</p>
      )}
    </div>
  );
};

export default ProvidersPage;
