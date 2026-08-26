(function () {
  var MIN_LINES = 8;
  var root = document.querySelector(".post-content");
  if (!root) return;

  var path = location.pathname.replace(/\/$/, "") || "/";
  if (path === "/notes" || path.indexOf("/notes/") !== 0) return;

  var LANG_LABELS = {
    csharp: "C#",
    cs: "C#",
    javascript: "JavaScript",
    js: "JavaScript",
    typescript: "TypeScript",
    ts: "TypeScript",
    json: "JSON",
    yaml: "YAML",
    yml: "YAML",
    bash: "Shell",
    shell: "Shell",
    sh: "Shell",
    html: "HTML",
    css: "CSS",
    scss: "SCSS",
    xml: "XML",
    sql: "SQL",
    ruby: "Ruby",
    python: "Python",
    py: "Python",
    go: "Go",
    rust: "Rust",
    plaintext: "텍스트",
    text: "텍스트",
    md: "Markdown",
    markdown: "Markdown"
  };

  function lineCount(block) {
    var code = block.querySelector("code") || block;
    var text = (code.textContent || "").replace(/\n$/, "");
    if (!text) return 0;
    return text.split("\n").length;
  }

  function langFromBlock(block) {
    var classes = (block.className || "").split(/\s+/);
    for (var i = 0; i < classes.length; i += 1) {
      var m = /^language-(.+)$/.exec(classes[i]);
      if (m) return m[1].toLowerCase();
    }
    var code = block.querySelector("code[class*='language-']");
    if (code) {
      var codeClasses = (code.className || "").split(/\s+/);
      for (var j = 0; j < codeClasses.length; j += 1) {
        var cm = /^language-(.+)$/.exec(codeClasses[j]);
        if (cm) return cm[1].toLowerCase();
      }
    }
    return "";
  }

  function metaLabel(lang, lines) {
    var parts = [];
    if (lang && lang !== "mermaid") {
      parts.push(LANG_LABELS[lang] || lang);
    }
    parts.push(lines + "줄");
    return parts.join(" · ");
  }

  var blocks = Array.prototype.slice.call(
    root.querySelectorAll(".highlighter-rouge")
  );

  blocks.forEach(function (block) {
    if (block.closest(".code-collapse")) return;

    var lang = langFromBlock(block);
    if (lang === "mermaid") return;

    var lines = lineCount(block);
    if (lines < MIN_LINES) return;

    var details = document.createElement("details");
    details.className = "code-collapse";

    var summary = document.createElement("summary");
    summary.className = "code-collapse__summary";

    var closed = document.createElement("span");
    closed.className = "code-collapse__when-closed";
    closed.textContent = "코드 펼치기";

    var open = document.createElement("span");
    open.className = "code-collapse__when-open";
    open.textContent = "코드 접기";

    var meta = document.createElement("span");
    meta.className = "code-collapse__meta";
    meta.textContent = metaLabel(lang, lines);

    summary.appendChild(closed);
    summary.appendChild(open);
    summary.appendChild(meta);

    var parent = block.parentNode;
    parent.insertBefore(details, block);
    details.appendChild(summary);
    details.appendChild(block);
  });
})();
