import { useEffect, useState } from "react";
import DrawerHeader from "./DrawerHeader";
import ProductInfo from "./ProductInfo";
import ProductForm from "./ProductForm";
import BuyButton from "./BuyButton";

const INITIAL_FORM = {
  name: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  notes: "",
};

const ProductDrawer = ({ open, onClose, product }) => {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM);
  };

  const handleBuyNow = async (e) => {
    e.preventDefault();

    const requiredFields = ["name", "phone", "address"];

    const isValid = requiredFields.every((field) =>
      formData[field].trim()
    );

    if (!isValid) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      console.log({
        product,
        customer: formData,
      });

      // API Call goes here

      alert("Order Submitted Successfully!");

      resetForm();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close product details"
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-50 h-screen w-full max-w-lg overflow-y-auto bg-white shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!open}
      >
        <DrawerHeader
          title="Order Details"
          onClose={onClose}
        />

        <div className="p-6">
          <ProductInfo product={product} />

          <form
            onSubmit={handleBuyNow}
            className="mt-8"
          >
            <ProductForm
              formData={formData}
              handleChange={handleChange}
            />

            <BuyButton
              loading={loading}
              text="Buy Now"
            />
          </form>
        </div>
      </aside>
    </>
  );
};

export default ProductDrawer;
