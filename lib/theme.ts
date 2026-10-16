/**
 * Colour theme preference: "light", "dark", or "system" (the default — follows
 * the OS setting). The preference lives in localStorage; the *resolved* theme
 * is written to <html data-theme="light|dark">, which globals.css keys off.
 *
 * THEME_SCRIPT runs inline in <head> (see app/layout.tsx) so the right theme
 * is applied before first paint, and keeps "system" in sync with OS changes.
 */

export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "reeco-theme";
export const THEME_CHANGE_EVENT = "reeco-theme-change";

export const THEME_SCRIPT = `(function(){var d=document.documentElement,m=window.matchMedia("(prefers-color-scheme: dark)");function p(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")return t}catch(e){}return "system"}function a(){var t=p();d.setAttribute("data-theme",t==="system"?(m.matches?"dark":"light"):t);d.setAttribute("data-theme-pref",t)}a();window.__reecoApplyTheme=a;m.addEventListener("change",a);window.addEventListener("storage",function(e){if(e.key==="${THEME_STORAGE_KEY}")a()})})()`;

declare global {
  interface Window {
    __reecoApplyTheme?: () => void;
  }
}

export function readThemePreference(): ThemePreference {
  const pref = document.documentElement.getAttribute("data-theme-pref");
  return pref === "light" || pref === "dark" ? pref : "system";
}

export function setThemePreference(pref: ThemePreference) {
  try {
    if (pref === "system") localStorage.removeItem(THEME_STORAGE_KEY);
    else localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    // Storage blocked (private mode etc.) — still apply for this page view.
  }
  if (window.__reecoApplyTheme) {
    window.__reecoApplyTheme();
  }
  // Storage may be unavailable, so set the attributes directly as well.
  const root = document.documentElement;
  const resolved =
    pref === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : pref;
  root.setAttribute("data-theme", resolved);
  root.setAttribute("data-theme-pref", pref);
  window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
}

export function subscribeThemePreference(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(THEME_CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}
