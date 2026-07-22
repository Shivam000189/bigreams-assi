import { ArrowRight } from "lucide-react";

const BuyButton = ({
  onClick,
  loading = false,
  text = "Buy Now",
}) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      disabled={loading}
      className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-6 py-4 text-lg font-semibold text-white transition-all duration-300 hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? (
        <>
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Processing...
        </>
      ) : (
        <>
          {text}
          <ArrowRight size={20} />
        </>
      )}
    </button>
  );
};

export default BuyButton;
