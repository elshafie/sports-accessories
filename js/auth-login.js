const form = document.getElementById("login-form");

const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('pass')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  if(!emailInput.value || !passwordInput.value){
    alert('Please fill in all fields')
  }else{
    const user = {
      email: emailInput.value,
      password: passwordInput.value
      }

      localStorage.setItem('user', JSON.stringify(user))
      window.location.href = '../index.html'
  }

})
