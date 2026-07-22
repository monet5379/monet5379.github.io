(function () {
  var list = document.querySelector("[data-tag-filter-list]");
  if (!list) return;

  var items = Array.prototype.slice.call(list.children);
  var emptyEl = document.querySelector("[data-tag-filter-empty]");
  var tagRoots = Array.prototype.slice.call(
    document.querySelectorAll("[data-tag-filter]")
  );
  var sortRoot = document.querySelector("[data-sort-filter]");
  var sortButtons = sortRoot
    ? Array.prototype.slice.call(sortRoot.querySelectorAll(".tag-filter__btn"))
    : [];
  /** @type {Record<string, string>} root index → selected tag ("" = All) */
  var activeByGroup = {};
  var activeSort = "newest";

  tagRoots.forEach(function (_root, i) {
    activeByGroup[i] = "";
  });

  function itemTags(item) {
    var raw = item.getAttribute("data-tags");
    if (!raw) return [];
    try {
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  function itemDate(item) {
    return item.getAttribute("data-date") || "";
  }

  function selectedTags() {
    return tagRoots
      .map(function (_root, i) {
        return activeByGroup[i] || "";
      })
      .filter(Boolean);
  }

  function hasAllTags(itemTagsList, required) {
    for (var i = 0; i < required.length; i += 1) {
      if (itemTagsList.indexOf(required[i]) === -1) return false;
    }
    return true;
  }

  function applySort() {
    if (!sortRoot) return;

    var sorted = items.slice().sort(function (a, b) {
      var da = itemDate(a);
      var db = itemDate(b);
      if (da === db) return 0;
      if (activeSort === "oldest") {
        return da < db ? -1 : 1;
      }
      return da > db ? -1 : 1;
    });

    sorted.forEach(function (item) {
      list.appendChild(item);
    });
  }

  function applyFilter() {
    var required = selectedTags();
    var visible = 0;

    items.forEach(function (item) {
      var tags = itemTags(item);
      var show = required.length === 0 || hasAllTags(tags, required);
      item.hidden = !show;
      if (show) visible += 1;
    });

    if (emptyEl) {
      if (visible === 0) {
        emptyEl.removeAttribute("hidden");
      } else {
        emptyEl.setAttribute("hidden", "");
      }
    }
  }

  function syncButtons() {
    tagRoots.forEach(function (root, i) {
      var active = activeByGroup[i] || "";
      Array.prototype.slice
        .call(root.querySelectorAll(".tag-filter__btn"))
        .forEach(function (btn) {
          var tag = btn.getAttribute("data-tag") || "";
          var selected = tag === active;
          btn.classList.toggle("is-active", selected);
          btn.setAttribute("aria-pressed", selected ? "true" : "false");
        });
    });

    sortButtons.forEach(function (btn) {
      var selected = (btn.getAttribute("data-sort") || "") === activeSort;
      btn.classList.toggle("is-active", selected);
      btn.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function apply() {
    applySort();
    applyFilter();
    syncButtons();
  }

  tagRoots.forEach(function (root, i) {
    root.addEventListener("click", function (event) {
      var btn = event.target.closest(".tag-filter__btn");
      if (!btn || !root.contains(btn)) return;
      activeByGroup[i] = btn.getAttribute("data-tag") || "";
      apply();
    });
  });

  if (sortRoot) {
    sortRoot.addEventListener("click", function (event) {
      var btn = event.target.closest(".tag-filter__btn");
      if (!btn || !sortRoot.contains(btn)) return;
      activeSort = btn.getAttribute("data-sort") || "newest";
      apply();
    });
  }

  apply();
})();
