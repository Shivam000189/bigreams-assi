import heroImage from "../assets/hero.avif";

const Hero = () => {
  return (
    <section className="px-5 py-6 lg:px-8">
      <div className="mx-auto max-w-[1250px]">
        <div className="relative flex h-[700px] items-end justify-between overflow-hidden rounded-2xl">

          {/* Background Image */}
          <img
            src={heroImage}
            alt="Tailoring"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" /> */}

          {/* Left Text */}
          <div className="relative z-10 p-12 md:p-16 lg:p-20">
            <h1 className="text-5xl font-light leading-[1.05] tracking-tight text-white md:text-6xl lg:text-7xl">
              Your{" "}
              <span className="italic font-normal">
                Trusted
              </span>
              <br />
              Tailoring
              <br />
              Made{" "}
              <span className="italic font-normal">
                Simple
              </span>
            </h1>
          </div>

          {/* Right Badge */}
          <div className="relative z-10 p-12 md:p-16 lg:p-20">
            <div className="relative flex h-40 w-40 items-center justify-center">

              {/* Outer Circle */}
              <div className="absolute h-full w-full rounded-full border border-white/70" />

              {/* Inner Circle */}
              <div className="absolute h-32 w-32 rounded-full border border-white/40" />

              {/* Rotating Text */}
              <svg
                viewBox="0 0 160 160"
                className="absolute h-full w-full animate-[spin_20s_linear_infinite]"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="
                    M80,80
                    m-62,0
                    a62,62 0 1,1 124,0
                    a62,62 0 1,1 -124,0
                  "
                  />
                </defs>

                <text
                  fill="white"
                  fontSize="10"
                  letterSpacing="2"
                >
                  <textPath href="#circlePath">
                    ORDERS SHIPPED • ORDERS SHIPPED • ORDERS SHIPPED •
                  </textPath>
                </text>
              </svg>

              {/* Center */}
              <div className="z-20 text-center">
                <h2 className="text-4xl font-semibold text-white">
                  100K+
                </h2>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;