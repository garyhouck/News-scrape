$(document).ready(function() {

    $.getJSON("/scrape", function(data) {
        // For each one
        return data;
      });

    // display articles in database when clicked
    $("#scrape").on("click", function(event) {
        event.preventDefault();
        $.getJSON("/articles", function(data) {
            for (let i=0; i<data.length; i++) {
                $("#newsLinks").append("<h2>" + data[i].title + "</h2>");
                $("#newsLinks").append("<a href='https://www.nhl.com" + data[i].link + "' target='_blank'>Go to the story</a>" + "<br><br>");
                $("#newsLinks").append("<button data-id='" + data[i]._id + "'id='saveArticle' class='btn'>Save Article</button>" + "<hr>");
                // console.log("data: " + data[i].title + data[i].link);
            }
        })        
    });

    // send article to database
    $(document).on("click", "#saveArticle", function(event) {
        event.preventDefault();
        console.log("click");        
        let thisId = $(this).attr("data-id");        
        let articleData = {
            "_id": thisId                      
        }
        console.log("artice data " + JSON.stringify(articleData));
        $.ajax({
            method: "POST",
            url: "/saved/" + thisId,
            data: articleData
          })            
            .then(function(data) {              
              console.log("here is the " + data);              
            });
    })

    // view saved articles
    $("#saved").on("click", function(event) {
        console.log("clicked button");
        event.preventDefault();
        $.getJSON("/saved", function(data) {
            $(".modal-body").append("<h2>" + data.title + "</h2>");
            $("#newsLinks").append("<a href='https://www.nhl.com" + data.link + "' target='_blank'>Read your saved story</a>" + "<br><br>");
            $("#newsLinks").append("<button data-id='" + data._id + "'id='createNote' class='btn'>Write a note</button>" + "<hr>");
        })
    })




});