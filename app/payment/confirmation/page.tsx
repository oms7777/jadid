"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const PaymentConfirmation = () => {
  const router = useRouter();
  const searchParams = useSearchParams() ?? new URLSearchParams();

  // Retrieve payment details from URL params
  const providerId = searchParams.get("providerId") || "";
  const serviceId = searchParams.get("serviceId") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const price = searchParams.get("price") || "";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">✅ Paiement Réussi</h2>
        <p className="text-lg">Merci pour votre réservation !</p>
        <div className="mt-4 text-left">
          <p><strong>Prestataire ID :</strong> {providerId}</p>
          <p><strong>Service ID :</strong> {serviceId}</p>
          <p><strong>Date :</strong> {date}</p>
          <p><strong>Heure :</strong> {time}</p>
          <p><strong>Montant :</strong> {price} Dhs</p>
        </div>
        <button
          onClick={() => router.push("/clients/dashboard")}
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          Retour à mon espace
        </button>
      </div>
    </div>
  );
};

export default PaymentConfirmation;
