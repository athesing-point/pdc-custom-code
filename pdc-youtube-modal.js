// YouTube Modal Manager - Improved version with debug logging
(function () {
  "use strict";

  // Configuration
  const CONFIG = {
    videos: {
      player1: "scIZq2PPzU0",
      player2: "SKcxYIl-tT8",
    },
    selectors: {
      modal1: "#openmodal1, .modal1",
      modal2: "#openmodal2, .modal2",
      closeButton1: "#modal1 .close-button-wrapper",
      closeButton2: "#modal2 .close-button-wrapper",
    },
    playerDefaults: {
      height: "100%",
      width: "100%",
      playerVars: {
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
      },
    },
  };

  // State management
  const PlayerState = {
    players: new Map(),
    times: new Map(),

    getPlayer(id) {
      return this.players.get(id);
    },

    setPlayer(id, player) {
      console.log(`Setting player for ${id}`); // Debug log
      this.players.set(id, player);
    },

    getTime(id) {
      const time = this.times.get(id) || 0;
      console.log(`Getting time for ${id}:`, time); // Debug log
      return time;
    },

    setTime(id, time) {
      console.log(`Setting time for ${id}:`, time); // Debug log
      this.times.set(id, Math.floor(time || 0));
    },

    removePlayer(id) {
      console.log(`Removing player ${id}`); // Debug log
      this.players.delete(id);
      this.times.delete(id);
    },
  };

  // Safe execution wrapper
  function safeExecute(fn, fallback = null) {
    try {
      return fn();
    } catch (error) {
      console.error("Operation failed:", error);
      return fallback;
    }
  }

  // Player management
  function createPlayer(playerId, videoId) {
    console.log(`Creating new player: ${playerId} for video: ${videoId}`); // Debug log

    const existingPlayer = PlayerState.getPlayer(playerId);
    if (existingPlayer) {
      console.log(`Destroying existing player: ${playerId}`); // Debug log
      safeExecute(() => existingPlayer.destroy());
      PlayerState.removePlayer(playerId);
    }

    const player = new YT.Player(playerId, {
      ...CONFIG.playerDefaults,
      videoId: videoId,
      playerVars: {
        ...CONFIG.playerDefaults.playerVars,
        start: PlayerState.getTime(playerId),
      },
      events: {
        onReady: onPlayerReady,
        onError: (event) => onPlayerError(event, playerId),
      },
    });

    PlayerState.setPlayer(playerId, player);
    return player;
  }

  function handlePlayerOperation(playerId, operation) {
    console.log(`Attempting operation: ${operation} on player: ${playerId}`); // Debug log
    const player = PlayerState.getPlayer(playerId);
    if (!player || typeof player[operation] !== "function") {
      console.warn(`Invalid player or operation: ${playerId} - ${operation}`);
      return false;
    }
    return safeExecute(() => player[operation]());
  }

  // Event handlers
  function handleModalOpen(playerId, videoId) {
    console.log(`Modal open requested for ${playerId}`); // Debug log

    const playerDiv = document.getElementById(playerId);
    if (!playerDiv) {
      console.error("Player div not found:", playerId);
      return;
    }

    const existingPlayer = PlayerState.getPlayer(playerId);
    if (existingPlayer) {
      console.log(`Resuming existing player: ${playerId}`); // Debug log
      safeExecute(() => {
        const currentTime = PlayerState.getTime(playerId);
        console.log(`Seeking to time: ${currentTime}`); // Debug log
        existingPlayer.seekTo(currentTime);
        existingPlayer.playVideo();
      });
    } else {
      console.log(`No existing player found, creating new one: ${playerId}`); // Debug log
      createPlayer(playerId, videoId);
    }
  }

  function handleModalClose(playerId) {
    console.log(`Modal close requested for ${playerId}`); // Debug log

    const player = PlayerState.getPlayer(playerId);
    if (!player) {
      console.warn(`No player found to close: ${playerId}`);
      return;
    }

    safeExecute(() => {
      if (typeof player.getCurrentTime === "function") {
        const currentTime = player.getCurrentTime();
        console.log(`Saving current time for ${playerId}:`, currentTime); // Debug log
        PlayerState.setTime(playerId, currentTime);
      }
      if (typeof player.pauseVideo === "function") {
        console.log(`Pausing video for ${playerId}`); // Debug log
        player.pauseVideo();
      }
    });
  }

  const handleModalClick = (event) => {
    const target = event.target;

    // Modal opening logic
    if (target.closest(CONFIG.selectors.modal1)) {
      console.log(
        "Modal 1 Open Target Clicked:",
        target.closest(CONFIG.selectors.modal1)
      ); // Debug log
      handleModalOpen("player1", CONFIG.videos.player1);
    } else if (target.closest(CONFIG.selectors.modal2)) {
      console.log(
        "Modal 2 Open Target Clicked:",
        target.closest(CONFIG.selectors.modal2)
      ); // Debug log
      handleModalOpen("player2", CONFIG.videos.player2);
    }

    // Modal closing logic
    if (target.closest(CONFIG.selectors.closeButton1)) {
      console.log(
        "Modal 1 Close Target Clicked:",
        target.closest(CONFIG.selectors.closeButton1)
      ); // Debug log
      handleModalClose("player1");
    } else if (target.closest(CONFIG.selectors.closeButton2)) {
      console.log(
        "Modal 2 Close Target Clicked:",
        target.closest(CONFIG.selectors.closeButton2)
      ); // Debug log
      handleModalClose("player2");
    }
  };

  // YouTube event handlers
  function onPlayerReady(event) {
    const player = event.target;
    const playerId = player.getIframe().id;
    console.log("Player ready:", playerId);

    safeExecute(() => {
      console.log(`Attempting to play video for ${playerId}`); // Debug log
      player.playVideo();
    });
  }

  function onPlayerError(event, playerId) {
    console.error("YouTube Player Error:", {
      playerId: playerId,
      errorCode: event.data,
      errorMessage: getYouTubeErrorMessage(event.data), // Added helper for error messages
    });

    const player = PlayerState.getPlayer(playerId);
    if (player) {
      console.log(`Cleaning up player after error: ${playerId}`); // Debug log
      safeExecute(() => {
        player.destroy();
        PlayerState.removePlayer(playerId);
      });
    }
  }

  // Helper function to get YouTube error messages
  function getYouTubeErrorMessage(errorCode) {
    const errorMessages = {
      2: "Invalid parameter value",
      5: "HTML5 player error",
      100: "Video not found",
      101: "Playback on other websites has been disabled by the video owner",
      150: "Playback on other websites has been disabled by the video owner",
    };
    return errorMessages[errorCode] || "Unknown error";
  }

  // Cleanup
  function cleanup() {
    console.log("Performing cleanup..."); // Debug log
    PlayerState.players.forEach((player, id) => {
      console.log(`Cleaning up player: ${id}`); // Debug log
      safeExecute(() => {
        if (player && typeof player.destroy === "function") {
          player.destroy();
        }
      });
    });
    PlayerState.players.clear();
    PlayerState.times.clear();
    console.log("Cleanup complete"); // Debug log
  }

  // Setup and initialization
  function setupEventListeners() {
    console.log("Setting up event listeners"); // Debug log
    document.addEventListener("click", handleModalClick);
    window.addEventListener("unload", cleanup);
  }

  function loadYouTubeAPI() {
    console.log("Loading YouTube API..."); // Debug log
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      console.log("YouTube API script tag added"); // Debug log
    } else {
      console.log("YouTube API already loaded"); // Debug log
      setupEventListeners();
    }
  }

  // Initialize
  function init() {
    console.log("Initializing YouTube Modal Manager"); // Debug log
    loadYouTubeAPI();
  }

  // Export necessary functions
  window.onYouTubeIframeAPIReady = function () {
    console.log("YouTube IFrame API Ready"); // Debug log
    setupEventListeners();
  };

  // Start the application
  init();
})();
