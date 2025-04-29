import * as APICALLS from '../api/apicalls';
import { WishList, roomTypeDetails, RoomDetails } from '../Models/model';
// import { Customer } from '../Models/model';

export function renderrooming(container: HTMLElement) {
    container.innerHTML = `<h2>Book Room</h2>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var rooms = await APICALLS.fetchRooms();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Room Id</th>
            <th>Room Type</th>
            <th>Number Of beds</th>
            <th>Price Per Day</th>
            <th>Action</th>`;
        table.appendChild(headerRow);


        rooms.forEach((room) => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${room.roomID}</td>
      <td>${room.roomType}</td>
      <td>${room.numberOfBeds}</td>
      <td>${room.pricePerDay}</td>
          <td><button id="borrowbtn" onclick="bookRoom(${room.roomID})">Add to WishList</button></td>`;

            table.appendChild(row);
        });
        tableContainer.appendChild(table);

    }
    container.appendChild(tableContainer);

    function dateform() {
        const existingForm = document.getElementById("dateForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "dateForm";
        form.innerHTML = `
        <label for="fromDate">From Date:</label>
        <input type="date" id="fromDate" name="fromDate"><br>
        <label for="todate">To Date:</label>
        <input type="date" id="todate" name="todate"><br>
        <button class="btn" type="submit">Add</button>
        `;
        container.appendChild(form);
    }





    async function bookRoom(roomID: number) {
        dateform();
        document.addEventListener("submit", async (event) => {
            event.preventDefault();
            const form = event.target as HTMLFormElement;

            var fromdate = new Date(form.fromDate.value);
            var todate = new Date(form.todate.value);
            var days = Math.floor((todate.getTime() - fromdate.getTime()) / (1000 * 60 * 60 * 24));
            const existingForm = document.getElementById("dateForm");
            if (existingForm) {
                existingForm.remove();
            }

            var roomList = await APICALLS.getIndividualRoom(roomID);
            var user = await APICALLS.isAuthenticated();
            var currentUser = await APICALLS.getIndividualUser(user.email);
            if (roomList == null) {
                alert("room not found");
                return;
            }

            if (!user.success) {
                alert("Please login first");
                return;
            }

            if (!currentUser) {
                alert("User not found");
                return;
            }

            var WishList1: WishList = { wishListID: 0, userID: currentUser.userID, roomID: roomList.roomID, fromDate: fromdate, toDate: todate, priceOfRoom: roomList.pricePerDay * days };
            var wishlist=await APICALLS.addWishList(WishList1);
            alert("Room Added to WishList:" + wishlist);

        });

    }
    (window as any).bookRoom = bookRoom;

}
