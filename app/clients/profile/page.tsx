"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState({
    description: "",
    location: "",
    profileImage: "",
  });

  useEffect(() => {
    axios.get("/api/profile")
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error("Erreur de chargement du profil :", error);
        toast.error("Impossible de charger le profil.");
      });
  }, []);

  const handleUpdate = async () => {
    try {
      await axios.put("/api/profile", profile);
      toast.success("Profil mis à jour !");
      router.push("/clients/dashboard"); // Rediriger après mise à jour
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du profil.");
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Mon Profil</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Image de profil */}
        <div className="flex flex-col items-center mb-4">
          <img
            src={profile.profileImage || "/default-profile.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border mb-3"
          />
          <input
            type="text"
            placeholder="URL de l'image"
            className="p-2 border rounded-md w-full"
            value={profile.profileImage}
            onChange={(e) => setProfile({ ...profile, profileImage: e.target.value })}
          />
        </div>

        {/* Description */}
        <textarea
          placeholder="Description"
          className="p-3 border rounded-md w-full mt-4"
          value={profile.description}
          onChange={(e) => setProfile({ ...profile, description: e.target.value })}
        />

        {/* Emplacement */}
        <input
          type="text"
          placeholder="Emplacement"
          className="p-3 border rounded-md w-full mt-4"
          value={profile.location}
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        />

        <button
          onClick={handleUpdate}
          className="mt-6 w-full p-3 bg-blue-600 text-white font-bold rounded-md"
        >
          ✅ Sauvegarder
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
