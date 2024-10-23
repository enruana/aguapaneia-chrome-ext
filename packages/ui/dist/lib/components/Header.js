"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
const Header = ({ title = "AguapaneIA", icon }) => {
  return /* @__PURE__ */ jsx("header", { className: "p-6 border-b border-gray-200 flex items-center justify-between", children: /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-bold text-gray-800 flex items-center", children: [
    icon && /* @__PURE__ */ jsx("div", { className: "w-12 h-12 mr-2 text-red-600", children: icon }),
    title
  ] }) });
};
export { Header };
//# sourceMappingURL=Header.js.map
