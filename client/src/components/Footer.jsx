import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-24 bg-black text-white">
      <div className="mx-auto max-w-[1350px] px-6 py-20">

        {/* Top */}
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">

          {/* Logo */}
          <div>
            <h2 className="text-5xl font-semibold">
              Bigreams
            </h2>

            <div className="mt-10 space-y-3 text-xl text-gray-300">
              <p>help@bigreams.com</p>
              <p>+91-9429694916</p>
            </div>

            <div className="mt-5 flex gap-6">
                <FaFacebookF
                    size={24}
                    className="cursor-pointer transition hover:text-[#B77739]"
                />

                <FaInstagram
                    size={24}
                    className="cursor-pointer transition hover:text-[#B77739]"
                />

                <FaLinkedinIn
                    size={24}
                    className="cursor-pointer transition hover:text-[#B77739]"
                />

                <FaYoutube
                    size={24}
                    className="cursor-pointer transition hover:text-[#B77739]"
                />

                <FaPinterestP
                    size={24}
                    className="cursor-pointer transition hover:text-[#B77739]"
                />
                

              {/* Pinterest Icon */}
              <svg
                className="cursor-pointer transition hover:text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12.04 2C6.5 2 4 5.97 4 9.29c0 2.24.85 4.23 2.67 4.97.3.12.57 0 .66-.33.06-.23.2-.8.26-1.03.09-.33.06-.45-.19-.75-.54-.63-.89-1.45-.89-2.62 0-3.38 2.53-6.41 6.59-6.41 3.59 0 5.56 2.19 5.56 5.12 0 3.84-1.7 7.09-4.23 7.09-1.4 0-2.45-1.16-2.11-2.58.4-1.69 1.18-3.51 1.18-4.73 0-1.09-.58-2-1.79-2-1.42 0-2.56 1.47-2.56 3.44 0 1.26.43 2.11.43 2.11l-1.72 7.28c-.51 2.16-.08 4.8-.04 5.07.02.16.23.2.32.08.13-.17 1.76-2.18 2.31-4.19.16-.58.9-3.53.9-3.53.45.85 1.76 1.59 3.15 1.59 4.15 0 6.96-3.79 6.96-8.86C20 5.58 16.73 2 12.04 2z"/>
              </svg>
            </div>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="mb-8 text-3xl font-semibold">
              Useful Links
            </h3>

            <ul className="space-y-3 text-xl text-gray-300">
              <li>Our Blogs</li>
              <li>Referral Policy</li>
              <li>Contact Us</li>
              <li>My Account</li>
              <li>Track Order</li>
              <li>B2B Enquiry</li>
              <li>Work With Us!</li>
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="mb-8 text-3xl font-semibold">
              Important Links
            </h3>

            <ul className="space-y-3 text-xl text-gray-300">
              <li>FAQs</li>
              <li>Return</li>
              <li>Privacy Policy</li>
              <li>Terms and Conditions</li>
              <li>Delivery and Shipping Policy</li>
              <li>Cancellation and Refund Policy</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="border-l border-white/20 pl-10">
            <h2 className="text-4xl font-semibold leading-tight">
              BE THE FIRST TO KNOW
            </h2>

            <p className="mt-8 text-xl leading-9 text-gray-300">
              Sign up for Bigreams emails to be the first to
              see inspiring content, news and exclusive offers.
            </p>

            <input
              type="email"
              placeholder="Enter Email"
              className="mt-10 w-full rounded-md border border-white/20 bg-transparent px-5 py-4 text-lg outline-none placeholder:text-gray-500"
            />

            <button className="mt-6 w-full rounded-md bg-white py-4 text-lg font-bold text-black transition hover:bg-gray-200">
              JOIN NEWSLETTER
            </button>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-20 border-t border-white/20 pt-8 text-center text-xl text-gray-300">
          Bigreams © 2026.
        </div>

      </div>
    </footer>
  );
};

export default Footer;