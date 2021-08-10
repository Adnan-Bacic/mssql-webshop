class deletePhone{
    constructor(){
        this.btnDeletePhone = document.querySelector("#btnDeletePhone");

        //calling method for deleting phones
        this.deletePhoneDB();
    }

    //method for deleting phones
    deletePhoneDB(){
        this.btnDeletePhone.addEventListener("click", () => {
            let phoneID = document.querySelector("#deletePhoneID").value;
            

            //binding each input to a variable
        
 
        //gets savephone from server.js
        fetch("/deletephone", {
         method: 'POST',
         headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
         },
           body: JSON.stringify({
             phoneID
         })
       })
       .then((res) => { 
         return res.json()
       })
       .then((data)=>{
         //after a phone is created, do this
         alert(data.deletePhoneResponse);
       });
     })
    }
}

//exporting the class
export default deletePhone;