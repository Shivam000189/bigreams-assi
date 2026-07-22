const BlogCard = ({ image, title, description }) => {
  return (
    <div className="group cursor-pointer">
      {/* Image */}
      <div className="overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="h-[220px] w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="mt-5">
        <h3 className="text-xl font-semibold leading-snug transition group-hover:text-[#9b6b38]">
          {title}
        </h3>

        <p className="mt-4 text-gray-600 leading-7">
          {description}
        </p>

        <button className="mt-6 text-sm font-bold uppercase tracking-wider text-black transition hover:text-[#9b6b38]">
          Continue Reading →
        </button>
      </div>
    </div>
  );
};

export default BlogCard;