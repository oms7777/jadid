"use client";

import { useState } from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "Comment fonctionne Maalem ?",
      answer: "Maalem vous permet de réserver des services en quelques clics. Il vous suffit de choisir une catégorie, une date et un prestataire disponible.",
    },
    {
      question: "Quels types de services puis-je réserver ?",
      answer: "Vous pouvez réserver des services tels que plomberie, électricité, ménage, jardinage, et bien plus encore.",
    },
    {
      question: "Comment sont sélectionnés les prestataires ?",
      answer: "Nos prestataires sont vérifiés et évalués par les clients afin d'assurer la meilleure qualité de service.",
    },
    {
      question: "Puis-je annuler ou modifier ma réservation ?",
      answer: "Oui, vous pouvez modifier ou annuler votre réservation en fonction des conditions du prestataire.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="my-10 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg p-4 cursor-pointer">
            <div
              className="flex justify-between items-center"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </div>
            {openIndex === index && (
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
