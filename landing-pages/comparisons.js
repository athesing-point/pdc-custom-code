document.addEventListener("DOMContentLoaded", function () {
  // Check if the URL contains a '?'
  if (window.location.href.includes("?")) {
    // Show elements with dataIsLanding="true"
    document
      .querySelectorAll('[data-is-landing="true"]')
      .forEach(function (element) {
        element.style.display = "block";
      });

    // Hide elements with dataIsLanding="false"
    document
      .querySelectorAll('[data-is-landing="false"]')
      .forEach(function (element) {
        element.style.display = "none";
      });
  }
});
