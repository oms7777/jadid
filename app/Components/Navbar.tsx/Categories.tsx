'use client';


import Container from "../Container"


import { GiKeyLock } from "react-icons/gi"
import { FaFaucetDrip } from "react-icons/fa6"
import { FaLightbulb } from "react-icons/fa";
import { GiPaintRoller } from "react-icons/gi";
import { MdConstruction } from "react-icons/md";
import { TbGardenCart } from "react-icons/tb";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";


export const categories = [
    {
        label: "nique ta race",
        icon: GiKeyLock,
        description: "This service to unlock doors"
    },
    {
        label: "Plombier",
        icon: FaFaucetDrip,
        description: "Find your plumber"
    },
    {
        label: "Electricien",
        icon: FaLightbulb,
        description: "Find your electrician"
    },
    {
        label: "Peintre",
        icon: GiPaintRoller,
        description: "Find your painter"
    },
    {
        label: "Rénovation",
        icon: MdConstruction,
        description: "Find your constructor"
    },
    {
        label: "Jardin et extérieur",
        icon: TbGardenCart,
        description: "Find your gardener"
    },
];




const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';

    if(!isMainPage) {
        return null;
    }


    return (
        <Container>
            <div
                className="
                    pt-4
                    flex
                    flex-row
                    items-center
                    justify-between
                    overflow-x-auto
                "
            >
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
    )
}

export default Categories