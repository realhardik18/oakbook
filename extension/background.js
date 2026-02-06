const BASE_URL = "http://localhost:3000";

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "VIDEO_DETECTED") {
    handleVideoDetected(message.payload).then(sendResponse);
    return true; // keep channel open for async response
  }
});

async function handleVideoDetected(payload) {
  const { oakbookToken } = await chrome.storage.local.get("oakbookToken");

  if (!oakbookToken) {
    console.warn("[Oakbook] No auth token. User needs to sign in.");
    return { success: false, reason: "not_authenticated" };
  }

  try {
    const res = await fetch(`${BASE_URL}/api/videos/active`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-extension-token": oakbookToken,
      },
      body: JSON.stringify({
        videoUrl: payload.videoUrl,
        videoTitle: payload.videoTitle,
        channelName: payload.channelName || null,
      }),
    });

    if (res.status === 401) {
      // Token expired — clear it so popup shows sign-in
      await chrome.storage.local.remove("oakbookToken");
      console.warn("[Oakbook] Token expired. Cleared.");
      return { success: false, reason: "token_expired" };
    }

    if (!res.ok) {
      const err = await res.json();
      console.error("[Oakbook] API error:", err);
      return { success: false, reason: "api_error" };
    }

    const data = await res.json();
    console.log("[Oakbook] Active video updated:", data.video?.video_title);
    return { success: true };
  } catch (err) {
    console.error("[Oakbook] Network error:", err);
    return { success: false, reason: "network_error" };
  }
}
