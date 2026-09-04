(function () {
  function initCarousel(root) {
    var slides = Array.prototype.slice.call(
      root.querySelectorAll(".shot-carousel__slide")
    );
    if (slides.length === 0) return;

    var thumbs = Array.prototype.slice.call(
      root.querySelectorAll(".shot-carousel__thumb")
    );
    var currentEl = root.querySelector("[data-shot-current]");
    var captionEl = root.querySelector("[data-shot-caption]");
    var prevBtn = root.querySelector("[data-shot-prev]");
    var nextBtn = root.querySelector("[data-shot-next]");
    var index = 0;

    function show(nextIndex) {
      var total = slides.length;
      index = ((nextIndex % total) + total) % total;

      slides.forEach(function (slide, i) {
        var active = i === index;
        slide.classList.toggle("is-active", active);
        if (active) {
          slide.removeAttribute("hidden");
        } else {
          slide.setAttribute("hidden", "");
        }
      });

      thumbs.forEach(function (thumb, i) {
        var active = i === index;
        thumb.classList.toggle("is-active", active);
        thumb.setAttribute("aria-selected", active ? "true" : "false");
      });

      if (currentEl) {
        currentEl.textContent = String(index + 1);
      }

      if (captionEl) {
        captionEl.textContent = slides[index].getAttribute("alt") || "";
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        show(index - 1);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        show(index + 1);
      });
    }

    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var goto = parseInt(thumb.getAttribute("data-shot-goto"), 10);
        if (!isNaN(goto)) show(goto);
      });
    });

    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        show(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        show(index + 1);
      }
    });

    root.setAttribute("tabindex", "0");
  }

  document.querySelectorAll("[data-shot-carousel]").forEach(initCarousel);
})();
