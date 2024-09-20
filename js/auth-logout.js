const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "./login.html";
}

document.addEventListener("DOMContentLoaded", () => {

  if (user)
    {
    const logoutHeading = document.getElementById("user-email");

    logoutHeading.innerHTML = `Welcome ${user.email}`;

    const logoutButton = document.getElementById("logout-button");

    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("user");
      window.location.href = "../index.html";
    });
  }
});
