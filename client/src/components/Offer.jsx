import { ChevronDown } from "lucide-react";

const Offer = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Heading */}
        <h3 className="pl-10 pr-10 text-center text-[40px] font-bold">
          What we Offer
        </h3>

        {/* Description */}
        <h2 className="mx-auto max-w-10xl text-center  font-bold leading-tight text-[#222] lg:text-5xl">
          Our huge range of made-to-measure clothing and premium fabric
          offers a variety of solutions and styles.
        </h2>

        {/* Divider */}
        <div className="mt-14 flex items-center gap-8">

          <div className="h-[2px] flex-1 bg-black"></div>

          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-black transition hover:scale-110">
            <ChevronDown
              size={30}
              className="text-white"
              strokeWidth={3}
            />
          </button>

          <div className="h-[2px] flex-1 bg-black"></div>

        </div>

      </div>
    </section>
  );
};

export default Offer;