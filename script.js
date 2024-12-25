// DOM Elements
const addButtons = document.querySelectorAll(".add-btn");
const orderList = document.getElementById("order-list");
const submitButton = document.getElementById("submit-btn");
const customItemInput = document.getElementById("custom-item-name");
const orderForm = document.querySelector("#ordered form"); // Target the form

// Selected Items
const selectedItems = {};

// Add item to the "Ordered" list (for pre-defined items)
addButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const itemDiv = e.target.closest(".item");
    const itemName = itemDiv.dataset.name;
    const quantityInput = itemDiv.querySelector("input");
    const quantity = parseInt(quantityInput.value);

    if (quantity && quantity > 0) {
      selectedItems[itemName] = (selectedItems[itemName] || 0) + quantity;

      renderOrderList(); // Update the "Ordered" list
      quantityInput.value = ""; // Clear the input field
    } else if (quantity <= 0) {
      alert("Nhập số lớn hơn 0 đê!"); // Alert for invalid quantity
    }
  });
});

// Render the "Ordered" list
function renderOrderList() {
  orderList.innerHTML = ""; // Clear the list
  orderForm.innerHTML = ""; // Clear the form

  for (const [itemName, quantity] of Object.entries(selectedItems)) {
    // Update the list in the UI
    const listItem = document.createElement("li");
    listItem.textContent = `${itemName} - Số lượng: ${quantity}`;
    orderList.appendChild(listItem);

    // Add hidden form input for each item
    const inputField = document.createElement("input");
    inputField.type = "hidden";
    inputField.name = `item-${itemName}`;
    inputField.value = `${itemName} (Số lượng: ${quantity})`;
    orderForm.appendChild(inputField);
  }

  // Add a summary of all selected items
  const summaryInput = document.createElement("input");
  summaryInput.type = "hidden";
  summaryInput.name = "summary";
  summaryInput.value = Object.entries(selectedItems)
    .map(([name, qty]) => `${name} (Số lượng: ${qty})`)
    .join(", ");
  orderForm.appendChild(summaryInput);
}

// Submit Order
submitButton.addEventListener("click", (e) => {
  e.preventDefault(); // Prevent default button behavior

  if (Object.keys(selectedItems).length === 0) {
    alert("Chưa có chọn cái gì hết kìa bà!"); // Alert if no items are selected
    return;
  }

  alert("Giỏ hàng xác nhận thành công! Cảm ơn em yêu 😘");

  // Submit the form to Formspree
  orderForm.submit(); // Triggers the email submission

  // Clear the order
  Object.keys(selectedItems).forEach(key => delete selectedItems[key]);
  renderOrderList(); // Update the list after clearing
});

// Add Custom Item
function addCustomItem() {
  const itemName = customItemInput.value.trim(); // Get the custom item name

  if (!itemName) {
    alert("Hãy nhập món quà bạn muốn!"); // Alert if no custom item name is provided
    return;
  }

  // Add the custom item to the selectedItems object with quantity 1
  selectedItems[itemName] = (selectedItems[itemName] || 0) + 1;

  // Update the "Ordered" list
  renderOrderList();

  // Clear the input field
  customItemInput.value = "";
}
