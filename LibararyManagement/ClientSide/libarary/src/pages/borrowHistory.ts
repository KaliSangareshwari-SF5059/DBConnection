import { borrowStatus } from '../Models/model';
import * as APICALLS from '../api/apicalls';

export async function renderBorrowHistory(container: HTMLElement) {
  var user = await APICALLS.isAuthenticated();
  if (!user.success) {
    alert("Please login first");
    return;
  }
  var currentUser = await APICALLS.getIndividualUser(user.email);
  if (!currentUser) {
    alert("User not found");
    return;
  }

  container.innerHTML = `<h2>Your Orders</h2>`;
  const tableContainer = document.createElement("span");
  createTable();
  async function createTable() {
    var borrows = await APICALLS.fetchBorrows();
    tableContainer.innerHTML = "";
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    var headerRow = document.createElement("tr") as HTMLTableRowElement;
    headerRow.innerHTML = `
        <th>Borrow Id</th>
        <th>Book Id</th>
        <th>Book Name</th>
        <th>Customer ID</th>
        <th>Fine Amount</th>
        <th>Order Date</th>
        <th>Booking Status</th>
        <th>Action</th>`;
    table.appendChild(headerRow);

    borrows.forEach((borrow) => {
      if (borrow.customerID == currentUser!.customerID) {
        var row = document.createElement("tr") as HTMLTableRowElement;
        row.innerHTML = `<td>${borrow.borrowID}</td> <td>${borrow.bookID}</td> <td>${borrow.bookName}</td> 
        <td>${borrow.customerID}</td> <td>${borrow.fineAmount}</td> 
              <td>${new Date(borrow.borrowDate).toLocaleDateString()}</td> <td>${borrow.bookingStatus}</td>
              <td><button onclick="cancelBorrow(${borrow.borrowID})">Cancel</button></td>`;
        table.appendChild(row);
      }
    })
    tableContainer.appendChild(table);
  }
  container.appendChild(tableContainer);

  async function cancelBorrow(borrowId: number) {
    var confirmation = confirm("Are you sure you want to retrun this book?");
    if (!confirmation) {
      return;
    }
    var order = await APICALLS.getIndividualBorrow(borrowId);
    if (order == null) {
      alert("Borrow History not found");
      return;
    }
    if (order!.bookingStatus === borrowStatus[1]) {
      alert("Book already Returned");
      return;
    }
    var fineAmount = 0;
    var today = new Date();
    var days = Math.floor((today.getTime() - new Date(order!.borrowDate).getTime()) / (1000 * 60 * 60 * 24));

    var isDamaged = confirm("Is Book is Damaged");
    if (isDamaged && days > 15) {
      fineAmount = 300 + days-15;
    }
    else if (!isDamaged && days > 15) {
      fineAmount = days-15;
    }
    else
    {
      fineAmount=300;
    }
    if (currentUser!.amount < fineAmount) {
      alert("Insufficient Balance");
    }
    else {
      await APICALLS.cancelBook(currentUser!.customerID, borrowId,fineAmount,order.bookID);
      alert("Order cancelled successfully");
      createTable();
    }
    

  }
  (window as any).cancelBorrow = cancelBorrow;
}