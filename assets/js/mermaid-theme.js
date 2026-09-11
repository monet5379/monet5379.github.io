// Site-aligned Mermaid tokens — single source for notes + link preview.
// Maps to _sass/color-scheme.scss (--color-base-*, --color-blue).

export var MERMAID_THEME_VARS = {
  light: {
    darkMode: false,
    background: "#fafafa",
    primaryColor: "#f0f0f0",
    primaryTextColor: "#222222",
    primaryBorderColor: "#bdbdbd",
    secondaryColor: "#ebebeb",
    secondaryTextColor: "#222222",
    secondaryBorderColor: "#bdbdbd",
    tertiaryColor: "#f5f5f5",
    tertiaryTextColor: "#707070",
    tertiaryBorderColor: "#dadada",
    lineColor: "#bdbdbd",
    textColor: "#222222",
    mainBkg: "#f0f0f0",
    nodeBorder: "#bdbdbd",
    clusterBkg: "#f5f5f5",
    clusterBorder: "#dadada",
    titleColor: "#222222",
    edgeLabelBackground: "#fafafa",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    fontSize: "14px",
  },
  dark: {
    darkMode: true,
    background: "#1c1c1c",
    primaryColor: "#282828",
    primaryTextColor: "#dadada",
    primaryBorderColor: "#555555",
    secondaryColor: "#2e2e2e",
    secondaryTextColor: "#dadada",
    secondaryBorderColor: "#555555",
    tertiaryColor: "#212121",
    tertiaryTextColor: "#999999",
    tertiaryBorderColor: "#3f3f3f",
    lineColor: "#555555",
    textColor: "#dadada",
    mainBkg: "#282828",
    nodeBorder: "#555555",
    clusterBkg: "#212121",
    clusterBorder: "#3f3f3f",
    titleColor: "#dadada",
    edgeLabelBackground: "#1c1c1c",
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif",
    fontSize: "14px",
  },
};

export function mermaidPageTheme() {
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function mermaidInitializeOptions() {
  var mode = mermaidPageTheme();
  return {
    startOnLoad: false,
    theme: "base",
    themeVariables: MERMAID_THEME_VARS[mode],
    securityLevel: "strict",
    flowchart: { htmlLabels: true, curve: "basis" },
  };
}
