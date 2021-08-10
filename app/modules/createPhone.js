class createPhone{
    constructor(){

        //submit btn
        this.btnSendPhone = document.querySelector('#btnCreatePhone');
        //console.log(this.btnSendPhone);

        //calling method for creating a new phone
        this.createNewPhone();
    }

    //method for creating phones
    createNewPhone() { 
        //click event for submit btn
        this.btnSendPhone.addEventListener("click", () => {
 
        //binding each input to a variable
        let phoneTitle = document.querySelector("#phoneTitle").value;
        let phoneDescription = document.querySelector("#phoneDescription").value;
        let phonePrice = document.querySelector("#phonePrice").value;

        //refreshing page
        location.reload();
 
        //gets savephone from server.js
        fetch("/savephone", {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
           body: JSON.stringify({
             phoneTitle,
             phoneDescription,
             phonePrice
         })
       })
       .then((res) => { 
         return res.json()
       })
       .then((data)=>{
         //after a phone is created, do this
         alert(data.createPhoneResponse);
         this.showAllPhones();
       });
     })
     }
}

//exporting the cass
export default createPhone;