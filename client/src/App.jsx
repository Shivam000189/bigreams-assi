import './App.css'
import CustomizeCTA from './components/CustomizeCTA'
import BestSeller from './components/BestSeller'
import FabricCategories from './components/FabricCategories'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Offer from './components/Offer'
import ReadyToWear from './components/ReadyToWear'
import TailorMade from './components/TailorMade'
import Testimonials from './components/Testimonials'
import LatestBlogs from './components/LatestBlogs'
// import AnimalCare from './components/AnimalCare'
import EcoAndAnimal from './components/EcoAndAnimal'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Hero />
      <Offer />
      <TailorMade />
      <FabricCategories />
      <BestSeller />
      <ReadyToWear />
      <Testimonials />
      <CustomizeCTA />
      <LatestBlogs />
      {/* <AnimalCare /> */}
      <EcoAndAnimal />
      <FAQ />
      <Footer />
    </>
  )
}

export default App
