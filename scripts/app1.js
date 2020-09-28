var werkbonnen = [];

var eventColorPalette = ["#6ba292", "#FFCC42", "#ff9b71"];

var marginTop = parseFloat($(".hiddenDiv").css("margin-top")); // Get the margin top value of 1.75vh (in px) for this certain device, to use later on

$.ajax({url: "https://5f6c8a6834d1ef0016d583ab.mockapi.io/werkbonnen", success: function(result){    
    result.forEach(element => {
        werkbonnen.push(element);

        // Create div and add content to it
        var $newEvent = $("<div class='event'></div>");
        var uniqueClassName = "event" + element.werkbonnummer;
        $newEvent.addClass(uniqueClassName);
        $newEvent.append("<p>" + element.titel + "</p>");
        $newEvent.append("<p>" + element.startdatum + " - " + element.einddatum + "</p>");

        var timePosition = $(".time" + parseFloat(element.startdatum)).position();
        var divPosition = marginTop + timePosition.top;

        // Calculate the height of the div
        var height = (parseFloat(element.einddatum) - parseFloat(element.startdatum)) * 15; // Each hour is 15vh (margin-top: 5vh and padding-bottom: 10vh)

        // Calculate the width of the div
        var dayWidth = $(".daydiv").outerWidth(); // Get width of parent div
        var eventWidth = dayWidth - 30; // Subtract the padding of the parent div

        // TODO: Check if there are any other events colliding with this one

        // Get random color for div background-color
        var color = eventColorPalette[Math.floor((Math.random() * 4))];

        $newEvent.css({
                        "position": "absolute", 
                        "top": divPosition,
                        "min-height": height + "vh",
                        "background-color": color,
                        "min-width": eventWidth,
                        "color": "white",
                        "text-align": "center",
                        "font-family": "Arial, Helvetica",
                        "font-size": "14px",
                        "font-weight": "bold",
                        "border-radius": "5px",
        });


        console.log($newEvent.css("min-width"));

        $(".day1").append($newEvent);
    });

    console.log(werkbonnen);

  }});

function ScrollToCurrentTime() {
    // Get current time
    var dt = new Date($.now());

    // Get position of this time on the agenda
    var hourPosition = $(".time" + parseFloat(dt.getHours())).position();

    // Calculate the height of a minute in the agenda
    var minuteHeight = ($('.time12').offset().top - $('.time11').offset().top) / 60;

    // Get the minuteheight of the current time
    var minutePosition = minuteHeight * dt.getMinutes();

    // Add the minutes to it's position
    var timePosition = hourPosition.top + minutePosition + marginTop;

    var dayWidth = $(".daydiv").outerWidth(); // Get width of day div

    // Create the elements
    var $currentTimePointer = $("<div class='currentTimePointer'></div>");
    $currentTimePointer.css({
        "position": "absolute", 
        "top": timePosition - 1.5, // Subtract 1.5, to keep it centered (1/2 of div size)
        "border-top": "#FF3636 solid 3px",
        "width": dayWidth,
        "z-index": "1"
    });

    var $currentTimeCircle = $("<div class='currentTimeCircle'></div>");
    $currentTimeCircle.css({
        "position": "absolute", 
        "top": timePosition - 5, // Subtract 5, to keep it centered (1/2 of div size)
        "height": "10px",
        "width": "10px",
        "margin-left": "-5px",
        "background-color": "#FF3636",
        "border-radius": "50%",
        "z-index": "1"
    });
    $(".agendarow").append($currentTimePointer);
    $(".agendarow").append($currentTimeCircle);

    // Scroll page to current timeframe
    var pos = timePosition;
    var elHeight = 3;
    var windowHeight = $(window).height();
    var offset;

    if (elHeight < windowHeight) {
        offset = pos - ((windowHeight / 2) - (elHeight / 2)) + $(".nav").height() + $(".header").height();
    }
    else {
        offset = pos;
    }

    window.scroll({
            top: offset,
            behavior: 'smooth',
          });
}

// Call the function as the page is loaded in
$(window).on('beforeunload', ScrollToCurrentTime());