"use client";

import { useState } from "react";
import SearchModal from "../modals/SearchModal";
// Import Search Modal

const providers = [
  { id: 1, name: "Ahmed", category: "Plombier", rating: 4.8, image: "/Images/provider1.jpg" },
  { id: 2, name: "Sarah", category: "Électricien", rating: 4.7, image: "/Images/provider2.jpg" },
  { id: 3, name: "Mohamed", category: "Ménage", rating: 4.9, image: "/Images/provider3.jpg" },
  { id: 4, name: "Yasmine", category: "Jardinier", rating: 4.6, image: "/Images/provider4.jpg" },
  { id: 5, name: "Khalid", category: "Plombier", rating: 4.8, image: "/Images/provider5.jpg" },
  { id: 6, name: "Mohammed", category: "Électricien", rating: 4.7, image: "/Images/provider6.jpg" },
  { id: 7, name: "Chaimae", category: "Ménage", rating: 4.9, image: "/Images/provider7.jpg" },
  { id: 8, name: "Yassir", category: "Jardinier", rating: 4.6, image: "/Images/provider8.jpg" },
];

const TopProviders = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProviderClick = (category: string) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  return (
    <div className="my-10 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Nos Meilleurs Prestataires</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => handleProviderClick(provider.category)}
          >
            <img
              src={provider.image}
              alt={provider.name}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h3 className="text-lg font-semibold mt-2">{provider.name}</h3>
            <p className="text-gray-600">{provider.category}</p>
            <p className="text-yellow-500 font-bold">⭐ {provider.rating}</p>
          </div>
        ))}
      </div>

      {/* Show Search Modal */}
      {isModalOpen && (
        <SearchModal category={selectedCategory} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default TopProviders;
