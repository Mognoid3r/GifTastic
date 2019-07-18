$(document).ready(function() {

var persons = ["richard feyman", "nikola tesla", "morpheus", "tyler durden"];

function makeButtons(newArr, newClass, templateArea) {
  $(templateArea).empty();

  for (var i = 0; i < newArr.length; i++) {
    var butt = $("<button>");
    butt.addClass(newClass);
    butt.attr("data-type", newArr[i]);
    butt.text(newArr[i]);
    $(templateArea).append(butt);
  }
}



$(document).on("click", ".person-button", function () {
  $("#persons").empty();
  $(".person-button").removeClass("active");
  $(this).addClass("active");

    var person = $(this).attr("data-type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      person + "&api_key=LySPiU7Z8PVyY22mpTj1ulEfZxvTsjPV&limit=10";
                         
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        console.log(response)
        
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div class=\"person-itme\">");
        
          var rating = results[i].rating;

          var p = $("<p>").text("Rating: " + rating);

          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;


          var personImage = $("<img>");
          personImage.attr("src", still);
          personImage.attr("data-still", still);
          personImage.attr("data-animate", animated);
          personImage.attr("data-state", "still");
          personImage.addClass("person-image");
          
          
          
          
          gifDiv.append(p);
          gifDiv.append(personImage);

          $("#persons").append(gifDiv);
        }
      });
    });

      // turn image state from animated to still

      $(document).on("click", ".person-image", function() {

        var state = $(this).attr("data-state");
    
        if (state === "still") {
          $(this).attr("src", $(this).attr("data-animate"));
          $(this).attr("data-state", "animate");
        }
        else {
          $(this).attr("src", $(this).attr("data-still"));
          $(this).attr("data-state", "still");
        }
      });

      $("#userSuggests").on("click", function(event) {
        event.preventDefault();
        var newPerson = $("input").eq(0).val();
    
        if (newPerson.length > 2) {
          persons.push(newPerson);
        }
    
        makeButtons(persons, "person-button", "#buttons");
    
      });
    
      makeButtons(persons, "person-button", "#buttons");
    });


