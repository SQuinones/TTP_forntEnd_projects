// This setInterval  method calls a function at specified interval.
setInterval(function () {
    // declaring variables and assign the date 
    var currentTime = new Date();
    // declaring variables and assign the hours
    var hours = currentTime.getHours();
    // declaring variables and assign the minutes
    var minutes = currentTime.getMinutes();
    // declaring variables and assign the seconds
    var seconds = currentTime.getSeconds();
    //variable for the AM period
    var period = "AM";
    //if statement 
    if (hours >= 12) {
        period ="PM";
    }
    if (hours > 12) {
        hours = hours - 12;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
     var clockTime = hours + ":" + minutes + ":" + seconds + " " + period;

     var clock = document.getElementById('clock');
     clock.innerText = clockTime;
}, 1000);