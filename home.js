//Create Youtube Player Embeds
var player1, player2;

function onYouTubeIframeAPIReady() {
  document.addEventListener("click", function (event) {
    if (event.target.id === "openmodal1") {
      handleModalOpen("player1", "scIZq2PPzU0");
    } else if (event.target.id === "openmodal2") {
      handleModalOpen("player2", "SKcxYIl-tT8");
    }
  });
}

function handleModalOpen(playerId, videoId) {
  setTimeout(function () {
    if (playerId === "player1" && !player1) {
      player1 = createYouTubePlayer(playerId, videoId);
    } else if (playerId === "player2" && !player2) {
      player2 = createYouTubePlayer(playerId, videoId);
    } else {
      (playerId === "player1" ? player1 : player2).playVideo();
    }
  }, 50);
}

function createYouTubePlayer(playerId, videoId) {
  return new YT.Player(playerId, {
    height: "100%",
    width: "100%",
    videoId: videoId,
    events: {
      onReady: onPlayerReady,
    },
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

document.addEventListener("click", function (event) {
  if (event.target.closest("#modal1 .close-button-wrapper")) {
    if (player1) {
      player1.pauseVideo();
    }
  } else if (event.target.closest("#modal2 .close-button-wrapper")) {
    if (player2) {
      player2.pauseVideo();
    }
  }
});

//Form Input Labels
// $(".form-input").on("focusin", function () {
//   $(this).siblings(".form-label").removeClass("input-focus-out");
// });

// $(".form-input").on("focusout", function () {
//   if ($(this).val() === "") {
//     $(this).siblings(".form-label").addClass("input-focus-out");
//   } else {
//     $(this).siblings(".form-label").removeClass("input-focus-out");
//   }
// });

//Acessible Accordions & default open first item
document.addEventListener("DOMContentLoaded", function () {
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
});

//FAQ Schema
window.addEventListener("load", function () {
  var faqItems = document.querySelectorAll(".product-faq-item");
  // console.log('FAQ items:', faqItems);
  if (faqItems.length > 0) {
    var faqPage = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [],
    };
    faqItems.forEach(function (item) {
      var question = item.querySelector("h4");
      var answerContainer = item.querySelector(".product-faq-content");
      // console.log('Question element:', question);
      // console.log('Answer container:', answerContainer);
      if (question && answerContainer) {
        // Get text content outside of elements with the class 'buttons'
        var textNodes = [];
        answerContainer.childNodes.forEach(function (node) {
          if (node.nodeType === Node.TEXT_NODE || !node.classList.contains("buttons")) {
            textNodes.push(node.textContent.trim());
          }
        });

        var answerText = textNodes.join(" ").trim();

        faqPage.mainEntity.push({
          "@type": "Question",
          "name": question.textContent.trim(),
          "acceptedAnswer": {
            "@type": "Answer",
            "text": answerText,
          },
        });
      }
    });
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(faqPage);
    document.head.appendChild(script);
    // console.log('FAQ schema:', faqPage);
  } else {
    // console.log('No FAQ items found');
  }
});
