'use client';

import Container from "../Container";
import { GiMagicBroom } from "react-icons/gi";
import { GiKeyLock } from "react-icons/gi";
import { FaFaucetDrip } from "react-icons/fa6";
import { FaLightbulb } from "react-icons/fa";
import { GiPaintRoller } from "react-icons/gi";
import { MdConstruction } from "react-icons/md";
import { TbGardenCart } from "react-icons/tb";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";

export const categories = [
    {
        label: "Ménage",
        icon: GiMagicBroom,
        description: "Libérez-vous des tâches ménagères",
        subcategories: [
            "Ménage à domicile", "Ménage d'état des lieux", "Ménage après un événement", "Repassage",
            "Nettoyage de vitres", "Lessiver un mur", "Aide au rangement de la maison",
            "Nettoyage de fin de chantier", "Nettoyage de logement insalubre"
        ]
    },
    {
        label: "Serrurier",
        icon: GiKeyLock,
        description: "This service to unlock doors",
        subcategories: ["Installer une serrure", "Changer une serrure", "Dépannage serrurerie"]
    },
    {
        label: "Plombier",
        icon: FaFaucetDrip,
        description: "Find your plumber",
        subcategories: [
            "Plomberie", "Réparation de fuites d'eau", "Changer une chasse d'eau", "Changer un robinet",
            "Déboucher un évier", "Déboucher des WC", "Débouchage des canalisations",
            "Faire les joints de la salle de bain", "Réparer une chasse d'eau",
            "Changer une bonde", "Changer un siphon", "Détartrer des toilettes",
            "Changer l'abattant des WC"
        ]
    },
    {
        label: "Electricien",
        icon: FaLightbulb,
        description: "Find your electrician",
        subcategories: [
            "Pose de lampes et luminaires", "Changer une ampoule", "Installation de prises électriques",
            "Installation d'interrupteur", "Installation d'un radiateur électrique",
            "Domotique", "Pose d'objets connectés Nest"
        ]
    },
    {
        label: "Peintre",
        icon: GiPaintRoller,
        description: "Find your painter",
        subcategories: [
            "Rénovation des murs", "Peinture intérieure", "Peinture extérieure", "Peindre des volets",
            "Peindre une porte", "Pose de papier peint", "Décoller du papier peint", "Pose de crédence",
            "Boucher un trou", "Enduire un mur"
        ]
    },
    {
        label: "Rénovation",
        icon: MdConstruction,
        description: "Find your constructor",
        subcategories: [
            "Pose de parquet", "Pose de dalles PVC", "Pose de dalles de moquette", "Pose de lino",
            "Pose de plinthes", "Retirer un revêtement existant", "Peindre un sol", "Peindre un escalier"
        ]
    },
    {
        label: "Jardin et extérieur",
        icon: TbGardenCart,
        description: "Find your gardener",
        subcategories: [
            "Entretien de la pelouse", "Entretien des espaces verts", "Fleurs, potager et verger"
        ]
    }
];

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if (!isMainPage) {
        return null;
    }

    return (
        <Container>
            <div className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                ">
                {categories.map((item) => (
                    <CategoryBox
                        key={item.label}
                        label={item.label}
                        selected={category === item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </Container>
    );
};

export default Categories;