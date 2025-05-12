// Rebuilt Youtube embeds removing Jquery dependency
var player1, player2;
var lastTime1 = 0,
  lastTime2 = 0;

function onYouTubeIframeAPIReady() {
  setupYouTubeEventListeners();
}

function setupYouTubeEventListeners() {
  document.addEventListener("click", function (event) {
    console.log("Document clicked. Target:", event.target); // Debug log

    // Use closest for all checks for consistency and broader matching
    const openModal1Target = event.target.closest("#openmodal1, .modal1");
    const openModal2Target = event.target.closest("#openmodal2, .modal2");
    console.log("openModal1Target:", openModal1Target); // Debug log
    console.log("openModal2Target:", openModal2Target); // Debug log

    const closeModal1Target = event.target.closest(
      "#modal1 .close-button-wrapper"
    );
    const closeModal2Target = event.target.closest(
      "#modal2 .close-button-wrapper"
    );

    if (openModal1Target) {
      console.log(
        "Match for openModal1Target. Calling handleModalOpen for player1."
      ); // Debug log
      handleModalOpen("player1", "scIZq2PPzU0");
    } else if (openModal2Target) {
      console.log(
        "Match for openModal2Target. Calling handleModalOpen for player2."
      ); // Debug log
      handleModalOpen("player2", "SKcxYIl-tT8");
    } else if (closeModal1Target) {
      // Try to pause player 1 safely
      if (player1 && typeof player1.pauseVideo === "function") {
        // Optionally get time first, but prioritize pausing
        if (typeof player1.getCurrentTime === "function") {
          try {
            lastTime1 = player1.getCurrentTime();
          } catch (e) {
            console.warn("Error getting current time for player1:", e);
          }
        }
        try {
          player1.pauseVideo();
        } catch (e) {
          console.error("Error pausing player1:", e);
        }
      } else {
        console.warn(
          "Could not pause player1 on close (not ready or does not exist)."
        );
        // Optional: Consider destroying the player if it's causing issues
        // if (player1 && typeof player1.destroy === 'function') try { player1.destroy(); player1 = null; } catch(e){}
      }
    } else if (closeModal2Target) {
      // Try to pause player 2 safely
      if (player2 && typeof player2.pauseVideo === "function") {
        // Optionally get time first, but prioritize pausing
        if (typeof player2.getCurrentTime === "function") {
          try {
            lastTime2 = player2.getCurrentTime();
          } catch (e) {
            console.warn("Error getting current time for player2:", e);
          }
        }
        try {
          player2.pauseVideo();
        } catch (e) {
          console.error("Error pausing player2:", e);
        }
      } else {
        console.warn(
          "Could not pause player2 on close (not ready or does not exist)."
        );
        // Optional: Consider destroying player2
        // if (player2 && typeof player2.destroy === 'function') try { player2.destroy(); player2 = null; } catch(e){}
      }
    } else {
      console.log("No relevant modal target found for click."); // Debug log
    }
  });
}

function handleModalOpen(playerId, videoId) {
  var playerDiv = document.getElementById(playerId);
  if (!playerDiv) {
    console.error("Player div not found:", playerId);
    return;
  }

  let targetPlayer;
  let targetLastTime;

  // Determine which player and lastTime to use
  if (playerId === "player1") {
    targetPlayer = player1;
    targetLastTime = lastTime1;
  } else {
    // Assumes playerId === "player2"
    targetPlayer = player2;
    targetLastTime = lastTime2;
  }

  if (!targetPlayer) {
    // Create player if it doesn't exist for this ID
    console.log("Creating new player:", playerId);
    var player = new YT.Player(playerId, {
      height: "100%",
      width: "100%",
      videoId: videoId,
      playerVars: {
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
        start: Math.floor(targetLastTime || 0), // Use specific lastTime, ensure it's a number (default to 0)
      },
      events: {
        onReady: onPlayerReady,
        // onError: onPlayerError, // Optional: Add error handling if needed
      },
    });
    // Assign the newly created player to the correct global variable
    if (playerId === "player1") {
      player1 = player;
    } else {
      player2 = player;
    }
  } else {
    // Player already exists, try to resume
    console.log("Resuming existing player:", playerId);
    // Check if methods exist before calling. Player might exist but not be ready.
    if (
      typeof targetPlayer.seekTo === "function" &&
      typeof targetPlayer.playVideo === "function"
    ) {
      try {
        targetPlayer.seekTo(Math.floor(targetLastTime || 0)); // Ensure seek time is a number
        targetPlayer.playVideo();
      } catch (e) {
        console.error("Error resuming player:", playerId, e);
        // Optional: Consider destroying and recreating if resume fails
        // destroyPlayer(playerId); handleModalOpen(playerId, videoId); // Be careful with recursion
      }
    } else {
      console.warn(
        "Player exists but methods not available on resume attempt:",
        playerId
      );
      // Could potentially queue the action or log for debugging
    }
  }
}

function onPlayerReady(event) {
  console.log("Player ready:", event.target.getIframe().id);
  // Autoplay is set in playerVars, but playVideo() can be a fallback.
  // Check if playVideo function exists before calling, just in case.
  if (event.target && typeof event.target.playVideo === "function") {
    try {
      event.target.playVideo();
    } catch (e) {
      console.error(
        "Error calling playVideo in onPlayerReady for:",
        event.target.getIframe().id,
        e
      );
    }
  } else {
    console.warn(
      "onPlayerReady: playVideo function not found for",
      event.target
    );
  }
}

// Optional: Add error handler function
// function onPlayerError(event) {
//   console.error("YouTube Player Error:", event.data, "for player:", event.target.getIframe().id);
//   // You might want to destroy the player on certain errors
//   // destroyPlayer(event.target.getIframe().id);
// }

// Optional: Helper function to destroy player cleanly
// function destroyPlayer(playerId) {
//   let playerToDestroy = (playerId === 'player1') ? player1 : player2;
//   if (playerToDestroy && typeof playerToDestroy.destroy === 'function') {
//     try {
//       playerToDestroy.destroy();
//       console.log("Destroyed player:", playerId);
//     } catch (e) {
//       console.error("Error destroying player:", playerId, e);
//     }
//   }
//   if (playerId === 'player1') {
//     player1 = null;
//     lastTime1 = 0;
//   } else {
//     player2 = null;
//     lastTime2 = 0;
//   }
// }

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
