const path = require('path');
const express = require("express"),
                app = express();



app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
    res.render("index");
})

app.get("/search", (req, res) => {
    res.render("search");
})

let port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Started Succesfully!")
})