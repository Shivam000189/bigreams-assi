import { Star } from "lucide-react";

const ProductCard = ({
  image,
  title,
  price,
  oldPrice,
  discount,
  hot = false,
}) => {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl">

        <img
          src={image}
          alt={title}
          className="aspect-square w-full object-cover transition duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 transition group-hover:opacity-100" />

        {/* Discount */}
        <div className="absolute left-4 top-4 rounded-full bg-black px-3 py-1 text-sm font-semibold text-white">
          {discount}
        </div>

        {/* Hot Badge */}
        {hot && (
          <div className="absolute left-4 top-16 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold uppercase text-white">
            Hot
          </div>
        )}

        {/* Hover Buttons */}
        <div className="absolute inset-x-0 bottom-5 flex justify-center gap-3 opacity-0 transition duration-500 group-hover:opacity-100">
          <button className="rounded-full bg-white p-3 shadow-lg">
            ❤️
          </button>

          <button className="rounded-full bg-white p-3 shadow-lg">
            🛒
          </button>

          <button className="rounded-full bg-white p-3 shadow-lg">
            👁
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-5 text-center">

        <h3 className="line-clamp-2 text-xl font-medium">
          {title}
        </h3>

        {/* Rating */}
        <div className="mt-3 flex justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={18}
              className="fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>

        {/* Price */}
        <div className="mt-3 flex justify-center items-center gap-2">
          <span className="text-gray-400 line-through">
            ₹{oldPrice}
          </span>

          <span className="text-2xl font-semibold">
            ₹{price}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;