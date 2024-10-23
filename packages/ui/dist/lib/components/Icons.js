"use strict";
import { jsx } from "react/jsx-runtime";
const aguapaneia = chrome.runtime.getURL("content-ui/aguapaneia.svg");
const options = chrome.runtime.getURL("content-ui/options.svg");
export const ArrowCircleIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z",
        clipRule: "evenodd"
      }
    )
  }
);
export const InfoCircleIcon = () => /* @__PURE__ */ jsx(
  "svg",
  {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        fillRule: "evenodd",
        d: "M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z",
        clipRule: "evenodd"
      }
    )
  }
);
export const OptionsIcon = () => /* @__PURE__ */ jsx("img", { src: options, alt: "Options" });
export const AguapaneIAIcon = () => /* @__PURE__ */ jsx("img", { src: aguapaneia, alt: "Aguapane IA" });
//# sourceMappingURL=Icons.js.map
