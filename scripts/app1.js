var werkbonnen = [];

var eventColorPalette = ["#6ba292", "#FFCC42", "#ff9b71", "#dd614a"];

$.ajax({url: "https://5f6c8a6834d1ef0016d583ab.mockapi.io/werkbonnen", success: function(result){    
    result.forEach(element => {
        //console.log(element);
        werkbonnen.push(element);

        var $newEvent = $("<div class='event'></div>");
        var uniqueClassName = "event" + element.werkbonnummer;
        $newEvent.addClass(uniqueClassName);
        $newEvent.append("<p>" + element.titel + "</p>");
        $newEvent.append("<p>" + element.startdatum + " - " + element.einddatum + "</p>");

        
        var marginTop = parseFloat($(".hiddenDiv").css("margin-top")); // Get second child, as first child has more margin-top than the others

        var timePosition = $(".time" + parseFloat(element.startdatum)).position();

        var height = (parseFloat(element.einddatum) - parseFloat(element.startdatum)) * 15; // Each hour is 15vh (margin-top: 5vh and padding-bottom: 10vh)

        var dayWidth = $(".daydiv").outerWidth(); // Get width of parent div

        // TODO: Check if there are any other events colliding with this one
        var eventWidth = dayWidth - 30; // Subtract the padding of the parent div

        var color = eventColorPalette[Math.floor((Math.random() * 4))];


        $newEvent.css({
                        "position": "absolute", 
                        "top": timePosition.top + marginTop,
                        "height": height + "vh",
                        "background-color": color,
                        "width": eventWidth,
                        "color": "white",
                        "text-align": "center",
                        "font-family": "Arial, Helvetica",
                        "font-size": "14px",
                        "font-weight": "bold",
                        "border-radius": "5px" // Rounding of the corners
        });


        console.log($newEvent.css("min-width"));

        $(".day1").append($newEvent);
    });

    console.log(werkbonnen);

  }});