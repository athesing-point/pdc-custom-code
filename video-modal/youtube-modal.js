// Configuration object for video IDs and modal settings
// If this doesn't find the data-video-id="your-video-id-here"
// then it will use the videoId: "your-video-id-here" seen below
(function (global) {
  const modalConfig = {
    rameil: {
      videoId: "scIZq2PPzU0",
      playerId: "player1",
    },
    susan: {
      videoId: "SKcxYIl-tT8",
      playerId: "player2",
    },
  };

  // Store player instances
  let players = {};
  let activeModal = null;

  // Load YouTube API
  function loadYouTubeAPI() {
    if (!window.YT) {
      var tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  // Initialize YouTube players when API is ready
  global.onYouTubeIframeAPIReady = function () {
    // Create players for each modal
    Object.entries(modalConfig).forEach(([modalId, config]) => {
      // Try to read videoId from the element first
      const playerElement = document.getElementById(config.playerId);
      const dataVideoId = playerElement?.getAttribute("data-video-id");

      players[modalId] = new YT.Player(config.playerId, {
        videoId: dataVideoId || config.videoId, // Use data attribute if available, fallback to config
        height: "100%",
        width: "100%",
        playerVars: {
          autoplay: 0,
          controls: 1,
          rel: 0,
          modestbranding: 1,
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
        },
      });
    });

    // Set up modal event listeners after players are created
    setupModalEventListeners();
  };

  // Player event handlers
  function onPlayerReady(event) {
    // Player is ready
  }

  function onPlayerStateChange(event) {
    // Handle player state changes if needed
  }

  // Modal functionality
  function setupModalEventListeners() {
    // Setup open triggers
    document.querySelectorAll("[modal-open]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        const modalId = e.currentTarget.getAttribute("modal-open");
        openModal(modalId);
      });
    });

    // Setup close triggers
    document.querySelectorAll("[modal-close]").forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        const modalId = e.currentTarget.getAttribute("modal-close");
        closeModal(modalId);
      });
    });
  }

  function openModal(modalId) {
    const modalElement = document.querySelector(`[modal="${modalId}"]`);
    if (!modalElement || !players[modalId]) return;

    // Store active modal
    activeModal = modalId;

    // Reset display property and prepare for animation
    gsap.set(modalElement, {
      display: "block",
      opacity: 0,
    });

    // Animate modal opening
    gsap.to(modalElement, {
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        // Play video when animation completes
        if (players[modalId]) {
          players[modalId].playVideo();
        }
      },
    });
  }

  function closeModal(modalId) {
    const modalElement = document.querySelector(`[modal="${modalId}"]`);
    if (!modalElement || !players[modalId]) return;

    // Pause video
    if (players[modalId]) {
      players[modalId].pauseVideo();
    }

    // Animate modal closing
    gsap.to(modalElement, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: () => {
        gsap.set(modalElement, { display: "none" });
        activeModal = null;
      },
    });
  }

  // Handle escape key to close active modal
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && activeModal) {
      closeModal(activeModal);
    }
  });

  // Initialize the system
  loadYouTubeAPI();

  // Export for module usage
  const YouTubeModal = {
    openModal,
    closeModal,
    players,
  };

  // Make it available both as a module export and global
  if (typeof module !== "undefined" && module.exports) {
    module.exports = YouTubeModal;
  } else {
    global.YouTubeModal = YouTubeModal;
  }
})(typeof window !== "undefined" ? window : this);
