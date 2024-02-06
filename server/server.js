const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, 'config', '.env') });

const IP = process.env.IP_ADDRESS;
const HOST = process.env.HOST_NAME;
const PORT = process.env.PORT_NUMBER;



// middleware


app.use(cors());
app.use(express.json());
app.use(cookieParser());


// routes




const app = express();

app.get('/', (res, req)=>{
    res.send(`<h1>Working</h1>`);
})

app.listen(IP, HOST, PORT, () => {
    console.log(`server is live on ${HOST}:${PORT}`);
})
