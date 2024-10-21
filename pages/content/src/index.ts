import { toggleTheme } from "@src/toggleTheme";
import { sendMessageToContentUI } from "@extension/shared";

console.log("content script loaded");

void toggleTheme();

document.addEventListener("selectionchange", () => {
  const selectedText = window.getSelection()?.toString().trim();
  if (selectedText) {
    const range = window.getSelection()?.getRangeAt(0);
    const rect = range?.getBoundingClientRect();
    if (rect) {
      sendMessageToContentUI({
        type: "SHOW_BUTTON",
        payload: {
          text: selectedText,
          position: {
            top: rect.bottom + window.scrollY,
            left: rect.left + window.scrollX,
          },
        },
      });
    }
  } else {
    sendMessageToContentUI({ type: "HIDE_BUTTON" });
  }
});
