const TestimonialCard = ({ review, name }) => {
  return (
    <div className="flex h-[380px] items-center justify-center rounded-2xl border border-black/20 bg-white p-10">
      <div className="text-center">
        <p className="text-[20px] italic font-medium leading-[1.8] text-black">
          {review}
        </p>

        <h4 className="mt-10 text-2xl font-bold italic">
          {name}
        </h4>
      </div>
    </div>
  );
};

export default TestimonialCard;