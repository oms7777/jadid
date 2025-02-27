"use client";

const SatisfactionGuarantee = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Votre satisfaction, garantie</h2>
        
        {/* Promesse de Satisfaction Section */}
        <div className="flex flex-col md:flex-row justify-center gap-8">
          {/* Point 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[300px]">
            <h3 className="text-xl font-semibold text-yellow-600 mb-4">La Promesse de Satisfaction</h3>
            <p className="text-gray-700">
              Si vous n'êtes pas satisfait, nous ferons tout notre possible pour y remédier.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
          {/* Point 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[300px]">
            <h3 className="text-xl font-semibold text-yellow-600 mb-4">Des prestataires vérifiés</h3>
            <p className="text-gray-700">
              Tous les prestataires font l'objet d'une vérification de leur identité avant de rejoindre la plateforme.
            </p>
          </div>

          {/* Point 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-[300px]">
            <h3 className="text-xl font-semibold text-yellow-600 mb-4">Un service client dédié</h3>
            <p className="text-gray-700">
              Une aide disponible selon vos besoins tous les jours de la semaine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SatisfactionGuarantee;
