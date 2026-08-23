// Light/dark mode. Previously handled by `next-themes`; the same storage key
// and values are used, so a returning visitor keeps whatever they picked.
//
// The class is applied by a blocking inline script in `BaseLayout.astro` before
// first paint — this module is only the client-side API the toggle uses.

export type Theme = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "theme";

export function prefersDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

export function getTheme(): Theme {
  try {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (stored === "light" || stored === "dark" || stored === "system") {
      return stored;
    }
  } catch {
    // Ignore (private mode / storage disabled).
  }

  return "system";
}

// Apply the given theme (or the stored one) to <html>.
export function applyTheme(theme: Theme = getTheme()): void {
  const resolved =
    theme === "system" ? (prefersDark() ? "dark" : "light") : theme;

  document.documentElement.classList.toggle("dark", resolved === "dark");
  document.documentElement.style.colorScheme = resolved;
}

export function setTheme(theme: Theme): void {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Ignore (private mode / storage full).
  }

  applyTheme(theme);
}
