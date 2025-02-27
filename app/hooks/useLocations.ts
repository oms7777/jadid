


const locations = [
    // Casablanca
    { value: "casablanca", label: "Casablanca", latlng: [33.5731, -7.5898], country: "Morocco", flag: "🇲🇦" },
    { value: "oulfa", label: "Oulfa (Casablanca)", latlng: [33.5406, -7.7067], country: "Morocco", flag: "🇲🇦" },
    { value: "maarif", label: "Maarif (Casablanca)", latlng: [33.5845, -7.6258], country: "Morocco", flag: "🇲🇦" },
    { value: "gauthier", label: "Gauthier (Casablanca)", latlng: [33.5899, -7.6273], country: "Morocco", flag: "🇲🇦" },
    { value: "bouskoura", label: "Bouskoura (Casablanca)", latlng: [33.4652, -7.6543], country: "Morocco", flag: "🇲🇦" },
    { value: "ain-diab", label: "Ain Diab (Casablanca)", latlng: [33.5833, -7.6820], country: "Morocco", flag: "🇲🇦" },
    { value: "sidi-bernoussi", label: "Sidi Bernoussi (Casablanca)", latlng: [33.6055, -7.4861], country: "Morocco", flag: "🇲🇦" },
    { value: "sidi-maarouf", label: "Sidi Maarouf (Casablanca)", latlng: [33.5278, -7.6164], country: "Morocco", flag: "🇲🇦" },
    { value: "anfa", label: "Anfa (Casablanca)", latlng: [33.5815, -7.6450], country: "Morocco", flag: "🇲🇦" },
    { value: "hay-hassani", label: "Hay Hassani (Casablanca)", latlng: [33.5666, -7.6421], country: "Morocco", flag: "🇲🇦" },
    { value: "medina-casa", label: "Ancienne Medina (Casablanca)", latlng: [33.5994, -7.6186], country: "Morocco", flag: "🇲🇦" },

    // Rabat
    { value: "rabat", label: "Rabat", latlng: [34.0209, -6.8416], country: "Morocco", flag: "🇲🇦" },
    { value: "agdal-rabat", label: "Agdal (Rabat)", latlng: [34.0059, -6.8417], country: "Morocco", flag: "🇲🇦" },
    { value: "hay-riad", label: "Hay Riad (Rabat)", latlng: [33.9789, -6.8672], country: "Morocco", flag: "🇲🇦" },
    { value: "souissi", label: "Souissi (Rabat)", latlng: [34.0020, -6.8601], country: "Morocco", flag: "🇲🇦" },
    { value: "medina-rabat", label: "Medina (Rabat)", latlng: [34.0209, -6.8369], country: "Morocco", flag: "🇲🇦" },
    { value: "hassan", label: "Hassan (Rabat)", latlng: [34.0219, -6.8321], country: "Morocco", flag: "🇲🇦" },
    { value: "akkari", label: "Akkari (Rabat)", latlng: [34.0104, -6.8570], country: "Morocco", flag: "🇲🇦" },
    { value: "youssoufia", label: "Youssoufia (Rabat)", latlng: [33.9785, -6.8460], country: "Morocco", flag: "🇲🇦" },

    // Marrakech
    { value: "marrakech", label: "Marrakech", latlng: [31.6295, -7.9811], country: "Morocco", flag: "🇲🇦" },
    { value: "gueliz", label: "Gueliz (Marrakech)", latlng: [31.6346, -7.9960], country: "Morocco", flag: "🇲🇦" },
    { value: "hivernage", label: "Hivernage (Marrakech)", latlng: [31.6190, -7.9930], country: "Morocco", flag: "🇲🇦" },
    { value: "medina-marrakech", label: "Medina (Marrakech)", latlng: [31.6253, -7.9892], country: "Morocco", flag: "🇲🇦" },
    { value: "agdal-marrakech", label: "Agdal (Marrakech)", latlng: [31.6066, -7.9813], country: "Morocco", flag: "🇲🇦" },
    { value: "chrifia", label: "Chrifia (Marrakech)", latlng: [31.6079, -8.0174], country: "Morocco", flag: "🇲🇦" },
    { value: "targa", label: "Targa (Marrakech)", latlng: [31.6531, -8.0458], country: "Morocco", flag: "🇲🇦" },

    // Tangier
    { value: "tangier", label: "Tangier", latlng: [35.7595, -5.8339], country: "Morocco", flag: "🇲🇦" },
    { value: "malabata", label: "Malabata (Tangier)", latlng: [35.7700, -5.7870], country: "Morocco", flag: "🇲🇦" },
    { value: "iberia", label: "Iberia (Tangier)", latlng: [35.7660, -5.8004], country: "Morocco", flag: "🇲🇦" },
    { value: "medina-tangier", label: "Medina (Tangier)", latlng: [35.7672, -5.8038], country: "Morocco", flag: "🇲🇦" },

    // Fes
    { value: "fes", label: "Fes", latlng: [34.0331, -5.0000], country: "Morocco", flag: "🇲🇦" },
    { value: "ville-nouvelle-fes", label: "Ville Nouvelle (Fes)", latlng: [34.0206, -5.0050], country: "Morocco", flag: "🇲🇦" },
    { value: "medina-fes", label: "Medina (Fes)", latlng: [34.0657, -4.9783], country: "Morocco", flag: "🇲🇦" },
    { value: "zouagha", label: "Zouagha (Fes)", latlng: [34.0200, -5.0100], country: "Morocco", flag: "🇲🇦" },
];

const useLocations = () => {
    const getAll = () => locations;
    const getByValue = (value: string) => locations.find((item) => item.value === value);

    return { getAll, getByValue };
};

export default useLocations;