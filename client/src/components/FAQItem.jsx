import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-300 py-5">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left"
      >
        <h3 className="text-2xl font-normal text-[#444]">
          {question}
        </h3>

        <ChevronDown
          size={26}
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ${
          open ? "max-h-96 pt-5" : "max-h-0"
        }`}
      >
        <p className="max-w-4xl text-lg leading-8 text-gray-600">
          {answer}
        </p>
      </div>
    </div>
  );
};

export default FAQItem;