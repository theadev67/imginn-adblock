(function () {
  "use strict";

  // Regular expressions to match classes of elements to delete
  const TARGET_REGEXES = [
    /^demand-supply__/,
    /^block-.*sulvo$/,
    /^fc-monetization/,
  ];

  // Helper broad CSS selector to locate potential matches quickly (improves performance)
  const SELECTOR =
    '[class*="demand-supply__"], [class*="sulvo"], [class*="fc-monetization"]';

  /**
   * Checks if an element matches any of the target class patterns
   */
  function isTargetElement(element) {
    if (!element.classList || element.classList.length === 0) return false;

    // Check if any class matches our regexes
    for (const className of element.classList) {
      for (const regex of TARGET_REGEXES) {
        if (regex.test(className)) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * Deletes target elements from the DOM.
   */
  function deleteTargetElements() {
    // fast pass
    const candidates = document.querySelectorAll(SELECTOR);
    candidates.forEach((c) => c.remove());
    // regex match
    candidates.forEach((element) => {
      if (isTargetElement(element)) {
        element.remove();
      }
    });
  }

  /**
   * Restores scrolling restrictions from html and body elements
   */
  function restoreScrolling() {
    const htmlEl = document.documentElement;
    const bodyEl = document.body;

    // Force style on HTML element
    if (htmlEl && htmlEl.style.overflow !== "scroll") {
      htmlEl.style.setProperty("overflow", "scroll", "important");
    }

    // Force style on Body element if it gets blocked
    if (bodyEl && bodyEl.style.overflow !== "visible") {
      bodyEl.style.setProperty("overflow", "visible", "important");
    }
  }

  // Initial sweep
  restoreScrolling();
  deleteTargetElements();

  // Watch for DOM changes to delete elements as soon as they are added
  const observer = new MutationObserver((mutations) => {
    let checkElements = false;
    let checkScrolling = false;

    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0) {
        checkElements = true;
      }
      if (
        mutation.type === "attributes" &&
        (mutation.attributeName === "style" ||
          mutation.attributeName === "class")
      ) {
        checkScrolling = true;
      }
    }

    if (checkElements) {
      deleteTargetElements();
    }
    if (checkScrolling) {
      restoreScrolling();
    }
  });

  // Start observing
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    attributeFilter: ["style", "class"],
  });

  // Re-run on common page lifecycle events
  document.addEventListener("DOMContentLoaded", () => {
    deleteTargetElements();
    restoreScrolling();
  });

  window.addEventListener("load", () => {
    deleteTargetElements();
    restoreScrolling();
  });
})();
