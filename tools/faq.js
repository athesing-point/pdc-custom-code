export function generateFAQSchema() {
  const faqList = document.getElementById("faq-list");
  if (faqList?.querySelectorAll(".w-dyn-item").length > 0) {
    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: Array.from(faqList.querySelectorAll(".w-dyn-item"))
        .map((item) => {
          const question = item.querySelector(".faq_q");
          const answer = item.querySelector(".faq_answer");
          return question && answer
            ? {
                "@type": "Question",
                name: question.textContent.trim(),
                acceptedAnswer: {
                  "@type": "Answer",
                  text: answer.textContent.trim(),
                },
              }
            : null;
        })
        .filter(Boolean),
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqPage);
    document.head.appendChild(script);
  }
}
