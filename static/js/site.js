document.addEventListener("DOMContentLoaded", function () {
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
});
