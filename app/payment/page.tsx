"use client";

import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import React, { useState } from "react";

const PaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams() ?? new URLSearchParams();

  // Récupérer les informations passées dans l'URL
  const providerId = searchParams.get("providerId") || "";
  const serviceId = searchParams.get("serviceId") || "";
  const date = searchParams.get("date") || "";
  const time = searchParams.get("time") || "";
  const price = searchParams.get("price") || "";
  
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    try {
      // ✅ Save the reservation
      const response = await axios.post("/api/reservations", {
        providerId,
        serviceId,
        date,
        time,
        price,
      });

      console.log("✅ Paiement traité et réservation créée:", response.data);

      // ✅ Redirect to confirmation page
      router.push(`/payment/confirmation?providerId=${providerId}&serviceId=${serviceId}&date=${date}&time=${time}&price=${price}`);
    } catch (error) {
      console.error("❌ Erreur lors du paiement :", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Page de Paiement</h2>
        <div className="mb-4">
          <p><strong>Prestataire ID :</strong> {providerId}</p>
          <p><strong>Service ID :</strong> {serviceId}</p>
          <p><strong>Date :</strong> {date}</p>
          <p><strong>Heure :</strong> {time}</p>
          <p><strong>Montant :</strong> {price} Dhs</p>
        </div>
        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
        >
          {isProcessing ? "Paiement en cours..." : "Payer"}
        </button>
        <button
          onClick={() => router.back()}
          className="w-full mt-4 text-gray-600 underline"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
