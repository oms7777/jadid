"use client";

import qs from "query-string";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaBroom, FaKey, FaWrench, FaBolt, FaPaintBrush, FaHammer, FaTree } from "react-icons/fa";
import useSearchModal from "@/app/hooks/useSearchModal";
import { formatISO } from "date-fns";
import Modal from "./Modal";
import toast from "react-hot-toast"; // ✅ Ensure toast is imported for error handling
import useLocations from "@/app/hooks/useLocations";
import { useEffect } from "react";
import axios from "axios";
import { useLoadScript, Autocomplete } from "@react-google-maps/api";

// **Step Enum**
enum STEPS {
  CATEGORY = 0,
  SUBCATEGORY = 1,
  DURATION = 2,
  DATE = 3,
  TIME = 4,
  LOCATION = 5,
  PHONE = 6,
  REQUEST_DETAILS = 7,
  EMAIL = 8,
}

// **Category & Subcategory Definitions with Icons**
const categories = [
  { label: "Ménage", icon: <FaBroom /> },
  { label: "Serrurier", icon: <FaKey /> },
  { label: "Plombier", icon: <FaWrench /> },
  { label: "Electricien", icon: <FaBolt /> },
  { label: "Peintre", icon: <FaPaintBrush /> },
  { label: "Rénovation", icon: <FaHammer /> },
  { label: "Jardin et extérieur", icon: <FaTree /> },
];


const subcategories: Record<string, { label: string; icon: JSX.Element }[]> = {
  "Ménage": [
    { label: "Ménage à domicile", icon: <FaBroom /> },
    { label: "Ménage état des lieux", icon: <FaBroom /> },
    { label: "Ménage après un événement", icon: <FaBroom /> },
    { label: "Repassage", icon: <FaBroom /> },
    { label: "Nettoyage de vitres", icon: <FaBroom /> },
    { label: "Lessiver un mur", icon: <FaBroom /> },
    { label: "Aide au rangement de la maison", icon: <FaBroom /> },
    { label: "Nettoyage de fin de chantier", icon: <FaBroom /> },
    { label: "Nettoyage de logement insalubre", icon: <FaBroom /> },
  ],
  "Serrurier": [
    { label: "Installer une serrure", icon: <FaKey /> },
    { label: "Changer une serrure", icon: <FaKey /> },
    { label: "Dépannage serrurerie", icon: <FaKey /> },
  ],
  "Plombier": [
    { label: "Réparation de fuites d eau", icon: <FaWrench /> },
    { label: "Changer une chasse d eau", icon: <FaWrench /> },
    { label: "Débouchage des canalisations", icon: <FaWrench /> },
  ],
  "Electricien": [
    { label: "Pose de lampes et luminaires", icon: <FaBolt /> },
    { label: "Changer une ampoule", icon: <FaBolt /> },
  ],
  "Peintre": [
    { label: "Peinture intérieure", icon: <FaPaintBrush /> },
    { label: "Peinture extérieure", icon: <FaPaintBrush /> },
    { label: "Décoller du papier peint", icon: <FaPaintBrush /> },
  ],
  "Rénovation": [
    { label: "Pose de parquet", icon: <FaHammer /> },
    { label: "Pose de lino", icon: <FaHammer /> },
  ],
  "Jardin et extérieur": [
    { label: "Entretien de la pelouse", icon: <FaTree /> },
    { label: "Fleurs, potager et verger", icon: <FaTree /> },
  ],
};

// **Durations & Time Slots**
const durations = ["1h", "1.5h", "2h", "2.5h", "3h", "3.5h"];
const timeSlots = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
  "16:00", "16:30", "17:00", "17:30"
];

interface SearchModalProps {
  category?: string | null;
  onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ onClose }) => {

  const router = useRouter();
  const searchModal = useSearchModal();

  const { getAll } = useLocations(); // ✅ Fetch predefined locations

  const [step, setStep] = useState(STEPS.CATEGORY);
  const [category, setCategory] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null); // ✅ Provider's location
  const [clientAddress, setClientAddress] = useState<string>(""); // ✅ Client's exact address
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [duration, setDuration] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [requestDetails, setRequestDetails] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const fetchAddressSuggestions = async (query: string) => {
    if (query.length < 3) return; // ✅ Fetch only after 3+ characters
  
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: `${query}, Morocco`, // ✅ Force search inside Morocco 🇲🇦
          format: "json",
          countrycodes: "MA", // ✅ Ensure results are ONLY from Morocco
          addressdetails: 1,
          limit: 5, // ✅ Fetch only top 5 results
        },
      });
  
      setSuggestions(response.data);
    } catch (error) {
      console.error("❌ Error fetching address suggestions:", error);
    }
  };

  // **Debounce API Calls**
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (clientAddress.length > 2) {
        fetchAddressSuggestions(clientAddress);
      }
    }, 500);
    
    return () => clearTimeout(delayDebounceFn);
  }, [clientAddress]);

  const handleSearchSubmit = () => {
    if (!category || !subcategory || !selectedDate || !selectedTime || !clientAddress) {
      toast.error("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const formattedDate = selectedDate ? formatISO(selectedDate, { representation: "date" }) : undefined;

    const queryParams = qs.stringify({
      category,
      subcategory,
      location,
      clientAddress,
      duration,
      date: formattedDate,
      time: selectedTime,
      phone: phone.trim() || undefined,
      requestDetails: requestDetails.trim() || undefined,
      email: email.trim() || undefined,
    }, { skipNull: true, skipEmptyString: true });
  
    console.log("🚀 Searching Providers with:", queryParams);
  
    searchModal.onClose(); // ✅ Close the modal
    router.push(`/providers?${queryParams}`); // ✅ Redirect with cleaned parameters
  };
  const handleSubmitStep = () => {
    if (step === STEPS.EMAIL) {
      handleSearchSubmit(); // ✅ Submit search when on the final step
    } else if (step === STEPS.TIME) {
      setStep(STEPS.LOCATION); // ✅ Force location step after selecting time
    } else {
      setStep((prev) => prev + 1);
    }
  };
  
  
  // **Navigation Handlers**
  const onBack = useCallback(() => setStep((value) => value - 1), []);
  const onNext = useCallback(() => {
    if (step === STEPS.TIME) {
      setStep(STEPS.LOCATION); // ✅ Ensure LOCATION appears after TIME selection
    } else {
      setStep((prev) => prev + 1);
    }
  }, [step]);
  
  

  const handleClose = useCallback(() => {
    searchModal.onClose();
    router.push("/");
  }, [searchModal, router]);

  // Modal body content based on step
  let bodyContent;
  switch (step) {
    case STEPS.CATEGORY:
      bodyContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {categories.map(({ label, icon }) => (
            <button 
              key={label} 
              className="p-4 border rounded-md flex flex-col items-center gap-2 bg-gray-200 hover:bg-blue-500 hover:text-white transition"
              onClick={() => { setCategory(label); setStep(STEPS.SUBCATEGORY); }}
            >
              {React.cloneElement(icon, { size: 24 })} {/* ✅ Properly pass size to JSX element */}
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>
      );
      break;

    case STEPS.SUBCATEGORY:
      bodyContent = (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {subcategories[category || ""]?.map(({ label, icon }) => (
            <button 
              key={label} 
              className="p-4 border rounded-md flex flex-col items-center gap-2 bg-gray-200 hover:bg-blue-500 hover:text-white transition"
              onClick={() => { setSubcategory(label); setStep(STEPS.DURATION); }}
            >
              {React.cloneElement(icon, { size: 20 })} {/* ✅ Fix icon rendering */}
              <span className="font-semibold">{label}</span>
            </button>
          ))}
        </div>
      );
      break;
    

    case STEPS.DURATION:
      bodyContent = (
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-semibold text-center">⏳ Durée estimée du service</h3>
          <div className="grid grid-cols-2 gap-3">
            {durations.map((time) => (
              <button 
                key={time} 
                className={`p-3 border rounded-md ${duration === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                onClick={() => { setDuration(time); setStep(STEPS.DATE); }}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      );
      break;

    case STEPS.DATE:
      bodyContent = (
        <ReactCalendar value={selectedDate} onChange={(date) => setSelectedDate(date as Date)} minDate={new Date()} />
      );
      break;

      case STEPS.TIME:
        bodyContent = (
          <div className="flex flex-col space-y-4">
            <h3 className="text-lg font-semibold text-center">🕒 Choisissez le temps d intervention</h3>
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((time) => (
                <button 
                  key={time} 
                  className={`p-3 border rounded-md ${selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                  onClick={() => {
                    setSelectedTime(time);
                    onNext(); // ✅ Ensures transition to LOCATION
                  }}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        );
        break;
      

        case STEPS.LOCATION:
          bodyContent = (
            <div className="flex flex-col space-y-4">
        
              <h3 className="text-lg font-semibold mt-4">🏡 Entrez votre adresse exacte</h3>
              <div className="relative">
                <input
                  type="text"
                  className="p-3 border rounded-md w-full"
                  placeholder="Votre adresse exacte"
                  value={clientAddress}
                  onChange={(e) => {
                    setClientAddress(e.target.value);
                    fetchAddressSuggestions(e.target.value);
                  }}
                />
                
                {suggestions.length > 0 && (
                  <div className="absolute bg-white border w-full mt-1 rounded-md shadow-md">
                    {suggestions.map((s, index) => (
                      <div
                        key={index}
                        className="p-2 cursor-pointer hover:bg-gray-200"
                        onClick={() => setClientAddress(s.display_name)}
                      >
                        {s.display_name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
          break;
      

    case STEPS.PHONE:
      bodyContent = (
        <input type="tel" placeholder="Votre numéro de téléphone"
          className="p-3 border rounded-md w-full"
          value={phone} onChange={(e) => setPhone(e.target.value)}
        />
      );
      break;


    case STEPS.REQUEST_DETAILS:
      bodyContent = (
        <textarea placeholder="Décrivez votre demande" className="p-3 border rounded-md w-full h-24"
          value={requestDetails} onChange={(e) => setRequestDetails(e.target.value)}
        />
      );
      break;

    case STEPS.EMAIL:
      bodyContent = (
        <input type="email" placeholder="Votre email" className="p-3 border rounded-md w-full"
          value={email} onChange={(e) => setEmail(e.target.value)}
        />
      );
      break;
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={() => searchModal.onClose()}
      onSubmit={handleSubmitStep} // ✅ Use controlled function
      title="Rechercher un service"
      body={bodyContent}
      actionLabel={step === STEPS.EMAIL ? "Envoyer la demande" : "Suivant"}
      secondaryActionLabel={step === STEPS.CATEGORY ? undefined : "Retour"}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
    />
  );
  
  
};

export default SearchModal;