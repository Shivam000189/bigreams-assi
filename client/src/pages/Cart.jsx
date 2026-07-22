import { Link } from "react-router-dom";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "../context/useCart";

const Cart = () => {
  const { cartItems, cartTotal, clearCart, removeFromCart, updateQuantity } = useCart();

  if (!cartItems.length) return (
    <main className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-6 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-gray-100 text-gray-900"><ShoppingBag size={28} /></div>
      <h1 className="mt-6 text-3xl font-semibold text-gray-950">Your cart is empty</h1>
      <p className="mt-3 max-w-md text-gray-500">Add a fabric from our best seller collection to begin your order.</p>
      <Link to="/" className="mt-7 rounded-lg bg-black px-6 py-3 font-semibold text-white transition hover:bg-zinc-800">Continue Shopping</Link>
    </main>
  );

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
      <h1 className="text-4xl font-semibold text-gray-950">Shopping Cart</h1>
      <p className="mt-2 text-gray-500">Review your selected fabrics before placing your order.</p>
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <section className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-5 sm:px-6">
          {cartItems.map((item) => (
            <article key={item.id} className="flex gap-4 py-5 sm:gap-6">
              <img src={item.image} alt={item.title} className="h-24 w-20 rounded-lg object-cover sm:h-28 sm:w-24" />
              <div className="min-w-0 flex flex-1 flex-col">
                <div className="flex justify-between gap-3"><div><h2 className="text-base font-semibold text-gray-900 sm:text-lg">{item.title}</h2><p className="mt-1 text-sm text-gray-500">Premium fabric</p></div><button type="button" onClick={() => removeFromCart(item.id)} className="h-fit p-1 text-gray-400 transition hover:text-red-600" aria-label={`Remove ${item.title} from cart`}><Trash2 size={19} /></button></div>
                <div className="mt-auto flex items-end justify-between gap-3 pt-4"><div className="flex items-center rounded-lg border border-gray-200"><button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2.5 transition hover:bg-gray-100" aria-label="Decrease quantity"><Minus size={15} /></button><span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span><button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2.5 transition hover:bg-gray-100" aria-label="Increase quantity"><Plus size={15} /></button></div><p className="text-lg font-semibold text-gray-950">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p></div>
              </div>
            </article>
          ))}
        </section>
        <aside className="h-fit rounded-2xl border border-gray-200 bg-gray-50 p-6"><h2 className="text-xl font-semibold text-gray-950">Order Summary</h2><div className="mt-6 space-y-3 border-b border-gray-200 pb-5 text-sm text-gray-600"><div className="flex justify-between"><span>Subtotal</span><span>₹{cartTotal.toLocaleString("en-IN")}</span></div><div className="flex justify-between"><span>Delivery</span><span className="font-medium text-green-700">Free</span></div></div><div className="mt-5 flex items-center justify-between text-lg font-semibold text-gray-950"><span>Total</span><span>₹{cartTotal.toLocaleString("en-IN")}</span></div><button type="button" onClick={() => { alert("Thank you! Your order has been placed successfully."); clearCart(); }} className="mt-6 w-full rounded-lg bg-black px-5 py-3.5 font-semibold text-white transition hover:bg-zinc-800">Buy Now</button><Link to="/" className="mt-4 block text-center text-sm font-medium text-gray-600 transition hover:text-black">Continue Shopping</Link></aside>
      </div>
    </main>
  );
};

export default Cart;
