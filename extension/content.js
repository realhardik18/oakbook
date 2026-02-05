chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "getVideoInfo") {
    const titleEl = document.querySelector(
      "yt-formatted-string.style-scope.ytd-watch-metadata"
    );
    const title = titleEl
      ? titleEl.textContent.trim()
      : document.title.replace(" - YouTube", "");
    sendResponse({ title });
  }
});
