import { Customer } from './Models/model';
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
    <input id="city" placeholder = "city"/><br>
    <input id="password" type="password" placeholder="Password" /><br>
    <button id="signup-btn">Sign Up</button>
  `;

  document.getElementById("signup-btn")!.addEventListener("click", async () => {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const phone = (document.getElementById("phone") as HTMLInputElement).value;
    const city=(document.getElementById("city") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const existing = await APICALLS.checkUser(email);
    if (existing) {
      alert("User already exists.");
      return;
    }

    const newUser: Customer = { customerID: 0, amount: 0, name, email, password, userPhoneNumber: phone ,city};
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