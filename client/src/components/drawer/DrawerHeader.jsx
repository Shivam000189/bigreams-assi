import { X } from "lucide-react";

const DrawerHeader = ({ title = "Product Details", onClose }) => {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-5">
      <div>
        <h2 className="text-2xl font-semibold text-gray-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Fill in your details to continue your order.
        </p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Close order details"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-100"
      >
        <X size={20} />
      </button>
    </div>
  );
};

export default DrawerHeader;
