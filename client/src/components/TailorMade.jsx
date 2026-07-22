import TailorCard from "./TailorCard";

import suit from "../assets/cort.avif";
import shirt from "../assets/shirt.avif";
import pants from "../assets/jeans.avif";

const TailorMade = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-[1250px] px-6">

        <h2 className="mb-16 text-center text-6xl font-light">
          Tailor Made
        </h2>

        <div className="grid gap-8 lg:grid-cols-3">

          <TailorCard
            image={suit}
            title="Custom Suits"
            description="A suit stitched to your measurements—look confident, feel comfortable."
          />

          <TailorCard
            image={shirt}
            title="Custom Shirts"
            description="Made just for you with premium fabrics and a flawless fit."
          />

          <TailorCard
            image={pants}
            title="Custom Pants"
            description="Tailored to your exact size for all-day comfort and a sharp look."
          />

        </div>

      </div>
    </section>
  );
};

export default TailorMade;