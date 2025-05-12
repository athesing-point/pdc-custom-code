//Rebuilt Youtube embeds removing Jquery dependency
var player1, player2;
var lastTime1 = 0,
  lastTime2 = 0;

function onYouTubeIframeAPIReady() {
  setupYouTubeEventListeners();
}

function setupYouTubeEventListeners() {
  document.addEventListener("click", function (event) {
    if (
      event.target.id === "openmodal1" ||
      event.target.closest("#openmodal1") ||
      event.target.classList.contains("modal1") ||
      event.target.closest(".modal1")
    ) {
      handleModalOpen("player1", "scIZq2PPzU0");
    } else if (
      event.target.id === "openmodal2" ||
      event.target.closest("#openmodal2") ||
      event.target.classList.contains("modal2") ||
      event.target.closest(".modal2")
    ) {
      handleModalOpen("player2", "SKcxYIl-tT8");
    } else if (event.target.closest("#modal1 .close-button-wrapper")) {
      if (player1) {
        lastTime1 = player1.getCurrentTime();
        player1.pauseVideo();
      }
    } else if (event.target.closest("#modal2 .close-button-wrapper")) {
      if (player2) {
        lastTime2 = player2.getCurrentTime();
        player2.pauseVideo();
      }
    }
  });
}

function handleModalOpen(playerId, videoId) {
  setTimeout(function () {
    var playerDiv = document.getElementById(playerId);
    if (!playerDiv) {
      console.error("Player div not found:", playerId);
      return;
    }

    if (
      (playerId === "player1" && !player1) ||
      (playerId === "player2" && !player2)
    ) {
      var player = new YT.Player(playerId, {
        height: "100%",
        width: "100%",
        videoId: videoId,
        playerVars: {
          rel: 0,
          modestbranding: 1,
          autoplay: 1,
          start: playerId === "player1" ? lastTime1 : lastTime2,
        },
        events: {
          onReady: onPlayerReady,
        },
      });
      if (playerId === "player1") {
        player1 = player;
      } else {
        player2 = player;
      }
    } else {
      if (playerId === "player1" && player1) {
        player1.seekTo(lastTime1);
        player1.playVideo();
      } else if (playerId === "player2" && player2) {
        player2.seekTo(lastTime2);
        player2.playVideo();
      }
    }
  }, 50);
}

function onPlayerReady(event) {
  event.target.playVideo();
}

// Load YouTube API
function loadYouTubeAPI() {
  if (!window.YT) {
    var tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  } else {
    onYouTubeIframeAPIReady();
  }
}

// Call this function to load the YouTube API
loadYouTubeAPI();

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
