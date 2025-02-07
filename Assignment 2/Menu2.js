thietlapSuKienChoNutMua();

function thietlapSuKienChoNutMua() {
  const buyButtons = document.querySelectorAll(".buy-button");
  buyButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productCard = this.closest(".product-card");
      const name = productCard.querySelector(".product-name").innerText;
      const price = productCard
        .querySelector(".product-price")
        .innerText.split(" ")[0]; // Giả sử giá có định dạng như "580 vàng"
      const image = productCard.querySelector("img").src;
      const description =
        productCard.querySelector(".product-describe").innerText;
      addToCart(name, price, image, description);
    });
  });
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

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(name, price, image, description) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(
    (product) => product.name === name
  );
  if (existingProductIndex !== -1) {
    cart[existingProductIndex].quantity += 1;
  } else {
    cart.push({ name, price, image, description, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartCount(); // Cập nhật số lượng sản phẩm ngay sau khi thêm
}
