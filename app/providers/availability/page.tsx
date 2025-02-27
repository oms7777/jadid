"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

// Define TypeScript type for availability
type Availability = {
  date: string;
  times: string[];
};

// Predefined time slots
const timeSlots: string[] = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

const AvailabilityPage = () => {
  const router = useRouter();
  const [availability, setAvailability] = useState<Availability[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);

  // Generate a list of upcoming dates (next 30 days)
  const generateUpcomingDates = () => {
    const today = new Date();
    return Array.from({ length: 30 }, (_, i) => {
      const futureDate = new Date(today);
      futureDate.setDate(today.getDate() + i);
      return futureDate.toISOString().split("T")[0];
    });
  };
  const upcomingDates = generateUpcomingDates();

  // Fetch availability from API on load
  useEffect(() => {
    axios.get("/api/providers/availability")
      .then(response => {
        console.log("📌 Availability Fetched:", response.data);
        if (Array.isArray(response.data)) {
          setAvailability(response.data);
        } else {
          console.warn("⚠️ Invalid availability format received, resetting to empty array.");
          setAvailability([]);
        }
      })
      .catch(error => {
        console.error("❌ Error fetching availability:", error);
        setAvailability([]);
      });
  }, []);

  // Toggle time selection on click
  const toggleTime = (time: string) => {
    setSelectedTimes(prev => 
      prev.includes(time)
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  // Handle adding selected availability
  const addAvailability = () => {
    if (!selectedDate) {
      toast.error("Veuillez sélectionner une date.");
      return;
    }
    if (selectedTimes.length === 0) {
      toast.error("Veuillez sélectionner au moins un créneau horaire.");
      return;
    }

    setAvailability(prev => {
      const existingEntry = prev.find(entry => entry.date === selectedDate);
      if (existingEntry) {
        return prev.map(entry =>
          entry.date === selectedDate
            ? { ...entry, times: Array.from(new Set([...entry.times, ...selectedTimes])) }
            : entry
        );
      } else {
        return [...prev, { date: selectedDate, times: selectedTimes }];
      }
    });

    // Reset selections
    setSelectedDate("");
    setSelectedTimes([]);
    toast.success("Disponibilité ajoutée !");
  };

  // Remove a specific date from availability
  const removeAvailability = (date: string) => {
    setAvailability(prev => prev.filter(entry => entry.date !== date));
  };

  // Save availability to the database
  const saveAvailability = async () => {
    try {
      const formattedAvailability = availability.map(({ date, times }) => ({
        date,
        times: Array.isArray(times) ? times : [],
      }));

      await axios.put("/api/providers/availability", { availability: formattedAvailability });
      toast.success("Disponibilités mises à jour !");
      router.push("/providers/dashboard");
    } catch (error) {
      toast.error("Erreur mise à jour disponibilité");
      console.error("❌ API Update Error:", error);
    }
  };

  return (
    <div className="relative p-6 max-w-3xl mx-auto bg-white rounded-md shadow-md">
      {/* Bouton de fermeture en haut à droite */}
      <button
        onClick={() => router.push("/providers/dashboard")}
        className="absolute top-4 right-4 text-2xl font-bold text-gray-600 hover:text-gray-800"
      >
        ✕
      </button>

      <h2 className="text-2xl font-bold mb-4">📆 Définir mes disponibilités</h2>

      {/* Date Selection Dropdown */}
      <h3 className="text-lg font-semibold mb-2">Sélectionner une date</h3>
      <select
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        className="p-2 border rounded-md w-full"
      >
        <option value="">Sélectionner une date</option>
        {upcomingDates.map(date => (
          <option key={date} value={date}>
            {new Date(date).toLocaleDateString()}
          </option>
        ))}
      </select>

      {/* Time Selection as Buttons */}
      <h3 className="text-lg font-semibold mt-4">🕒 Sélectionner les horaires</h3>
      <div className="flex flex-wrap gap-2 mt-2">
        {timeSlots.map((time) => (
          <button
            key={time}
            type="button"
            onClick={() => toggleTime(time)}
            className={`px-3 py-1 border rounded-md transition ${
              selectedTimes.includes(time)
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {time}
          </button>
        ))}
      </div>

      {/* Add Availability Button */}
      <button
        onClick={addAvailability}
        className="mt-4 w-full p-3 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 transition duration-200"
      >
        ➕ Ajouter disponibilité
      </button>

      {/* Display Existing Availability */}
      <h3 className="text-lg font-semibold mt-6">📌 Mes Disponibilités</h3>
      {availability.length > 0 ? (
        <div className="mt-4 p-4 border rounded-md bg-gray-100">
          {availability.map(({ date, times }) => (
            <div key={date} className="mt-2 p-3 border rounded-md bg-white flex justify-between items-center">
              <div>
                <h4 className="text-md font-semibold">{new Date(date).toLocaleDateString()}</h4>
                <p className="text-gray-700">
                  {times.length > 0 ? times.join(", ") : "Aucun horaire défini."}
                </p>
              </div>
              <button
                onClick={() => removeAvailability(date)}
                className="ml-4 p-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
              >
                ❌ Supprimer
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">Aucune disponibilité définie.</p>
      )}

      {/* Save button */}
      <button
        onClick={saveAvailability}
        className="mt-6 w-full p-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-200"
      >
        ✅ Sauvegarder
      </button>
    </div>
  );
};

export default AvailabilityPage;
