window.onSubmitFfepForm = function (address) {
  // Do event handling here vvv
  console.log("FFEP form submitted", address);
  // Do event handling here ^^^
};
(function () {
  var fh = "home.point.dev";
  var pr = "https";
  if (location.host.match(/point\.com$/)) {
    fh = "home.point.com";
  } else {
    var qm = location.search.match(/[?&]ffep=([^&]*)/);
    if (qm != null) {
      var v = qm[1];
      if (v.match(/^(?:pr|eph)[0-9]+$/)) {
        fh = "home-" + v + ".point.dev";
      } else if (v === "local") {
        fh = "localhost:8080";
        pr = "http";
      } else if (v === "dev") {
        fh = "home.point.dev";
      } else if (v === "qa") {
        fh = "home-qa.point.dev";
      }
    }
  }
  var s = document.createElement("script");
  s.src = pr + "://" + fh + "/static/js/ffep.js";
  document.head.appendChild(s);
})();
