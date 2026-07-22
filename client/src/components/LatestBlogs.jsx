import { ChevronDown } from "lucide-react";

import BlogCard from "./BlogCard";

import blog1 from "../assets/blog1.webp";
import blog2 from "../assets/blog2.avif";
import blog3 from "../assets/blog3.webp";

const blogs = [
  {
    image: blog1,
    title: "Prince Suit vs Bandhgala: Complete Comparison & Style Guide",
    description:
      "Indian menswear has developed elegantly by blending traditional techniques with contemporary tailoring.",
  },
  {
    image: blog2,
    title: "Tweed vs Wool: Key Differences, Pros, Cons & Buying Guide",
    description:
      "When you shop for high-end menswear, you'll frequently encounter these two fabrics.",
  },
  {
    image: blog3,
    title: "What Is Speaker Grill Cloth? Complete Guide",
    description:
      "What is Speaker Grill Cloth? When people think of speakers, they tend to think about...",
  },
];

const LatestBlogs = () => {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-[1250px] px-6">

        {/* Heading */}
        <h2 className="mb-10 text-center text-6xl font-light">
          Latest Fashion Tips & Tricks
        </h2>

        {/* Cards */}
        <div className="grid gap-10 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard key={index} {...blog} />
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 flex items-center gap-8">

          <div className="h-[2px] flex-1 bg-black"></div>

          <button className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
            <ChevronDown size={30} />
          </button>

          <div className="h-[2px] flex-1 bg-black"></div>

        </div>

      </div>
    </section>
  );
};

export default LatestBlogs;