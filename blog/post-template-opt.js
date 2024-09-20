// Social Share Buttons
document.addEventListener("DOMContentLoaded", () => {
  const title = encodeURIComponent(document.title);
  const url = encodeURIComponent(window.location.href);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}%2F&title=${title}%3F`,
    twitter: `https://twitter.com/share?url=${url}%2F&title=${title}&summary=`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${url}%2F&title=${title}&summary=`,
  };

  Object.entries(shareLinks).forEach(([platform, href]) => {
    document.querySelectorAll(`[data-share-${platform}]`).forEach((el) => {
      el.href = href;
      el.target = "_blank";
    });
  });

  // Email Capture Validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const emailInput = document.getElementById("email-cap-input");
  const form = document.getElementById("wf-form-EmailCap-Form");

  const validateEmailInput = () => {
    const isValid = !emailInput.value || emailRegex.test(emailInput.value.toLowerCase());
    emailInput.setCustomValidity(isValid ? "" : "Please enter a valid email address.");
    return isValid;
  };

  emailInput.addEventListener("blur", validateEmailInput);
  emailInput.addEventListener("input", () => emailInput.setCustomValidity(""));
  form.addEventListener("submit", (e) => {
    if (!validateEmailInput()) e.preventDefault();
  });

  // Generate FAQ Schema
  const faqList = document.getElementById("faq-list");
  if (faqList?.querySelectorAll(".w-dyn-item").length > 0) {
    const faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": Array.from(faqList.querySelectorAll(".w-dyn-item"))
        .map((item) => {
          const question = item.querySelector(".faq_q");
          const answer = item.querySelector(".faq_answer");
          return question && answer
            ? {
                "@type": "Question",
                "name": question.textContent.trim(),
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": answer.textContent.trim(),
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

  // Accordion Accessibility Handling
  const toggleAttrVal = (element, attr, val1, val2) => {
    element.setAttribute(attr, element.getAttribute(attr) === val1 ? val2 : val1);
  };

  document.querySelectorAll(".accordion-trigger").forEach((button) => {
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        button.click();
      }
    });

    button.addEventListener("click", () => {
      toggleAttrVal(button, "aria-expanded", "false", "true");
      toggleAttrVal(button.parentNode.querySelector(".accordion-content"), "aria-hidden", "true", "false");
    });
  });

  // Footnote Links
  const footnotesRTF = document.querySelector(".blog-rich-text-footnotes");
  if (footnotesRTF?.textContent.trim() && getComputedStyle(footnotesRTF).display !== "none" && getComputedStyle(footnotesRTF).visibility !== "hidden") {
    document.querySelectorAll(".blog-rich-text:not(.blog-rich-text-footnotes) sup").forEach((sup) => {
      if (!isNaN(sup.textContent.trim())) {
        sup.innerHTML = `<a href="#footnotes">${sup.textContent}</a>`;
      }
    });
  }

  // Open all RTF links in new tab/_blank
  document.querySelectorAll(".blog-rich-text a, .rtf-content_series a").forEach((link) => (link.target = "_blank"));
});
