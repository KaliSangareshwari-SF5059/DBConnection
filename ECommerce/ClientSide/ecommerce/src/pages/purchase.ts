import * as APICALLS from '../api/apicalls';
// import { Customer } from '../Models/model';

export function renderPurchase(container: HTMLElement) {
    container.innerHTML = `<h2>Purchase Products</h2>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var products = await APICALLS.fetchProducts();
        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        var headerRow = document.createElement("tr") as HTMLTableRowElement;
        headerRow.innerHTML = `
          <th>Product Id</th>
          <th>Product Name</th>
          <th>Product Count</th>
          <th>Product Price</th>
          <th>Product Shipping Duration</th>
          <th>Action</th>`;
        table.appendChild(headerRow);

        products.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML =
                `<td>${product.productID}</td>
        <td>${product.productName}</td>
        <td>${product.productCount}</td>
        <td>${product.productPrice}</td>
        <td>${product.shippingDuration}</td>
        <td><button id="purchasebtn" onclick="purchaseProduct(${product.productID})">Purchase</button></td>`;
            table.appendChild(row);
        });
        tableContainer.appendChild(table);
    }
    container.appendChild(tableContainer);
    async function purchaseProduct(productID: number) {
        var count = Number(prompt("Enter the count of product to purchase"));
        if (count <= 0) {
            alert("Invalid count");
            return;
        }
        var ProductList = await APICALLS.getIndividualProduct(productID);
        if (ProductList == null) {
            alert("Product not found");
            return;
        }
        if (ProductList.productCount < count) {
            alert("Insufficient quantity");
            return;
        }

        var user = await APICALLS.isAuthenticated();
        if (!user.success) {
            alert("Please login first");
            return;
        }
        var currentUser = await APICALLS.getIndividualUser(user.email);
        if(!currentUser)
        {
            alert("User not found");
            return;
        }

        if (currentUser.amount < ProductList.productPrice * count) {
            alert("Insufficient balance");
            return;
        }
        var orderID = await APICALLS.addNewOrder(currentUser.customerID, productID, count);

        createTable();
        alert("Product purchased successfully with order id " + orderID);
    }

    (window as any).purchaseProduct = purchaseProduct;
}



