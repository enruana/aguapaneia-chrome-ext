"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
const Footer = ({ onClose, children }) => {
  return /* @__PURE__ */ jsxs("footer", { className: "p-6 bg-gray-50 flex justify-between items-center", children: [
    /* @__PURE__ */ jsx("div", { children }),
    /* @__PURE__ */ jsx("div", { children: onClose && /* @__PURE__ */ jsx(
      "button",
      {
        onClick: onClose,
        className: "py-2 px-6 bg-white text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition duration-200 transform hover:scale-105",
        children: "Close"
      }
    ) })
  ] });
};
export { Footer };
//# sourceMappingURL=Footer.js.map
