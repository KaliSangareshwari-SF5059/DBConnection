import { Customer, ProductInfo, Order } from '../Models/model';
let url = "http://localhost:5294/api/ecommerce";

export async function checkUser(email: string): Promise<boolean> {
    let apiURL = `${url}/usercontroller/${email}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return false;
    }
    return await response.json();
}

export async function login(email: string, password: string): Promise<boolean> {
    const response = await fetch(`${url}/auth/login`, {
        method: "POST",
        credentials: "include", // <--- Important!
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
        return false;
    }
    return response.ok;

}

export async function isAuthenticated(): Promise<any> {
    try {
        const response = await fetch(`${url}/auth/me`, {
            method: "GET",
            credentials: "include", // Ensure cookies are sent with the request
        });

        if (response.ok) {
            const data = await response.json();
            return {
                success: true,
                email: data.email,
                name:data.name
            };
        }

        return { success: false }; // If not authenticated, return false
    } catch (error) {
        //console.error("Error fetching user credentials:", error);
        return { success: false }; // Return false in case of an error
    }
}

export function logout(): Promise<void> {
    return fetch(`${url}/auth/logout`, {
        method: "POST",
        credentials: "include",
    }).then(() => { });
}

export async function addNewUser(user: Customer): Promise<string> {
    let apiURL = `${url}/usercontroller/newUser/${user}`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}


export async function getIndividualUser(mailID: string): Promise<Customer | null> {
    let apiURL = `${url}/usercontroller/${mailID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns true if the customer is already exist
    return await response.json();
}

export async function RrchargeWalletBalance(customerID: number, amount: number): Promise<void> {
    let apiURL = `${url}/usercontroller/recharge/${customerID}/${amount}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function fetchProducts(): Promise<ProductInfo[]> {
    let apiURL = `${url}/productscontroller/products`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}

export async function getIndividualProduct(productID: number): Promise<ProductInfo | null> {
    let apiURL = `${url}/productscontroller/get/product/${productID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns medicine
    return await response.json();
}

export async function addNewProduct(product: ProductInfo): Promise<string> {
    let apiURL = `${url}/productscontroller/add/newProduct`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}

export async function checkMedicineExist(productName: string): Promise<boolean> {
    let apiURL = `${url}/productscontroller/product/${productName}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    //returns true if the medicine is already exist
    return await response.json();
}

export async function editProductDetail(product: ProductInfo): Promise<void> {
    let apiURL = `${url}/productscontroller/new/product/edit`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function deleteProductDetail(productID: number): Promise<void> {

    const response = await fetch(`${url}/productscontroller/delete/${productID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
}

export async function fetchOrders(): Promise<Order[]> {
    let apiURL = `${url}/orderscontroller/orders`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}

export async function getIndividualOrder(orderID: number): Promise<Order | null> {
    let apiURL = `${url}/orderscontroller/get/order/${orderID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns medicine
    return await response.json();
}

export async function cancelOrder(customerID: number, orderID: number): Promise<void> {
    let apiURL = `${url}/orderscontroller/cancel/${customerID}/${orderID}`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

// write a function to add a new order

export async function addNewOrder(customerID: number, productID: number, quantity: number): Promise<string> {
    let apiURL = `${url}/orderscontroller/add/newOrder/${customerID}/${productID}/${quantity}`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}