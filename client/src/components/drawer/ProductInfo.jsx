import { PackageCheck, ShieldCheck, Truck } from "lucide-react";

const ProductInfo = ({ product }) => {
  if (!product) return null;

  return (
    <div className="mt-6">
      {/* Product Image */}
      <div className="overflow-hidden rounded-2xl border border-gray-200">
        <img
          src={product.image}
          alt={product.title}
          className="h-64 w-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="mt-5">
        <span className="inline-block rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-600">
          {product.category || "Premium Collection"}
        </span>

        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          {product.title}
        </h2>

        <p className="mt-2 text-3xl font-bold text-black">
          {product.price}
        </p>

        <p className="mt-4 text-sm leading-7 text-gray-600">
          {product.description ||
            "Premium quality fabric crafted for comfort, durability, and elegance. Perfect for custom tailoring with excellent finish and long-lasting performance."}
        </p>
      </div>

      {/* Features */}
      <div className="mt-6 space-y-3 rounded-2xl border border-gray-200 bg-gray-50 p-5">
        <div className="flex items-center gap-3">
          <PackageCheck className="h-5 w-5 text-green-600" />
          <span className="text-sm text-gray-700">
            Premium Quality Fabric
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Truck className="h-5 w-5 text-blue-600" />
          <span className="text-sm text-gray-700">
            Free Delivery Across India
          </span>
        </div>

        <div className="flex items-center gap-3">
          <ShieldCheck className="h-5 w-5 text-purple-600" />
          <span className="text-sm text-gray-700">
            Secure Order & Trusted Tailoring
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;