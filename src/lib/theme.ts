export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "rb-theme";
export const DEFAULT_THEME: Theme = "dark";

/** Browser bar color per theme (meta theme-color only accepts literal colors). */
export const themeColors: Record<Theme, string> = {
  dark: "#060606",
  light: "#f7f3f2",
};

/** Turns whatever is in storage into a valid theme, falling back to the default. */
export function resolveTheme(stored: string | null | undefined): Theme {
  return stored === "light" || stored === "dark" ? stored : DEFAULT_THEME;
}

/** Runs in <head> before paint so a saved theme never flashes the wrong colors. */
export const themeInitScript = `(function(){try{var s=localStorage.getItem(${JSON.stringify(
  THEME_STORAGE_KEY,
)});var t=s==="light"||s==="dark"?s:${JSON.stringify(
  DEFAULT_THEME,
)};var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);r.style.colorScheme=t;}catch(e){}})();`;
