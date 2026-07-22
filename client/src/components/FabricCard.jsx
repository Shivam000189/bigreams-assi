const FabricCard = ({ image, title, description, onShopNow }) => {
  return (
    <div className="group relative h-[400px] cursor-pointer overflow-hidden rounded-2xl">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-all duration-500 group-hover:from-black/90" /> */}

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white">
        <h3 className="text-3xl font-semibold">{title}</h3>

        {/* Description */}
        <p className="mt-4 max-w-xs text-lg leading-8 text-gray-200 transition-all duration-500 group-hover:-translate-y-2">
          {description}
        </p>

        {/* Hidden Button */}
        <button
          type="button"
          onClick={onShopNow}
          aria-label={`View details for ${title}`}
          className="
            mt-6
            translate-y-8
            opacity-0
            bg-[#b77739]
            px-8
            py-4
            text-sm
            font-semibold
            uppercase
            tracking-wide
            transition-all
            duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
            hover:bg-[#9d632f]
          "
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default FabricCard;
