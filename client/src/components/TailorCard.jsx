import { useNavigate } from "react-router-dom";

const TailorCard = ({
  image,
  title,
  description,
  type,
}) => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden rounded-3xl">
      <img
        src={image}
        alt={title}
        className="h-[550px] w-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent" />

      <div className="absolute bottom-8 left-8 text-white">
        <h2 className="text-4xl font-semibold">{title}</h2>
        <p className="mt-4 max-w-sm">{description}</p>

        <button
          onClick={() => navigate(`/customize/${type}`)}
          className="mt-6 rounded-full bg-[#B77739] px-8 py-3 text-white transition hover:bg-[#9b642f]"
        >
          Start Customizing
        </button>
      </div>
    </div>
  );
};

export default TailorCard;