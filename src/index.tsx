import './index.css';
import React from "react";
import { render } from "react-dom";
import { init } from "@amplitude/analytics-browser";
import { App } from "./App";

declare global {
  interface Window {
    __AMPLITUDE_INITIALIZED__?: boolean;
  }
}

if (!window.__AMPLITUDE_INITIALIZED__) {
  init("76a066196b9500570577766e70e3895c", undefined, {
    defaultTracking: {
      pageViews: true,
      sessions: true,
      formInteractions: true,
      fileDownloads: true,
    },
  });
  window.__AMPLITUDE_INITIALIZED__ = true;
}

const faviconUrl = new URL("../lupin-logo-transparent.png", import.meta.url).href;
const existingFavicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
const faviconLink = existingFavicon ?? document.createElement("link");
faviconLink.rel = "icon";
faviconLink.type = "image/png";
faviconLink.href = faviconUrl;
if (!existingFavicon) {
  document.head.appendChild(faviconLink);
}

render(<App />, document.getElementById("root"));