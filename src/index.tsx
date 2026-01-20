import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";

const faviconUrl = new URL("../lupin-logo.png", import.meta.url).href;
const existingFavicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
const faviconLink = existingFavicon ?? document.createElement("link");
faviconLink.rel = "icon";
faviconLink.type = "image/png";
faviconLink.href = faviconUrl;
if (!existingFavicon) {
  document.head.appendChild(faviconLink);
}

render(<App />, document.getElementById("root"));