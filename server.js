//importing database connection
require('./db_conn');

//node modules
const express = require('express');
const app = new express();
const bodyParser = require('body-parser');
const path = require("path");
const mssql = require('mssql');

//to be able to send text
app.use(bodyParser.urlencoded({
    extended: true
}));
//to be able to send json
app.use(bodyParser.json())

//port to find the application - localhost:3100
app.listen(3100);
console.log("Opened on port" + 3100);

//fix for: "Cannot GET /" - path finds the app folder
app.use(express.static(path.join(__dirname, 'app')));



//for showing phones
app.get("/getPhones", async (req, res) => {
    res.json(await getPhonesDB())
});
//sql query to show phones
async function getPhonesDB() {
    try {
        const result = (await mssql.query `select * from dbo.phones order by phone_ID asc`).recordset
        return result
    } catch (err) {
        console.log(err);
    }
}



//for saving phones
app.post("/savephone", async (req, res) => {

    
    let phoneTitle = req.body.phoneTitle;
    let phoneDescription = req.body.phoneDescription;
    let phonePrice = req.body.phonePrice;
    savePhoneDB(phoneTitle, phoneDescription, phonePrice)

    res.json(
        {"createPhoneResponse": `
            Phone ${phoneTitle} created
        `}
    )
});
//sql query to insert
async function savePhoneDB(phoneTitle, phoneDescription, phonePrice) {
    console.log("savePhone");
    try {
        const result = (await mssql.query `INSERT INTO dbo.phones (phone_title, phone_description, phone_price)
        VALUES (${phoneTitle}, ${phoneDescription}, ${phonePrice});`).recordset
    } catch (err) {
        console.log(err);
    }
}


//for deleting phones
app.post("/deletephone", async (req, res) => {
    
    let phoneID = req.body.phoneID;
    deletePhoneDB(phoneID);
    

    res.json(
        {"deletePhoneResponse": `
            Phone with ID ${phoneID} deleted
        `}
    )
});

//sql query to delete
async function deletePhoneDB(phoneID) {
    try {
        const result = (await mssql.query `DELETE FROM dbo.phones WHERE phone_ID = ${phoneID}`).recordset
    } catch (err) {
        console.log(err);
    }
}