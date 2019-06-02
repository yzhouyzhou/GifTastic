var animals = ["cats", "panda", "leopard", "bird", "lion", "elephant",
    "bear", "deer", "pig", "tiger", "rabbit", "turtle",
    "monkey", "raccoon", "kangaroo", "giraffe", "squirrel"];
var MAX_NUM_IMAGES = 10;
function displayAnimalImg() {
    $("#img-display").empty();

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=RpbF7yK9jdJvEIcxqxFvfqB36r3852SI&limit=" + MAX_NUM_IMAGES;

    // Creates AJAX call for the specific animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        var count = MAX_NUM_IMAGES;
        for (var i = 0; i < MAX_NUM_IMAGES; i++) {
            var stillImgUrl = response.data[i].images.original_still.url;
            var animateUrl = response.data[i].images.original.url;
            var aCard = $("<div>");
            // a card contains an img name and an img
            aCard.addClass("card-div");
            var aSpan = $("<span>");
            aSpan.html(animal + " gif " + count + ": " + response.data[i].rating);
            var anImg = $("<img>");
            anImg.attr("src", stillImgUrl);
            anImg.attr("url-still", stillImgUrl);
            anImg.attr("data-state", "still");
            anImg.attr("url-animate", animateUrl);
            anImg.addClass("gif");
            aCard.append(aSpan, anImg);
            $("#img-display").prepend(aCard);
            count--;
        }
    });
}

function imgClickHandler() {
    var dataState = $(this).attr("data-state");
    if (dataState === "still") {
        // the clicked image's state is still, update to animate
        $(this).attr("src", $(this).attr("url-animate"));
        $(this).attr("data-state", "animate");
    } else {
        // the clicked image's state is animate, update to still
        $(this).attr("src", $(this).attr("url-still"));
        $(this).attr("data-state", "still");
    }
}

function renderButtons() {
    $("#buttons-view").empty();
    // Loops through the animals array to add as buttons
    for (var i = 0; i < animals.length; i++) {
        var btn = $("<button>");
        btn.addClass("animal");
        btn.addClass("btn");
        btn.addClass("btn-default");
        btn.attr("onmouseover", "style.background='gray'");
        btn.attr("onmouseout", "style.background='darkcyan'");
        btn.attr("data-name", animals[i]);
        btn.text(animals[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(btn);
    }
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animalInput = $("#animal-input").val().trim().toLowerCase();
    // Do not add empty button in
    if (animalInput.length === 0)
        return;
    // Do not add dups
    if (animals.includes(animalInput)) {
        alert("Do not add ! The animal name is in the button list ...");
        return;
    }

    animals.push(animalInput);
    // Calling renderButtons which handles the processing of animals array
    renderButtons();
});

// Adding click event listeners to all elements with a class of "gif"
$(document).on("click", ".gif", imgClickHandler);

// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalImg);

// Calling the renderButtons function to display the intial buttons
renderButtons();
