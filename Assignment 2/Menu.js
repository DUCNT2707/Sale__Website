updateCartCount();

// Hàm hiển thị giỏ hàng
function showCart() {
  const iframe = document.querySelector('iframe[name="page"]');
  iframe.src = "cart.html";
}

// Hiển thị tổng số lượng sản phẩm trong giỏ hàng
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalCount = cart.reduce(
    (total, product) => total + product.quantity,
    0
  );

  let t = parent.document.getElementById("cart-count");
  t.innerText = totalCount;
}
