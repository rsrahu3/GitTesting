const router = require("./src/server/routers/weather-routers")
const express = require("express");
const path = require("path");
require("./src/server/db/mongoose");

let app = express();
app.use(express.json())
app.use(express.static(path.join(__dirname,"src/client")))
app.use(router)
app.listen(3000,()=>{
    console.log("Server started at 3000 port");
})