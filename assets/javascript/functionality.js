$(document).ready(function () {

    var heroes = ["Batman", "Wonder Woman", "Spider-Man", "Catwoman", "Wolverine"]
    showGIF = " "


    function renderButtons() {

        $("#heroImages").empty();
        for (var i = 0; i < heroes.length; i++) {
            var herobutton = $('<button>');
            herobutton.addClass('hero');
            herobutton.attr('data-name', heroes[i]);
            herobutton.text(heroes[i]);
            $("#heroImages").append(herobutton);
        }
        s = $("#heroinput").focus();

    }

    renderButtons();

    $("#addhero").on('click', function () {


        event.preventDefault();

        var newHero = $("#heroinput").val().trim();

        heroes.push(newHero);

        renderButtons();

    });


    $(document).on('click', 'button', function () {
        $('#showGIF').empty();
        var herogifs = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + herogifs + "&api_key=u3jCbRqRv8q3zT8gK0cXNjtoWU8rHBme&limit=10";
        // console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: 'GET'
        })

            .done(function (response) {
                console.log(response);
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $('<div class="item">');
                    var rating = results[i].rating;
                    var gifRating = $('<p>').text("Rating: " + rating);
                    var gifImage = $('<img>');
                    gifImage.attr('src', results[i].images.fixed_height_still.url)
                        .attr('data-still', results[i].images.fixed_height_still.url)
                        .attr('data-animate', results[i].images.fixed_height.url)
                        .attr('data-state', "still")
                        .addClass("showImage");

                    gifDiv.append(gifRating).append(gifImage);

                    $('#showGIF').prepend(gifDiv);
                }

            });
    });

    $(document).on('click', '.showImage', function () {

        var state = $(this).data('state');
        if (state == "still") {
            console.log("still image works");

            $(this).attr('src', $(this).data('animate'))
                .data('state', 'animate');
        } else {
            console.log("animated image works");
            $(this).attr('src', $(this).data('still'))
                .data('state', 'still');
        }

    });

});
