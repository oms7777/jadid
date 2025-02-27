"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import { categories } from "@/app/components/navbar/Categories";
import { FaBroom, FaKey, FaWrench, FaBolt, FaPaintBrush, FaHammer, FaTree } from "react-icons/fa";

const subcategories: Record<string, { label: string; icon: React.ElementType }[]> = {
  "Ménage": [
    { label: "Ménage à domicile", icon: FaBroom },
    { label: "Ménage d'état des lieux", icon: FaBroom },
    { label: "Ménage après un événement", icon: FaBroom },
    { label: "Repassage", icon: FaBroom },
    { label: "Nettoyage de vitres", icon: FaBroom },
  ],
  "Serrurier": [
    { label: "Installer une serrure", icon: FaKey },
    { label: "Changer une serrure", icon: FaKey },
    { label: "Dépannage serrurerie", icon: FaKey },
  ],
  "Plombier": [
    { label: "Réparation de fuites d'eau", icon: FaWrench },
    { label: "Changer une chasse d'eau", icon: FaWrench },
    { label: "Débouchage des canalisations", icon: FaWrench },
  ],
  "Electricien": [
    { label: "Pose de lampes et luminaires", icon: FaBolt },
    { label: "Changer une ampoule", icon: FaBolt },
  ],
  "Peintre": [
    { label: "Peinture intérieure", icon: FaPaintBrush },
    { label: "Peinture extérieure", icon: FaPaintBrush },
    { label: "Décoller du papier peint", icon: FaPaintBrush },
  ],
  "Rénovation": [
    { label: "Pose de parquet", icon: FaHammer },
    { label: "Pose de lino", icon: FaHammer },
  ],
  "Jardin et extérieur": [
    { label: "Entretien de la pelouse", icon: FaTree },
    { label: "Fleurs, potager et verger", icon: FaTree },
  ],
};

const AddService = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    category: "",
    subcategories: [] as string[],
    price: "",
  });

  const handleSubcategoryToggle = (sub: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.includes(sub)
        ? prev.subcategories.filter((s) => s !== sub)
        : [...prev.subcategories, sub],
    }));
  };

  const handleSubmit = async () => {
    console.log("🔍 Form Data:", formData);

    if (!formData.category || formData.subcategories.length === 0 || !formData.price) {
      toast.error("Tous les champs sont requis.");
      return;
    }

    try {
      const response = await axios.post("/api/providers/add-service", formData);
      console.log("✅ API Response:", response.data);
      toast.success("Service ajouté avec succès!");
      router.push("/providers/dashboard");
      router.refresh();
    } catch (error: any) {
      console.error("❌ Erreur lors de l'ajout du service:", error.response?.data || error.message);
      toast.error(`Erreur: ${error.response?.data?.error || "Vérifiez l'API"}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Conteneur principal avec position relative */}
      <div className="relative max-w-lg w-full mt-16 p-12 bg-white rounded-lg shadow-md">
        {/* Bouton de fermeture positionné dans le coin supérieur droit de la carte */}
        <button
          onClick={() => router.push("/providers/dashboard")}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Ajouter un Service</h2>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-center">Sélectionnez une Catégorie</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {categories.map(({ label, icon }) => (
              <button
                key={label}
                className={`p-4 border rounded-md flex flex-col items-center gap-2 bg-gray-200 hover:bg-blue-500 hover:text-white transition ${
                  formData.category === label ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setFormData({ ...formData, category: label, subcategories: [] })}
              >
                {React.createElement(icon, { size: 32 })}
                <span className="font-semibold">{label}</span>
              </button>
            ))}
          </div>

          {formData.category && subcategories[formData.category] && (
            <>
              <h3 className="text-lg font-semibold text-center mt-4">Sélectionnez les Sous-catégories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {subcategories[formData.category].map(({ label, icon }) => (
                  <button
                    key={label}
                    className={`p-4 border rounded-md flex flex-col items-center gap-2 ${
                      formData.subcategories.includes(label) ? "bg-blue-500 text-white" : "bg-gray-200"
                    } hover:bg-blue-500 hover:text-white transition`}
                    onClick={() => handleSubcategoryToggle(label)}
                  >
                    {React.createElement(icon, { size: 20 })}
                    <span className="font-semibold">{label}</span>
                  </button>
                ))}
              </div>
            </>
          )}

          <input
            type="number"
            id="price"
            placeholder="Prix (Dhs)"
            className="p-3 border rounded-md w-full"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />

          <Button label="Ajouter Service" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default AddService;