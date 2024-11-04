const cart = [];
const cartItemsElement = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const overlay = document.getElementById('overlay');
const openCheckoutButton = document.getElementById('open-checkout-button');
const closeCheckoutButton = document.getElementById('close-checkout-button');

// Hàm mở hộp thanh toán
openCheckoutButton.onclick = function() {
  if (cart.length === 0) {
    alert("Giỏ hàng trống! Vui lòng thêm sản phẩm.");
  } else {
    overlay.style.display = 'flex';
  }
};

// Hàm đóng hộp thanh toán
closeCheckoutButton.onclick = function() {
  overlay.style.display = 'none';
};

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  updateCart();
}

// Hàm cập nhật giỏ hàng
function updateCart() {
  cartItemsElement.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemElement = document.createElement('li');
    itemElement.textContent = `${item.name} - ${item.quantity} x ${item.price} VND`;

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Xóa';
    removeButton.onclick = () => removeFromCart(item.name);
    itemElement.appendChild(removeButton);

    cartItemsElement.appendChild(itemElement);
    total += item.price * item.quantity;
  });

  totalPriceElement.textContent = `Tổng tiền: ${total} VND`;
}

// Hàm xoá sản phẩm khỏi giỏ hàng
function removeFromCart(name) {
  const itemIndex = cart.findIndex(item => item.name === name);
  if (itemIndex !== -1) {
    cart[itemIndex].quantity--;
    if (cart[itemIndex].quantity === 0) {
      cart.splice(itemIndex, 1);
    }
  }
  updateCart();
}

// Hàm lấy phương thức thanh toán đã chọn
function getSelectedPaymentMethod() {
  const paymentMethods = document.getElementsByName('payment-method');
  for (let method of paymentMethods) {
    if (method.checked) {
      return method.value;
    }
  }
  return null;
}

// Hàm xử lý thanh toán
function checkout() {
  const paymentMethod = getSelectedPaymentMethod();
  alert(`Thanh toán thành công! Cảm ơn bạn đã mua hàng. Phương thức thanh toán: ${paymentMethod}`);
  cart.length = 0;
  updateCart();
  overlay.style.display = 'none'; // Ẩn hộp thanh toán sau khi thanh toán xong
}
