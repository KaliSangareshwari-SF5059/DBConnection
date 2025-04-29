export const foodTypeDetails: string[] = ["Veg", "Non Veg"];
export const genderDetails: string[] = ["Male", "Female", "Others"];
export const roomTypeDetails: string[] = ["Standard", "Delux", "Suit"];
export const bookingStatusDetails: string[] = ["Initiated", "Booked", "Cancelled"];

export interface User {
    userID: number;
    amount: number;
    userName: string;
    email: string;
    password: string;
    mobileNumber: string;
    gender: string;
    aadharNumber: string;
    address: string;
    foodType: string;
}

export interface RoomDetails {
    roomID: number;
    roomType: string;
    pricePerDay: number;
    numberOfBeds: number;
}

export interface BookingDetails {
    bookingID: number,
    userID: number,
    totalPrice: number,
    dateOfBooking: Date;
    bookingStatus: string;
}

export interface RoomSelectionDetails {
    selectionID: number;
    wishListID: number;
    bookingID: number;
    roomID: number;
    stayingFrom: Date;
    stayingTo: Date;
    price: number;
    numberOfDays: number;
    bookingStatus: string;
}


export interface WishList {
    wishListID: number;
    userID: number;
    roomID: number;
    priceOfRoom: number;
    fromDate: Date;
    toDate: Date;
}


