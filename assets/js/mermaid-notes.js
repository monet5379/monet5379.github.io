(function () {
  var graphs = [];
  var mermaidPromise = null;
  var MERMAID_CDN =
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

  function pageTheme() {
    return document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "default";
  }

  function stripInit(text) {
    return String(text || "")
      .replace(/^\uFEFF?%%\{init:[\s\S]*?\}%%\s*/m, "")
      .trim();
  }

  function prepareFromCodeBlocks() {
    var nodes = document.querySelectorAll("pre > code.language-mermaid");
    nodes.forEach(function (code) {
      var graph = stripInit(code.textContent);
      if (!graph) return;
      var wrap = document.createElement("div");
      wrap.className = "mermaid-wrap";
      wrap.setAttribute("data-mermaid-index", String(graphs.length));
      graphs.push(graph);
      code.parentElement.replaceWith(wrap);
    });
  }

  function loadMermaid() {
    if (!mermaidPromise) {
      mermaidPromise = import(MERMAID_CDN).then(function (mod) {
        return mod.default || mod;
      });
    }
    return mermaidPromise;
  }

  async function renderAll() {
    if (!graphs.length) return;
    var mermaid = await loadMermaid();
    mermaid.initialize({
      startOnLoad: false,
      theme: pageTheme(),
      securityLevel: "strict",
      flowchart: { htmlLabels: true },
    });

    document.querySelectorAll(".mermaid-wrap").forEach(function (wrap) {
      var idx = +wrap.getAttribute("data-mermaid-index");
      wrap.innerHTML = "";
      var div = document.createElement("div");
      div.className = "mermaid";
      div.textContent = graphs[idx];
      wrap.appendChild(div);
    });

    await mermaid.run({ querySelector: ".mermaid-wrap .mermaid" });

    // Mermaid sets fixed width/height from layout; drop them so CSS
    // scales every diagram to the content column (unified size).
    document.querySelectorAll(".mermaid-wrap svg").forEach(function (svg) {
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    });
  }

  function boot() {
    prepareFromCodeBlocks();
    if (!graphs.length) return;
    renderAll().catch(function (err) {
      console.error("mermaid-notes:", err);
    });
    window.addEventListener("themechange", function () {
      renderAll().catch(function (err) {
        console.error("mermaid-notes:", err);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
