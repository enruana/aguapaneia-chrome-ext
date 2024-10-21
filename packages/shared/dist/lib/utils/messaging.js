"use strict";
export function sendMessageToContentUI(message) {
  if (typeof chrome !== "undefined" && chrome.tabs && chrome.tabs.query) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab && activeTab.id) {
        chrome.tabs.sendMessage(activeTab.id, message);
      }
    });
  } else {
    console.warn("chrome.tabs API is not available in this context");
  }
}
//# sourceMappingURL=messaging.js.map
