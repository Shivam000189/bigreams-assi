import { useState } from "react";
import FabricCard from "./FabricCard";
import ProductDrawer from "./drawer/ProductDrawer";

import fabric1 from "../assets/fabric1.jpg";
import fabric2 from "../assets/fabric2.jpg";
import fabric3 from "../assets/fabric3.avif";
import fabric4 from "../assets/fabric4.avif";
import fabric5 from "../assets/fabric5.avif";
import fabric6 from "../assets/jeans.avif";

const FABRIC_CATEGORIES = [
  {
    image: fabric1,
    title: "Two Way Stretchable Fabric",
    category: "Stretch Collection",
    price: "₹899 / metre",
    description: "A soft, flexible fabric with comfortable two-way stretch. Ideal for tailored trousers and everyday smart wear.",
  },
  {
    image: fabric2,
    title: "Four Way Stretchable Fabric",
    category: "Stretch Collection",
    price: "₹1,099 / metre",
    description: "Premium four-way stretch fabric that moves naturally with you while retaining a sharp, polished finish.",
  },
  {
    image: fabric3,
    title: "Formal Pants",
    category: "Formalwear",
    price: "₹1,249 / metre",
    description: "A refined formal fabric with a clean drape, designed for trousers that look polished from day to night.",
  },
  {
    image: fabric4,
    title: "Luxury Suiting",
    category: "Suiting",
    price: "₹1,699 / metre",
    description: "Elevated suiting fabric with a smooth hand feel and elegant structure for blazers, suits, and occasionwear.",
  },
  {
    image: fabric5,
    title: "Premium Fabrics",
    category: "Premium Collection",
    price: "₹1,399 / metre",
    description: "Versatile premium fabric selected for its comfort, durability, and immaculate tailoring finish.",
  },
  {
    image: fabric6,
    title: "Tailored Trousers",
    category: "Trouser Fabric",
    price: "₹1,149 / metre",
    description: "A durable, comfortable trouser fabric that gives tailored pieces a crisp silhouette and easy wearability.",
  },
];

const FabricCategories = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const closeDrawer = () => setSelectedProduct(null);

  return (
    <>
      <section className="py-24">
      <div className="mx-auto max-w-[1250px] px-6">
        {/* Heading */}
        <h2 className="mb-10 text-center text-5xl font-semibold">
          Fabric Categories
        </h2>

        {/* Top Row */}
        <div className="grid gap-4 lg:grid-cols-2">
          {FABRIC_CATEGORIES.slice(0, 2).map((fabric) => (
            <FabricCard
              key={fabric.title}
              {...fabric}
              onShopNow={() => setSelectedProduct(fabric)}
            />
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {FABRIC_CATEGORIES.slice(2).map((fabric) => (
            <FabricCard
              key={fabric.title}
              {...fabric}
              onShopNow={() => setSelectedProduct(fabric)}
            />
          ))}
        </div>

        </div>
      </section>

      <ProductDrawer
        open={Boolean(selectedProduct)}
        product={selectedProduct}
        onClose={closeDrawer}
      />
    </>
  );
};

export default FabricCategories;
