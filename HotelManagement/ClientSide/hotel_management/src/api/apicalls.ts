// import { User, BookDetails, Borrow } from '../Models/model';
import { RoomDetails, User, WishList } from "../Models/model";
let url = "http://localhost:5164/api/hotel";

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
                name: data.name
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

export async function addNewUser(user: User): Promise<string> {
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


export async function getIndividualUser(mailID: string): Promise<User | null> {
    let apiURL = `${url}/usercontroller/${mailID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns true if the customer is already exist
    return await response.json();
}

export async function RechargeWalletBalance(customerID: number, amount: number): Promise<void> {
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

export async function fetchRooms(): Promise<[RoomDetails]> {
    let apiURL = `${url}/roomdetailscontroller/rooms`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        throw new Error("Fail to fetch data");
    }
    return await response.json();
}

export async function getIndividualRoom(roomID: number): Promise<RoomDetails | null> {
    let apiURL = `${url}/roomdetailscontroller/get/room/${roomID}`;
    let response = await fetch(apiURL);
    if (!response.ok) {
        return null;
    }
    //returns medicine
    return await response.json();
}

export async function addNewRoom(room: RoomDetails): Promise<string> {
    let apiURL = `${url}/roomdetailscontroller/add/newRoom`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });

    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}

// // export async function checkMedicineExist(productName: string): Promise<boolean> {
// //     let apiURL = `${url}/productscontroller/product/${productName}`;
// //     let response = await fetch(apiURL);
// //     if (!response.ok) {
// //         throw new Error("Fail to fetch data");
// //     }
// //     //returns true if the medicine is already exist
// //     return await response.json();
// // }

export async function editRoomDetail(room: RoomDetails): Promise<void> {
    let apiURL = `${url}/roomdetailscontroller/edit/room`;
    let response = await fetch(apiURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    });
    if (!response.ok) {
        throw new Error("Fail to update data");
    }
}

export async function deleteRoomDetail(roomID: number): Promise<void> {

    const response = await fetch(`${url}/roomdetailscontroller/delete/room/${roomID}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error('Failed to delete contact');
    }
}

// export async function fetchBorrows(): Promise<Borrow[]> {
//     let apiURL = `${url}/borrowcontroller/borrowHistory`;
//     let response = await fetch(apiURL);
//     if (!response.ok) {
//         throw new Error("Fail to fetch data");
//     }
//     return await response.json();
// }

// export async function getIndividualBorrow(borrowID: number): Promise<Borrow | null> {
//     let apiURL = `${url}/borrowcontroller/get/borrow/${borrowID}`;
//     let response = await fetch(apiURL);
//     if (!response.ok) {
//         return null;
//     }
//     //returns medicine
//     return await response.json();
// }

// export async function cancelBook(customerID: number, orderID: number,fineAmount:number,bookID:number): Promise<void> {
//     let apiURL = `${url}/borrowcontroller/cancel/${customerID}/${orderID}/${fineAmount}/${bookID}`;
//     let response = await fetch(apiURL, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if (!response.ok) {
//         throw new Error("Fail to update data");
//     }
// }

// // // write a function to add a new order

// export async function addNewBorrow(customerID: number, bookID: number): Promise<string> {
//     let apiURL = `${url}/borrowcontroller/add/newBorrow/${customerID}/${bookID}`;
//     let response = await fetch(apiURL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         }
//     });
//     if (!response.ok) {
//         throw new Error("Fail to add data");
//     }
//     return await response.text();
// }

export async function addWishList(wishList: WishList): Promise<string> {
    let apiURL = `${url}/wishlistcontroller/add/newwishlist`;
    let response = await fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(wishList)
    });
    if (!response.ok) {
        throw new Error("Fail to add data");
    }
    return await response.text();
}