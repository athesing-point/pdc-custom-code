// Function to handle competitor visibility
function handleCompetitorVisibility() {
  // Default competitors to show (after Point)
  const defaultComps = ["hometap", "unlock"];

  // Get comp parameters from URL
  const urlParams = new URLSearchParams(window.location.search);
  const urlComps = Array.from(
    new Set(urlParams.getAll("comp").flatMap((comp) => comp.split(",")))
  );

  // Log URL competitors for debugging
  console.log("URL competitors:", urlComps);

  // Always show Point (no need to manage hide class for Point)
  const pointElement = document.querySelector('[comp="point"]');

  if (urlComps.length > 0) {
    // Filter out invalid competitors and limit to first 2
    const validComps = urlComps
      .filter(
        (comp) =>
          comp !== "point" &&
          comp.trim() !== "" &&
          document.querySelector(`[comp="${comp.trim()}"]`)
      )
      .slice(0, 2);

    // Log valid competitors for debugging
    console.log("Valid competitors found:", validComps);

    if (validComps.length === 2) {
      // Hide default competitors
      defaultComps.forEach((comp) => {
        const element = document.querySelector(`[comp="${comp}"]`);
        if (element) {
          element.classList.add("hide");
        }
      });

      // Show both specified competitors
      validComps.forEach((comp) => {
        const element = document.querySelector(`[comp="${comp}"]`);
        element.classList.remove("hide");
      });
    } else if (validComps.length === 1) {
      // Hide the rightmost default (unlock)
      const lastDefaultElement = document.querySelector(
        `[comp="${defaultComps[1]}"]`
      );
      if (lastDefaultElement) {
        lastDefaultElement.classList.add("hide");
      }

      // Show the specified competitor
      const element = document.querySelector(`[comp="${validComps[0]}"]`);
      element.classList.remove("hide");

      // Make sure first default is visible
      const firstDefaultElement = document.querySelector(
        `[comp="${defaultComps[0]}"]`
      );
      if (firstDefaultElement) {
        firstDefaultElement.classList.remove("hide");
      }
    }
  }
  // No else needed - defaults will remain visible with their initial hide/show states
}

// Run when DOM is loaded
document.addEventListener("DOMContentLoaded", handleCompetitorVisibility);
