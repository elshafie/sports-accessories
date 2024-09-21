const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "./login.html";
}

const itemsCountLabel = document.getElementById("count-items");



document.addEventListener("DOMContentLoaded", () => {

  if (user){
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    let itemsCount = 0;
    let total = 0;

    if (cart.length > 1) {
      let itemsCart = cart.map((item) => {
        itemsCount += item.quantity;
      });

      itemsCountLabel.innerHTML = itemsCount;
    }


    const logoutHeading = document.getElementById("user-email");

    logoutHeading.innerHTML = `Welcome ${user.email}`;

    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "../index.html";
    });
  }
});
