const ReadyToWearCard = ({ image, title, description }) => {
  return (
    <div className="relative h-[490px] overflow-hidden rounded-2xl">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-full w-full object-cover"
      />

      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" /> */}

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3
          className="text-center font-serif text-5xl font-medium"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {title}
        </h3>

        <div className="mt-5 flex items-end justify-between gap-4">
          <p className="max-w-[220px] text-lg leading-7 text-gray-200">
            {description}
          </p>

          <button className="rounded-md bg-white px-5 py-3 text-sm font-bold uppercase text-black transition hover:bg-gray-100">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReadyToWearCard;