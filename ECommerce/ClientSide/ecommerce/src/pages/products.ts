import { ProductInfo } from '../Models/model';
import * as APICALLS from '../api/apicalls';

export function renderProducts(container: HTMLElement) {
    container.innerHTML = `<h2>Products</h2> <button id="addProductBtn">Add Product</button>`;
    const tableContainer = document.createElement("span");
    createTable();
    async function createTable() {
        var products = await APICALLS.fetchProducts();

        tableContainer.innerHTML = "";
        const table = document.createElement("table");
        table.border = "1";
        table.style.borderCollapse = "collapse";
        table.style.width = "100%";

        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Quantity</th>
            <th>Shipping Duration</th>
            <th>Action</th>`;
        table.appendChild(headerRow);


        products.forEach((product) => {
            const row = document.createElement("tr");
            row.innerHTML = `
      <td>${product.productID}</td>
      <td>${product.productName}</td>
      <td>${product.productPrice}</td>
      <td>${product.productCount}</td>
      <td>${product.shippingDuration}</td>
      <td>
        <button onclick="editProduct('${product.productID}')">Edit</button>
        <button onclick="deleteProduct('${product.productID}')">Delete</button>
      </td>`;
            table.appendChild(row);
        });

        tableContainer.appendChild(table);
        container.appendChild(tableContainer);
    }
    function addEditProductsForm() {
        const existingForm = document.getElementById("productForm");
        if (existingForm) {
            existingForm.remove();
        }
        const form = document.createElement("form");
        form.id = "productFrom";
        form.innerHTML = `
        <label for="productName">Product Name:</label>
        <input type="text" id="productName" name="productName"><br>
        <label for="productPrice">Product Price:</label>
        <input type="text" id="productPrice" name="productPrice"><br>
        <label for="productCount">Product Count:</label>
        <input type="text" id="productCount" name="productCount"><br>
        <label for="shippingDuration">Shipping Duration:</label>
        <input type="text" id="shippingDuration" name="shippingDuration"><br>
        <button class="btn" type="submit">Save</button>
        `;
        container.appendChild(form);
    }

    // Attach listeners AFTER table is in the DOM
    let editingID: number = 0;
    async function editProduct(id: string) {
        // alert("Editing " + id);
        addEditProductsForm();
        // Populate form with existing data for editing
        const form = document.getElementById("productFrom") as HTMLFormElement;
        const product = await APICALLS.getIndividualProduct(parseInt(id));
        if (product) {
            editingID = Number(id);
            form.productName.value = product.productName;
            form.productPrice.value = product.productPrice.toString();
            form.productCount.value = product.productCount.toString();
            form.shippingDuration.value = product.shippingDuration.toString();
        }
    }

    document.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target as HTMLFormElement;
        if (editingID > 0) {
            const product: ProductInfo = {
                productID: editingID,
                productName: form.productName.value,
                productPrice: parseInt(form.productPrice.value),
                productCount: parseInt(form.productCount.value),
                shippingDuration: parseInt(form.shippingDuration.value),
            };
            await APICALLS.editProductDetail(product);
            alert("Updated product successfully : " + product.productID);
        } else {
            const product: ProductInfo = {
                productID: 0, productName: form.productName.value, productCount: parseInt(form.productCount.value), productPrice: parseInt(form.productPrice.value),
                shippingDuration: parseInt(form.shippingDuration.value)
            };
            await APICALLS.addNewProduct(product);
            alert("Added product successfully : " + product.productID);
        }
        createTable();
        form.reset();
        editingID = 0;
        const existingForm = document.getElementById("productFrom");
        if (existingForm) {
            existingForm.remove();
        }
    });

    const addBtn = container.querySelector("#addProductBtn") as HTMLButtonElement;
    addBtn?.addEventListener("click", () => {
        alert("Add product");
        addEditProductsForm(); // make sure this function exists and is imported
    });

    async function deleteProduct(id: string) {
        await APICALLS.deleteProductDetail(parseInt(id));
        alert("Deleted " + id);
        createTable();
    }
    // Expose to window object
    (window as any).editProduct = editProduct;
    (window as any).deleteProduct = deleteProduct;
}