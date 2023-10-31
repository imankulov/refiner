"use client";

export function isMac() {
  return navigator.platform.toUpperCase().indexOf("MAC") >= 0;
}

export function getMetaKeyDisplay() {
  return isMac() ? "⌘" : "Ctrl";
}

export function getShiftKeyDisplay() {
  return isMac() ? "⇧" : "Shift";
}

export function isMetaPressed(event: React.KeyboardEvent) {
  return isMac() ? event.metaKey : event.ctrlKey;
}
