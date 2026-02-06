const BASE_URL = "http://localhost:3000";

const statusEl = document.getElementById("status");
const authStatusEl = document.getElementById("auth-status");
const openBtn = document.getElementById("open");
const signinBtn = document.getElementById("signin");
const signoutBtn = document.getElementById("signout");

let videoInfo = null;

// Check auth status
chrome.storage.local.get("oakbookToken", ({ oakbookToken }) => {
  if (oakbookToken) {
    authStatusEl.textContent = "Connected";
    authStatusEl.className = "connected";
    signoutBtn.style.display = "block";
    signinBtn.style.display = "none";
  } else {
    authStatusEl.textContent = "Not connected";
    authStatusEl.className = "disconnected";
    signinBtn.style.display = "block";
    signoutBtn.style.display = "none";
  }
});

// Detect current video
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab || !tab.url || !tab.url.includes("youtube.com/watch")) {
    statusEl.textContent = "Navigate to a YouTube video to get started.";
    openBtn.disabled = false;
    return;
  }

  chrome.tabs.sendMessage(tab.id, { type: "getVideoInfo" }, (response) => {
    if (chrome.runtime.lastError || !response) {
      const title = tab.title ? tab.title.replace(" - YouTube", "") : "";
      videoInfo = { title, url: tab.url };
    } else {
      videoInfo = { title: response.title, url: tab.url };
    }

    if (videoInfo.title) {
      statusEl.textContent = videoInfo.title;
    } else {
      statusEl.textContent = "Could not detect video title.";
    }
    openBtn.disabled = false;
  });
});

// Open chat (no URL params needed — video is auto-detected)
openBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: `${BASE_URL}/chat` });
});

// Sign in
signinBtn.addEventListener("click", () => {
  chrome.tabs.create({ url: `${BASE_URL}/extension-auth` });
});

// Sign out
signoutBtn.addEventListener("click", () => {
  chrome.storage.local.remove("oakbookToken", () => {
    authStatusEl.textContent = "Not connected";
    authStatusEl.className = "disconnected";
    signinBtn.style.display = "block";
    signoutBtn.style.display = "none";
  });
});
