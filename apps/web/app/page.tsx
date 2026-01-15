import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import MapSection from "@/components/landing/MapSection";
import TrustSection from "@/components/landing/TrustSection";
import Footer from "@/components/landing/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorksSection />
        <FeaturesSection />
        <MapSection />
        <TrustSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
