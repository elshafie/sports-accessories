const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : "";
if (!user) {
    window.location.href = "./login.html";
}


const cartContainer = document.getElementById('cart-items')

const itemsCountLabel = document.getElementById("count-items");


document.addEventListener("DOMContentLoaded", () => {

  if (user) {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

      let itemsCount = 0;
      let total= 0

    if (cart.length<1) {
      cartContainer.innerHTML = '<h2 class="text-3xl text-center font-bold pt-10">No Products in yor cart</h2>'
    } else {
      if (cart) {
        let itemsCart = cart.map((item) => {
          itemsCount += item.quantity;
        });

        itemsCountLabel.innerHTML = itemsCount;

        cart?.map(item => {
          total = total + (item.quantity * item.price)
          const cartItem = document.createElement('div');
          cartItem.classList.add('flex', 'justify-between', 'items-center', 'py-2', "cart-item", "w-full", "border", "rounded-xl", "px-2", "lg:px-6"
          );
          cartItem.innerHTML = `
            <div class="cart-item-image flex items-center justify-center flex-[1]">
              <img class="w-16 h-16 rounded-e-full" src="${
                item.images
              }" alt="">
          </div>

          <div class="flex-[3]">
            <h3 class="text-lg lg:text-3xl">${item.title}</h3>
          </div>

          <div class="quantity flex-[1] flex justify-between items-center gap-2 lg:gap-6 text-lg lg:text-3xl font-bold">
            <button class="quantity-minus p-2 lg:p-4" onclick="minusQuantity(${
              item.id
            })">-</button>

            <p>${item.quantity}</p>

            <button class="quantity-plus p-2 lg:p-4" onclick="plusQuantity(${
              item.id
            })">+</button>
          </div>

          <div class="price flex-[1] flex items-center justify-center text-xl lg:text-3xl text-gray-700">
            ${(item.quantity * item.price).toFixed(2)}$
          </div>
          `;

          cartContainer.appendChild(cartItem)
        })

        document.getElementById('total').innerHTML= `${total.toFixed(2)} $`

        document.getElementById("order-price").innerHTML = `${total.toFixed(2)} $`;
      }
    }
  }
});



const minusQuantity = (id) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const item = cart.find(item => item.id === id)
  if (item.quantity > 1) {
    item.quantity--;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
  }else {
    if (confirm("Are You want to remove this item?")){
      const editedCart = cart.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(editedCart));
      updateCart();
    };
  }
}

const plusQuantity = (id) => {
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

  const item = cart.find((item) => item.id === id);
  item.quantity ++;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCart();
};


const updateCart = () => {
  let itemsCount = 0;
  let total = 0;

  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
    if (cart.length < 1) {
      itemsCountLabel.innerHTML = itemsCount;

      cartContainer.innerHTML =
        '<h2 class="text-3xl text-center font-bold pt-10">No Products in yor cart</h2>';
    }else{
      let itemsCart = cart.map((item) => {
        itemsCount += item.quantity;
      });

      itemsCountLabel.innerHTML = itemsCount;


      const cartItems = cart
        .map((item) => {
          total += item.price * item.quantity;
          return `
            <div class="cart-item flex justify-between items-center py-2 border rounded-xl px-2 lg:px-6">
            <div class="cart-item-image flex items-center justify-center flex-[1]">
            <img class="w-16 h-16 rounded-e-full" src="${item.images}"
            alt="">
            </div>
            <div class="cart-item-info flex-[3]">
            <h3 class="text-lg lg:text-3xl">${item.title}</h3>
            </div>
            <div class="quantity flex-[1] flex justify-between items-center gap-2 lg:gap-6 text-lg lg:text-3xl font-bold">
            <button class="quantity-minus p-2 lg:p-4" onclick="minusQuantity(${
              item.id
            })">
            -</button>
            <p>${item.quantity}</p>
            <button class="quantity-plus  p-2 lg:p-4" onclick="plusQuantity(${
              item.id
            })">
            +</button>
            </div>
            <div class="price flex-[1] flex items-center justify-center text-xl lg:text-3xl text-gray-700">
            ${(item.quantity * item.price).toFixed(2)}$
            </div>
            </div>
            `;
          })
          .join("");
        cartContainer.innerHTML = cartItems;
        
        document.getElementById("total").innerHTML = `${total.toFixed(2)} $`;

        document.getElementById("order-price").innerHTML = `${total.toFixed(
          2
        )} $`;

    }
}


const checkoutButton = document.getElementById("checkout-button");

checkoutButton.addEventListener('click', () => {
  const cart = JSON.parse(localStorage.getItem('cart'));
  const newOrder = {
    user: JSON.parse(localStorage.getItem("user")).email,
    products: cart,
    date: new Date()
  }
  const orders = localStorage.getItem('order') ?
  JSON.parse(localStorage.getItem('order')) : []

  orders.push(newOrder)
  localStorage.setItem('order', JSON.stringify(orders));
  localStorage.setItem('cart', [])
  window.location.href = '../index.html'
})