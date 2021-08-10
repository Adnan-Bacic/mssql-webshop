//common is used for making a dynamic button
import Common from './common.js';

class showPhones{
    constructor(){
        //results of the ouput
        this.result = document.querySelector('#result');

        //calling method for showing all phones
        this.showAllPhones();
    }

    //method to show all phones
    showAllPhones(){
        fetch('/getPhones')
        .then((res) => { return res.json()}) //receive a promise, that in a while promises some json data
        .then((data) => { // here we actually receives the json data
            

            //variable for output
            let output = "";

            //creating delete button dynamically
            for (let phones of data) {
                let btnDel = document.createElement("button");
                    btnDel.innerHTML = "Delete phone with id: " + phones.phone_ID;

                   btnDel.addEventListener('click', () => {
                       this.deletePhoneDB(phones.phone_ID)
                   })

                //content of output
                let element = Common.toDom(
                `
                <div class="phoneContainer">
                <div class="title">${phones.phone_title}</div>
                <div class="img">
                    <img src="https://via.placeholder.com/150">
                </div>
                <div class="description">${phones.phone_description}</div>
                <div class="price">${phones.phone_price}</div>
                </div>
                `)
                this.result.appendChild(btnDel); //showing delete btn
                this.result.appendChild(element); //showing phones
            }
        })
    } 

    //deleting phone
    deletePhoneDB(phoneID){
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

        //refreshing page
        location.reload();
      });
}
}

//exporting the class
export default showPhones;