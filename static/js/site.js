document.addEventListener("DOMContentLoaded", function () {
  function autoFitTitle(element) {
    var min = parseFloat(element.getAttribute("data-auto-fit-min") || "1.7");
    var max = parseFloat(element.getAttribute("data-auto-fit-max") || "4.9");
    var maxLines = parseInt(element.getAttribute("data-auto-fit-lines") || "4", 10);
    var low = min;
    var high = max;
    var best = min;
    var lineHeight;
    var currentStyle;
    var lines;
    var mid;

    element.style.fontSize = max + "rem";

    while (high - low > 0.05) {
      mid = (low + high) / 2;
      element.style.fontSize = mid.toFixed(3) + "rem";
      currentStyle = window.getComputedStyle(element);
      lineHeight = parseFloat(currentStyle.lineHeight);

      if (!lineHeight) {
        lineHeight = parseFloat(currentStyle.fontSize) * 1.02;
      }

      lines = element.scrollHeight / lineHeight;

      if (lines <= maxLines + 0.05) {
        best = mid;
        low = mid;
      } else {
        high = mid;
      }
    }

    element.style.fontSize = best.toFixed(3) + "rem";
  }

  function setupAutoFitTitles() {
    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-auto-fit='title']"));

    if (!elements.length) {
      return;
    }

    function refresh() {
      elements.forEach(autoFitTitle);
    }

    refresh();

    if (typeof ResizeObserver === "function") {
      var observer = new ResizeObserver(refresh);

      elements.forEach(function (element) {
        observer.observe(element);

        if (element.parentElement) {
          observer.observe(element.parentElement);
        }
      });
    } else {
      window.addEventListener("resize", refresh);
    }
  }

  function trackEvent(name, params) {
    if (typeof window.gtag !== "function") {
      return;
    }

    window.gtag("event", name, params || {});
  }

  function baseParams() {
    return {
      page_title: document.title,
      page_path: window.location.pathname
    };
  }

  function trackPageReady() {
    var root = document.documentElement;

    trackEvent("page_ready", {
      page_title: document.title,
      page_path: window.location.pathname,
      page_type: root.getAttribute("data-page-type") || "",
      entity_type: root.getAttribute("data-entity-type") || ""
    });
  }

  function trackOffersView() {
    var offers = document.getElementById("offers");

    if (!offers) {
      return;
    }

    trackEvent("offers_section_view", baseParams());
  }

  window.addEventListener("error", function (event) {
    trackEvent("exception", {
      page_title: document.title,
      page_path: window.location.pathname,
      description: event.message || "Unknown error",
      fatal: false
    });
  });

  window.addEventListener("unhandledrejection", function (event) {
    var reason = event.reason;
    var description = typeof reason === "string" ? reason : (reason && reason.message) || "Unhandled promise rejection";

    trackEvent("exception", {
      page_title: document.title,
      page_path: window.location.pathname,
      description: description,
      fatal: false
    });
  });

  document.addEventListener("click", function (event) {
    var tracked = event.target.closest("[data-analytics-event]");

    if (tracked) {
      trackEvent(tracked.getAttribute("data-analytics-event"), {
        page_title: document.title,
        page_path: window.location.pathname,
        label: tracked.getAttribute("data-analytics-label") || "",
        href: tracked.getAttribute("href") || ""
      });
    }
  });

  trackPageReady();
  trackOffersView();
  setupAutoFitTitles();
});
