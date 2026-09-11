import { mermaidInitializeOptions } from "./mermaid-theme.js";

(function () {
  var graphs = [];
  var mermaidPromise = null;
  var dialogEl = null;
  var MERMAID_CDN =
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";

  var EXPAND_ICON_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4 4h6v2H7.41L16 14.59 14.59 16 6 7.41V12H4V4Zm16 0v6h-2V7.41L13.41 16 12 14.59 16.59 10H12V4h8Zm0 16h-8v-2h4.59L4.41 7.41 3 8.83 12.59 18.4V14h2v6Z"/></svg>';

  var CLOSE_ICON_SVG =
    '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.42L12 13.41l4.89 4.9a1 1 0 0 0 1.42-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4Z"/></svg>';

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

  function setExpandExpanded(activeBtn) {
    document.querySelectorAll(".mermaid-wrap__expand").forEach(function (btn) {
      btn.setAttribute("aria-expanded", btn === activeBtn ? "true" : "false");
    });
  }

  function closeDialog() {
    if (dialogEl && dialogEl.open) {
      dialogEl.close();
    }
  }

  function ensureDialog() {
    if (dialogEl) return dialogEl;

    dialogEl = document.createElement("dialog");
    dialogEl.className = "mermaid-dialog";
    dialogEl.setAttribute("aria-label", "도식 크게 보기");

    var closeBtn = document.createElement("button");
    closeBtn.type = "button";
    closeBtn.className = "mermaid-dialog__close";
    closeBtn.setAttribute("aria-label", "닫기");
    closeBtn.innerHTML = CLOSE_ICON_SVG;
    closeBtn.addEventListener("click", closeDialog);

    var viewport = document.createElement("div");
    viewport.className = "mermaid-dialog__viewport";

    dialogEl.appendChild(closeBtn);
    dialogEl.appendChild(viewport);
    document.body.appendChild(dialogEl);

    dialogEl.addEventListener("click", function (event) {
      if (event.target === dialogEl) {
        closeDialog();
      }
    });
    dialogEl.addEventListener("close", function () {
      setExpandExpanded(null);
    });

    return dialogEl;
  }

  function stripSvgSizing(container) {
    container.querySelectorAll("svg").forEach(function (svg) {
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    });
  }

  function sizePopupSvg(viewport) {
    var popupSvg = viewport.querySelector("svg");
    if (!popupSvg || !popupSvg.viewBox || !popupSvg.viewBox.baseVal) return;

    var vb = popupSvg.viewBox.baseVal;
    if (!vb.width || !vb.height) return;

    // Natural layout size — do not stretch to the dialog.
    popupSvg.style.width = vb.width + "px";
    popupSvg.style.height = vb.height + "px";
    popupSvg.style.maxWidth = "none";
  }

  function createExpandButton(idx) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "mermaid-wrap__expand";
    btn.setAttribute("aria-label", "도식 크게 보기");
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML = EXPAND_ICON_SVG;
    btn.addEventListener("click", function () {
      openDialog(idx, btn).catch(function (err) {
        console.error("mermaid-notes:", err);
      });
    });
    return btn;
  }

  async function openDialog(idx, btn) {
    var graph = graphs[idx];
    if (!graph) return;

    ensureDialog();
    var viewport = dialogEl.querySelector(".mermaid-dialog__viewport");
    viewport.innerHTML = "";

    var div = document.createElement("div");
    div.className = "mermaid";
    div.textContent = graph;
    viewport.appendChild(div);

    // Dialog must be visible before layout; hidden dialog yields ~16px SVG.
    dialogEl.showModal();
    setExpandExpanded(btn);

    try {
      var mermaid = await loadMermaid();
      mermaid.initialize(mermaidInitializeOptions());
      await mermaid.run({ nodes: [div] });
      stripSvgSizing(viewport);
      sizePopupSvg(viewport);
    } catch (err) {
      closeDialog();
      throw err;
    }
  }

  function attachExpandControls(wrap) {
    var mermaidEl = wrap.querySelector(".mermaid");
    if (!mermaidEl) return;

    var idx = +wrap.getAttribute("data-mermaid-index");
    var canvas = document.createElement("div");
    canvas.className = "mermaid-wrap__canvas";

    wrap.insertBefore(canvas, mermaidEl);
    canvas.appendChild(mermaidEl);
    wrap.insertBefore(createExpandButton(idx), canvas);
  }

  async function renderAll() {
    if (!graphs.length) return;
    closeDialog();

    var mermaid = await loadMermaid();
    mermaid.initialize(mermaidInitializeOptions());

    document.querySelectorAll(".mermaid-wrap").forEach(function (wrap) {
      var idx = +wrap.getAttribute("data-mermaid-index");
      wrap.innerHTML = "";
      var div = document.createElement("div");
      div.className = "mermaid";
      div.textContent = graphs[idx];
      wrap.appendChild(div);
    });

    await mermaid.run({ querySelector: ".mermaid-wrap .mermaid" });

    document.querySelectorAll(".mermaid-wrap svg").forEach(function (svg) {
      svg.removeAttribute("width");
      svg.removeAttribute("height");
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    });

    document.querySelectorAll(".mermaid-wrap").forEach(attachExpandControls);
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
