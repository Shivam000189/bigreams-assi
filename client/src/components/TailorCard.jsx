const TailorCard = ({ image, title, description }) => {
  return (
    <div className="group relative h-[550px] overflow-hidden rounded-2xl cursor-pointer">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 p-6 text-white">
        <h3 className="text-3xl font-semibold">
          {title}
        </h3>

        <p className="mt-4 max-w-xs text-lg leading-8 text-gray-200">
          {description}
        </p>

        <button className="mt-6 bg-[#b77739] px-8 py-4 text-sm font-semibold uppercase tracking-wide transition hover:bg-[#9d632f]">
          Start Customizing
        </button>
      </div>
    </div>
  );
};

export default TailorCard;