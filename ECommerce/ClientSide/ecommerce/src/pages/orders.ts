import { orderStatus } from '../Models/model';
import * as APICALLS from '../api/apicalls';

export async function renderOrders(container: HTMLElement) {
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
    var orders = await APICALLS.fetchOrders();
    tableContainer.innerHTML = "";
    const table = document.createElement("table");
    table.border = "1";
    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    var headerRow = document.createElement("tr") as HTMLTableRowElement;
    headerRow.innerHTML = `
        <th>Order Id</th>
        <th>User Id</th>
        <th>Product Id</th>
        <th>Product Count</th>
        <th>Total Price</th>
        <th>Order Date</th>
        <th>Purchase Status</th>
        <th>Action</th>`;
    table.appendChild(headerRow);
    
    orders.forEach((order) => {
      if (order.customerID == currentUser!.customerID) {
        var row = document.createElement("tr") as HTMLTableRowElement;
        row.innerHTML = `<td>${order.orderID}</td> <td>${order.customerID}</td> <td>${order.productID}</td> <td>${order.productCount}</td> <td>${order.totalPrice}</td> 
              <td>${new Date(order.orderDate).toLocaleDateString()}</td> <td>${order.purchaseStatus}</td>
              <td><button onclick="cancelOrder(${order.orderID})">Cancel</button></td>`;
        table.appendChild(row);
      }
    })
    tableContainer.appendChild(table);
  }
  container.appendChild(tableContainer);

  async function cancelOrder(orderId: number) {
    var confirmation = confirm("Are you sure you want to cancel this order?");
    if (!confirmation) {
      return;
    }
    var order = await APICALLS.getIndividualOrder(orderId);
    if (order == null) {
      alert("Order not found");
      return;
    }
    if (order!.purchaseStatus != orderStatus[0]) {
      alert("Order already cancelled");
      return;
    }
    await APICALLS.cancelOrder(currentUser!.customerID, orderId);
    // var userChange = await APICALLS.getIndividualUser(currentUser.email, currentUser.password);
    // localStorage.setItem("user", JSON.stringify(userChange));
    alert("Order cancelled successfully");
    createTable();
  }
  (window as any).cancelOrder = cancelOrder;
}