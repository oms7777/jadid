'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import { categories } from "@/app/components/navbar/Categories";
import { CldUploadWidget } from "next-cloudinary";

const RegisterProvider = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    password: string;
    category: string;
    subcategories: string[]; // ✅ Explicitly define subcategories as string[]
  }>({
    name: "",
    email: "",
    password: "",
    category: "",
    subcategories: [], // ✅ Empty array correctly typed
  });
  

  // ✅ Handle Input Changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ✅ Handle Category Selection
  const handleCategorySelect = (category: string) => {
    setFormData({ ...formData, category, subcategories: [] });
  };

  // ✅ Handle Subcategory Selection
  const handleSubcategorySelect = (subcategory: string) => {
    setFormData((prev) => ({
      ...prev,
      subcategories: prev.subcategories.includes(subcategory)
        ? prev.subcategories.filter((item) => item !== subcategory) // Remove if already selected
        : [...prev.subcategories, subcategory], // Add if not selected
    }));
  };
  


  // ✅ Handle Form Submission
  const handleSubmit = async () => {
    try {
      const { name, email, password, category, subcategories } = formData;

      if (!name || !email || !password || !category || subcategories.length === 0 ) {
        toast.error("Tous les champs sont obligatoires.");
        return;
      }

      await axios.post("/api/providers/register", formData);
      toast.success("Compte Maalem créé avec succès!");
      router.push("/providers/dashboard"); // ✅ Redirect provider after success
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error("Erreur lors de l'inscription.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="max-w-lg mx-auto mt-16 p-12 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Créer un compte Maalem</h2>

        <div className="space-y-6">
          {/* ✅ Name, Email, Password Inputs */}
          <Input label="Nom" id="name" type="text" value={formData.name} onChange={handleChange} />
          <Input label="Email" id="email" type="email" value={formData.email} onChange={handleChange} />
          <Input label="Mot de passe" id="password" type="password" value={formData.password} onChange={handleChange} />

          {/* ✅ Category Selection with Icons */}
          <h3 className="text-lg font-semibold">Choisissez une catégorie:</h3>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((item) => (
              <button
                key={item.label}
                className={`p-3 border rounded-md flex flex-col items-center justify-center ${
                  formData.category === item.label ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
                onClick={() => handleCategorySelect(item.label)}
              >
                <item.icon size={24} />
                <span className="text-sm mt-1">{item.label}</span>
              </button>
            ))}
          </div>

          {/* ✅ Subcategory Selection (Only Show After Category is Chosen) */}
          {formData.category && (
            <>
              <h3 className="text-lg font-semibold">Sous-catégories:</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories
                  .find((cat) => cat.label === formData.category)
                  ?.subcategories.map((sub) => (
                    <button
                      key={sub}
                      className={`p-2 border rounded-md ${
                        formData.subcategories.includes(sub) ? "bg-blue-500 text-white" : "bg-gray-200"
                      }`}
                      onClick={() => handleSubcategorySelect(sub)}
                    >
                      {sub}
                    </button>
                  ))}
              </div>
            </>
          )}

          {/* ✅ Submit Button */}
          <Button label="S'inscrire" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default RegisterProvider;
