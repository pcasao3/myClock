//steroids.view.navigationBar.show("myClock");

//Show Clock
function showClock(){
    var webView = new steroids.views.WebView("clock.html");
    steroids.modal.show(webView);
}


//Show Alarm
function showAlarm(){
    var webView = new steroids.views.WebView("alarm.html");
    steroids.modal.show(webView);
}

//Show Stopwatch
function showStopwatch(){
    var webView = new steroids.views.WebView("stopwatch.html");
    steroids.modal.show(webView);
}

//A boolean for 24-hour clock
var militaryTime = false;

//Return a string representing the day of the week based on the given number
function dayString(num){
    var rVal = "";
    switch(num){
        case 0:
            rVal = "Sunday";
            break;
        case 1:
            rVal = "Monday";
            break;
        case 2:
            rVal = "Tuesday";
            break;
        case 3:
            rVal = "Wednesday";
            break;
        case 4:
            rVal = "Thursday";
            break;
        case 5:
            rVal = "Friday";
            break;
        case 6:
            rVal = "Saturday";
            break;
        default:
            rVal = "This is not a day value";
    }
    
    return rVal;
}


//Return a string representing the day of the week based on the given number
function monthString(num){
    var rVal = "";
    switch(num){
        case 0:
            rVal = "January";
            break;
        case 1:
            rVal = "February";
            break;
        case 2:
            rVal = "March";
            break;
        case 3:
            rVal = "April";
            break;
        case 4:
            rVal = "May";
            break;
        case 5:
            rVal = "June";
            break;
        case 6:
            rVal = "July";
            break;
        case 7:
            rVal = "August";
            break;
        case 8:
            rVal = "September";
            break;
        case 9:
            rVal = "October";
            break;
        case 10:
            rVal = "November";
            break;
        case 11:
            rVal = "December";
            break;
        default:
            rVal = "This is not a month value";
    }
    
    return rVal;
}


//A function used to update the time, based on the w3cschools example:
//http://www.w3schools.com/js/tryit.asp?filename=tryjs_timing_clock
function updateTime(){
    //Create a new date and get values from it
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
	var suffix = " AM";
    
    var day=today.getDate();
    var dayName=dayString(today.getDay());
    var monthName=monthString(today.getMonth());

    //Create a date string
    var dateString = dayName + ", " + monthName + " " + day;
    
	//Have an alarm variable
    var aHour = window.localStorage.getItem("hours");
    var aMinute = window.localStorage.getItem("minutes");
    var ampm = window.localStorage.getItem("ampm");
    var alarmSet = window.localStorage.getItem("alarmSet");
    
    if(ampm === "PM"){
        aHour += 12;
    }
    
	//Add AM or PM afterwards
	if(h >= 12){
		suffix = " PM";
	}
    
	// add a zero in front of numbers<10
    if(!militaryTime && h>12){
		h-=12;
	}
	
    //Make sure the 'm' and 's' have
	m=checkTime(m);
    s=checkTime(s);
    
    
	var timeString = h+":"+m+":"+s;
    
    //Set the timestring
	if(!militaryTime){
		timeString = timeString + suffix;
	}
    
    //Set the node values of "clock" and "day"
	document.getElementById("clock").firstChild.nodeValue = timeString;
    document.getElementById("day").firstChild.nodeValue = dateString;
    
    //Run this again in 500ms
	t=setTimeout(function(){updateTime()},500);
    
    
}

//Toggle the 24-hour clock/12-hour clock
function toggleMilitary(){
    militaryTime = !militaryTime;
    
    if(militaryTime){
        document.getElementById("toggle24").firstChild.nodeValue = "Switch to 12-Hour Clock";
    }
    else{
        document.getElementById("toggle24").firstChild.nodeValue = "Switch to 24-Hour Clock";
    }
}

//Set the "alarm" element's string based on the parameters
function setAlarm(setH, setM, setAP){
    var alarmString = setH + ":" + setM + " " + setAP;
    
    document.getElementById("alarm").firstChild.nodeValue = alarmString;
    
}

//Get the values of the "select" elements and set the alarm based on that.
function getDropValues(){
    var dropH = document.getElementById("hours").value;
    var dropM = document.getElementById("minutes").value;
    var dropAP = document.getElementById("ampm").value;
    
    setAlarm(dropH, dropM, dropAP);
}

//If a number is less than 10, prepend a "0" to the beginning to make it a 2-digit number
function checkTime(i){
    if (i<10){
        i="0" + i;
    }
    
    return i;
}


