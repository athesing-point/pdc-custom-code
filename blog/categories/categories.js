// Wait till the page is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Get the current URL
  var currentUrl = window.location.href;

  // Check if the URL does not contain the specific strings
  if (
    !currentUrl.includes("after-your-hei") &&
    !currentUrl.includes("point-research") &&
    !currentUrl.includes("tools")
  ) {
    // Get the element by its ID
    var element = document.getElementById("homeowner-active");
    if (element) {
      // Set the text color to #444
      element.style.color = "#444";
    }
  }

  // Category name search placeholder setup
  const categoryName = document.getElementById("category-name").textContent;
  const searchInput = document.getElementById("Article-Search");
  if (searchInput) {
    searchInput.setAttribute("placeholder", `Search '${categoryName}' posts`);
  }

  // Search Field Label Effect
  const formInputs = document.querySelectorAll(".form-input");
  formInputs.forEach((input) => {
    input.addEventListener("focusin", function () {
      const label = this.parentElement.querySelector(".form-label");
      if (label) label.classList.remove("input-focus-out");
    });

    input.addEventListener("focusout", function () {
      const label = this.parentElement.querySelector(".form-label");
      if (label) {
        if (this.value === "") {
          label.classList.add("input-focus-out");
        } else {
          label.classList.remove("input-focus-out");
        }
      }
    });
  });

  // Social Share Setup
  const title = document.title;
  const url = window.location.href;

  // Facebook share
  const fbShare = document.querySelector("[data-share-facebook]");
  if (fbShare) {
    fbShare.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`;
    fbShare.target = "_blank";
  }

  // Twitter share
  const twitterShare = document.querySelector("[data-share-twitter]");
  if (twitterShare) {
    twitterShare.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=${encodeURIComponent(title)}`;
    twitterShare.target = "_blank";
  }

  // LinkedIn share
  const linkedinShare = document.querySelector("[data-share-linkedin]");
  if (linkedinShare) {
    linkedinShare.href = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      url
    )}&title=${encodeURIComponent(title)}`;
    linkedinShare.target = "_blank";
  }
});

// Copy URL Function
function Copy() {
  let url = document.location.href;
  navigator.clipboard.writeText(url).then(function () {
    console.log("Copied!");
  });
}
