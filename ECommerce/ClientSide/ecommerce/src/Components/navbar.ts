import { renderHome } from "../pages/home";
import { renderOrders } from "../pages/orders";
import { renderWallet } from "../pages/wallet";
import { renderProducts } from "../pages/products";
import { renderPurchase } from "../pages/purchase";
import * as APICALLS from "../api/apicalls";

export function renderNavbar(container: HTMLElement, rerenderApp: () => void) {
  const nav = document.createElement("div");
  nav.className = "navbar";
  nav.innerHTML = `
    <button data-page="home">Home</button>
    <button data-page="products">Products</button>
    <button data-page="purchase">Purchase</button>
    <button data-page="orders">Orders</button>
    <button data-page="wallet">Wallet</button>
    <button id="logout">Logout</button>
  `;

  nav.querySelectorAll("button[data-page]").forEach(btn =>
    btn.addEventListener("click", () => {
      const page = btn.getAttribute("data-page")!;
      renderPage(container, page);
    })
  );

  nav.querySelector("#logout")!.addEventListener("click",async() => {
    await APICALLS.logout();
    rerenderApp();
  });

  container.appendChild(nav);
}

export function renderPage(container: HTMLElement, page: string) {
  const content = document.createElement("div");
  content.className = "page";

  switch (page) {
    case "home":
      renderHome(content);
      break;
    case "products":
      renderProducts(content);
      break;
    case "purchase":
      renderPurchase(content);
      break;
    case "orders":
      renderOrders(content);
      break;
    case "wallet":
      renderWallet(content);
      break;
    default:
      content.innerText = "Page not found.";
  }

  const oldPage = container.querySelector(".page");
  if (oldPage) container.removeChild(oldPage);
  container.appendChild(content);
}
