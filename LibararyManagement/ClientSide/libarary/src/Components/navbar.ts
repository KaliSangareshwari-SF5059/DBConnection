import { renderHome } from "../pages/home";
import { renderWallet } from "../pages/wallet";
import { renderBooks } from "../pages/books";
import { renderBorrow } from "../pages/borrows";
import { renderBorrowHistory } from "../pages/borrowHistory";
import * as APICALLS from "../api/apicalls";

export function renderNavbar(container: HTMLElement, rerenderApp: () => void) {
  const nav = document.createElement("div");
  nav.className = "navbar";
  nav.innerHTML = `
    <button data-page="home">Home</button>
    <button data-page="books">Books</button>
    <button data-page="borrow">Borrow</button>
    <button data-page="borrowHistory">Borrow History</button>
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
    case "books":
       renderBooks(content);
      break;
    case "borrow":
     renderBorrow(content);
      break;
    case "borrowHistory":
       renderBorrowHistory(content);
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
