// create buttons for topics and populte the web page
var populate = function () {
	for(var i = 0; i < original.topics.length; i++){
	console.log(original.topics[i]); 
var topicsButton = $('<button/>').text(original.topics[i]).attr("class", "populated btn btn-primary btn-lg");
    $("#createdButtons").prepend(topicsButton);

}
};

populate();


// Will populate and ADD BUTTONS BUT CANT CALL THE IMAGES
 $("#searchTopicSubmit").on("click", function () {
   console.log("working");
  event.preventDefault();
  var search = $("#searchTopic").val();
  // console.log(search);
       // var ratingSelect = $('input[name="rating"]:checked').val();
       // console.log(ratingSelect);
       // var limitSelect = $('input[name="return"]:checked').val();
       // console.log(limitSelect);
       // console.log("click");
        // var url = "https://api.giphy.com/v1/gifs/search";
      // url += '?' + $.param({
         // 'q': search,
        // 'rating': ratingSelect,
        // 'limit': limitSelect,
         // 'api_key': "dc6zaTOxFJmzC";
          console.log("search: " + search); 
          original.topics.push(search); 
          console.log("topics: " + original.topics);
          $("#createdButtons").empty();
          populate();
          addgifs();
          
          
   
        });


// Event Listener for click event
var addgifs = function() {
        $(".populated").on("click", function() {
    	console.log("working");
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).text();
      console.log("this: " + person);

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";
        console.log("URL: " + queryURL);



      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // console.log results
          console.log(response);
          console.log(response.data);

          

          // Looping over every result item
          for (var i = 0; i < response.data.length; i++) {
            
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = response.data[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);


              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr({
              					class: "gif",
              					state: "still",
              					src: response.data[i].images.original_still.url,
              					datastill: response.data[i].images.original_still.url,
              					dataanimate: response.data[i].images.original.url,
              				
              					
              					});

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(personImage);
              gifDiv.append(p);
             


              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifResults").prepend(gifDiv);
            
          }
        });
    });
  };      

  addgifs();

$( "div" ).on( "click", ".gif", function() {
  console.log("working");
  console.log(this);
       // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
       var state = $(this).attr("state");
       console.log(state);
       // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
       if (state === "still") {
         $(this).attr("src", $(this).attr("dataanimate"));
         $(this).attr("state", "animate");
       } else {
         $(this).attr("src", $(this).attr("datastill"));
         $(this).attr("state", "still");
       }
    });