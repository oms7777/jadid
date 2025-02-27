"use client";

import { AiOutlineCheckCircle } from "react-icons/ai"; // Example icon

const HowItWorks = () => {
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Comment ça marche</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <img src="/Images/step1.png" alt="Sélectionner un Maalem" className="w-24 h-24 mb-4" />
            <div className="text-4xl text-yellow-600 mb-4">
              <AiOutlineCheckCircle />
            </div>
            <p className="text-lg font-semibold text-gray-700">
              Sélectionnez un Maalem en fonction de ses tarifs, compétences et des avis clients.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <img src="/Images/step2.png" alt="Réserver un Maalem" className="w-24 h-24 mb-4" />
            <div className="text-4xl text-yellow-600 mb-4">
              <AiOutlineCheckCircle />
            </div>
            <p className="text-lg font-semibold text-gray-700">
              Réservez un Maalem dès aujourdhui.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
            <img src="/Images/step3.png" alt="Paiement et évaluation" className="w-24 h-24 mb-4" />
            <div className="text-4xl text-yellow-600 mb-4">
              <AiOutlineCheckCircle />
            </div>
            <p className="text-lg font-semibold text-gray-700">
              Discutez via le chat, payez, et évaluez votre Maalem en un seul et même endroit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
