document.addEventListener("DOMContentLoaded", function () {
  // Remove focus-in class from refer labels
  var referLabels = document.querySelectorAll(
    ".form-label.refer-label.focus-in"
  );
  referLabels.forEach(function (label) {
    label.classList.remove("focus-in");
  });

  // Form input focus handlers
  $(".form-input").on("focusin", function () {
    $(this).siblings(".form-label").removeClass("input-focus-out");
  });

  $(".form-input").on("focusout", function () {
    if ($(this).val() === "") {
      $(this).siblings(".form-label").addClass("input-focus-out");
    } else {
      $(this).siblings(".form-label").removeClass("input-focus-out");
    }
  });
});
