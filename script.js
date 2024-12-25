// DOM Elements
const addButtons = document.querySelectorAll(".add-btn");
const orderList = document.getElementById("order-list");
const submitButton = document.getElementById("submit-btn");

// Selected Items
const selectedItems = {};

// Add item to the "Ordered" list
addButtons.forEach(button => {
  button.addEventListener("click", (e) => {
    const itemDiv = e.target.closest(".item");

    // Skip validation for custom items
    if (itemDiv.id === "input-item-section") return;

    const itemName = itemDiv.dataset.name;
    const quantityInput = itemDiv.querySelector("input");
    const quantity = parseInt(quantityInput.value);

    if (quantity && quantity > 0) {
      selectedItems[itemName] = (selectedItems[itemName] || 0) + quantity;

      // Update the Ordered Section
      renderOrderList();

      // Clear input
      quantityInput.value = "";
    } else {
      alert("Nhập số lớn hơn 0 đê");
    }
  });
});

// Render the order list
function renderOrderList() {
  orderList.innerHTML = ""; // Clear the list

  for (const [itemName, quantity] of Object.entries(selectedItems)) {
    const listItem = document.createElement("li");
    listItem.textContent = `${itemName} - Số lượng: ${quantity}`;
    orderList.appendChild(listItem);
  }
}

// Submit Order
submitButton.addEventListener("click", () => {
  if (Object.keys(selectedItems).length === 0) {
    alert("Chưa có chọn cái gì hết kìa bà!");
    return;
  }

  // Send the order (Here, log to console or use EmailJS)
  console.log("Xác nhận giỏ hàng!", selectedItems);
  alert("Giỏ hàng xác nhận thành công!");

  // Clear the order
  for (let key in selectedItems) {
    delete selectedItems[key];
  }
  renderOrderList();
});

// Add Custom Item
function addCustomItem() {
  // Get the custom item name from the input field
  const itemName = document.getElementById('custom-item-name').value.trim();

  // Check if the input is empty
  if (!itemName) {
    alert('Hãy nhập món quà bạn muốn!');
    return;
  }

  // Add the custom item to the selectedItems object with quantity 1
  selectedItems[itemName] = (selectedItems[itemName] || 0) + 1;

  // Update the Ordered Section
  renderOrderList();

  // Clear the input field
  document.getElementById('custom-item-name').value = '';
}

