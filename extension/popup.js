const BASE_URL = "http://localhost:3000";

const statusEl = document.getElementById("status");
const openBtn = document.getElementById("open");

let videoInfo = null;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab || !tab.url || !tab.url.includes("youtube.com/watch")) {
    statusEl.textContent = "Navigate to a YouTube video to get started.";
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: "getVideoInfo" }, (response) => {
    if (chrome.runtime.lastError || !response) {
      // Fallback to tab title
      const title = tab.title ? tab.title.replace(" - YouTube", "") : "";
      videoInfo = { title, url: tab.url };
    } else {
      videoInfo = { title: response.title, url: tab.url };
    }

    if (videoInfo.title) {
      statusEl.textContent = videoInfo.title;
      openBtn.disabled = false;
    } else {
      statusEl.textContent = "Could not detect video title.";
    }
  });
});

openBtn.addEventListener("click", () => {
  if (!videoInfo) return;
  const params = new URLSearchParams({
    videoTitle: videoInfo.title,
    videoUrl: videoInfo.url,
  });
  chrome.tabs.create({ url: `${BASE_URL}/chat?${params.toString()}` });
});
