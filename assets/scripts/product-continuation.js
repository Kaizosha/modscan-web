(() => {
  "use strict";

  const allowedSlots = new Set([
    "top-left",
    "top-right",
    "bottom-left",
    "bottom-right",
  ]);
  const main = document.querySelector(".home-main");
  const currentUrl = new URL(window.location.href);
  const requestedSlot = currentUrl.searchParams.get("slot");

  if (main && allowedSlots.has(requestedSlot)) {
    const activeCell = main.querySelector(".product-cell.is-active");
    const previousSlot = activeCell?.dataset.productSlot;
    const destinationCell = main.querySelector(
      '.product-cell[data-product-slot="' + requestedSlot + '"]',
    );

    if (activeCell && destinationCell && previousSlot !== requestedSlot) {
      destinationCell.dataset.productSlot = previousSlot;
      activeCell.dataset.productSlot = requestedSlot;
    }

    main.dataset.activeSlot = requestedSlot;
    currentUrl.searchParams.delete("slot");

    const cleanSearch = currentUrl.searchParams.toString();
    const cleanUrl =
      currentUrl.pathname +
      (cleanSearch ? "?" + cleanSearch : "") +
      currentUrl.hash;

    window.history.replaceState(null, "", cleanUrl);
  }
})();
