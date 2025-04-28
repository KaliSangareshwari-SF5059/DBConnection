export const genderDetails:string[]=["Male","Female","Others"];
export const departmentDetails : string[]=["CSE","ECE","EEE"];
export interface Customer{
    customerID: number;
    amount: number;
    name: string;
    email: string;
    password: string;
    userPhoneNumber: string;
    gender:string;
    department:string;
}

export const availabilityDetails:string[]=["Issued","Available","Damaged"];

export interface BookDetails{
    bookID:number;
    bookName:string;
    authorName:string;
    availability:string;
}

export const borrowStatus:string[]=["Borrowed","Returned"];

export interface Borrow{
    borrowID:number;
    bookID:number;
    bookName:number;
    customerID:number;
    fineAmount:number;
    bookingStatus:string;
    borrowDate:Date;
}
