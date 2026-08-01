(function () {
  "use strict";

  var ALLOWED_ATTRIBUTION = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];
  var params = new URLSearchParams(window.location.search);
  var attribution = {};

  ALLOWED_ATTRIBUTION.forEach(function (key) {
    var value = params.get(key);
    if (value) attribution[key] = value.slice(0, 80);
  });

  function slug(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/[^a-z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 40);
  }

  function eventDetail(type, link) {
    return {
      event: type,
      page: window.location.pathname,
      asin: link ? link.dataset.asin || "" : "",
      placement: link ? link.dataset.placement || "" : "",
      source: attribution.utm_source || "direct",
      campaign: attribution.utm_campaign || "",
      creative: attribution.utm_content || "",
      device: window.matchMedia("(max-width: 760px)").matches ? "mobile" : "desktop"
    };
  }

  function record(detail) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(detail);
    window.dispatchEvent(new CustomEvent("piero:funnel", { detail: detail }));

    // Aggregated, on-device QA counters only. No names, emails, IPs, or fingerprinting.
    try {
      var key = "piero_funnel_counts_v1";
      var counts = JSON.parse(localStorage.getItem(key) || "{}");
      var bucket = [detail.event, detail.page, detail.asin, detail.campaign, detail.creative, detail.device]
        .map(slug)
        .join("|");
      counts[bucket] = (counts[bucket] || 0) + 1;
      localStorage.setItem(key, JSON.stringify(counts));
    } catch (_) {
      // Tracking must never interrupt the affiliate destination.
    }
  }

  document.querySelectorAll("a[data-amazon-link]").forEach(function (link) {
    try {
      var destination = new URL(link.href);
      var subtag = [
        "pin",
        slug(attribution.utm_campaign || "organic"),
        slug(attribution.utm_content || link.dataset.placement || "storefront"),
        slug(link.dataset.asin)
      ].join("_").slice(0, 100);
      destination.searchParams.set("ascsubtag", subtag);
      link.href = destination.toString();
    } catch (_) {
      // Leave the approved destination untouched if URL parsing ever fails.
    }

    link.addEventListener("click", function () {
      record(eventDetail("amazon_click", link));
    }, { capture: true });
  });

  record(eventDetail("storefront_view"));
})();
