import ecoBanner from "../assets/eco-friendly.avif";
import animalBanner from "../assets/anima.jpg";

const EcoAndAnimal = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-[1250px] px-6">

        {/* Eco Friendly Banner */}
        <div className="overflow-hidden rounded-2xl shadow-sm">
          <img
            src={ecoBanner}
            alt="Eco Friendly Packaging"
            className="w-full object-cover"
          />
        </div>

        {/* Space */}
        <div className="h-14" />

        {/* Animal Welfare Banner */}
        <div className="overflow-hidden rounded-2xl shadow-sm">
          <img
            src={animalBanner}
            alt="Save a Life Feed a Needy"
            className="w-full object-cover"
          />
        </div>

      <div className="text-3xl text-center font-semibold pl-2">Shop with purpose! Every order supports furry friends, as we donate a portion of profits to their well-being. Make a difference – shop with heart and echo kindness to animals in need.</div>
      </div>
    </section>
  );
};

export default EcoAndAnimal;