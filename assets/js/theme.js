(function () {
  var storageKey = "theme";
  var root = document.documentElement;
  var toggle = document.getElementById("theme-toggle");

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function setTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(storageKey, theme);
    } catch (e) {}
    if (toggle) {
      toggle.setAttribute(
        "aria-label",
        theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
      );
      toggle.setAttribute(
        "title",
        theme === "dark" ? "라이트 모드" : "다크 모드"
      );
    }
    try {
      window.dispatchEvent(
        new CustomEvent("themechange", { detail: { theme: theme } })
      );
    } catch (e) {}
  }

  if (toggle) {
    setTheme(currentTheme());
    toggle.addEventListener("click", function () {
      setTheme(currentTheme() === "dark" ? "light" : "dark");
    });
  }
})();
