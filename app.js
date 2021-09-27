
const express = require("express"),
                app = express(),
                path = require('path'),
                bodyParser = require("body-parser"),
                request = require('request'),
                MongoClient = require('mongodb').MongoClient,
                url = "mongodb://localhost:27017";

function apiCall(url, callback){
    request(url, (error, response, body) => {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            return callback(null, result);
        } else {
            return callback(error, null);
        }
    });
}

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    let card = {
        img: null
    };
    res.render("index", {card:card});
})

app.get("/search", (req, res) => {
    let card = {
        img: null
    };
    res.render("search", {card:card});
})

app.post("/search", (req, res) => {
    // Need body-parser to capture req.body 
    let cardName = req.body.card;
    let url = "https://api.scryfall.com/cards/search?q=" + cardName;

    apiCall(url, (err, body) => {
        if(err){
            console.log(err);
            res.render("search");
        } else {
            let card = {
                img: body.data[0].image_uris.normal
            }
            // console.log(body.data[0].image_uris.normal);
            res.render("search", {card:card});
        }
    })  
})

app.post("/addCard", (req, res) => {
    // console.log(req.body.card);

    let card = {
        img: req.body.card
    }

    MongoClient.connect(url, (err, db) => {
        if (err) throw err;
        var dbo = db.db("cards");
        dbo.collection("deck").insertOne(card, (err, res) => {
            if (err) throw err;
            console.log("1 Card Inserted");
            db.close();
        })
    })

    res.render("index", {card:card});
})

let port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Started Succesfully!")
})