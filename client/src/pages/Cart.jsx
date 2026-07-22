import { useState } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Star, Trash2 } from "lucide-react";
import { useCart } from "../context/useCart";
import { apiRequest } from "../services/api";

const EMPTY_CUSTOMER = { name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" };

const Cart = () => {
  const { cartItems, cartTotal, clearCart, removeFromCart, updateQuantity } = useCart();
  const [customer, setCustomer] = useState(EMPTY_CUSTOMER);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState(null);
  const [review, setReview] = useState({ rating: 5, comment: "" });
  const [reviewMessage, setReviewMessage] = useState("");

  const updateCustomer = (event) => setCustomer((current) => ({ ...current, [event.target.name]: event.target.value }));

  const placeOrder = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const data = await apiRequest("/orders", { method: "POST", body: JSON.stringify({ customer, items: cartItems, notes }) });
      setPlacedOrder(data.order);
      clearCart();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitReview = async (event) => {
    event.preventDefault();
    setReviewMessage("");
    try {
      const data = await apiRequest("/reviews", { method: "POST", body: JSON.stringify({ orderNumber: placedOrder.orderNumber, email: customer.email, ...review }) });
      setReviewMessage(data.message);
    } catch (requestError) {
      setReviewMessage(requestError.message);
    }
  };

  if (placedOrder) return (
    <main className="mx-auto max-w-2xl px-6 py-14">
      <section className="rounded-2xl border border-green-200 bg-green-50 p-7 text-center">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-green-600 text-2xl text-white">✓</div>
        <h1 className="mt-5 text-3xl font-semibold text-gray-950">Order confirmed</h1>
        <p className="mt-3 text-gray-600">Thank you, {customer.name}. Your order has been saved successfully.</p>
        <p className="mt-5 text-sm font-medium text-gray-600">Order reference</p>
        <p className="mt-1 font-mono text-xl font-bold text-gray-950">{placedOrder.orderNumber}</p>
        <p className="mt-4 text-lg font-semibold text-gray-950">Total paid: ₹{placedOrder.totalPrice.toLocaleString("en-IN")}</p>
      </section>

      <section className="mt-8 rounded-2xl border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-950">Review your order</h2>
        <p className="mt-1 text-sm text-gray-500">Your feedback is saved to our database and helps us improve.</p>
        <form onSubmit={submitReview} className="mt-5 space-y-4">
          <div className="flex gap-2">{[1, 2, 3, 4, 5].map((rating) => <button key={rating} type="button" onClick={() => setReview((current) => ({ ...current, rating }))} className="text-yellow-400" aria-label={`${rating} star rating`}><Star size={25} className={rating <= review.rating ? "fill-yellow-400" : "text-gray-300"} /></button>)}</div>
          <textarea required value={review.comment} onChange={(event) => setReview((current) => ({ ...current, comment: event.target.value }))} rows="4" placeholder="Tell us about your shopping experience" className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" />
          <button type="submit" className="rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800">Submit Review</button>
          {reviewMessage && <p className="text-sm text-gray-600">{reviewMessage}</p>}
        </form>
      </section>
      <Link to="/" className="mt-7 block text-center font-semibold text-gray-700 transition hover:text-black">Continue Shopping</Link>
    </main>
  );

  if (!cartItems.length) return (
    <main className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-6 text-center"><div className="grid h-16 w-16 place-items-center rounded-full bg-gray-100 text-gray-900"><ShoppingBag size={28} /></div><h1 className="mt-6 text-3xl font-semibold text-gray-950">Your cart is empty</h1><p className="mt-3 max-w-md text-gray-500">Add a fabric from our best seller collection to begin your order.</p><Link to="/" className="mt-7 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800">Continue Shopping</Link></main>
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8"><h1 className="text-4xl font-semibold text-gray-950">Shopping Cart</h1><p className="mt-2 text-gray-500">Review your fabrics and enter delivery details to place a guest order.</p><form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]"><div className="space-y-8"><section className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-5 sm:px-6">{cartItems.map((item) => <article key={item.id} className="flex gap-4 py-5 sm:gap-6"><img src={item.image} alt={item.title} className="h-24 w-20 rounded-lg object-cover sm:h-28 sm:w-24" /><div className="min-w-0 flex flex-1 flex-col"><div className="flex justify-between gap-3"><div><h2 className="text-base font-semibold text-gray-900 sm:text-lg">{item.title}</h2><p className="mt-1 text-sm text-gray-500">Premium fabric</p></div><button type="button" onClick={() => removeFromCart(item.id)} className="h-fit p-1 text-gray-400 transition hover:text-red-600" aria-label={`Remove ${item.title} from cart`}><Trash2 size={19} /></button></div><div className="mt-auto flex items-end justify-between gap-3 pt-4"><div className="flex items-center rounded-lg border border-gray-200"><button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2.5 transition hover:bg-gray-100" aria-label="Decrease quantity"><Minus size={15} /></button><span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2.5 transition hover:bg-gray-100" aria-label="Increase quantity"><Plus size={15} /></button></div><p className="text-lg font-semibold text-gray-950">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p></div></div></article>)}</section><section className="rounded-2xl border border-gray-200 bg-white p-6"><h2 className="text-xl font-semibold text-gray-950">Delivery details</h2><div className="mt-5 grid gap-4 sm:grid-cols-2">{[["name", "Full name", "text"], ["email", "Email address", "email"], ["phone", "Phone number", "tel"], ["pincode", "Pincode", "text"], ["city", "City", "text"], ["state", "State", "text"]].map(([name, label, type]) => <input key={name} required={["name", "email", "phone"].includes(name)} name={name} type={type} value={customer[name]} onChange={updateCustomer} placeholder={label} className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" />)}</div><textarea required name="address" value={customer.address} onChange={updateCustomer} rows="3" placeholder="Full delivery address" className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /><textarea value={notes} onChange={(event) => setNotes(event.target.value)} rows="2" placeholder="Order notes (optional)" className="mt-4 w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black" /></section></div><aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6"><h2 className="text-xl font-semibold text-gray-950">Order Summary</h2><div className="mt-6 space-y-3 border-b border-gray-200 pb-5 text-sm text-gray-600"><div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toLocaleString("en-IN")}</span></div><div className="flex justify-between"><span>Delivery</span><span className="font-medium text-green-700">Free</span></div></div><div className="mt-5 flex items-center justify-between text-lg font-semibold text-gray-950"><span>Total</span><span>₹{cartTotal.toLocaleString("en-IN")}</span></div>{error && <p className="mt-4 text-sm text-red-600">{error}</p>}<button type="submit" disabled={isSubmitting} className="mt-6 w-full rounded-lg bg-black px-5 py-3.5 font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60">{isSubmitting ? "Saving order..." : "Buy Now"}</button><Link to="/" className="mt-4 block text-center text-sm font-medium text-gray-600 transition hover:text-black">Continue Shopping</Link></aside></form></main>
  );
};

export default Cart;
