document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const firstName = document.getElementById("first-name").value;
      const email = document.getElementById("code").value;
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        const url = `https://point.com/refer/welcome?utm_source=referpageV0424&utm_medium=referral&utm_term=${email}&name=${firstName}`;
        console.log(url);
        const utmLink = document.querySelector(".refer-form_utm-link");
        if (utmLink) {
          utmLink.setAttribute("href", url);
          utmLink.innerText = url;
        }
        //window.open(url, '_blank');
      } else {
        const errorMessage =
          "You entered an invalid code. Please try again or click the 'Don't have an offer code?' link to continue.";
        const successMsg = document.querySelector(".refer-form_success");
        if (successMsg) {
          successMsg.innerText = errorMessage;
          successMsg.style.marginBottom = "0";
        }
        const copyLinkElement = document.querySelector(
          ".copy-article-link-click"
        );
        if (copyLinkElement) {
          copyLinkElement.style.display = "none";
        }
        const url =
          "https://home.point.com/?utm_source=referpageV0424&utm_medium=referral&utm_term=invalid";
        console.log(url);
        //window.open(url, '_blank');
      }
    });
  }
});

function Copy() {
  const referLink = document.querySelector(".refer-form_utm-link");
  if (referLink) {
    const text = referLink.getAttribute("href");
    navigator.clipboard.writeText(text).then(function () {
      console.log("Copied!");
    });
  }
}
