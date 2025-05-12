// Rebuilt Youtube embeds removing Jquery dependency
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
