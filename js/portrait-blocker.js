async function checkPortraitOverlay() {
  const isPortrait = window.matchMedia("(orientation: portrait) and (max-width: 768px)").matches;
  const overlay = document.getElementById("portrait-overlay");
  if (!overlay) return;
  if (isPortrait) {
    overlay.classList.add("show");
    document.body.classList.add("portrait-blocked");
  } else {
    overlay.classList.remove("show");
    document.body.classList.remove("portrait-blocked");
  }
}

// Run once when the page loads
window.addEventListener("load", checkPortraitOverlay);

// Run when the screen is resized
window.addEventListener("resize", checkPortraitOverlay);

// Run when device is rotated
window.addEventListener("orientationchange", checkPortraitOverlay);