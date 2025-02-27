"use client";

import FAQ from "./components/Main page/FAQ";
import Footer from "./components/Main page/Footer";
import HowItWorks from "./components/Main page/HowItWorks";
import SatisfactionGuarantee from "./components/Main page/SatisfactionGuarantee";
import Testimonials from "./components/Main page/Testimonials";
import TopProviders from "./components/Main page/TopProviders";



const MainPage = () => {
  return (
    <div className="mt-20 px-4">
      <h1 className="text-center text-4xl font-bold">2000 prestataires de service à domicile évalués et qualifiés</h1>


      {/* "Top Providers" Section */}
      <TopProviders />
      
      {/* "How It Works" Section */}
      <HowItWorks />



      {/* "Satisfaction Guarantee" Section */}
      <SatisfactionGuarantee />

      {/* "Testimonials" Section */}
      <Testimonials />

      {/* FAQ Section */}
      <FAQ />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainPage;
