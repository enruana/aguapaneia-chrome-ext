"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
import { jsx, jsxs } from "react/jsx-runtime";
const Input = (_a) => {
  var _b = _a, { label, className = "", as = "input", rows } = _b, props = __objRest(_b, ["label", "className", "as", "rows"]);
  const InputComponent = as === "textarea" ? "textarea" : "input";
  return /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
    label && /* @__PURE__ */ jsx("label", { className: "block text-sm font-semibold text-gray-700 mb-2", children: label }),
    /* @__PURE__ */ jsx(
      InputComponent,
      __spreadValues({
        className: `w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 ${className}`,
        rows: as === "textarea" ? rows : void 0
      }, props)
    )
  ] });
};
export { Input };
//# sourceMappingURL=Input.js.map
