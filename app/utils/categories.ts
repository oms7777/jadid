import { FaBroom, FaWrench, FaLock, FaPlug, FaPaintRoller, FaTree } from "react-icons/fa";

// ✅ Define categories with icons
export const categories = [
  { label: "Ménage", icon: FaBroom },
  { label: "Plombier", icon: FaWrench },
  { label: "Serrurier", icon: FaLock },
  { label: "Electricien", icon: FaPlug },
  { label: "Peintre", icon: FaPaintRoller },
  { label: "Jardin et extérieur", icon: FaTree },
];

// ✅ Define subcategories
export const subcategories: Record<string, string[]> = {
  "Ménage": ["Ménage à domicile", "Nettoyage de vitres", "Repassage"],
  "Plombier": ["Réparation de fuites", "Changer une chasse d'eau"],
  "Serrurier": ["Installer une serrure", "Dépannage serrurerie"],
  "Electricien": ["Pose de lampes", "Changer une ampoule"],
  "Peintre": ["Peinture intérieure", "Peinture extérieure"],
  "Jardin et extérieur": ["Entretien de la pelouse", "Création de jardin"],
};
