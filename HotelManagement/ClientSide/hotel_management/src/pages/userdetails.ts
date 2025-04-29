import * as APICALLS from "../api/apicalls";
export async function renderUserDetails(container:HTMLElement) {
    var user=await APICALLS.isAuthenticated();
    var userDetails=await APICALLS.getIndividualUser(user.email);
    const userdiv=document.createElement('div');
    userdiv.className="userdetails";
    userdiv.innerHTML=`<div ><img src="/public/carrot.jpg  "id="images" ></div>
    <div>Name:${userDetails?.userName}</div>
    <div>UserId:${userDetails?.userID}</div>
    <div>Phone Number:${userDetails?.mobileNumber}</div>
    <div>Aadhar Number:${userDetails?.aadharNumber}</div>
    <div>Gender:${userDetails?.gender}</div>
    <div>Address:${userDetails?.address}</div>
    <div>Amount:${userDetails?.amount}</div>
    <div>Email:${userDetails?.email}</div>`
    container.appendChild(userdiv);
    
}