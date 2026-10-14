/* =========================================
   LITTLE LOOM — CONCEPT 2: PLAYFUL
   Interactive features
========================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // 1. PRODUCT FILTERS
  const filterButtons = document.querySelectorAll(".filter-button");
  const productCards = document.querySelectorAll(".product-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((filterButton) => {
        const isActive = filterButton === button;

        filterButton.classList.toggle("active", isActive);
        filterButton.setAttribute("aria-pressed", String(isActive));
      });

      productCards.forEach((card) => {
        const matches =
          selectedFilter === "all" ||
          card.dataset.category === selectedFilter;

        card.hidden = !matches;
      });
    });
  });

  // 2. FAVOURITE BUTTONS
  const heartButtons = document.querySelectorAll(".heart-button");

  heartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isFavourite = button.getAttribute("aria-pressed") === "true";
      const nextState = !isFavourite;

      button.setAttribute("aria-pressed", String(nextState));
      button.textContent = nextState ? "♥" : "♡";

      const productName =
        button.closest(".product-card")?.querySelector("h3")?.textContent;

      button.setAttribute(
        "aria-label",
        `${nextState ? "Remove favourite" : "Add to favourites"}: ${productName}`
      );
    });
  });

  // 3. MOBILE NAVIGATION
  const menuToggle = document.getElementById("menu-toggle");
  const mainNav = document.getElementById("main-nav");

  function closeMenu() {
    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  }

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuToggle.focus();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 720) {
        closeMenu();
      }
    });
  }

  // 4. PRODUCT ENQUIRY BUTTONS
  const productButtons = document.querySelectorAll("[data-product]");
  const productSelect = document.getElementById("product-select");
  const enquirySection = document.getElementById("make-a-gift");
  const customerName = document.getElementById("customer-name");
  const formMessage = document.getElementById("form-message");
  const copyButton = document.getElementById("copy-enquiry");

  let enquiryText = "";

  productButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedProduct = button.dataset.product;

      if (productSelect) {
        productSelect.value = selectedProduct;
      }

      if (formMessage) {
        formMessage.textContent = "";
      }

      if (copyButton) {
        copyButton.hidden = true;
      }

      enquirySection?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      window.setTimeout(() => {
        customerName?.focus({ preventScroll: true });
      }, 450);
    });
  });

  // 5. ENQUIRY FORM — PREVIEW ONLY
  const enquiryForm = document.getElementById("enquiry-form");

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(enquiryForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const product = String(formData.get("product") || "").trim();
      const details = String(formData.get("details") || "").trim();

      if (!name || !email || !product) {
        formMessage.textContent =
          "Please complete your name, email, and gift selection first.";
        copyButton.hidden = true;
        return;
      }

      enquiryText = [
        "LITTLE LOOM — GIFT ENQUIRY",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Gift: ${product}`,
        `Details: ${details || "No additional details provided."}`,
        "",
        "Note: This is a demo enquiry preview."
      ].join("\n");

      formMessage.textContent =
        "Your enquiry preview is ready! Nothing has been sent.";
      copyButton.hidden = false;

      // Display the prepared enquiry below the form message.
      let preview = document.getElementById("enquiry-preview");

      if (!preview) {
        preview = document.createElement("pre");
        preview.id = "enquiry-preview";
        preview.style.cssText =
          "white-space:pre-wrap;overflow-wrap:anywhere;padding:14px;" +
          "border:1px dashed #df7898;border-radius:12px;" +
          "background:#fffdf8;font:12px/1.8 'DM Sans',sans-serif;";
        formMessage.insertAdjacentElement("afterend", preview);
      }

      preview.textContent = enquiryText;
    });
  }

  // 6. COPY ENQUIRY PREVIEW
  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      if (!enquiryText) return;

      try {
        await navigator.clipboard.writeText(enquiryText);
        formMessage.textContent =
          "Copied! Your enquiry text is ready to paste.";
      } catch {
        formMessage.textContent =
          "Copy wasn't available in this browser. Select the preview text and copy it manually.";
      }
    });
  }

  console.log("Little Loom — Playful Concept loaded successfully.");
});
