// App Configuration

const express = require("express"),
                app = express(),
                path = require('path'),
                bodyParser = require("body-parser"),
                request = require('request'),
                MongoClient = require('mongodb').MongoClient,
                assert = require('assert'),
                url = "mongodb://localhost:27017";

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));

// Helper Functions

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

function findDocuments(db, callback) {
        // Get the documents collection
        let dbo = db.db("cards");
        var collection = dbo.collection("deck");
        // Find some documents
        collection.find({}).toArray((err, docs) => {
        assert.equal(err, null);
        // console.log("Found the following records");
        callback(docs);
    })
}

// URL Paths

app.get("/", (req, res) => {

    MongoClient.connect(url, (err, db) => {
        if (err) {
            console.log("error!!");
            res.render("error");
        }
        
        findDocuments(db, (docs) => {
            // console.log(docs);
            res.render("deck", {deck:docs});
        })
        
    })
})

app.get("/search", (req, res) => {
    // Declare basic data 
    var message = "";
    var card = {
        img: null
    };
    res.render("search", {card:card, message:message});
})

app.post("/search", (req, res) => {
    // Need body-parser to capture req.body 
    let cardName = req.body.card;
    let url = "https://api.scryfall.com/cards/search?q=" + cardName;

    apiCall(url, (err, body) => {
        var message = "";
        var card = {
            img: null
        };

        if(err){
            // console.log(err);
            res.render("error");
        } else {
            // If Card is returned
            try {
                card = {
                    img: body.data[0].image_uris.normal
                }
                
                // console.log(body.data[0].image_uris.normal);
                res.render("search", {card:card, message:message});
            }
            // If No Card is found
            catch {
                if (cardName != "") {
                    message = "No card was found named: " + cardName;
                } else {
                    message = "You need to enter a card name";
                }
                res.render("search", {card:card, message:message});
            }    
        }
    })  
})

app.post("/addCard", (req, res) => {

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

    res.redirect("/");
})

// app.get("/deck", (req, res) => {

//     MongoClient.connect(url, (err, db) => {
//         if (err) {
//             res.render("error");
//         }
        
//         findDocuments(db, (docs) => {
//             // console.log(docs);
//             res.render("deck", {deck:docs});
//         })
        
//     })
// })

let port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Serving on: localhost:3000")
})