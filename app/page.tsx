import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import CitiesMarquee from "@/components/CitiesMarquee";
import ScreensShowcase from "@/components/ScreensShowcase";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CitiesMarquee />
      <HowItWorks />
      <ScreensShowcase />
      <Footer />
    </main>
  );
}
