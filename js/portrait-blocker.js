/** Check for portrait orientation and display overlay if necessary 
 * This function checks if the device is in portrait mode with a width less than or equal to 768px.
 * If so, it displays an overlay that blocks interaction with the game. Otherwise, it hides the overlay.
 */
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

/* Run when the page is fully loaded */
window.addEventListener("load", checkPortraitOverlay);

/* Run when the window is resized */
window.addEventListener("resize", checkPortraitOverlay);

/* Run when the device orientation changes */
window.addEventListener("orientationchange", checkPortraitOverlay);