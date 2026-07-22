import { useState } from "react";
import {
  Search,
  User,
  ShoppingCart,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2">
            <img
                src={Logo}
                alt="Bigreams Logo"
                className="h-12 w-auto object-contain"
            />

            {/* <span className="text-2xl font-semibold">Bigreams</span> */}
            </a>

        {/* Desktop Navigation */}
        <ul className="hidden  items-center gap-5 lg:flex">
          <li>
            <a href="/" className="text-sm font-bold uppercase hover:text-gray-600">
              Home
            </a>
          </li>

          <li>
            <a href="/" className="text-sm font-bold uppercase hover:text-gray-600">
              Shop
            </a>
          </li>

          {/* Dropdown */}
          <li
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <button className="flex items-center gap-1 text-sm font-bold uppercase hover:text-gray-600">
              Categories
              <ChevronDown size={16} />
            </button>

            {showDropdown && (
              <div className="absolute left-0 top-full mt-3 w-52 rounded-md bg-white p-2 shadow-lg">
                <a
                  href="/"
                  className="block rounded px-4 py-2 hover:bg-gray-100"
                >
                  Category 1
                </a>

                <a
                  href="/"
                  className="block rounded px-4 py-2 hover:bg-gray-100"
                >
                  Category 2
                </a>

                <a
                  href="/"
                  className="block rounded px-4 py-2 hover:bg-gray-100"
                >
                  Category 3
                </a>
              </div>
            )}
          </li>

          <li>
            <a href="/" className="text-sm font-bold uppercase hover:text-gray-600">
              Corporate Gifting
            </a>
          </li>

          <li>
            <a href="/" className="text-sm font-bold uppercase hover:text-gray-600">
              Tailor Made
            </a>
          </li>
        </ul>

        {/* Right Side */}
        <div className="hidden items-center gap-5 lg:flex">
          {/* Search */}
          <div className="relative ">
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <input
              type="text"
              placeholder="Search for products"
              className="w-60 rounded-full border border-gray-300 py-2 pl-4 pr-10 outline-none transition-all duration-300 focus:w-64 focus:border-black"
            />
          </div>

          {/* User */}
          <button className="hover:cursor-pointer">
            <User size={22} />
          </button>

          {/* Cart */}
          <button className="relative hover:cursor-pointer">
            <ShoppingCart size={22} />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
              0
            </span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="border-t bg-white lg:hidden">
          <div className="flex flex-col gap-5 p-6">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-full border px-4 py-3 outline-none"
            />

            <a href="/">Home</a>
            <a href="/">Shop</a>
            <a href="/">Categories</a>
            <a href="/">Corporate Gifting</a>
            <a href="/">Tailor Made</a>

            <div className="flex gap-6 pt-4">
              <button>
                <User />
              </button>

              <button className="relative">
                <ShoppingCart />

                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-black text-xs text-white">
                  0
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;