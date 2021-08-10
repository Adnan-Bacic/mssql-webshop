const mssql = require('mssql');

    //connection variable
    async function conn() {
        await mssql.connect('mssql://sa:123@localhost:1433/webshop_phone?encrypt=false')
}

//exporting connectiong
module.export = conn()

/*
Info:
Username: sa
Password: 123
Server: localhost:1433
Database name: webshop_phone
*/