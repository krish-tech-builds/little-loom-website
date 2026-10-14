const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");
const productSelect = document.querySelector("#product");
const enquiryForm = document.querySelector("#enquiry-form");
const detailsField = document.querySelector("#custom-details");
const formMessage = document.querySelector("#form-message");

// Filter the collection by category.
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((item) => {
      const isActive = item === button;
      item.classList.toggle("active", isActive);
      item.setAttribute("aria-pressed", String(isActive));
    });

    productCards.forEach((card) => {
      const matches = selectedCategory === "all" ||
        card.dataset.category === selectedCategory;

      card.hidden = !matches;
    });
  });
});

// Let a visitor start an enquiry from a product card.
document.querySelectorAll(".enquire-button").forEach((button) => {
  button.addEventListener("click", () => {
    productSelect.value = button.dataset.product;
    formMessage.textContent = `Selected: ${button.dataset.product}. Add your details below.`;
    document.querySelector("#ordering").scrollIntoView({ behavior: "smooth" });
    detailsField.focus({ preventScroll: true });
  });
});

// Prepare the enquiry locally. This demo does not send or store data.
enquiryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const product = productSelect.value;
  const details = detailsField.value.trim();

  if (!product || !details) {
    formMessage.textContent = "Please choose a gift and tell us a little about your idea.";
    return;
  }

  const message = [
    "Hello Little Loom!",
    `I'm interested in: ${product}.`,
    `My customisation or occasion: ${details}`
  ].join("\n");

  formMessage.textContent = "Your enquiry text is ready. Copy it to use it in a message:";

  const preview = document.createElement("textarea");
  preview.className = "message-preview";
  preview.readOnly = true;
  preview.rows = 4;
  preview.setAttribute("aria-label", "Prepared enquiry message");
  preview.value = message;

  const oldPreview = document.querySelector(".message-preview");
  if (oldPreview) oldPreview.remove();

  formMessage.insertAdjacentElement("afterend", preview);
  preview.style.cssText =
    "width:100%;padding:12px;border:1px solid #ddd3c5;background:#fffdf9;color:#28251f;font:12px/1.7 monospace;";

  preview.focus();
  preview.select();
});
