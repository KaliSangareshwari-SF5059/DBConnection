import { User } from './Models/model';
import * as APICALLS from './api/apicalls';  

export function showAuthForm(container: HTMLElement, onAuthSuccess: () => void) {
  container.innerHTML = `
    <div>
      <div style="margin-bottom: 10px;">
        <button id="show-login">Login</button>
        <button id="show-signup">Sign Up</button>
      </div>
      <div id="auth-form"></div>
    </div>
  `;
  const formContainer = document.getElementById("auth-form")!;


 function renderLoginForm() {
  formContainer.innerHTML = `
      <div class="login-form">
        <h2>Login</h2>
        <input id="email" placeholder="Email" />
        <input id="password" type="password" placeholder="Password" />
        <button id="login-btn">Login</button>
      </div>
    `;

  const emailInput = document.getElementById("email") as HTMLInputElement;
  const passInput = document.getElementById("password") as HTMLInputElement;
  const btn = document.getElementById("login-btn")!;
  btn.addEventListener("click", async () => {
    let loginSuccess:boolean = await APICALLS.login(emailInput.value, passInput.value);
    if (loginSuccess) {
      onAuthSuccess();
    } else {
      alert("Invalid credentials");
    }
  });
}

function renderSignupForm() {
  formContainer.innerHTML = `
    <h2>Sign Up</h2>
    <input id="name" placeholder="Name" /><br>
    <input id="email" placeholder="Email" /><br>
    <input id="phone" placeholder="Phone Number" /><br>
    <input id="aadhar" placeholder="Aadhar Number"/><br>
    <input id="address" placeholder="Address"/><br>
     <label >Gender</label><br>
    <select id="gender" >
          <option>Select</option>
          <option>Male</option>
          <option>Female</option>
          <option>Others</option>
          </select><br>
          <label >Food Type</label><br>
          <select id="foods">
          <option>select</option>
          <option>Veg</option>
          <option>NonVeg</option>
          </select><br>
    <input id="password" type="password" placeholder="Password" /><br>
    <button id="signup-btn">Sign Up</button>
  `;

  document.getElementById("signup-btn")!.addEventListener("click", async () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const gender = (document.getElementById("gender") as HTMLSelectElement).value ;
    const password = (document.getElementById("password") as HTMLInputElement).value;
    const aadharNumber=(document.getElementById("aadhar") as HTMLInputElement).value;
    const foodType=(document.getElementById("foods") as HTMLSelectElement).value;
    const address=(document.getElementById("address")as HTMLInputElement).value;

    const existing = await APICALLS.checkUser(email);
    if (existing) {
      alert("User already exists.");
      return;
    }

    const newUser: User = { userID: 0, amount: 0, userName: name, email, password, mobileNumber: phone ,gender,aadharNumber,foodType,address};
    APICALLS.addNewUser(newUser);
    alert("Signup successful. Please login.");
    renderLoginForm();
  });
}

document.getElementById("show-login")!.addEventListener("click", renderLoginForm);
document.getElementById("show-signup")!.addEventListener("click", renderSignupForm);

// Show login by default
renderLoginForm();
}