import { ChevronLeft, ChevronRight } from "lucide-react";
import TestimonialCard from "./TestimonialCard";

const testimonials = [
  {
    review:
      "Talented team with excellent communication! I am so impressed and definitely planning to order from them again. You won't be disappointed!.",
    name: "Peter",
  },
  {
    review:
      "The overall product quality was very good. Fit & finish was customised as per requirement. Communication at every step was very crisp & clear. You can go ahead with buying from the seller.",
    name: "Rustom",
  },
  {
    review:
      "I ordered 2 meters of Herringbone Tweed just for ₹1200. I'm very happy with the purchase. It is yarn dyed fabric and feels very premium.",
    name: "Sahasrangsu Goswami",
  },
];

const Testimonials = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1450px] px-6">

        <h2 className="mb-14 text-center text-6xl font-light">
          What They Say
        </h2>

        <div className="relative">

          {/* Left Arrow */}
          <button className="absolute left-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300">
            <ChevronLeft size={28} />
          </button>

          {/* Cards */}
          <div className="grid gap-8 lg:grid-cols-3">
            {testimonials.map((item, index) => (
              <TestimonialCard
                key={index}
                review={item.review}
                name={item.name}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button className="absolute right-4 top-1/2 z-20 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full bg-gray-200 transition hover:bg-gray-300">
            <ChevronRight size={28} />
          </button>

        </div>

        {/* Pagination */}
        <div className="mt-8 flex justify-center gap-3">
          <div className="h-3 w-3 rounded-full bg-zinc-700"></div>
          <div className="h-3 w-3 rounded-full bg-zinc-400"></div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;