// Try to import as a module, fallback to global
try {
  import("./video-modal/youtube-modal.js");
} catch (e) {
  // Module import failed, script should be loaded globally
  console.log("Using global YouTube modal");
}

//Accessible Accordions & default open first item
function initAccordions() {
  // Opens the first accordion item
  var defaultOpenElement = document.getElementById("default-open");
  if (defaultOpenElement) {
    defaultOpenElement.click();
  }

  // Accessibility logic
  var accordionToggleButtons = document.querySelectorAll(".product-faq-toggle");

  accordionToggleButtons.forEach(function (button) {
    // Keydown event for spacebar and enter
    button.addEventListener("keydown", function (e) {
      if (e.keyCode !== 13 && e.keyCode !== 32) {
        return;
      }
      e.preventDefault();

      // Simulate a mouse click to trigger Webflow's IX2/Interactions
      var evt = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window,
      });
      this.dispatchEvent(evt);
    });

    // Click event
    button.addEventListener("click", function () {
      toggleAttrVal(this, "aria-expanded", "false", "true"); // Toggle trigger attribute
      var content = this.parentElement.querySelector(".product-faq-content");
      if (content) {
        toggleAttrVal(content, "aria-hidden", "true", "false"); // Toggle content attribute
      }
    });
  });

  // Function to toggle attribute values
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
}

//FAQ Schema
function initFAQSchema() {
  var faqItems = document.querySelectorAll(".product-faq-item");
  if (faqItems.length > 0) {
    var faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [],
    };
    faqItems.forEach(function (item) {
      var question = item.querySelector("h4");
      var answerContainer = item.querySelector(".product-faq-content");
      if (question && answerContainer) {
        // Get text content outside of elements with the class 'buttons'
        var textNodes = [];
        answerContainer.childNodes.forEach(function (node) {
          if (
            node.nodeType === Node.TEXT_NODE ||
            !node.classList.contains("buttons")
          ) {
            textNodes.push(node.textContent.trim());
          }
        });

        var answerText = textNodes.join(" ").trim();

        faqPage.mainEntity.push({
          "@type": "Question",
          name: question.textContent.trim(),
          acceptedAnswer: {
            "@type": "Answer",
            text: answerText,
          },
        });
      }
    });
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqPage);
    document.head.appendChild(script);
  }
}
// These functions will be called when the script is loaded
initAccordions();
initFAQSchema();
