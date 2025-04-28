import * as APICALLS from '../api/apicalls';
import { availabilityDetails, borrowStatus } from '../Models/model';
// import { Customer } from '../Models/model';

export function renderBorrow(container: HTMLElement) {
    container.innerHTML = `<h2>Borrow Books</h2>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var books = await APICALLS.fetchBooks();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        var headerRow = document.createElement("tr") as HTMLTableRowElement;
        headerRow.innerHTML = `
            <th>Book Id</th>
            <th>Book Name</th>
            <th>Author Name</th>
            <th>Availability</th>
          <th>Action</th>`;
        table.appendChild(headerRow);

        books.forEach((book) => {
            const row = document.createElement("tr");
            row.innerHTML =
                `  <td>${book.bookID}</td>
      <td>${book.bookName}</td>
      <td>${book.authorName}</td>
      <td>${book.availability}</td>
        <td><button id="borrowbtn" onclick="borrowBook(${book.bookID})">Borrow</button></td>`;
            table.appendChild(row);
        });
        tableContainer.appendChild(table);
    }
    container.appendChild(tableContainer);
    async function borrowBook(bookID: number) {
        var BookList = await APICALLS.getIndividualBook(bookID);
        var BorrowList = await APICALLS.fetchBorrows();
        var user = await APICALLS.isAuthenticated();
        var currentUser = await APICALLS.getIndividualUser(user.email);
        var borrows=BorrowList.filter(borrow=>borrow.bookingStatus===borrowStatus[0]&& borrow.customerID===currentUser?.customerID);
        if (BookList == null) {
            alert("Book not found");
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
        if(BookList.availability===availabilityDetails[1])
        {
            if(borrows.length<3)
                {
                    var borrowID = await APICALLS.addNewBorrow(currentUser.customerID, bookID);
        
                    createTable();
                    alert("Book borrowed successfully - borrow id : " + borrowID);
                }else{
                    alert("You already Borrowed three books")
                }
        }
        else if(BookList.availability===availabilityDetails[0])
        {
            alert("The Book is already Issued");
        }
        else
        {
            alert("The book is damaged")
        }
       
        
    }

    (window as any).borrowBook = borrowBook;
}



