//steroids.view.navigationBar.show("myClock");
    
    var militaryTime = false;

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

function updateTime(){
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
	var suffix = " AM";
    
    var day=today.getDate();
    var dayName=dayString(today.getDay());
    var monthName=monthString(today.getMonth());
    
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
	
	m=checkTime(m);
    s=checkTime(s);
    
    
	var timeString = h+":"+m+":"+s;
    
    
	if(!militaryTime){
		timeString = timeString + suffix;
	}
    
	document.getElementById("clock").firstChild.nodeValue = timeString;
    document.getElementById("day").firstChild.nodeValue = dateString;
    
	t=setTimeout(function(){updateTime()},500);
    
    
}


function toggleMilitary(){
    militaryTime = !militaryTime;
    
    if(militaryTime){
        document.getElementById("toggle24").firstChild.nodeValue = "Switch to 12-Hour Clock";
    }
    else{
        document.getElementById("toggle24").firstChild.nodeValue = "Switch to 24-Hour Clock";
    }
}


function setAlarm(setH, setM, setAP){
    var alarmString = setH + ":" + setM + " " + setAP;
    
    document.getElementById("alarm").firstChild.nodeValue = alarmString;
    
}

function getHour(){
    return aHour;
}

function getMinute(){
    return aMinute;
}

function getDropValues(){
    var dropH = document.getElementById("hours").value;
    var dropM = document.getElementById("minutes").value;
    var dropAP = document.getElementById("ampm").value;
    
    setAlarm(dropH, dropM, dropAP);
}

function checkTime(i){
    if (i<10){
        i="0" + i;
    }
    
    return i;
}


