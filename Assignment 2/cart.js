document.addEventListener("DOMContentLoaded", () => {
  displayCartItems();
  document.querySelector(".pay-button").addEventListener("click", checkout);
  document.querySelector(".delete-button").addEventListener("click", cancelOrder);
  document.querySelector("#apply-promo-button").addEventListener("click", applyPromoCode);
});

const promoCodes = {
  "A": 0.1,
  "B": 0.2,
  "C": 0.3,
  "D": 0.4,
  "E": 0.5,
  "F": 0.6,
  "G": 0.7,
  "H": 0.8,
  "I": 0.9,
  "J": 1.0
};

let appliedDiscount = 0;

// Check if promotion is active
function isPromotionActive() {
  const promotionEndTime = localStorage.getItem("promotionEndTime");
  if (!promotionEndTime) return false;
  const currentTime = new Date().getTime();
  return currentTime <= promotionEndTime;
}

// Hiển thị danh sách sản phẩm trong giỏ hàng
function displayCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const productList = document.querySelector(".product-list");
  productList.innerHTML = "";

  cart.forEach((product, index) => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-details">
                <p><strong>${product.name}</strong></p>
                <p>${product.price} vàng</p>
                <p>Số lượng: ${product.quantity}</p>
            </div>
            <div class="product-actions">
                <input type="number" value="${product.quantity}" min="1" onchange="updateProductQuantity(${index}, this.value)">
                <button onclick="removeFromCart(${index})">Xóa</button>
            </div>
        `;

    productList.appendChild(productItem);
  });

  updateCartSummary();
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateProductQuantity(index, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[index].quantity = parseInt(quantity);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartSummary();
  updateCartCount();
}

// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCartItems();
  updateCartCount();
}

// Cập nhật tổng tiền và VAT
function updateCartSummary() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = cart.reduce(
    (sum, product) => sum + parseFloat(product.price) * product.quantity,
    0
  );
  const vat = total * 0.05;
  const totalWithVat = total + vat;

  let discount = 0;
  if (isPromotionActive()) {
    discount = totalWithVat * appliedDiscount;
  }
  const totalAfterDiscount = totalWithVat - discount;

  document.querySelector(".summary").innerHTML = `
        <p>Tổng tiền: ${total} vàng</p>
        <p>VAT 5%: ${vat} vàng</p>
        <p>Giảm giá: ${discount} vàng</p>
        <p><strong>Tổng thanh toán: ${totalAfterDiscount} vàng</strong></p>
    `;
}

// Áp dụng mã giảm giá
function applyPromoCode() {
  if (!isPromotionActive()) {
    alert("Khuyến mãi đã hết hạn. Mã giảm giá không hợp lệ.");
    appliedDiscount = 0;
    updateCartSummary();
    return;
  }

  const promoCodeInput = document.querySelector("#promo-code-input").value.trim().toUpperCase();
  if (promoCodes.hasOwnProperty(promoCodeInput)) {
    appliedDiscount = promoCodes[promoCodeInput];
  } else {
    appliedDiscount = 0;
  }
  updateCartSummary();
}

// Thanh toán và xóa giỏ hàng
function checkout() {

  localStorage.removeItem("cart");
  displayCartItems();
  updateCartCount(); 
  alert("Đã xác nhận thanh toán")
// chuyen den trang thanh toan
window.location.href="dathang.html";

}

// Hủy đơn hàng và xóa giỏ hàng
function cancelOrder() {
  alert("Hủy đơn hàng thành công!");
  localStorage.removeItem("cart");
  displayCartItems();
  updateCartCount();
}

// Cập nhật số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );
  document.querySelector(".header h1").textContent = `GIỎ HÀNG (${totalCount})`;
}


