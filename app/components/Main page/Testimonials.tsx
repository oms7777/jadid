"use client";

import { AiFillStar, AiOutlineStar } from "react-icons/ai"; // Importing the star icons for rating

const Testimonials = () => {
  // Function to render stars for rating
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < rating ? <AiFillStar key={i} className="text-yellow-500" /> : <AiOutlineStar key={i} className="text-yellow-500" />);
    }
    return stars;
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Découvrez ce que pensent nos clients</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"Madhi H. Est très professionnel, rapide et efficace. Encore merci pour cette bibliothèque montée en moins de deux heures."</p>
            <p className="font-semibold text-gray-800 mt-4">Madi H.</p> {/* Latinized Name */}
            <p className="text-gray-500">Plombier</p>
            <div className="flex justify-center mt-3">{renderStars(5)}</div> {/* 5-star rating */}
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"Cyril est super ! Très ponctuel. Il a monté mon meuble parfaitement et en un temps record. Bravo et merci. Je le recommande vivement."</p>
            <p className="font-semibold text-gray-800 mt-4">Estelle B.</p> {/* Latinized Name */}
            <p className="text-gray-500">Montage de meubles</p>
            <div className="flex justify-center mt-3">{renderStars(4)}</div> {/* 4-star rating */}
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"Jean-Michel est ponctuel, très professionnel, efficace et de très bon conseil. Il a parfaitement réparé ma porte capricieuse depuis plusieurs mois. Je le recommande vivement."</p>
            <p className="font-semibold text-gray-800 mt-4">Julien E.</p> {/* Latinized Name */}
            <p className="text-gray-500">Réparations domestiques</p>
            <div className="flex justify-center mt-3">{renderStars(5)}</div> {/* 5-star rating */}
          </div>

          {/* Testimonial 4 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"Des travaux délectricité un peu casse-pieds (prises à changer ou à ré-encastrer avec des filages qui ne fonctionnaient pas), Pablo est sorti de ces tâches en un temps record avec le sourire."</p>
            <p className="font-semibold text-gray-800 mt-4">Gerard F.</p> {/* Latinized Name */}
            <p className="text-gray-500">Électricité</p>
            <div className="flex justify-center mt-3">{renderStars(3)}</div> {/* 3-star rating */}
          </div>

          {/* Testimonial 5 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"Aboubacar est très pro et à lhabitude de travailler sur du bricolage et de la menuiserie, on le ressent tout de suite. Très sympathique et le résultat est parfait."</p>
            <p className="font-semibold text-gray-800 mt-4">Stan B.</p> {/* Latinized Name */}
            <p className="text-gray-500">Menuiserie et charpenterie</p>
            <div className="flex justify-center mt-3">{renderStars(5)}</div> {/* 5-star rating */}
          </div>

          {/* Testimonial 6 */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg text-gray-700 italic">"Kader a été disponible très rapidement et a résolu notre problème de fuite en nous expliquant les bons réflexes à avoir pour entretien de nos canalisations. Très sympa et super travail."</p>
            <p className="font-semibold text-gray-800 mt-4">Marie J.</p> {/* Latinized Name */}
            <p className="text-gray-500">Plomberie</p>
            <div className="flex justify-center mt-3">{renderStars(4)}</div> {/* 4-star rating */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
