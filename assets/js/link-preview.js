(function () {
  if (
    !window.matchMedia ||
    !window.matchMedia("(hover: hover) and (pointer: fine)").matches
  ) {
    return;
  }

  var root = document.querySelector(".post-content");
  if (!root) return;

  var DELAY_MS = 300;
  var MERMAID_CDN =
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs";
  var KIND_LABELS = {
    note: "노트",
    project: "프로젝트",
    review: "리뷰"
  };
  var SKIP_PATHS = {
    "/": true,
    "/notes/": true,
    "/projects/": true,
    "/reviews/": true
  };

  var scriptEl = document.querySelector('script[src*="link-preview.js"]');
  var indexUrl =
    (scriptEl && scriptEl.getAttribute("data-index")) ||
    "/assets/link-preview.json";

  var indexPromise = null;
  var mermaidPromise = null;
  var showTimer = null;
  var activeLink = null;
  var lastShow = null;
  var card = null;
  var visualEl = null;
  var kindEl = null;
  var titleEl = null;
  var excerptEl = null;
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function loadIndex() {
    if (!indexPromise) {
      indexPromise = fetch(indexUrl)
        .then(function (res) {
          if (!res.ok) return {};
          return res.json();
        })
        .catch(function () {
          return {};
        });
    }
    return indexPromise;
  }

  var themePromise = null;

  function loadMermaidTheme() {
    if (!themePromise) {
      themePromise = import("./mermaid-theme.js");
    }
    return themePromise;
  }

  function loadMermaid() {
    if (!mermaidPromise) {
      mermaidPromise = import(MERMAID_CDN).then(function (mod) {
        return mod.default || mod;
      });
    }
    return mermaidPromise;
  }

  function stripInit(text) {
    return String(text || "")
      .replace(/^\uFEFF?%%\{init:[\s\S]*?\}%%\s*/m, "")
      .trim();
  }

  function decodeEntities(text) {
    var el = document.createElement("textarea");
    el.innerHTML = text;
    return el.value;
  }

  function normalizePath(path) {
    var clean = (path || "/").split("?")[0].split("#")[0];
    if (!clean) clean = "/";
    if (clean.length > 1 && clean.charAt(clean.length - 1) !== "/") {
      clean += "/";
    }
    return clean;
  }

  function currentPath() {
    return normalizePath(location.pathname);
  }

  function isExcluded(link) {
    return !!(
      link.closest(".post-list") ||
      link.closest(".shot-carousel") ||
      link.closest(".tag-filter") ||
      link.closest(".notes-browse__sidebar")
    );
  }

  function isImageOnly(link) {
    return (
      link.children.length === 1 &&
      link.children[0].tagName === "IMG" &&
      !(link.textContent || "").trim()
    );
  }

  function isInternal(link) {
    var href = link.getAttribute("href");
    if (!href || href.charAt(0) === "#") return false;
    if (/^(mailto|javascript|tel):/i.test(href)) return false;
    try {
      return new URL(href, location.href).origin === location.origin;
    } catch (e) {
      return false;
    }
  }

  function lookup(index, path) {
    if (Object.prototype.hasOwnProperty.call(index, path)) {
      return index[path];
    }
    var trimmed =
      path.length > 1 && path.charAt(path.length - 1) === "/"
        ? path.slice(0, -1)
        : path + "/";
    if (Object.prototype.hasOwnProperty.call(index, trimmed)) {
      return index[trimmed];
    }
    return null;
  }

  function ensureCard() {
    if (card) return;
    card = document.createElement("div");
    card.className = "link-preview";
    card.hidden = true;
    card.setAttribute("aria-hidden", "true");

    visualEl = document.createElement("div");
    visualEl.className = "link-preview__visual";
    visualEl.hidden = true;

    kindEl = document.createElement("p");
    kindEl.className = "link-preview__kind";
    titleEl = document.createElement("p");
    titleEl.className = "link-preview__title";
    excerptEl = document.createElement("p");
    excerptEl.className = "link-preview__excerpt";

    card.appendChild(visualEl);
    card.appendChild(kindEl);
    card.appendChild(titleEl);
    card.appendChild(excerptEl);
    document.body.appendChild(card);
  }

  function placeCard(clientX, clientY) {
    if (!card || card.hidden) return;
    var margin = 8;
    var offset = 16;
    var width = card.offsetWidth;
    var height = card.offsetHeight;
    var x = clientX + offset;
    var y = clientY + offset;
    if (x + width > window.innerWidth - margin) {
      x = clientX - width - offset;
    }
    if (y + height > window.innerHeight - margin) {
      y = clientY - height - offset;
    }
    if (x < margin) x = margin;
    if (y < margin) y = margin;
    card.style.left = Math.round(x) + "px";
    card.style.top = Math.round(y) + "px";
  }

  function clearVisual() {
    if (!visualEl) return;
    visualEl.hidden = true;
    visualEl.innerHTML = "";
  }

  function renderImageVisual(link, src, clientX, clientY) {
    visualEl.hidden = false;
    var img = document.createElement("img");
    img.alt = "";
    img.decoding = "async";
    img.onload = function () {
      if (activeLink === link) placeCard(clientX, clientY);
    };
    img.onerror = function () {
      if (activeLink === link) clearVisual();
      if (activeLink === link) placeCard(clientX, clientY);
    };
    img.src = src;
    visualEl.appendChild(img);
  }

  function renderMermaidVisual(link, source, clientX, clientY) {
    var graph = stripInit(decodeEntities(source));
    if (!graph) return;
    visualEl.hidden = false;
    var div = document.createElement("div");
    div.className = "mermaid";
    div.textContent = graph;
    visualEl.appendChild(div);

    Promise.all([loadMermaid(), loadMermaidTheme()])
      .then(function (parts) {
        if (activeLink !== link) return;
        var mermaid = parts[0];
        var theme = parts[1];
        mermaid.initialize(theme.mermaidInitializeOptions());
        return mermaid.run({ nodes: [div] });
      })
      .then(function () {
        if (activeLink !== link) return;
        var svg = visualEl.querySelector("svg");
        if (svg) {
          svg.removeAttribute("width");
          svg.removeAttribute("height");
          svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        }
        placeCard(clientX, clientY);
      })
      .catch(function () {
        if (activeLink === link) clearVisual();
        if (activeLink === link) placeCard(clientX, clientY);
      });
  }

  function applyVisual(link, visual, clientX, clientY) {
    clearVisual();
    if (!visual) return;
    if (visual.type === "image" && visual.src) {
      renderImageVisual(link, visual.src, clientX, clientY);
      return;
    }
    if (visual.type === "mermaid" && visual.source) {
      renderMermaidVisual(link, visual.source, clientX, clientY);
    }
  }

  function revealCard(link) {
    if (reduceMotion) {
      card.classList.add("is-visible");
    } else {
      card.classList.remove("is-visible");
      window.requestAnimationFrame(function () {
        if (activeLink === link) card.classList.add("is-visible");
      });
    }
  }

  function hide() {
    if (showTimer) {
      clearTimeout(showTimer);
      showTimer = null;
    }
    activeLink = null;
    lastShow = null;
    if (!card) return;
    clearVisual();
    card.hidden = true;
    card.classList.remove("is-visible");
  }

  function show(link, entry, clientX, clientY) {
    ensureCard();
    kindEl.textContent = KIND_LABELS[entry.kind] || "";
    titleEl.textContent = entry.title;
    excerptEl.textContent = entry.excerpt;
    lastShow = { link: link, entry: entry, clientX: clientX, clientY: clientY };
    applyVisual(link, entry.visual, clientX, clientY);
    card.hidden = false;
    placeCard(clientX, clientY);
    revealCard(link);
  }

  function onEnter(event) {
    var link = event.currentTarget;
    hide();
    activeLink = link;
    var clientX = event.clientX;
    var clientY = event.clientY;
    loadIndex();
    showTimer = setTimeout(function () {
      if (activeLink !== link) return;
      loadIndex().then(function (index) {
        if (activeLink !== link) return;
        var path = normalizePath(link.pathname);
        if (SKIP_PATHS[path] || path === currentPath()) return;
        var entry = lookup(index, path);
        if (!entry || !entry.title || !entry.excerpt) return;
        show(link, entry, clientX, clientY);
      });
    }, DELAY_MS);
  }

  var links = root.querySelectorAll("a[href]");
  for (var i = 0; i < links.length; i++) {
    var link = links[i];
    if (!isInternal(link) || isExcluded(link) || isImageOnly(link)) continue;
    link.addEventListener("mouseenter", onEnter);
    link.addEventListener("mouseleave", hide);
  }

  window.addEventListener("scroll", hide, { passive: true });
  window.addEventListener("blur", hide);
  window.addEventListener("themechange", function () {
    if (!lastShow || !card || card.hidden) return;
    var ctx = lastShow;
    if (activeLink !== ctx.link) return;
    if (!ctx.entry.visual || ctx.entry.visual.type !== "mermaid") return;
    applyVisual(ctx.link, ctx.entry.visual, ctx.clientX, ctx.clientY);
    placeCard(ctx.clientX, ctx.clientY);
  });
})();
