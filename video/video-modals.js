// Modal configuration for HTML5 video
const modalConfig = {
  rameil: {
    videoId: "player1", // used as a key
    videoSrc: "https://files.point.com/videos/rameil.mp4",
  },
  susan: {
    videoId: "player2",
    videoSrc: "https://files.point.com/videos/susan.mp4",
  },
};

// Store active modal
let activeModal = null;

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
  if (!modalElement) return;

  // Store active modal
  activeModal = modalId;

  // Set or update video src if needed
  const config = modalConfig[modalId];
  const videoContainer = document.getElementById(config.videoId);
  if (videoContainer) {
    const videoElement = videoContainer.querySelector("video");
    const sourceElement = videoContainer.querySelector("source");

    if (videoElement && sourceElement) {
      // Only set source if it hasn't been set yet
      if (!sourceElement.src) {
        videoElement.preload = "none";
        sourceElement.src = config.videoSrc;
        sourceElement.type = "video/mp4";
        videoElement.load();
      }

      // Resume playback
      videoElement.play();
    }
  }

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
  });
}

function closeModal(modalId) {
  const modalElement = document.querySelector(`[modal="${modalId}"]`);
  if (!modalElement) return;

  // Pause video
  const config = modalConfig[modalId];
  const videoContainer = document.getElementById(config.videoId);
  if (videoContainer) {
    const videoElement = videoContainer.querySelector("video");
    if (videoElement) {
      videoElement.pause();
    }
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
setupModalEventListeners();

// Export the module
const HTML5VideoModal = {
  openModal,
  closeModal,
};

module.exports = HTML5VideoModal;
