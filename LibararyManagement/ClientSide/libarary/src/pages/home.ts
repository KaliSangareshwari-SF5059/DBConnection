import * as APICALLS from "../api/apicalls";
export async function renderHome(container: HTMLElement) {
   var user =  await APICALLS.isAuthenticated();
    container.innerHTML = `<h2>Welcome ${user.name} to our Libarary!</h2> <br> <img src="/public/download.jpg" width="1000" height="500">`;
  }