// Content script that runs on the extension-auth page.
// Reads the token from the DOM and stores it in chrome.storage.local.

function captureToken() {
  const el = document.getElementById("oakbook-extension-token");
  if (!el) return false;

  const token = el.getAttribute("data-token");
  if (!token) return false;

  chrome.storage.local.set({ oakbookToken: token }, () => {
    console.log("[Oakbook] Extension token saved.");
  });
  return true;
}

// The page is a React SPA, so the element may not exist immediately.
// Poll briefly until it appears.
let attempts = 0;
const interval = setInterval(() => {
  attempts++;
  if (captureToken() || attempts > 20) {
    clearInterval(interval);
  }
}, 500);
