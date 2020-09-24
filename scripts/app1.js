var werkbonnen;

var eventColorPalette = ["#6ba292", "#ffdc7c", "#ff9b71", "#dd614a"];
var counter = 0;

$.ajax({url: "https://5f6c8a6834d1ef0016d583ab.mockapi.io/werkbonnen", success: function(result){    
    result.forEach(element => {
        console.log(element);

        var $newEvent = $("<div class='event'></div>");
        var uniqueClassName = "event" + element.werkbonnummer;
        $newEvent.addClass(uniqueClassName);
        $newEvent.append("<p>" + element.titel + "</p>");

        var startHourClass = ".time" + parseInt(element.startdatum); 
        var startPosition = $(startHourClass).position();


        var height = (parseInt(element.einddatum) - parseInt(element.startdatum)) * 15; // Each hour is 15vh (margin-top: 5vh and padding-bottom: 10vh)


        var color = eventColorPalette[Math.floor((Math.random() * 4))];
        console.log(color);

        $newEvent.css({
                        "top": startPosition.top,
                        "position": "absolute", 
                        "margin-top": "1.75vh",  // Set margin-top to 1.75vh, just like the horizontal roster lines, as the div's height is 3.5vh, but the text is vertically centered.
                        "height": height + "vh",
                        "background-color": color  
                    });

        $(".day1").append($newEvent);
    });

  }});


























// $.ajax({
//     type: "GET",
//     url: "https://5f6c8a6834d1ef0016d583ab.mockapi.io/werkbonnen",
//     dataType: "json",
//     success: function (result, status, xhr) {
//         var $newEvent = $( "<div class='event'></div>" );

//         $newEvent.append("<p>" + result["titel"] + "</p>");

//         $(".day1").append($newEvent);
//     },
//     error: function (xhr, status, error) {
//         alert("Result: " + status + " " + error + " " + xhr.status + " " + xhr.statusText)
//     }
// });

// var $newEvent = $( "<div class='event'></div>" );
// $(".day1").append($newEvent)