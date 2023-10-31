"use client";

export function isMac() {
  return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
}

export function getMetaKeyDisplay() {
  return isMac() ? "⌘" : "Ctrl";
}

export function isMetaPressed(event: React.KeyboardEvent) {
  return isMac() ? event.metaKey : event.ctrlKey;
}
