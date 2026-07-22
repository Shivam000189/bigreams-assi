import Hero from "../components/Hero";
import Offer from "../components/Offer";
import TailorMade from "../components/TailorMade";
import FabricCategories from "../components/FabricCategories";
import BestSeller from "../components/BestSeller";
import ReadyToWear from "../components/ReadyToWear";
import Testimonials from "../components/Testimonials";
import CustomizeCTA from "../components/CustomizeCTA";
import LatestBlogs from "../components/LatestBlogs";
import EcoAndAnimal from "../components/EcoAndAnimal";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <Offer />
      <TailorMade />
      <FabricCategories />
      <BestSeller />
      <ReadyToWear />
      <Testimonials />
      <CustomizeCTA />
      <LatestBlogs />
      <EcoAndAnimal />
      <FAQ />
      <Footer />
    </>
  );
};

export default Home;