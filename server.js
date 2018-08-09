let cheerio = require("cheerio");
let request = require("request");
let express = require("express");
let bodyParser = require("body-parser");
let axios = require("axios");
let db = require("./models");
let mongoose = require("mongoose");

let PORT = 3000;

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
mongoose.connect("mongodb://localhost/newscrape");

//  This will scrape articles links from nhl
app.get("/scrape", function(req,res) {
    axios.get("https://www.nhl.com/").then(function(response) {
        var $ = cheerio.load(response.data);
        
        $("h4.headline-link").each(function(i,element) {
            let result = {};
            
            result.title = $(element)            
            .text();
             result.link = $(element)
            .parent()
            .attr("href");           

            db.Article.create(result)
            .then(function(dbArticle) {                         
                console.log(dbArticle);
        })
            .catch(function(err) {          
          return res.json(err);
        });
        
    });
});

});

// This route will display the articles
app.get("/articles", function(req,res) {
    db.Article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle);
    })
    .catch(function(err) {        
        res.json(err);
      });
});

  // This route will post articles to saved articles
 app.post("/saved/:id", function(req,res) {
     db.Saved.create(req.body)
     .then(function(dbSaved) {
         return db.Article.findOneAndUpdate({ _id: req.params.id }, { title: dbSaved._id }, { new: true });
     })
     .then(function(dbArticle) {
         res.json(dbArticle);
         console.log("dbarticle " + dbArticle);
     });
 });

 // route to display saved articles
 app.get("/saved", function(req,res) {
     db.Saved.find({})
     .then(function(dbArticle) {
         res.json(dbArticle);
     });
 });

  app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });

  