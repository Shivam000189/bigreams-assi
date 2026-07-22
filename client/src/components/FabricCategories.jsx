import FabricCard from "./FabricCard";

import fabric1 from "../assets/fabric1.jpg";
import fabric2 from "../assets/fabric2.jpg";
import fabric3 from "../assets/fabric3.avif";
import fabric4 from "../assets/fabric4.avif";
import fabric5 from "../assets/fabric5.avif";
import fabric6 from "../assets/jeans.avif";

const FabricCategories = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1250px] px-6">
        {/* Heading */}
        <h2 className="mb-10 text-center text-5xl font-semibold">
          Fabric Categories
        </h2>

        {/* Top Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          <FabricCard
            image={fabric1}
            title="Two Way Stretchable Fabric"
            large
          />

          <FabricCard
            image={fabric2}
            title="Four Way Stretchable Fabric"
            large
          />
        </div>

        {/* Bottom Row */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FabricCard image={fabric3} title="Formal Pants" />
          <FabricCard image={fabric4} title="Luxury Suiting" />
          <FabricCard image={fabric5} title="Premium Fabrics" />
          <FabricCard image={fabric6} title="Tailored Trousers" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <FabricCard image={fabric3} title="Formal Pants" />
          <FabricCard image={fabric4} title="Luxury Suiting" />
          <FabricCard image={fabric5} title="Premium Fabrics" />
          <FabricCard image={fabric6} title="Tailored Trousers" />
        </div>

      </div>
    </section>
  );
};

export default FabricCategories;