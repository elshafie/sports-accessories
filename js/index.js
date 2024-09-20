const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : "";

  if(!user){
    window.location.href = "./pages/login.html";
  }

const cardsDiv = document.getElementById('cards')



const cart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : [];

  const itemsCountLabel = document.getElementById("count-items");


document.addEventListener('DOMContentLoaded', async () => {

  if (user) {

    let itemsCount = 0;
    if (cart) {
      let itemsCart = cart.map((item) => {
        itemsCount += item.quantity;
      });

      itemsCountLabel.innerHTML = itemsCount;
    }

    const data = await getProducts();

    data?.products?.map((product) => {
      const card = document.createElement("div");
      card.classList.add(
        "card",
        "w-full",
        "sm:w-[48%]",
        "md:w-[30%]",
        "lg:w-[23%]",
        "border",
        "shadow",
        "rounded-md",
        "p-3",
        "flex",
        "flex-col",
        "items-center",
        "justify-between",
        "bg-gray-200",
        "bg-opacity-20",
        "group"
      );
      card.innerHTML = `
      <img class="group-hover:scale-[1.2] transition-all" src=${product.images[0]} alt="">

      <div class="datails w-full">
        <div class="content">
          <h3 class="title text-center text-xl font-bold uppercase">${product.title}</h3>
          <p class="description truncate text-sm text-gray-500 py-4">
            ${product.description}
          </p>
          <div class="flex items-center justify-between">
            <p>${product.price}$</p>
            <button onclick="handleAddToCart(${product.id})" class="bg-lime-600 rounded p-3 font-bold">Add to cart</button>
          </div>
        </div>
      </div>
      `;
      cardsDiv.appendChild(card);
    });
  }

})




const handleAddToCart = async(id) => {
  const data =  await getProducts();
  const cart = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [];
  const product = data?.products?.find((product) => product.id === id);
  
  if (product) {
    const existingProduct = cart.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      localStorage.setItem("cart", JSON.stringify(cart));
    }else{

      const newProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      description: product.description,
      images: product.images[0],
    }
    cart.push(newProduct);
    localStorage.setItem("cart", JSON.stringify(cart));
    }

    let itemsCount = 0;
    let itemsCart = JSON.parse(localStorage.getItem("cart")).map((item) => {
      itemsCount += item.quantity;
    });

    itemsCountLabel.innerHTML = itemsCount;

  }
};




const getProducts = async () => {
  const response = await fetch(
    "https://dummyjson.com/products/category/sports-accessories"
  );

  const data = await response.json();
  return data;
};