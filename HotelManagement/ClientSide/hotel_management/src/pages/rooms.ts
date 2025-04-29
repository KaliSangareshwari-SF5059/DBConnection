import { RoomDetails, roomTypeDetails } from '../Models/model';
import * as APICALLS from '../api/apicalls';

export function renderRooms(container: HTMLElement) {
    container.innerHTML = `<h2>Rooms</h2> <button id="addroomBtn">Add Room</button>`;
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
      <td>
        <button onclick="editRoom('${room.roomID}')">Edit</button>
        <button onclick="deleteRoom('${room.roomID}')">Delete</button>
      </td>`;
            table.appendChild(row);
        });

        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    }
    function addEditroomForm() {
        const existingForm = document.getElementById("roomForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "roomForm";
        form.innerHTML = `
        <label for="roomType">Room Type:</label>
        <select id="roomType">
        <option>Standard</option>
        <option>Delux</option>
        <option>Suit</option>
        </select><br>
        <label for="numberOfBeds">Number Of Beds:</label>
        <input type="number" id="numberOfBeds" name="numberOfBeds"><br>
        <label for="priceperDay">Price Per Day:</label>
        <input type="number" id="priceperDay" name="priceperDay"><br>
        <button class="btn" type="submit">Save</button>
        `;
        container.appendChild(form);
    }

    // Attach listeners AFTER table is in the DOM
    let editingID: number = 0;
    async function editRoom(id: string) {
        // alert("Editing " + id);
        addEditroomForm();
        // Populate form with existing data for editing
        const form = document.getElementById("roomForm") as HTMLFormElement;
        const room = await APICALLS.getIndividualRoom(parseInt(id));
        if (room) {
            editingID = Number(id);
            form.roomType.value = room.roomType;
            form.numberOfBeds.value = room.numberOfBeds.toString();
            form.priceperDay.value = room.pricePerDay.toString();

        }
    }

    document.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (editingID > 0) {
            const room: RoomDetails = {
                roomID: editingID,
                roomType:form.roomType.value,
                numberOfBeds:form.numberOfBeds.value,
                pricePerDay:form.priceperDay.value.toString()
            };
            await APICALLS.editRoomDetail(room);
            alert("Updated room successfully : " + room.roomID);
        } else {
            const room: RoomDetails = {
                roomID: 0, roomType:form.roomType.value,numberOfBeds:form.numberOfBeds.value.toString(),pricePerDay:form.priceperDay.value.toString()
            };
            await APICALLS.addNewRoom(room);
            alert("Added room successfully : " + room.roomID);
        }
        createTable();
        form.reset();
        editingID = 0;
        const existingForm = document.getElementById("roomForm");
        if (existingForm) {
            existingForm.remove();
        }
    });

    const addBtn = container.querySelector("#addroomBtn") as HTMLButtonElement;
    addBtn?.addEventListener("click", () => {
        alert("Add room");
        addEditroomForm(); // make sure this function exists and is imported
    });

    async function deleteRoom(id: string) {
        await APICALLS.deleteRoomDetail(parseInt(id));
        alert("Deleted " + id);
        createTable();
    }
    // Expose to window object
    (window as any).editRoom = editRoom;
    (window as any).deleteRoom = deleteRoom;
}