"use client";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-lg font-semibold">Jadid - Votre plateforme de services</p>
        <p className="text-sm mt-2">© {new Date().getFullYear()} Jadid. Tous droits réservés.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="/terms" className="hover:underline">
            Conditions d'utilisation
          </a>
          <a href="/privacy" className="hover:underline">
            Politique de confidentialité
          </a>
          <a href="/contact" className="hover:underline">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
