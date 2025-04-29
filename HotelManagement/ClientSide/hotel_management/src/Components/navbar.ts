import { renderHome } from "../pages/home";
import { renderWallet } from "../pages/wallet";
import { renderUserDetails } from "../pages/userdetails";
import { renderRooms } from "../pages/rooms";
import { renderrooming } from "../pages/bookroom";
import * as APICALLS from "../api/apicalls";

export function renderNavbar(container: HTMLElement, rerenderApp: () => void) {
    const nav = document.createElement("div");
    nav.className = "navbar";
    nav.innerHTML = `
    <button data-page="home">Home</button>
    <button data-page="userdetails">User Details</button>
    <button data-page="rooms">Rooms</button>
    <button data-page="bookroom">Book Room</button>
    <button data-page="wishlist">WishList</button>
    <button data-page="bookingHistory">BookingHistory</button>
    <button data-page="wallet">Wallet</button>
    <button id="logout">Logout</button>
  `;

    nav.querySelectorAll("button[data-page]").forEach(btn =>
        btn.addEventListener("click", () => {
            const page = btn.getAttribute("data-page")!;
            renderPage(container, page);
        })
    );

    nav.querySelector("#logout")!.addEventListener("click", async () => {
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
        case "userdetails":
            renderUserDetails(content);
            break;
        case "rooms":
            renderRooms(content);
            break;
        case "bookroom":
            renderrooming(content);
            break;
        case "wishlist":
            //    renderBooks(content);
            break;
        case "bookingHistory":
            //  renderBorrow(content);
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
