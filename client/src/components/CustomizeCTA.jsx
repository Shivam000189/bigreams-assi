import fabricPrint from "../assets/custome-image.jpg"; // Replace with your image

const CustomizeCTA = () => {
  return (
    <section className="">
      <div className="mx-auto max-w-[1150px] px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left Image */}
          <div className="flex justify-center">
            <img
              src={fabricPrint}
              alt="Custom Fabric Printing"
              className="w-full max-w-[650px] object-contain"
            />
          </div>

          {/* Right Content */}
          <div>
            <h2 className="max-w-xl text-5xl font-light leading-tight text-[#222] lg:text-7xl">
              Customize your Hearts out
            </h2>

            <p
              className="mt-8 text-2xl text-[#444]"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Need Custom Design on Fabrics? We print them.
            </p>

            <button className="mt-10 rounded-md bg-[#6d7480] px-10 py-4 text-lg font-semibold text-white transition duration-300 hover:bg-[#555b65]">
              Learn More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CustomizeCTA;