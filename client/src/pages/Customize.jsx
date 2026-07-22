// import { useParams } from "react-router-dom";

// const Customize = () => {
//   const { type } = useParams();

//   return (
//     <div className="min-h-screen p-20">
//       <h1 className="text-5xl font-bold capitalize">
//         Customize {type}
//       </h1>

//       <p className="mt-6">
//         This is your customization page.
//       </p>
//     </div>
//   );
// };

// export default Customize;


import { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import suitImage from "../assets/cort.avif";
import shirtImage from "../assets/shirt.avif";
import jeansImage from "../assets/jeans.avif";

const PRODUCT_CONFIG = {
  suit: {
    key: "suit",
    label: "Suit",
    title: "Custom Suits",
    breadcrumb: "Suits",
    pageTitle: "Customized Men's Suit Tailored Just for You",
    heroDescription: "Custom suits made to your measurements with premium tailoring and a sharp, confident finish.",
    images: [suitImage],
    suitTypes: [
      { label: "Nehru Jacket", price: 1699 },
      { label: "Blazer", price: 4799 },
      { label: "Coat Pants", price: 5799 },
      { label: "3 Piece Suit", price: 6599 },
    ],
    defaultSuitIndex: 1,
  },
  shirt: {
    key: "shirt",
    label: "Shirt",
    title: "Custom Shirts",
    breadcrumb: "Shirts",
    pageTitle: "Custom Shirt Tailored Just for You",
    heroDescription: "Premium shirts made to fit your frame with comfort-first tailoring and refined detailing.",
    images: [shirtImage],
    suitTypes: [
      { label: "Classic Shirt", price: 1899 },
      { label: "Slim Fit Shirt", price: 2199 },
      { label: "Formal Shirt", price: 2499 },
      { label: "Premium Cotton Shirt", price: 2799 },
    ],
    defaultSuitIndex: 0,
  },
  pants: {
    key: "pants",
    label: "Pants",
    title: "Custom Pants",
    breadcrumb: "Pants",
    pageTitle: "Customized Pants Tailored Just for You",
    heroDescription: "Tailored pants designed for comfort, structure, and a clean silhouette for every plan.",
    images: [jeansImage],
    suitTypes: [
      { label: "Formal Trousers", price: 2299 },
      { label: "Slim Fit Pants", price: 2599 },
      { label: "Relaxed Trousers", price: 2799 },
      { label: "Luxury Tailored Pants", price: 3199 },
    ],
    defaultSuitIndex: 1,
  },
  jeans: {
    key: "jeans",
    label: "Jeans",
    title: "Custom Jeans",
    breadcrumb: "Jeans",
    pageTitle: "Custom Jeans Tailored Just for You",
    heroDescription: "Jeans crafted with a personalized fit, premium fabric, and the right finish for your style.",
    images: [jeansImage],
    suitTypes: [
      { label: "Slim Fit Jeans", price: 1999 },
      { label: "Straight Cut Jeans", price: 2299 },
      { label: "Relaxed Jeans", price: 2499 },
      { label: "Premium Denim Jeans", price: 2899 },
    ],
    defaultSuitIndex: 0,
  },
};

const FABRICS = [
  { value: "wool", label: "Wool", price: 5999, display: "₹5,999" },
  { value: "linen", label: "Linen", price: 5999, display: "₹5,999" },
  { value: "corduroy", label: "Corduroy", price: 5599, display: "5,599" },
  { value: "denim", label: "Denim", price: 5599, display: "5,599" },
  { value: "cotton-viscose", label: "Cotton Viscose Stretchable", price: 5599, display: "₹5,599" },
  { value: "checked", label: "Checked", price: 5199, display: "₹5,199" },
  { value: "pin-stripe", label: "Pin Stripe Fabric", price: 5199, display: "₹5,199" },
  { value: "cotton-poly", label: "Cotton Poly Lycra", price: 4999, display: "₹4,999" },
  { value: "canvas", label: "Canvas", price: 5599, display: "₹5,599" },
];

const REVIEWS = [
  {
    initial: "R",
    name: "Rahul M.",
    date: "July 15, 2026",
    text: "Absolutely love the fit! The tailor was very professional and the blazer fits like a dream. The wool fabric quality is exceptional. Will definitely order again for my wedding.",
  },
  {
    initial: "A",
    name: "Arjun K.",
    date: "July 10, 2026",
    text: "The customization process was smooth and the final product exceeded my expectations. The pin stripe fabric looks premium and the stitching is flawless. Highly recommend Bigreams!",
  },
  {
    initial: "V",
    name: "Vikram S.",
    date: "June 28, 2026",
    text: "Best tailored suit I've ever owned. The attention to detail is remarkable - from the lining to the buttons, everything feels premium. Delivery was on time too.",
  },
];

const RATING_BARS = [
  { stars: "★★★★★", pct: 100, count: 5 },
  { stars: "★★★★☆", pct: 0, count: 0 },
  { stars: "★★★☆☆", pct: 0, count: 0 },
  { stars: "★★☆☆☆", pct: 0, count: 0 },
  { stars: "★☆☆☆☆", pct: 0, count: 0 },
];

function formatINR(n) {
  return "₹" + n.toLocaleString("en-IN");
}

export default function Customize() {
  const { type = "suit" } = useParams();
  const normalizedType = (type || "suit").toLowerCase();
  const productConfig = PRODUCT_CONFIG[normalizedType] || PRODUCT_CONFIG.suit;

  const [currentImg, setCurrentImg] = useState(0);
  const [suitIndex, setSuitIndex] = useState(productConfig.defaultSuitIndex);
  const [prefIndex, setPrefIndex] = useState(0); // "Customized For You" selected
  const [fabric, setFabric] = useState(null);
  const [accepted, setAccepted] = useState(false);
  const [qty, setQty] = useState(1);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [reviewFilter, setReviewFilter] = useState("all");
  const toastTimer = useRef(null);
  const reviewsRef = useRef(null);

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToast((t) => ({ ...t, show: false }));
    }, 2500);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  useEffect(() => {
    setCurrentImg(0);
    setSuitIndex(productConfig.defaultSuitIndex);
    setFabric(null);
    setAccepted(false);
    setQty(1);
  }, [productConfig.key]);

  const nextImage = useCallback(() => {
    setCurrentImg((i) => (i + 1) % productConfig.images.length);
  }, [productConfig.images.length]);

  const prevImage = useCallback(() => {
    setCurrentImg((i) => (i - 1 + productConfig.images.length) % productConfig.images.length);
  }, [productConfig.images.length]);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [nextImage, prevImage]);

  const basePrice = productConfig.suitTypes[suitIndex]?.price ?? 0;
  const fabricPrice = fabric ? fabric.price : 0;
  const optionsAmountRaw = fabricPrice > 0 ? fabricPrice - basePrice : 0;
  const optionsAmount = optionsAmountRaw > 0 ? optionsAmountRaw : 0;
  const finalPrice = basePrice + optionsAmount;
  const total = finalPrice * qty;

  const changeQty = (delta) => {
    setQty((q) => Math.max(1, Math.min(10, q + delta)));
  };

  const addToBag = () => {
    if (!accepted) {
      showToast("Please accept the measurements agreement");
      return;
    }
    if (!fabric) {
      showToast("Please select a fabric type");
      return;
    }
    showToast("✓ Added to bag successfully!");
  };

  return (
    <div className="bigreams-page">
      <style>{`
        .bigreams-page, .bigreams-page * { box-sizing: border-box; }
        .bigreams-page {
          margin: 0;
          padding: 0;
          --black: #0a0a0a;
          --dark: #1a1a1a;
          --gray-900: #222;
          --gray-700: #444;
          --gray-500: #777;
          --gray-300: #bbb;
          --gray-200: #ddd;
          --gray-100: #f0f0f0;
          --gray-50: #f7f7f7;
          --white: #fff;
          --accent: #f5a623;
          --green: #00d4a0;
          --red: #e74c3c;
          --star: #f5a623;
          --radius: 12px;
          --radius-sm: 8px;
          --shadow: 0 4px 24px rgba(0,0,0,0.08);
          --shadow-lg: 0 8px 40px rgba(0,0,0,0.12);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: var(--white);
          color: var(--gray-900);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
          scroll-behavior: smooth;
        }

        .announcement { background: var(--black); color: var(--white); text-align: center; padding: 10px 16px; font-size: 13px; font-weight: 500; letter-spacing: 0.3px; }
        .announcement .live-dot { display: inline-block; width: 8px; height: 8px; background: #4ade80; border-radius: 50%; margin-right: 6px; animation: bg-pulse 2s infinite; }
        @keyframes bg-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

        .header { position: sticky; top: 0; z-index: 100; background: rgba(255,255,255,0.95); backdrop-filter: blur(12px); border-bottom: 1px solid var(--gray-100); }
        .header-inner { max-width: 1320px; margin: 0 auto; padding: 14px 24px; display: flex; align-items: center; justify-content: space-between; }
        .logo { font-size: 22px; font-weight: 800; letter-spacing: 3px; color: var(--black); text-decoration: none; }
        .logo span { color: var(--accent); }
        .nav-links { display: flex; gap: 28px; align-items: center; }
        .nav-links a { text-decoration: none; color: var(--gray-700); font-size: 14px; font-weight: 500; transition: color 0.2s; }
        .nav-links a:hover { color: var(--black); }
        .header-actions { display: flex; gap: 16px; align-items: center; }
        .header-actions button { background: none; border: none; cursor: pointer; font-size: 18px; color: var(--gray-700); padding: 8px; }
        .cart-badge { position: relative; }
        .cart-badge-count { position: absolute; top: -2px; right: -4px; background: var(--black); color: #fff; font-size: 10px; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; }

        .breadcrumbs { max-width: 1320px; margin: 0 auto; padding: 16px 24px; font-size: 13px; color: var(--gray-500); }
        .breadcrumbs a { color: var(--gray-500); text-decoration: none; }
        .breadcrumbs a:hover { color: var(--black); }
        .breadcrumbs span { margin: 0 8px; }

        .container { max-width: 1320px; margin: 0 auto; padding: 0 24px 60px; }
        .product-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }

        .gallery { position: sticky; top: 80px; }
        .main-image-wrap { position: relative; border-radius: 16px; overflow: hidden; background: var(--gray-50); aspect-ratio: 4/5; cursor: zoom-in; }
        .main-image-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .main-image-wrap:hover img { transform: scale(1.03); }
        .discount-badge { position: absolute; top: 20px; right: 20px; background: var(--black); color: var(--white); padding: 8px 16px; border-radius: 24px; font-size: 13px; font-weight: 700; letter-spacing: 0.5px; }
        .brand-watermark { position: absolute; top: 20px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.85); font-size: 16px; font-weight: 700; letter-spacing: 4px; text-shadow: 0 1px 4px rgba(0,0,0,0.3); }
        .zoom-btn { position: absolute; bottom: 20px; right: 20px; background: var(--white); border: none; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; font-size: 16px; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow); transition: transform 0.2s; }
        .zoom-btn:hover { transform: scale(1.1); }
        .nav-arrows { position: absolute; top: 50%; transform: translateY(-50%); width: 100%; display: flex; justify-content: space-between; padding: 0 12px; pointer-events: none; }
        .nav-arrow { pointer-events: all; background: rgba(255,255,255,0.9); border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; box-shadow: var(--shadow); }
        .main-image-wrap:hover .nav-arrow { opacity: 1; }

        .thumbnails { display: flex; gap: 12px; margin-top: 16px; }
        .thumb { width: 80px; height: 80px; border-radius: 10px; overflow: hidden; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; }
        .thumb:hover { border-color: var(--gray-300); }
        .thumb.active { border-color: var(--black); }

        .details { padding-top: 8px; }
        .product-title { font-size: 32px; font-weight: 800; line-height: 1.2; margin-bottom: 12px; letter-spacing: -0.5px; }
        .price-row { display: flex; align-items: baseline; gap: 12px; margin-bottom: 24px; }
        .original-price { font-size: 18px; color: var(--gray-500); text-decoration: line-through; }
        .current-price { font-size: 32px; font-weight: 800; color: var(--black); }
        .save-badge { background: #fef3c7; color: #92400e; padding: 4px 10px; border-radius: 6px; font-size: 12px; font-weight: 600; }

        .features { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; background: var(--gray-50); border-radius: 16px; padding: 20px; margin-bottom: 24px; border: 1px solid var(--gray-100); }
        .feature-item { text-align: center; padding: 12px 8px; border-right: 1px solid var(--gray-200); }
        .feature-item:last-child { border-right: none; }
        .feature-icon { width: 44px; height: 44px; margin: 0 auto 8px; color: var(--black); }
        .feature-icon svg { width: 100%; height: 100%; }
        .feature-label { font-size: 12px; font-weight: 600; color: var(--gray-900); line-height: 1.3; }

        .existing-btn { width: 100%; padding: 16px; background: var(--black); color: var(--white); border: none; border-radius: 10px; font-size: 13px; font-weight: 700; letter-spacing: 1.5px; cursor: pointer; margin-bottom: 28px; transition: all 0.2s; font-family: inherit; }
        .existing-btn:hover { background: var(--gray-900); transform: translateY(-1px); }

        .form-section { margin-bottom: 28px; }
        .form-section h3 { font-size: 17px; font-weight: 700; margin-bottom: 14px; display: flex; align-items: center; gap: 6px; }
        .required { color: var(--red); }

        .option-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .option-btn { padding: 14px 16px; border: 2px solid var(--gray-200); border-radius: 10px; background: var(--white); cursor: pointer; font-size: 14px; font-weight: 500; text-align: center; transition: all 0.2s; font-family: inherit; color: var(--gray-900); }
        .option-btn:hover { border-color: var(--gray-500); background: var(--gray-50); }
        .option-btn.selected { border-color: var(--black); background: var(--gray-50); font-weight: 700; box-shadow: 0 0 0 1px var(--black); }

        .preference-btns { display: flex; gap: 10px; flex-wrap: wrap; }
        .pref-btn { padding: 12px 24px; border: 2px solid var(--gray-200); border-radius: 10px; background: var(--white); cursor: pointer; font-size: 14px; font-weight: 500; transition: all 0.2s; font-family: inherit; }
        .pref-btn:hover { border-color: var(--gray-500); }
        .pref-btn.selected { border-color: var(--black); background: var(--gray-50); font-weight: 600; }

        .fabric-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
        .fabric-option { display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; cursor: pointer; font-size: 14px; border-radius: 8px; transition: background 0.15s; }
        .fabric-option:hover { background: var(--gray-50); }
        .fabric-option input[type="radio"] { margin-right: 10px; accent-color: var(--black); width: 16px; height: 16px; }
        .fabric-label { display: flex; align-items: center; flex: 1; }
        .fabric-price { font-weight: 600; font-size: 13px; color: var(--gray-700); }

        .acceptance { margin-bottom: 24px; padding: 16px; background: var(--gray-50); border-radius: 10px; border: 1px solid var(--gray-100); }
        .acceptance h3 { font-size: 15px; margin-bottom: 10px; }
        .acceptance label { display: flex; align-items: flex-start; gap: 10px; font-size: 14px; cursor: pointer; color: var(--gray-700); }
        .acceptance input[type="checkbox"] { margin-top: 2px; accent-color: var(--black); width: 16px; height: 16px; }

        .totals { margin-bottom: 24px; padding: 20px; background: var(--gray-50); border-radius: 12px; border: 1px solid var(--gray-100); }
        .total-row { display: flex; justify-content: space-between; padding: 6px 0; font-size: 15px; color: var(--gray-700); }
        .total-row.final { font-size: 24px; font-weight: 800; color: var(--black); border-top: 1px solid var(--gray-200); padding-top: 14px; margin-top: 8px; }

        .qty-row { display: flex; align-items: center; gap: 20px; margin-bottom: 20px; }
        .qty-selector { display: flex; align-items: center; border: 1.5px solid var(--gray-200); border-radius: 10px; overflow: hidden; }
        .qty-btn { width: 44px; height: 44px; border: none; background: var(--white); cursor: pointer; font-size: 18px; font-weight: 600; transition: background 0.15s; font-family: inherit; }
        .qty-btn:hover { background: var(--gray-50); }
        .qty-value { width: 56px; text-align: center; border-left: 1.5px solid var(--gray-200); border-right: 1.5px solid var(--gray-200); height: 44px; line-height: 44px; font-size: 16px; font-weight: 600; }

        .add-to-bag { width: 100%; padding: 18px; background: var(--black); color: var(--white); border: none; border-radius: 12px; font-size: 15px; font-weight: 700; letter-spacing: 1.5px; cursor: pointer; margin-bottom: 12px; transition: all 0.2s; font-family: inherit; position: relative; overflow: hidden; }
        .add-to-bag:hover { background: var(--gray-900); transform: translateY(-1px); box-shadow: var(--shadow-lg); }
        .add-to-bag:active { transform: translateY(0); }

        .order-now { width: 100%; padding: 16px; background: var(--white); color: var(--black); border: 2px solid var(--black); border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; margin-bottom: 12px; transition: all 0.2s; font-family: inherit; }
        .order-now:hover { background: var(--gray-50); }

        .return-note { text-align: center; font-size: 12px; color: var(--gray-500); margin-bottom: 28px; }

        .assistance-banner { background: linear-gradient(135deg, #00e6a0 0%, #00d4ff 100%); border-radius: 20px; padding: 36px; margin-bottom: 20px; position: relative; overflow: hidden; }
        .assistance-banner::after { content: ''; position: absolute; right: -40px; top: -40px; width: 220px; height: 220px; border-radius: 50%; border: 50px solid rgba(255,255,255,0.12); }
        .assistance-banner::before { content: ''; position: absolute; right: 50px; bottom: -70px; width: 180px; height: 180px; border-radius: 50%; border: 35px solid rgba(255,255,255,0.08); }
        .assistance-banner h2 { font-size: 30px; font-weight: 800; margin-bottom: 20px; position: relative; z-index: 1; line-height: 1.2; }
        .book-call-btn { padding: 16px 36px; background: var(--white); color: var(--black); border: none; border-radius: 10px; font-size: 17px; font-weight: 700; cursor: pointer; position: relative; z-index: 1; transition: transform 0.2s; font-family: inherit; }
        .book-call-btn:hover { transform: scale(1.05); }

        .coupon-banner { background: var(--green); color: var(--white); padding: 16px 24px; border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 24px; font-weight: 600; cursor: pointer; font-size: 14px; transition: transform 0.2s; }
        .coupon-banner:hover { transform: translateY(-1px); }
        .coupon-icon { font-size: 22px; }

        .guarantee-section { margin-bottom: 24px; padding: 20px; background: var(--gray-50); border-radius: 12px; border-left: 4px solid var(--green); }
        .guarantee-section h4 { font-size: 17px; font-weight: 700; margin-bottom: 8px; }
        .guarantee-section p { font-size: 14px; color: var(--gray-700); line-height: 1.6; }

        .meta-section { border-top: 1px solid var(--gray-100); padding-top: 20px; margin-bottom: 8px; font-size: 14px; }
        .meta-section p { margin-bottom: 8px; color: var(--gray-700); }
        .meta-section strong { font-weight: 600; color: var(--gray-900); }
        .share-icons { display: flex; gap: 14px; margin-top: 12px; align-items: center; }
        .share-icons span { font-weight: 600; color: var(--gray-900); }
        .share-btn { width: 36px; height: 36px; border-radius: 50%; background: var(--gray-100); border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; color: var(--gray-700); }
        .share-btn:hover { background: var(--black); color: var(--white); }
        .share-btn svg { width: 16px; height: 16px; }

        .description-section { margin-top: 60px; border-top: 1px solid var(--gray-100); padding-top: 40px; }
        .description-section h3 { font-size: 26px; font-weight: 800; margin-bottom: 24px; letter-spacing: -0.3px; }
        .description-section p { margin-bottom: 18px; font-size: 15px; color: var(--gray-700); line-height: 1.8; }
        .description-section p strong { color: var(--gray-900); }

        .reviews-section { margin-top: 60px; border-top: 1px solid var(--gray-100); padding-top: 40px; }
        .reviews-section h3 { font-size: 26px; font-weight: 800; margin-bottom: 32px; }

        .reviews-summary { text-align: center; margin-bottom: 36px; padding: 32px; background: var(--gray-50); border-radius: 16px; }
        .reviews-summary .big-number { font-size: 72px; font-weight: 800; line-height: 1; }
        .reviews-summary .stars { color: var(--star); font-size: 28px; margin: 8px 0; letter-spacing: 2px; }
        .reviews-summary .review-count { font-size: 14px; color: var(--gray-500); }

        .rating-bars { max-width: 520px; margin: 0 auto 40px; }
        .rating-bar-row { display: flex; align-items: center; gap: 12px; margin-bottom: 8px; font-size: 13px; }
        .rating-bar-row .bar-label { width: 64px; color: var(--star); letter-spacing: 1px; }
        .rating-bar-row .bar-track { flex: 1; height: 10px; background: var(--gray-100); border-radius: 5px; overflow: hidden; }
        .rating-bar-row .bar-fill { height: 100%; background: var(--black); border-radius: 5px; transition: width 0.6s ease; }
        .rating-bar-row .bar-count { width: 20px; text-align: right; font-weight: 600; color: var(--gray-700); }

        .reviews-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px; }
        .reviews-header h4 { font-size: 16px; font-weight: 600; }
        .filter-btns { display: flex; gap: 8px; }
        .filter-btn { padding: 8px 16px; border: 1.5px solid var(--gray-200); border-radius: 8px; background: var(--white); cursor: pointer; font-size: 13px; font-weight: 500; transition: all 0.2s; font-family: inherit; }
        .filter-btn:hover { border-color: var(--gray-500); }
        .filter-btn.active { background: var(--black); color: var(--white); border-color: var(--black); }
        .sort-select { padding: 8px 14px; border: 1.5px solid var(--gray-200); border-radius: 8px; font-size: 13px; font-family: inherit; cursor: pointer; }

        .review-images { display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap; }
        .review-images img { width: 140px; height: 105px; object-fit: cover; border-radius: 10px; cursor: pointer; transition: transform 0.2s; }
        .review-images img:hover { transform: scale(1.05); }

        .review-card { padding: 24px; background: var(--gray-50); border-radius: 12px; margin-bottom: 16px; border: 1px solid var(--gray-100); }
        .review-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px; }
        .reviewer { display: flex; align-items: center; gap: 12px; }
        .reviewer-avatar { width: 44px; height: 44px; border-radius: 50%; background: var(--black); color: var(--white); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 16px; }
        .reviewer-name { font-weight: 600; font-size: 15px; }
        .reviewer-date { font-size: 12px; color: var(--gray-500); }
        .review-stars { color: var(--star); font-size: 14px; letter-spacing: 1px; }
        .review-text { font-size: 14px; color: var(--gray-700); line-height: 1.7; }
        .review-verified { display: inline-flex; align-items: center; gap: 4px; font-size: 12px; color: var(--green); font-weight: 600; margin-top: 8px; }

        .sidebar-tab { position: fixed; right: 0; top: 50%; transform: translateY(-50%); background: var(--black); color: var(--white); padding: 18px 10px; writing-mode: vertical-rl; text-orientation: mixed; font-size: 12px; font-weight: 700; letter-spacing: 2px; cursor: pointer; border-radius: 8px 0 0 8px; z-index: 100; transition: background 0.2s; }
        .sidebar-tab:hover { background: var(--gray-900); }

        .help-btn { position: fixed; bottom: 28px; right: 28px; background: var(--accent); color: var(--white); border: none; width: 60px; height: 60px; border-radius: 50%; font-size: 13px; font-weight: 700; cursor: pointer; box-shadow: 0 4px 20px rgba(245,166,35,0.4); z-index: 100; display: flex; align-items: center; justify-content: center; transition: transform 0.2s; font-family: inherit; }
        .help-btn:hover { transform: scale(1.1); }

        .toast { position: fixed; bottom: 100px; right: 28px; background: var(--black); color: var(--white); padding: 16px 24px; border-radius: 10px; font-size: 14px; font-weight: 500; z-index: 200; transform: translateY(20px); opacity: 0; transition: all 0.3s; pointer-events: none; }
        .toast.show { transform: translateY(0); opacity: 1; }

        @media (max-width: 960px) {
          .product-layout { grid-template-columns: 1fr; gap: 32px; }
          .gallery { position: static; }
          .features { grid-template-columns: repeat(2, 1fr); }
          .feature-item:nth-child(2) { border-right: none; }
          .feature-item:nth-child(1), .feature-item:nth-child(2) { border-bottom: 1px solid var(--gray-200); }
          .nav-links { display: none; }
          .product-title { font-size: 26px; }
          .current-price { font-size: 28px; }
        }
        @media (max-width: 600px) {
          .bigreams-page { overflow-x: hidden; }
          .container { padding: 0 16px 40px; }
          .header-inner { padding: 12px 16px; }
          .option-grid, .fabric-grid { grid-template-columns: 1fr; }
          .preference-btns { flex-direction: column; }
          .pref-btn { width: 100%; }
          .qty-row { flex-direction: column; align-items: flex-start; }
          .assistance-banner { padding: 28px 24px; }
          .assistance-banner h2 { font-size: 24px; }
          .review-header { flex-direction: column; align-items: flex-start; }
          .filter-btns { width: 100%; }
          .filter-btn { flex: 1 1 auto; text-align: center; }
        }
      `}</style>


      <div className="bigreams-page">
        {/* Announcement Bar */}
        <div className="announcement">
          <span className="live-dot"></span>
          <strong>189 People</strong> watching this product now!
        </div>
        
        {/* Breadcrumbs */}
        <div className="breadcrumbs">
          <a href="#">Home</a> <span>›</span>
          <a href="#">Tailor Made</a> <span>›</span>
          <a href="#">{productConfig.title}</a> <span>›</span>
          {productConfig.pageTitle}
        </div>

        <div className="container">
          <div className="product-layout">

            {/* Image Gallery */}
            <div className="gallery">
              <div className="main-image-wrap">
                <img src={productConfig.images[currentImg]} alt={productConfig.pageTitle} />
                <div className="discount-badge">-47% OFF</div>
                <div className="brand-watermark">BIGREAMS</div>
                <button className="zoom-btn" title="Zoom">⤢</button>
                <div className="nav-arrows">
                  <button className="nav-arrow" onClick={prevImage}>‹</button>
                  <button className="nav-arrow" onClick={nextImage}>›</button>
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="details">
              <h1 className="product-title">{productConfig.pageTitle}</h1>
              <div className="price-row">
                <span className="original-price">₹8,999</span>
                <span className="current-price">{formatINR(basePrice)}</span>
                <span className="save-badge">Save ₹4,200</span>
              </div>

              {/* Features */}
              <div className="features">
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 30h8l4-8h16l4 8h8"/>
                      <rect x="6" y="30" width="8" height="10" rx="1"/>
                      <circle cx="10" cy="42" r="2"/>
                      <circle cx="38" cy="42" r="2"/>
                      <path d="M14 30h20"/>
                      <path d="M30 22v-6l6-4"/>
                      <path d="M22 18h-4"/>
                    </svg>
                  </div>
                  <div className="feature-label">Free Shipping</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="6" y="14" width="36" height="24" rx="2"/>
                      <rect x="10" y="18" width="28" height="16" rx="1"/>
                      <circle cx="24" cy="26" r="4"/>
                      <path d="M22 26l2 2 3-3"/>
                      <path d="M18 10v4"/>
                      <path d="M30 10v4"/>
                      <path d="M24 6v4"/>
                    </svg>
                  </div>
                  <div className="feature-label">Partial Payment</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 36c-4 0-6-3-6-6s2-6 6-6c2 0 3 1 4 2"/>
                      <path d="M36 36c4 0 6-3 6-6s-2-6-6-6c-2 0-3 1-4 2"/>
                      <path d="M16 26c2-6 6-10 12-10s10 4 12 10"/>
                      <path d="M20 18c2-2 4-3 6-3"/>
                      <path d="M28 18c-1-1-2-2-4-2"/>
                      <path d="M12 36v4c0 2 2 4 4 4h16c2 0 4-2 4-4v-4"/>
                      <path d="M24 30v6"/>
                    </svg>
                  </div>
                  <div className="feature-label">Cruelty Free</div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">
                    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 14l14-8 14 8v20l-14 8-14-8z"/>
                      <path d="M10 14l14 8 14-8"/>
                      <path d="M24 22v20"/>
                      <circle cx="36" cy="34" r="6" fill="currentColor" stroke="none"/>
                      <path d="M33 34l2 2 4-4" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <div className="feature-label">14 Days Free Alter</div>
                </div>
              </div>

              <button className="existing-btn">ARE YOU AN EXISTING CUSTOMER</button>

              {/* Suit Type */}
              <div className="form-section">
                <h3>{productConfig.label} Type <span className="required">*</span></h3>
                <div className="option-grid">
                  {productConfig.suitTypes.map((s, i) => (
                    <button
                      key={s.label}
                      className={`option-btn${suitIndex === i ? " selected" : ""}`}
                      onClick={() => setSuitIndex(i)}
                    >
                      {s.label} {formatINR(s.price)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Preference */}
              <div className="form-section">
                <h3>Select Your Preference <span className="required">*</span></h3>
                <div className="preference-btns">
                  <button
                    className={`pref-btn${prefIndex === 0 ? " selected" : ""}`}
                    onClick={() => setPrefIndex(0)}
                  >
                    Customized For You
                  </button>
                  <button
                    className={`pref-btn${prefIndex === 1 ? " selected" : ""}`}
                    onClick={() => setPrefIndex(1)}
                  >
                    Standard Size
                  </button>
                </div>
              </div>

              {/* Fabric Selection */}
              <div className="form-section">
                <h3>Fabric Selection</h3>
                <p style={{ fontSize: "14px", marginBottom: "12px", fontWeight: 600, color: "var(--gray-700)" }}>
                  Choose Fabric Type <span className="required">*</span>
                </p>
                <div className="fabric-grid">
                  {FABRICS.map((f) => (
                    <label className="fabric-option" key={f.value}>
                      <span className="fabric-label">
                        <input
                          type="radio"
                          name="fabric"
                          value={f.value}
                          checked={fabric?.value === f.value}
                          onChange={() => setFabric(f)}
                        />
                        {f.label}
                      </span>
                      <span className="fabric-price">{f.display}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Acceptance */}
              <div className="acceptance">
                <h3>Make your acceptance <span className="required">*</span></h3>
                <label>
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                  />
                  I agree that all the measurements are up to my Best Fit.
                </label>
              </div>

              {/* Totals */}
              <div className="totals">
                <div className="total-row"><span>Options Amount</span><span>{formatINR(optionsAmount)}</span></div>
                <div className="total-row final"><span>Final Total</span><span>{formatINR(total)}</span></div>
              </div>

              {/* Quantity */}
              <div className="qty-row">
                <div className="qty-selector">
                  <button className="qty-btn" onClick={() => changeQty(-1)}>−</button>
                  <div className="qty-value">{qty}</div>
                  <button className="qty-btn" onClick={() => changeQty(1)}>+</button>
                </div>
              </div>

              {/* CTA */}
              <button className="add-to-bag" onClick={addToBag}>ADD TO BAG</button>
              <button className="order-now">Order Now to get it Delivered in 8-10 Days*</button>
              <p className="return-note">Tailor-Made garments are not eligible for returns due to their personalized nature.</p>

              {/* Assistance Banner */}
              <div className="assistance-banner">
                <h2>Need Assistance<br />Before Deciding?</h2>
                <button className="book-call-btn">Book a Call</button>
              </div>

              {/* Coupon */}
              <div className="coupon-banner">
                <span className="coupon-icon">🏷️</span>
                <span>Buy 3 Pants, Get 1 Shirt Free! &nbsp;|&nbsp; View More Coupons and Offers</span>
              </div>

              {/* Guarantee */}
              <div className="guarantee-section">
                <h4>Your fit is Guaranteed</h4>
                <p>94% of customers Love their fit for the first time,<br />"for everyone else, we offer hassle-free alterations"</p>
              </div>

              {/* Meta */}
              <div className="meta-section">
                <p><strong>Categories:</strong> Bespoke Mens Suit, Suit, Tailor Made</p>
                <p><strong>Tags:</strong> {productConfig.label.toLowerCase()}, bespoke {productConfig.label.toLowerCase()}, {productConfig.pageTitle}, premium fabric</p>
                <div className="share-icons">
                  <span>Share:</span>
                  <button className="share-btn" title="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></button>
                  <button className="share-btn" title="X"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></button>
                  <button className="share-btn" title="Email"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg></button>
                  <button className="share-btn" title="Pinterest"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg></button>
                  <button className="share-btn" title="LinkedIn"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg></button>
                  <button className="share-btn" title="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg></button>
                </div>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="description-section">
            <h3>Description</h3>
            <p><strong>Introducing "{productConfig.pageTitle}" – Where Your Style Unfolds Just for You!</strong></p>
            <p>{productConfig.heroDescription}</p>
            <p>At Bigreams, we're all about turning your personal style into a well-fitted reality. Whether you prefer a tailored silhouette or a relaxed everyday look, we've built this experience to help you customize with confidence.</p>
            <p>Choose premium materials, adjust the fit, and create apparel that feels as good as it looks. Every piece is designed to feel intentional, polished, and made around your lifestyle.</p>
            <p>Our mission is to blend craftsmanship with comfort so your new piece transitions smoothly from a special occasion to regular wear without sacrificing quality.</p>
            <p>We're not just another clothing line; we're your collaborators in creating something that reflects your personality. Each piece is more than a garment – it's a canvas for your identity.</p>
            <p>Step into Bigreams and make your next wardrobe choice feel truly personal and effortlessly refined.</p>
          </div>

          {/* Reviews */}
          <div className="reviews-section" ref={reviewsRef}>
            <h3>Customer Reviews</h3>

            <div className="reviews-summary">
              <div className="big-number">5</div>
              <div className="stars">★★★★★</div>
              <div className="review-count">Based on 5 reviews</div>
            </div>

            <div className="rating-bars">
              {RATING_BARS.map((r) => (
                <div className="rating-bar-row" key={r.stars}>
                  <span className="bar-label">{r.stars}</span>
                  <div className="bar-track"><div className="bar-fill" style={{ width: `${r.pct}%` }}></div></div>
                  <span className="bar-count">{r.count}</span>
                </div>
              ))}
            </div>

            <div className="reviews-header">
              <h4>5 reviews for {productConfig.pageTitle}</h4>
              <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                <div className="filter-btns">
                  <button
                    className={`filter-btn${reviewFilter === "images" ? " active" : ""}`}
                    onClick={() => setReviewFilter("images")}
                  >
                    📷 With images (4)
                  </button>
                  <button
                    className={`filter-btn${reviewFilter === "all" ? " active" : ""}`}
                    onClick={() => setReviewFilter("all")}
                  >
                    All stars (5)
                  </button>
                </div>
                <select className="sort-select" defaultValue="Default">
                  <option>Default</option>
                  <option>Newest first</option>
                  <option>Highest rated</option>
                  <option>Lowest rated</option>
                </select>
              </div>
            </div>

            {/* Review Cards */}
            {REVIEWS.map((r) => (
              <div className="review-card" key={r.name}>
                <div className="review-header">
                  <div className="reviewer">
                    <div className="reviewer-avatar">{r.initial}</div>
                    <div>
                      <div className="reviewer-name">{r.name}</div>
                      <div className="reviewer-date">{r.date}</div>
                    </div>
                  </div>
                  <div className="review-stars">★★★★★</div>
                </div>
                <div className="review-text">{r.text}</div>
                <div className="review-verified">✓ Verified Purchase</div>
              </div>
            ))}

            <div className="review-images">
              {[productConfig.images[currentImg]].map((src, i) => (
                <img key={`${productConfig.key}-${i}`} src={src} alt={`Selected ${productConfig.label} photo ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Tab */}
        <div
          className="sidebar-tab"
          onClick={() => reviewsRef.current?.scrollIntoView({ behavior: "smooth" })}
        >
          CUSTOMER REVIEW
        </div>

        {/* Help Button */}
        <button className="help-btn" onClick={() => showToast("Help chat coming soon!")}>HELP</button>

        {/* Toast */}
        <div className={`toast${toast.show ? " show" : ""}`}>{toast.message}</div>
      </div>
    </div>
  );
}