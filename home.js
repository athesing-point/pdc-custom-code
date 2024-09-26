var player1, player2;

function onYouTubeIframeAPIReady() {
  var openModal1Button = document.querySelector("#openmodal1");
  var openModal2Button = document.querySelector("#openmodal2");

  jQuery(document).on("click", "#openmodal1", function () {
    setTimeout(function () {
      if (!player1) {
        player1 = new YT.Player("player1", {
          height: "100%",
          width: "100%",
          videoId: "scIZq2PPzU0",
          events: {
            onReady: onPlayerReady,
          },
        });
      } else {
        player1.playVideo();
      }
    }, 50); // 1 second delay
  });

  jQuery(document).on("click", "#openmodal2", function () {
    setTimeout(function () {
      if (!player2) {
        player2 = new YT.Player("player2", {
          height: "100%",
          width: "100%",
          videoId: "SKcxYIl-tT8",
          events: {
            onReady: onPlayerReady,
          },
        });
      } else {
        player2.playVideo();
      }
    }, 50); // 1 second delay
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
}

jQuery(document).on("click", "#modal1 .close-button-wrapper", function () {
  if (player1) {
    player1.pauseVideo();
  }
});

jQuery(document).on("click", "#modal2 .close-button-wrapper", function () {
  if (player2) {
    player2.pauseVideo();
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
