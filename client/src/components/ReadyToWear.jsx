import ReadyToWearCard from "./ReadyToWearCard";

import shacket from "../assets/shirt.avif";
import formal from "../assets/fabric1.jpg";
import flannel from "../assets/cort.avif";

const products = [
  {
    image: shacket,
    title: "Shacket",
    description:
      "From casual mornings to cool evenings, the shacket fits right in.",
  },
  {
    image: formal,
    title: "Formal Shirt",
    description:
      "A timeless formal shirt designed for sharp elegance and all-day comfort.",
  },
  {
    image: flannel,
    title: "Flannel Shirt",
    description:
      "A cozy flannel shirt that blends rugged charm with everyday comfort.",
  },
];

const ReadyToWear = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-[1250px] px-6">
        <h2 className="mb-10 text-center text-6xl font-light">
          Ready to Wear
        </h2>

        <div className="grid gap-6 lg:grid-cols-3">
          {products.map((item, index) => (
            <ReadyToWearCard key={index} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReadyToWear;