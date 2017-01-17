
var populate = function () {
	for(var i = 0; i < topics.length; i++){
	console.log(topics[i]); 
	var topicsButton = $(' ' + '<button/>' + ' ').text(topics[i]);
    $("#buttonarea").append(topicsButton);

};
};

populate();

    $("#searchSubmit").on("click", function() { 
      event.preventDefault();
      var search = $("#searchTerm").val();
      // console.log(search);
      // var ratingSelect = $('input[name="rating"]:checked').val();
      // console.log(ratingSelect);
      // var limitSelect = $('input[name="return"]:checked').val();
      // console.log(limitSelect);
      // console.log("click");
      // var url = "http://api.giphy.com/v1/gifs/search";
     // url += '?' + $.param({
       // 'q': search,
       // 'rating': ratingSelect,
       // 'limit': limitSelect,
       // 'api_key': "dc6zaTOxFJmzC",
      console.log("search: " + search); 
      topics.push(search); 
      console.log("topics: " + topics);
      $("#buttonarea").html("");
      populate();
  
       });


    $("button").on("click", function() {
    	// console.log("working");
      // In this case, the "this" keyword refers to the button that was clicked
      var person = $(this).text();
      console.log("this: " + person);

      // Constructing a URL to search Giphy for the name of the person who said the quote
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=dc6zaTOxFJmzC&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var personImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              personImage.attr("src", results[i].images.original_still.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(personImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            
          }
        });
    });