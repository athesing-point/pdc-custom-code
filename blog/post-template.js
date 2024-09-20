// Social Share Buttons
document.addEventListener("DOMContentLoaded", function () {
  let title = document.title;
  let url = window.location.href;

  document.querySelectorAll("[data-share-facebook]").forEach(function (element) {
    element.setAttribute("href", "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(url) + "%2F&title=" + encodeURIComponent(title) + "%3F");
    element.setAttribute("target", "_blank");
  });

  document.querySelectorAll("[data-share-twitter]").forEach(function (element) {
    element.setAttribute("href", "https://twitter.com/share?url=" + encodeURIComponent(url) + "%2F&title=" + encodeURIComponent(title) + "&summary=");
    element.setAttribute("target", "_blank");
  });

  document.querySelectorAll("[data-share-linkedin]").forEach(function (element) {
    element.setAttribute("href", "https://www.linkedin.com/shareArticle?mini=true&url=" + encodeURIComponent(url) + "%2F&title=" + encodeURIComponent(title) + "&summary=");
    element.setAttribute("target", "_blank");
  });
});

// Email Capture Validation
function validateEmail(email) {
  // Stricter regex for emails
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  return re.test(String(email).toLowerCase());
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the email input and form by their IDs
  const emailInput = document.getElementById("email-cap-input");
  const form = document.getElementById("wf-form-EmailCap-Form");

  // Event listener for email input on blur
  emailInput.addEventListener("blur", function (event) {
    // If the field is not empty, then validate the email
    if (event.target.value && !validateEmail(event.target.value)) {
      emailInput.setCustomValidity("Please enter a valid email address.");
      emailInput.reportValidity();
    } else {
      emailInput.setCustomValidity("");
    }
  });

  // Event listener to clear the validation message when the user starts typing
  emailInput.addEventListener("input", function () {
    emailInput.setCustomValidity("");
  });

  // Event listener for form submission
  form.addEventListener("submit", function (event) {
    // Check if the email input is not empty and is invalid
    if (emailInput.value && !validateEmail(emailInput.value)) {
      // If the email is invalid, prevent form submission and show a message
      event.preventDefault();
      emailInput.setCustomValidity("Please enter a valid email address.");
      emailInput.reportValidity();
    }
  });
});

// Generate FAQ Schema
window.addEventListener("load", function () {
  var faqList = document.getElementById("faq-list");
  //console.log('FAQ list element:', faqList);
  if (faqList && faqList.querySelectorAll(".w-dyn-item").length > 0) {
    var faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [],
    };
    faqList.querySelectorAll(".w-dyn-item").forEach(function (item) {
      var question = item.querySelector(".faq_q");
      var answer = item.querySelector(".faq_answer");
      //console.log('Question element:', question);
      //console.log('Answer element:', answer);
      if (question && answer) {
        faqPage.mainEntity.push({
          "@type": "Question",
          "name": question.textContent.trim(),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answer.textContent.trim(),
          },
        });
      }
    });
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqPage);
    document.head.appendChild(script);
    //console.log('FAQ schema:', faqPage);
  } else {
    //console.log('No FAQ items found');
  }
});

// Accordion Accessibility Handling
document.addEventListener("DOMContentLoaded", function () {
  var accordionToggleButton = document.querySelectorAll(".accordion-trigger");

  accordionToggleButton.forEach(function (button) {
    button.addEventListener("keydown", function (e) {
      // Activate on spacebar and enter
      if (e.which !== 13 && e.which !== 32) {
        return;
      }
      e.preventDefault();

      // Simulate a mouseclick to trigger Webflow's IX2/Interactions
      var evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      this.dispatchEvent(evt);
    });

    button.addEventListener("click", function (e) {
      toggleAttrVal(this, "aria-expanded", "false", "true"); // toggle trigger attribute
      var content = this.parentNode.querySelector(".accordion-content");
      toggleAttrVal(content, "aria-hidden", "true", "false"); // toggle content attribute
    });
  });

  function toggleAttrVal(element, attr, val1, val2) {
    var test = element.getAttribute(attr);
    if (test === val1) {
      element.setAttribute(attr, val2);
    } else if (test === val2) {
      element.setAttribute(attr, val1);
    } else {
      element.setAttribute(attr, val1);
    }
  }
});

// Footnote Links
document.addEventListener("DOMContentLoaded", () => {
  const footnotesRTF = document.querySelector(".blog-rich-text-footnotes");
  if (!footnotesRTF || footnotesRTF.textContent.trim() === "") return;

  // If the footnotes section is not visible, exit the function
  if (getComputedStyle(footnotesRTF).display === "none" || getComputedStyle(footnotesRTF).visibility === "hidden") {
    return;
  }

  // Linking superscripts
  document.querySelectorAll(".blog-rich-text:not(.blog-rich-text-footnotes) sup").forEach((sup) => {
    if (!isNaN(sup.textContent.trim())) {
      sup.innerHTML = `<a href="#footnotes">${sup.textContent}</a>`;
    }
  });
});

// Open intra-RTF links in new tab
document.addEventListener("DOMContentLoaded", function () {
  // Select all links inside elements with the class 'blog-rich-text' and '.rtf-content_series'
  const blogRichTextLinks = document.querySelectorAll(".blog-rich-text a");
  const rtfContentSeriesLinks = document.querySelectorAll(".rtf-content_series a");

  // Function to set target="_blank" for each link
  function setLinksTargetBlank(links) {
    links.forEach(function (link) {
      link.setAttribute("target", "_blank");
    });
  }

  // Apply target="_blank" to links in both classes
  setLinksTargetBlank(blogRichTextLinks);
  setLinksTargetBlank(rtfContentSeriesLinks);
});
