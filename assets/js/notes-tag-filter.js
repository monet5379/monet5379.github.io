(function () {
  var privateRoot = document.querySelector("[data-private-filter]");
  var privateButtons = privateRoot
    ? Array.prototype.slice.call(privateRoot.querySelectorAll(".tag-filter__btn"))
    : [];
  var storageKey = "notes-show-private";
  var showPrivate = false;
  var applyFn = null;

  function syncPrivateButtons() {
    privateButtons.forEach(function (btn) {
      var selected =
        (btn.getAttribute("data-private-show") || "off") ===
        (showPrivate ? "on" : "off");
      btn.classList.toggle("is-active", selected);
      btn.setAttribute("aria-pressed", selected ? "true" : "false");
    });
  }

  function setShowPrivate(next) {
    showPrivate = next;
    document.documentElement.setAttribute(
      "data-notes-private",
      showPrivate ? "on" : "off"
    );
    try {
      localStorage.setItem(storageKey, showPrivate ? "on" : "off");
    } catch (e) {}
    syncPrivateButtons();
    if (applyFn) applyFn();
  }

  try {
    showPrivate = localStorage.getItem(storageKey) === "on";
  } catch (e) {}
  document.documentElement.setAttribute(
    "data-notes-private",
    showPrivate ? "on" : "off"
  );

  if (privateRoot) {
    syncPrivateButtons();

    privateRoot.addEventListener("click", function (event) {
      var btn = event.target.closest(".tag-filter__btn");
      if (!btn || !privateRoot.contains(btn)) return;
      setShowPrivate(btn.getAttribute("data-private-show") === "on");
    });
  }

  var list = document.querySelector("[data-tag-filter-list]");
  if (!list) return;

  var items = Array.prototype.slice.call(list.children);
  var emptyEl = document.querySelector("[data-tag-filter-empty]");
  var pagerEl = document.querySelector("[data-notes-pager]");
  var pageSize = parseInt(list.getAttribute("data-page-size") || "0", 10) || 0;
  var currentPage = 1;
  var projectRoot = document.querySelector("[data-project-filter]");
  var projectNone = "__none__";
  var activeProject = "";
  var tagRoots = Array.prototype.slice.call(
    document.querySelectorAll("[data-tag-filter]")
  );
  var privateTagButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-private-tag]")
  );
  var activeByGroup = {};

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

  function itemSeries(item) {
    return item.getAttribute("data-series") || "";
  }

  function itemSeriesOrder(item) {
    var n = parseInt(item.getAttribute("data-series-order") || "", 10);
    return isNaN(n) ? null : n;
  }

  /** Same date: group by series, then series_order (1→N). Non-series after series ties. */
  function compareSeriesTie(a, b) {
    var sa = itemSeries(a);
    var sb = itemSeries(b);
    if (sa && sb) {
      if (sa !== sb) return sa < sb ? -1 : 1;
      var oa = itemSeriesOrder(a);
      var ob = itemSeriesOrder(b);
      if (oa == null && ob == null) return 0;
      if (oa == null) return 1;
      if (ob == null) return -1;
      return oa - ob;
    }
    if (sa && !sb) return -1;
    if (!sa && sb) return 1;
    return 0;
  }

  function itemProjects(item) {
    var raw = item.getAttribute("data-projects");
    if (!raw) {
      var one = item.getAttribute("data-project") || "";
      return one ? [one] : [];
    }
    try {
      var parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
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

  /** Newest first; same date → series_order. */
  function applySort() {
    var sorted = items.slice().sort(function (a, b) {
      var da = itemDate(a);
      var db = itemDate(b);
      if (da !== db) {
        return da > db ? -1 : 1;
      }
      return compareSeriesTie(a, b);
    });

    sorted.forEach(function (item) {
      list.appendChild(item);
    });
    items = sorted;
  }

  function matchingItems() {
    var required = selectedTags();
    return items.filter(function (item) {
      var tags = itemTags(item);
      var show = required.length === 0 || hasAllTags(tags, required);
      var projects = itemProjects(item);
      if (activeProject === projectNone) {
        if (projects.length > 0) show = false;
      } else if (activeProject && projects.indexOf(activeProject) === -1) {
        show = false;
      }
      if (!showPrivate && item.hasAttribute("data-private")) show = false;
      return show;
    });
  }

  function pageWindow(current, total, maxButtons) {
    maxButtons = maxButtons || 5;
    var pages = [];
    if (total <= maxButtons) {
      for (var i = 1; i <= total; i += 1) pages.push(i);
      return pages;
    }
    var half = Math.floor(maxButtons / 2);
    var start = Math.max(1, current - half);
    var end = start + maxButtons - 1;
    if (end > total) {
      end = total;
      start = end - maxButtons + 1;
    }
    for (var p = start; p <= end; p += 1) pages.push(p);
    return pages;
  }

  function makePagerBtn(label, opts) {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "notes-pagination__btn";
    btn.textContent = label;
    if (opts.ariaLabel) btn.setAttribute("aria-label", opts.ariaLabel);
    if (opts.disabled) {
      btn.disabled = true;
      btn.setAttribute("aria-disabled", "true");
    }
    if (opts.current) {
      btn.classList.add("is-active");
      btn.setAttribute("aria-current", "page");
    }
    if (opts.page != null) btn.setAttribute("data-page", String(opts.page));
    if (opts.action) btn.setAttribute("data-page-action", opts.action);
    return btn;
  }

  function renderPager(matchedCount, totalPages) {
    if (!pagerEl || pageSize <= 0) return;

    if (matchedCount === 0 || totalPages <= 1) {
      pagerEl.hidden = true;
      pagerEl.innerHTML = "";
      return;
    }

    pagerEl.hidden = false;
    pagerEl.innerHTML = "";

    pagerEl.appendChild(
      makePagerBtn("<<", {
        action: "first",
        ariaLabel: "첫 페이지",
        disabled: currentPage <= 1
      })
    );
    pagerEl.appendChild(
      makePagerBtn("<", {
        action: "prev",
        ariaLabel: "이전 페이지",
        disabled: currentPage <= 1
      })
    );

    pageWindow(currentPage, totalPages, 5).forEach(function (page) {
      pagerEl.appendChild(
        makePagerBtn(String(page), {
          page: page,
          ariaLabel: page + "페이지",
          current: page === currentPage
        })
      );
    });

    pagerEl.appendChild(
      makePagerBtn(">", {
        action: "next",
        ariaLabel: "다음 페이지",
        disabled: currentPage >= totalPages
      })
    );
    pagerEl.appendChild(
      makePagerBtn(">>", {
        action: "last",
        ariaLabel: "마지막 페이지",
        disabled: currentPage >= totalPages
      })
    );
  }

  function applyFilter(resetPage) {
    if (resetPage) currentPage = 1;

    var matched = matchingItems();
    var totalPages =
      pageSize > 0 ? Math.max(1, Math.ceil(matched.length / pageSize)) : 1;
    if (currentPage > totalPages) currentPage = totalPages;
    if (matched.length === 0) currentPage = 1;

    items.forEach(function (item) {
      item.hidden = true;
    });

    if (matched.length === 0) {
      if (emptyEl) emptyEl.removeAttribute("hidden");
      renderPager(0, 1);
      return;
    }

    if (emptyEl) emptyEl.setAttribute("hidden", "");

    if (pageSize > 0) {
      var start = (currentPage - 1) * pageSize;
      matched.slice(start, start + pageSize).forEach(function (item) {
        item.hidden = false;
      });
    } else {
      matched.forEach(function (item) {
        item.hidden = false;
      });
    }

    renderPager(matched.length, totalPages);
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

    syncPrivateButtons();

    if (projectRoot) {
      Array.prototype.slice
        .call(projectRoot.querySelectorAll(".tag-filter__btn"))
        .forEach(function (btn) {
          var selected =
            (btn.getAttribute("data-project") || "") === activeProject;
          btn.classList.toggle("is-active", selected);
          btn.setAttribute("aria-pressed", selected ? "true" : "false");
        });
    }

    privateTagButtons.forEach(function (btn) {
      btn.hidden = !showPrivate;
    });
  }

  function clearPrivateCategorySelection() {
    if (showPrivate) return;
    tagRoots.forEach(function (root, i) {
      var active = activeByGroup[i] || "";
      if (!active) return;
      var buttons = root.querySelectorAll(".tag-filter__btn");
      for (var j = 0; j < buttons.length; j += 1) {
        if (
          (buttons[j].getAttribute("data-tag") || "") === active &&
          buttons[j].hasAttribute("data-private-tag")
        ) {
          activeByGroup[i] = "";
          break;
        }
      }
    });
  }

  function apply(resetPage) {
    applySort();
    applyFilter(resetPage !== false);
    syncButtons();
  }

  applyFn = function () {
    clearPrivateCategorySelection();
    apply(true);
  };

  tagRoots.forEach(function (root, i) {
    root.addEventListener("click", function (event) {
      var btn = event.target.closest(".tag-filter__btn");
      if (!btn || !root.contains(btn)) return;
      activeByGroup[i] = btn.getAttribute("data-tag") || "";
      apply(true);
    });
  });

  if (projectRoot) {
    projectRoot.addEventListener("click", function (event) {
      var btn = event.target.closest(".tag-filter__btn");
      if (!btn || !projectRoot.contains(btn)) return;
      activeProject = btn.getAttribute("data-project") || "";
      apply(true);
    });
  }

  if (pagerEl) {
    pagerEl.addEventListener("click", function (event) {
      var btn = event.target.closest(".notes-pagination__btn");
      if (!btn || btn.disabled || !pagerEl.contains(btn)) return;

      var matched = matchingItems();
      var totalPages =
        pageSize > 0 ? Math.max(1, Math.ceil(matched.length / pageSize)) : 1;
      var action = btn.getAttribute("data-page-action");
      var pageAttr = btn.getAttribute("data-page");
      var next = currentPage;

      if (action === "first") next = 1;
      else if (action === "prev") next = Math.max(1, currentPage - 1);
      else if (action === "next") next = Math.min(totalPages, currentPage + 1);
      else if (action === "last") next = totalPages;
      else if (pageAttr) next = parseInt(pageAttr, 10) || 1;

      if (next === currentPage) return;
      currentPage = next;
      applyFilter(false);
      syncButtons();
    });
  }

  apply(true);
})();
