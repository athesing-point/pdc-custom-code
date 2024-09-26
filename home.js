// Create Youtube Player Embeds
let player1, player2;

function initYouTubePlayers() {
  const createPlayer = (playerId, videoId) => {
    return new YT.Player(playerId, {
      height: "100%",
      width: "100%",
      videoId,
      events: { onReady: (event) => event.target.playVideo() },
    });
  };

  const handleModalClick = (playerId, videoId) => {
    setTimeout(() => {
      if (!window[playerId]) {
        window[playerId] = createPlayer(playerId, videoId);
      } else {
        window[playerId].playVideo();
      }
    }, 50);
  };

  document.querySelector("#openmodal1").addEventListener("click", () => handleModalClick("player1", "scIZq2PPzU0"));
  document.querySelector("#openmodal2").addEventListener("click", () => handleModalClick("player2", "SKcxYIl-tT8"));

  document.querySelector("#modal1 .close-button-wrapper").addEventListener("click", () => player1?.pauseVideo());
  document.querySelector("#modal2 .close-button-wrapper").addEventListener("click", () => player2?.pauseVideo());
}

// Accessible Accordions
function initAccordions() {
  document.getElementById("default-open")?.click();

  document.querySelectorAll(".product-faq-toggle").forEach((button) => {
    const toggleAttr = (el, attr) => el.setAttribute(attr, el.getAttribute(attr) === "true" ? "false" : "true");

    const handleToggle = () => {
      toggleAttr(button, "aria-expanded");
      toggleAttr(button.parentElement.querySelector(".product-faq-content"), "aria-hidden");
    };

    button.addEventListener("click", handleToggle);
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleToggle();
      }
    });
  });
}

// FAQ Schema
function generateFAQSchema() {
  const faqItems = document.querySelectorAll(".product-faq-item");
  if (faqItems.length === 0) return;

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": Array.from(faqItems).map((item) => {
      const question = item.querySelector("h4")?.textContent.trim();
      const answerText = Array.from(item.querySelector(".product-faq-content").childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE || !node.classList?.contains("buttons"))
        .map((node) => node.textContent.trim())
        .join(" ")
        .trim();

      return {
        "@type": "Question",
        "name": question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answerText,
        },
      };
    }),
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(faqPage);
  document.head.appendChild(script);
}

// Main initialization
function init() {
  if (typeof YT !== "undefined" && YT.Player) {
    initYouTubePlayers();
  } else {
    window.onYouTubeIframeAPIReady = initYouTubePlayers;
  }
  initAccordions();
  generateFAQSchema();
}

// Use requestIdleCallback for non-critical initialization
if ("requestIdleCallback" in window) {
  requestIdleCallback(init);
} else {
  setTimeout(init, 1);
}
// //Create Youtube Player Embeds
// var player1, player2;

// function onYouTubeIframeAPIReady() {
//   var openModal1Button = document.querySelector("#openmodal1");
//   var openModal2Button = document.querySelector("#openmodal2");

//   jQuery(document).on("click", "#openmodal1", function () {
//     setTimeout(function () {
//       if (!player1) {
//         player1 = new YT.Player("player1", {
//           height: "100%",
//           width: "100%",
//           videoId: "scIZq2PPzU0",
//           events: {
//             onReady: onPlayerReady,
//           },
//         });
//       } else {
//         player1.playVideo();
//       }
//     }, 50); // 1 second delay
//   });

//   jQuery(document).on("click", "#openmodal2", function () {
//     setTimeout(function () {
//       if (!player2) {
//         player2 = new YT.Player("player2", {
//           height: "100%",
//           width: "100%",
//           videoId: "SKcxYIl-tT8",
//           events: {
//             onReady: onPlayerReady,
//           },
//         });
//       } else {
//         player2.playVideo();
//       }
//     }, 50); // 1 second delay
//   });
// }

// function onPlayerReady(event) {
//   event.target.playVideo();
// }

// jQuery(document).on("click", "#modal1 .close-button-wrapper", function () {
//   if (player1) {
//     player1.pauseVideo();
//   }
// });

// jQuery(document).on("click", "#modal2 .close-button-wrapper", function () {
//   if (player2) {
//     player2.pauseVideo();
//   }
// });

// //Form Input Labels
// // $(".form-input").on("focusin", function () {
// //   $(this).siblings(".form-label").removeClass("input-focus-out");
// // });

// // $(".form-input").on("focusout", function () {
// //   if ($(this).val() === "") {
// //     $(this).siblings(".form-label").addClass("input-focus-out");
// //   } else {
// //     $(this).siblings(".form-label").removeClass("input-focus-out");
// //   }
// // });

// //Acessible Accordions & default open first item
// document.addEventListener("DOMContentLoaded", function () {
//   // Opens the first accordion item
//   var defaultOpenElement = document.getElementById("default-open");
//   if (defaultOpenElement) {
//     defaultOpenElement.click();
//   }

//   // Accessibility logic
//   var accordionToggleButtons = document.querySelectorAll(".product-faq-toggle");

//   accordionToggleButtons.forEach(function (button) {
//     // Keydown event for spacebar and enter
//     button.addEventListener("keydown", function (e) {
//       if (e.keyCode !== 13 && e.keyCode !== 32) {
//         return;
//       }
//       e.preventDefault();

//       // Simulate a mouse click to trigger Webflow's IX2/Interactions
//       var evt = new MouseEvent("click", {
//         bubbles: true,
//         cancelable: true,
//         view: window,
//       });
//       this.dispatchEvent(evt);
//     });

//     // Click event
//     button.addEventListener("click", function () {
//       toggleAttrVal(this, "aria-expanded", "false", "true"); // Toggle trigger attribute
//       var content = this.parentElement.querySelector(".product-faq-content");
//       if (content) {
//         toggleAttrVal(content, "aria-hidden", "true", "false"); // Toggle content attribute
//       }
//     });
//   });

//   // Function to toggle attribute values
//   function toggleAttrVal(element, attr, val1, val2) {
//     var test = element.getAttribute(attr);
//     if (test === val1) {
//       element.setAttribute(attr, val2);
//     } else if (test === val2) {
//       element.setAttribute(attr, val1);
//     } else {
//       element.setAttribute(attr, val1);
//     }
//   }
// });

// //FAQ Schema
// window.addEventListener("load", function () {
//   var faqItems = document.querySelectorAll(".product-faq-item");
//   // console.log('FAQ items:', faqItems);
//   if (faqItems.length > 0) {
//     var faqPage = {
//       "@context": "https://schema.org",
//       "@type": "FAQPage",
//       "mainEntity": [],
//     };
//     faqItems.forEach(function (item) {
//       var question = item.querySelector("h4");
//       var answerContainer = item.querySelector(".product-faq-content");
//       // console.log('Question element:', question);
//       // console.log('Answer container:', answerContainer);
//       if (question && answerContainer) {
//         // Get text content outside of elements with the class 'buttons'
//         var textNodes = [];
//         answerContainer.childNodes.forEach(function (node) {
//           if (node.nodeType === Node.TEXT_NODE || !node.classList.contains("buttons")) {
//             textNodes.push(node.textContent.trim());
//           }
//         });

//         var answerText = textNodes.join(" ").trim();

//         faqPage.mainEntity.push({
//           "@type": "Question",
//           "name": question.textContent.trim(),
//           "acceptedAnswer": {
//             "@type": "Answer",
//             "text": answerText,
//           },
//         });
//       }
//     });
//     var script = document.createElement("script");
//     script.type = "application/ld+json";
//     script.textContent = JSON.stringify(faqPage);
//     document.head.appendChild(script);
//     // console.log('FAQ schema:', faqPage);
//   } else {
//     // console.log('No FAQ items found');
//   }
// });
