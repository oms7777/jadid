"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import useLocations from "@/app/hooks/useLocations";

const ProfilePage = () => {
  const router = useRouter();
  const { getAll } = useLocations();
  const [profile, setProfile] = useState({
    description: "",
    location: "",
    profileImage: "",
  });

  useEffect(() => {
    axios.get("/api/providers/profile").then((response) => {
      setProfile(response.data);
    });
  }, []);

  const handleUpdate = async () => {
    if (!profile.description || !profile.location) {
      toast.error("Tous les champs sont obligatoires.");
      return;
    }

    try {
      await axios.put("/api/providers/profile", profile);
      toast.success("Profil mis à jour !");
      router.push("/providers/dashboard");
    } catch (error) {
      toast.error("Erreur mise à jour du profil.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* Conteneur principal avec position relative */}
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
        {/* Bouton de fermeture positionné dans le coin supérieur droit */}
        <button
          onClick={() => router.push("/providers/dashboard")}
          className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Modifier mon profil</h2>

        {/* Section d'image de profil */}
        <div className="flex flex-col items-center">
          <img
            src={profile.profileImage || "/default-profile.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border mb-3"
          />
        </div>

        <textarea
          placeholder="Description"
          className="p-3 border rounded-md w-full mt-4"
          value={profile.description}
          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
        />

        <select
          className="p-3 border rounded-md w-full mt-4"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        >
          <option value="">Sélectionnez votre emplacement</option>
          {getAll().map((loc) => (
            <option key={loc.value} value={loc.value}>
              {loc.flag} {loc.label}
            </option>
          ))}
        </select>

        <button onClick={handleUpdate} className="mt-6 w-full p-3 bg-blue-600 text-white font-bold rounded-md">
          ✅ Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;