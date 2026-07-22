import ecoBanner from "../assets/eco-banner.jpg";

const EcoPackaging = () => {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-[1450px] px-6">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={ecoBanner}
            alt="Eco Friendly Packaging"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default EcoPackaging;