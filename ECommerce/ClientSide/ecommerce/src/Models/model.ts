export interface Customer {
    customerID: number;
    amount: number;
    name: string;
    email: string;
    password: string;
    userPhoneNumber: string;
    city:string;
}

export interface ProductInfo {
    productID: number;
    productName: string;
    productCount: number;
    productPrice: number;
    shippingDuration: number;
}

export const orderStatus: string[] = ["Purchased", "Cancelled"];

export  interface Order {
    orderID: number;
    productID: number;
    productName: string;
    customerID: number;
    totalPrice: number;
    productCount: number;
    purchaseStatus: string;
    orderDate: Date;
}