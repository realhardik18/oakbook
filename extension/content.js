// Backward-compat: respond to popup's getVideoInfo requests
chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "getVideoInfo") {
    const info = extractCurrentVideo();
    sendResponse({ title: info.videoTitle });
  }
});

// Auto-detect video changes and notify background service worker
let lastVideoUrl = null;
let debounceTimer = null;

function extractCurrentVideo() {
  const titleEl = document.querySelector(
    "yt-formatted-string.style-scope.ytd-watch-metadata"
  );
  const videoTitle = titleEl
    ? titleEl.textContent.trim()
    : document.title.replace(" - YouTube", "");

  const channelEl = document.querySelector(
    "ytd-channel-name yt-formatted-string a"
  );
  const channelName = channelEl ? channelEl.textContent.trim() : null;

  return {
    videoUrl: window.location.href,
    videoTitle,
    channelName,
  };
}

function notifyVideoDetected() {
  const currentUrl = window.location.href;

  // Only send if URL actually changed (dedup)
  if (currentUrl === lastVideoUrl) return;
  if (!currentUrl.includes("youtube.com/watch")) return;

  lastVideoUrl = currentUrl;

  // Small delay to let YouTube DOM update with new title
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const info = extractCurrentVideo();
    chrome.runtime.sendMessage(
      { type: "VIDEO_DETECTED", payload: info },
      () => {
        // Ignore errors (e.g. if background is not ready)
        if (chrome.runtime.lastError) {
          // noop
        }
      }
    );
  }, 1500);
}

// YouTube SPA navigation
document.addEventListener("yt-navigate-finish", notifyVideoDetected);

// Initial page load
notifyVideoDetected();
