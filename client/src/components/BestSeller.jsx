import ProductCard from "./ProductCard";

import fabric1 from "../assets/fabric1.jpg";
import fabric2 from "../assets/fabric2.jpg";
import fabric3 from "../assets/fabric3.avif";
import fabric4 from "../assets/fabric4.avif";

const products = [
  {
    image: fabric1,
    title: "Unstitched Tartan Red Checkered Fabric",
    price: 289,
    oldPrice: 349,
    discount: "-17%",
    hot: true,
  },
  {
    image: fabric2,
    title: "Black Wrinkle Free Stretchable Twill Pants Fabric",
    price: 399,
    oldPrice: 558,
    discount: "-28%",
  },
  {
    image: fabric3,
    title: "Brown Herringbone Wool Blazer Fabric",
    price: 699,
    oldPrice: 978,
    discount: "-29%",
  },
  {
    image: fabric4,
    title: "Beige Stretchable Pants Fabric",
    price: 399,
    oldPrice: 558,
    discount: "-28%",
  },
];

const BestSeller = () => {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-[1250px] px-6">

        <h2 className="mb-14 text-center text-6xl font-light">
          Best Sellers
        </h2>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="rounded-lg bg-black px-10 py-4 text-lg font-semibold text-white transition hover:bg-zinc-800">
            View Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;