import FAQItem from "./FAQItem";

const faqs = [
  {
    question: "What is Bigreams?",
    answer:
      "Bigreams is a premium tailoring and fabric platform offering custom-made clothing, premium fabrics, and ready-to-wear apparel.",
  },
  {
    question: "When will I receive my refund for a cancelled order?",
    answer:
      "Refunds are generally processed within 5–7 business days after the cancellation has been approved.",
  },
  {
    question: "What if I receive a product in damaged condition?",
    answer:
      "Please contact our support team within 48 hours of delivery with photos of the damaged product for assistance.",
  },
  {
    question: "Do you accept returns for customized products?",
    answer:
      "Customized products are generally non-returnable unless there is a manufacturing defect or an error from our side.",
  },
  {
    question: "Do you work in the B2B business?",
    answer:
      "Yes. We work with designers, boutiques, retailers, and apparel manufacturers for bulk orders and fabric sourcing.",
  },
];

const FAQ = () => {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-4xl px-6">

        <h2 className="mb-14 text-5xl font-light">
          FAQ
        </h2>

        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
          />
        ))}

      </div>
    </section>
  );
};

export default FAQ;