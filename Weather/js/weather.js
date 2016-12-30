const weatherValueMap = new Map();
//clear
//cloudy`
//partly Cloudy
//rainy
//thunderstorms
//snowy
//hail
//sleet
//full moon
//crescent moon

class Weather_Module extends Gomedia_Dynamic{
  constructor(optionsData){
    super();
    for (let key in optionsData) {
        if (optionsData.hasOwnProperty(key)) {
            this[key] = optionsData[key];
        }
    }
    this.scriptStatus$ = new Rx.BehaviorSubject({isLoaded:false});
    this.isLoaded$ = this.scriptStatus$.map(status=>status.isLoaded);
  }
  init(){
    if(this.checkParams === true){
      //overwriting default parameters with those supplied by the player
      this.zipcode = this.getParameterByName('zipcode') !== "" ? this.getParameterByName('zipcode'): this.zipcode;
    }
  }
  parse_request(){

  }
}

///////////>>>>>>>>>


var five_day_array = [];
var day1_category;
var day2_category;
var day3_category;
var day4_category;
var day5_category;

var five_day_images_array = [];
var day1_img;
var day2_img;
var day3_img;
var day4_img;
var day5_img;
//////////////////////////////////////////////////////////////////////
var DEFAULT_STATE = "KY";
var CURRENT_STATE = DEFAULT_STATE;
var WEATHER_PARSED = false;
//var PROXY_URL = "//proxy.gocodigo.net/cimProxy.aspx?json=use&dur=3600&expire=86400&url=";
var WEATHER_URL = "http%3A%2F%2Fgraphical.weather.gov%2Fxml%2Fsample_products%2Fbrowser_interface%2FndfdBrowserClientByDay.php%3Fformat%3D24%2Bhourly%26numDays%3D5%26zipCodeList%3D";
var ZIPCODE = "40206";
var CITY = "YOUR CITY";
var STATE = "YOUR STATE";
var FEED_URL = null;

var symbol_X = null;
var parent_id = null, element = null, id = null, name = null, value = null, placeholder = null, classList = null, text = null, eventTypeList = null, src = null, height = null, width = null, href = null, target = null, type = null, method = null, action = null, data = null;
/////   F L A G S   ///////////////////////////////////////////////////////
   var IS_EDGE = false;
 /* !!! MOVED TO ap-fgeed.js to main init.*/
function init_weather(source_type) {
	if(queryStringObj != null){
		var qString = JSON.stringify(queryStringObj);
	 	if (queryStringObj.hasOwnProperty('city')) {
			CITY =  queryStringObj['city'];
		}
		if (queryStringObj.hasOwnProperty('state')) {
			STATE =  queryStringObj['state'];
		}

		if (queryStringObj.hasOwnProperty('zipcode')) {
			CURRENT_ZIPCODE = queryStringObj['zipcode'];

			getFeedForZipcode(CURRENT_ZIPCODE);
		} else {

			//console.log(CURRENT_ZIPCODE);

			if ( typeof CURRENT_ZIPCODE == "undefined") {
				CURRENT_ZIPCODE = ZIPCODE;

			}
      console.log(CURRENT_ZIPCODE);
			getFeedForZipcode(CURRENT_ZIPCODE);
		}
	}
}


function getFeedForZipcode(zipcode) {
console.log(zipcode);
	FEED_URL = PROXY_URL + WEATHER_URL + zipcode;
// console.log(zipcode);
	//loadScript(FEED_URL, scriptLoadedSuccessfully);

	///////////////////////////////////////////
	/*URL = PROXY_URL + AP_URL + ap_feed_id + AP_URL_SUFFIX;*/
	 // THIS WILL RETURN JSONP that calls dynamicData(json) for the first time.
	var url_array = [FEED_URL];
	loadScript(url_array, scriptLoadedSuccessfully);// currently located on ap-feed.js

}


/////////	PROTOTYPE NEEDED FOR WEATHER FORMATTING		//////
Date.prototype.setMonthName = function() {
	if (this.getMonth() == 0) {
		this.monthName = "January";
	};
	if (this.getMonth() == 1) {
		this.monthName = "February";
	};
	if (this.getMonth() == 2) {
		this.monthName = "March";
	};
	if (this.getMonth() == 3) {
		this.monthName = "April";
	};
	if (this.getMonth() == 4) {
		this.monthName = "May";
	};
	if (this.getMonth() == 5) {
		this.monthName = "June";
	};
	if (this.getMonth() == 6) {
		this.monthName = "July";
	};
	if (this.getMonth() == 7) {
		this.monthName = "August";
	};
	if (this.getMonth() == 8) {
		this.monthName = "September";
	};
	if (this.getMonth() == 9) {
		this.monthName = "October";
	};
	if (this.getMonth() == 10) {
		this.monthName = "November";
	};
	if (this.getMonth() == 11) {
		this.monthName = "December";
	};
};
Date.prototype.getDayOfTheWeek = function() {

	if (this.getDay() == 0) {
		this.dayOfTheWeek = "SUN";
	};
	if (this.getDay() == 1) {
		this.dayOfTheWeek = "MON";
	};
	if (this.getDay() == 2) {
		this.dayOfTheWeek = "TUE";
	};
	if (this.getDay() == 3) {
		this.dayOfTheWeek = "WED";
	};
	if (this.getDay() == 4) {
		this.dayOfTheWeek = "THUR";
	};
	if (this.getDay() == 5) {
		this.dayOfTheWeek = "FRI";
	};
	if (this.getDay() == 6) {
		this.dayOfTheWeek = "SAT";
	};

};

function clock() {

	var jsDateObject = new Date();
	//ISODate
	jsDateObject.getDayOfTheWeek();
	var dayOfTheWeek = jsDateObject.dayOfTheWeek;
	jsDateObject.setMonthName();
	var monthname = jsDateObject.monthName;
	var date = jsDateObject.getDate();
	var DateInfo = dayOfTheWeek + " " + monthname + " " + date;
	var dnew = new Date();
	var hourz = dnew.getHours();
	var minz = dnew.getMinutes();
	var amPm = "AM";
	if (parseInt(hourz) >= 12) {
		hourz = hourz - 12;
		amPm = "PM";
	}
	if (parseInt(minz) < 10) {
		minz = "0" + minz;
	}
	//format time to 12 hour civilian time.
	if (hourz > 12) {
		hourz -= 12;
	} else if (hourz === 0) {
		hourz = 12;
	}
	 /*
 	$('#'+ date_id).html(date);
	$('#'+ month_id).html(monthname);
	$('#'+ time_id).html(hourz + ":" + minz );
	$('#'+ amPm_id).html(amPm);*/

	$('.clock_date').html(date);
	$('.clock_month' ).html(monthname);
	$('.clock_time' ).html(hourz + ":" + minz );
	$('.clock_ampm' ).html(amPm);

	//$('#Stage_zipcode').html(CURRENT_ZIPCODE);

}
// KEEP CLOCK REFRESHED
$(document).ready(function(){

          clock();
        initTimeLoop();


});
var timeInterval;
function initTimeLoop() {
  timeInterval = setInterval(timeLoop,1000);
}
function timeLoop() {
  //console.log("status looping...");
  clock();
}



//////////////////////////////////////////////////////////////////////////////////
//////	JSON DATA  ///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
// To ADD a weather condition, create a unique id in its own json object, and make sure
// you add a matching 'weatherCategory' object in the config.js
var weatherConditions = [{
	"id" : "33",
	"value" : "Clear",
	"type" : "1"
}, {
	"id" : "109",
	"value" : "Sunny",
	"type" : "1"
}, {
	"id" : "9",
	"value" : "Becoming Cloudy",
	"type" : "2"
}, {
	"id" : "10",
	"value" : "Becoming Sunny",
	"type" : "2"
}, {
	"id" : "34",
	"value" : "Clearing",
	"type" : "2"
}, {
	"id" : "38",
	"value" : "Decreasing Clouds",
	"type" : "2"
}, {
	"id" : "52",
	"value" : "Gradual Clearing",
	"type" : "2"
}, {
	"id" : "58",
	"value" : "Increasing Clouds",
	"type" : "2"
}, {
	"id" : "60",
	"value" : "Mostly Clear",
	"type" : "2"
}, {
	"id" : "61",
	"value" : "Mostly Cloudy",
	"type" : "2"
}, {
	"id" : "62",
	"value" : "Mostly Sunny",
	"type" : "2"
}, {
	"id" : "63",
	"value" : "Partly Cloudy",
	"type" : "2"
}, {
	"id" : "64",
	"value" : "Partly Sunny",
	"type" : "2"
}, {
	"id" : "36",
	"value" : "Cloudy",
	"type" : "3"
}, {
	"id" : "2",
	"value" : "Areas Fog",
	"type" : "4"
}, {
	"id" : "39",
	"value" : "Dense Fog",
	"type" : "4"
}, {
	"id" : "44",
	"value" : "Fog",
	"type" : "4"
}, {
	"id" : "66",
	"value" : "Patchy Fog",
	"type" : "4"
}, {
	"id" : "5",
	"value" : "Areas Haze",
	"type" : "5"
}, {
	"id" : "53",
	"value" : "Haze",
	"type" : "5"
}, {
	"id" : "69",
	"value" : "Patchy Haze",
	"type" : "5"
}, {
	"id" : "6",
	"value" : "Areas Ice Crystals",
	"type" : "6"
}, {
	"id" : "56",
	"value" : "Ice Crystals",
	"type" : "6"
}, {
	"id" : "70",
	"value" : "Patchy Ice Crystals",
	"type" : "6"
}, {
	"id" : "3",
	"value" : "Areas Freezing Fog",
	"type" : "7"
}, {
	"id" : "7",
	"value" : "Areas Ice Fog",
	"type" : "7"
}, {
	"id" : "47",
	"value" : "Freezing Fog",
	"type" : "7"
}, {
	"id" : "57",
	"value" : "Ice Fog",
	"type" : "7"
}, {
	"id" : "67",
	"value" : "Patchy Freezing Fog",
	"type" : "7"
}, {
	"id" : "71",
	"value" : "Patchy Ice Fog",
	"type" : "7"
}, {
	"id" : "8",
	"value" : "Areas Smoke",
	"type" : "8"
}, {
	"id" : "72",
	"value" : "Patchy Smoke",
	"type" : "8"
}, {
	"id" : "102",
	"value" : "Smoke",
	"type" : "8"
}, {
	"id" : "1",
	"value" : "Areas Ash",
	"type" : "9"
}, {
	"id" : "65",
	"value" : "Patchy Ash",
	"type" : "9"
}, {
	"id" : "112",
	"value" : "Volcanic Ash",
	"type" : "9"
}, {
	"id" : "4",
	"value" : "Areas Frost",
	"type" : "10"
}, {
	"id" : "51",
	"value" : "Frost",
	"type" : "10"
}, {
	"id" : "68",
	"value" : "Patchy Frost",
	"type" : "10"
}, {
	"id" : "26",
	"value" : "Chance Sleet",
	"type" : "11"
}, {
	"id" : "50",
	"value" : "Freezing Spray",
	"type" : "11"
}, {
	"id" : "84",
	"value" : "Sleet",
	"type" : "11"
}, {
	"id" : "85",
	"value" : "Sleet Likely ",
	"type" : "11"
}, {
	"id" : "95",
	"value" : "Slight Chance Sleet",
	"type" : "11"
}, {
	"id" : "73",
	"value" : "Rain",
	"type" : "12"
}, {
	"id" : "74",
	"value" : "Rain Likely",
	"type" : "12"
}, {
	"id" : "75",
	"value" : "Rain Showers",
	"type" : "12"
}, {
	"id" : "76",
	"value" : "Rain Showers Likely",
	"type" : "12"
}, {
	"id" : "90",
	"value" : "Slight Chance Rain",
	"type" : "13"
}, {
	"id" : "91",
	"value" : "Slight Chance Rain Showers",
	"type" : "13"
}, {
	"id" : "21",
	"value" : "Chance Rain",
	"type" : "13"
}, {
	"id" : "22",
	"value" : "Chance Rain Showers",
	"type" : "13"
}, {
	"id" : "54",
	"value" : "Heavy Rain",
	"type" : "14"
}, {
	"id" : "17",
	"value" : "Chance Drizzle",
	"type" : "15"
}, {
	"id" : "19",
	"value" : "Chance Freezing Drizzle",
	"type" : "15"
}, {
	"id" : "40",
	"value" : "Drizzle",
	"type" : "15"
}, {
	"id" : "41",
	"value" : "Drizzle Likely",
	"type" : "15"
}, {
	"id" : "45",
	"value" : "Freezing Drizzle",
	"type" : "15"
}, {
	"id" : "46",
	"value" : "Freezing Drizzle Likely",
	"type" : "15"
}, {
	"id" : "86",
	"value" : "Slight Chance Drizzle",
	"type" : "15"
}, {
	"id" : "88",
	"value" : "Slight Chance Freezing Drizzle",
	"type" : "15"
}, {
	"id" : "11",
	"value" : "Blizzard",
	"type" : "17"
}, {
	"id" : "14",
	"value" : "Blowing Snow",
	"type" : "18"
}, {
	"id" : "18",
	"value" : "Chance Flurries",
	"type" : "18"
}, {
	"id" : "25",
	"value" : "Chance Rain/Snow",
	"type" : "20"
}, {
	"id" : "27",
	"value" : "Chance Snow",
	"type" : "18"
}, {
	"id" : "28",
	"value" : "Chance Snow Showers",
	"type" : "18"
}, {
	"id" : "42",
	"value" : "Flurries",
	"type" : "18"
}, {
	"id" : "43",
	"value" : "Flurries Likely",
	"type" : "18"
}, {
	"id" : "81",
	"value" : "Rain/Snow",
	"type" : "18"
}, {
	"id" : "82",
	"value" : "Rain/Snow Likely",
	"type" : "18"
}, {
	"id" : "87",
	"value" : "Slight Chance Flurries",
	"type" : "18"
}, {
	"id" : "94",
	"value" : "Slight Chance Rain/Snow",
	"type" : "18"
}, {
	"id" : "96",
	"value" : "Slight Chance Snow",
	"type" : "18"
}, {
	"id" : "97",
	"value" : "Slight Chance Snow Showers",
	"type" : "18"
}, {
	"id" : "103",
	"value" : "Snow",
	"type" : "18"
}, {
	"id" : "104",
	"value" : "Snow Likely",
	"type" : "18"
}, {
	"id" : "105",
	"value" : "Snow Showers",
	"type" : "18"
}, {
	"id" : "106",
	"value" : "Snow Showers Likely",
	"type" : "18"
}, {
	"id" : "20",
	"value" : "Chance Freezing Rain",
	"type" : "19"
}, {
	"id" : "23",
	"value" : "Chance Rain/Freezing Rain",
	"type" : "19"
}, {
	"id" : "48",
	"value" : "Freezing Rain",
	"type" : "19"
}, {
	"id" : "49",
	"value" : "Freezing Rain Likely",
	"type" : "19"
}, {
	"id" : "77",
	"value" : "Rain/Freezing Rain",
	"type" : "19"
}, {
	"id" : "78",
	"value" : "Rain/Freezing Rain Likely",
	"type" : "19"
}, {
	"id" : "89",
	"value" : "Slight Chance Freezing Rain",
	"type" : "19"
}, {
	"id" : "92",
	"value" : "Slight Chance Rain/Freezing Rain",
	"type" : "19"
}, {
	"id" : "31",
	"value" : "Chance Wintry Mix",
	"type" : "20"
}, {
	"id" : "32",
	"value" : "Chance Wintry Mix",
	"type" : "20"
}, {
	"id" : "100",
	"value" : "Slight Chance Wintry Mix",
	"type" : "20"
}, {
	"id" : "101",
	"value" : "Slight Chance Wintry Mix",
	"type" : "20"
}, {
	"id" : "115",
	"value" : "Wintry Mix",
	"type" : "20"
}, {
	"id" : "116",
	"value" : "Wintry Mix",
	"type" : "20"
}, {
	"id" : "117",
	"value" : "Wintry Mix Likely",
	"type" : "20"
}, {
	"id" : "118",
	"value" : "Wintry Mix Likely",
	"type" : "20"
}, {
	"id" : "24",
	"value" : "Chance Rain/Sleet",
	"type" : "21"
}, {
	"id" : "79",
	"value" : "Rain/Sleet",
	"type" : "21"
}, {
	"id" : "80",
	"value" : "Rain/Sleet Likely",
	"type" : "21"
}, {
	"id" : "93",
	"value" : "Slight Chance Rain/Sleet",
	"type" : "21"
}, {
	"id" : "29",
	"value" : "Chance Snow/Sleet",
	"type" : "22"
}, {
	"id" : "98",
	"value" : "Slight Chance Snow/Sleet",
	"type" : "22"
}, {
	"id" : "107",
	"value" : "Snow/Sleet",
	"type" : "22"
}, {
	"id" : "108",
	"value" : "Snow/Sleet Likely",
	"type" : "22"
}, {
	"id" : "30",
	"value" : "Chance Thunderstorms",
	"type" : "23"
}, {
	"id" : "59",
	"value" : "Isolated Thunderstorms",
	"type" : "23"
}, {
	"id" : "83",
	"value" : "Severe Tstms",
	"type" : "23"
}, {
	"id" : "99",
	"value" : "Slight Chance Thunderstorms",
	"type" : "23"
}, {
	"id" : "110",
	"value" : "Thunderstorms",
	"type" : "23"
}, {
	"id" : "111",
	"value" : "Thunderstorms Likely",
	"type" : "23"
}, {
	"id" : "15",
	"value" : "Blustery",
	"type" : "24"
}, {
	"id" : "16",
	"value" : "Breezy",
	"type" : "24"
}, {
	"id" : "114",
	"value" : "Windy",
	"type" : "24"
}, {
	"id" : "12",
	"value" : "Blowing Dust",
	"type" : "25"
}, {
	"id" : "13",
	"value" : "Blowing Sand",
	"type" : "25"
}, {
	"id" : "35",
	"value" : "Clearing Late",
	"type" : "26"
}, {
	"id" : "55",
	"value" : "Hot",
	"type" : "28"
}, {
	"id" : "113",
	"value" : "Water Spouts",
	"type" : "27"
}, {
	"id" : "37",
	"value" : "Cold",
	"type" : "29"
}, {
	"id" : "119",
	"value" : "none",
	"type" : "30"
}];

//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

function parse_WEATHER_json(data) {
	// if(typeof data == 'undefined' || typeof data.dwml == 'undefined'){
	// 	return false;
	// }
	//clear arrays
	five_day_images_array = [];
	five_day_array = [];
	//if(!WEATHER_PARSED){

		clock();
		//$(".Stage_description").empty();
		var number_of_days = 1;//5
		for (var i = 0; i < number_of_days; i++) {
			var ISODate = data.dwml.data["time-layout"][0]["start-valid-time"][i];
			//convert ISO date to javascript date
			var jsDateObject = new Date(ISODate);
			jsDateObject.getDayOfTheWeek();
			var dayOfTheWeek = jsDateObject.dayOfTheWeek;
			jsDateObject.setMonthName();
			var monthname = jsDateObject.monthName;
			var date = jsDateObject.getDate();
			var DateInfo = dayOfTheWeek + " " + monthname + " " + date;

			var ConditionInfo = data.dwml.data.parameters.weather["weather-conditions"][i]["weather-summary"];
			//console.log(i + "::" + ConditionInfo);

			handleWeatherCondition(ConditionInfo);

			function handleWeatherCondition(ConditionInfo) {

				var givenCondition = ConditionInfo;
				var categoryId = compare_weatherConditions(weatherConditions, givenCondition);
				var weatherCategoryObject = get_weatherCategoryObject(weatherCategories, categoryId);
				var url = weatherCategoryObject.url;
				var value = weatherCategoryObject.value;
				var html = weatherCategoryObject.html;
				var symbol = weatherCategoryObject.symbol;
				var id = 'animationID_' + i;
				$("#Stage_anim_" + i).append("<div id='" + id + "' class='anim_object' ></div> ");
				$("#Stage .anim_object").children().css("width", "100%");

				//console.log("the i var");
				//console.log( typeof i);

				if (i == 0) {
					day1_category = value;
					five_day_array.push(value);
					day1_img = url;
					five_day_images_array.push(url);

				}
				if (i == 1) {
					day2_category = value;
					five_day_array.push(value);
					day2_img = url;
					five_day_images_array.push(url);
				}
				if (i == 2) {
					day3_category = value;
					five_day_array.push(value);
					day3_img = url;
					five_day_images_array.push(url);
				}
				if (i == 3) {
					day4_category = value;
					five_day_array.push(value);
					day4_img = url;
					five_day_images_array.push(url);
				}
				if (i == 4) {
					day5_category = value;
					five_day_array.push(value);
					day5_img = url;
					five_day_images_array.push(url);
					// array is finished

				}

				//console.log(day1_category);




			}

			switch(i) {
			case 0:
				//$('#Stage_day1').html(dayOfTheWeek);
				$('.weather-hi-1').html( data.dwml.data.parameters.temperature[0].value[i] );
				$('.weather-lo-1').html(data.dwml.data.parameters.temperature[1].value[i] );
				var AM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[0];
				var PM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[1];
				var AVG_CHANCE = Math.round((parseInt(AM_Chance) + parseInt(PM_Chance)) / (2));
				$('.weather-p-1').html( AVG_CHANCE + "%");
				var imageUrl1 = "images/anim-gif-1.gif";
 				//$('#'+day1_img_id).css('background-image', 'url(' + five_day_images_array[i]  + ')');
				//$('#'+day1_img_id).css('background-size', 'contain');


				break;
			case 1:
				//$('#Stage_day2').html(dayOfTheWeek);
				// $('#Stage_day2_hi').html(data.dwml.data.parameters.temperature[0].value[i] + "&deg;");
				//$('#Stage_day2_lo').html(data.dwml.data.parameters.temperature[1].value[i] + "&deg;");
				$('#'+day2_hi_id).html( data.dwml.data.parameters.temperature[0].value[i]  );
				$('#'+day2_lo_id).html(  data.dwml.data.parameters.temperature[1].value[i] );

				var AM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[2];
				var PM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[3];
				var AVG_CHANCE = (parseInt(AM_Chance) + parseInt(PM_Chance)) / (2);
				$('#'+day2_p_id).html(AVG_CHANCE + "%");
				var imageUrl2 = "images/anim-gif-1.gif";
				$('#'+day2_img_id).css('background-image', 'url(' + five_day_images_array[i] + ')');
				$('#'+day2_img_id).css('background-size', 'contain');
				//$('#'+day2_img_id).css('min-width', '200px');
				//$('#'+day2_img_id).css('min-height', '200px');

				break;

			case 2:
				$('#'+day3_hi_id).html( data.dwml.data.parameters.temperature[0].value[i]  );
				$('#'+day3_lo_id).html(  data.dwml.data.parameters.temperature[1].value[i]  );

				var AM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[4];
				var PM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[5];
				var AVG_CHANCE = (parseInt(AM_Chance) + parseInt(PM_Chance)) / (2);
				$('#'+day3_p_id).html(AVG_CHANCE + "%");
				var imageUrl3 = "images/anim-gif-1.gif";
				$('#'+day3_img_id).css('background-image', 'url(' + five_day_images_array[i] + ')');
				$('#'+day3_img_id).css('background-size', 'contain');
				//$('#'+day3_img_id).css('min-width', '200px');
				//$('#'+day3_img_id).css('min-height', '200px');
				break;
			case 3:
				$('#'+day4_hi_id).html( data.dwml.data.parameters.temperature[0].value[i]  );
				$('#'+day4_lo_id).html(  data.dwml.data.parameters.temperature[1].value[i]  );

				var AM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[6];
				var PM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[7];
				var AVG_CHANCE = (parseInt(AM_Chance) + parseInt(PM_Chance)) / (2);
				$('#'+day4_p_id).html(AVG_CHANCE + "%");
				var imageUrl4 = "images/anim-gif-1.gif";
				$('#'+day4_img_id).css('background-image', 'url(' + five_day_images_array[i] + ')');
				$('#'+day4_img_id).css('background-size', 'contain');
				//$('#'+day4_img_id).css('min-width', '200px');
				//$('#'+day4_img_id).css('min-height', '200px');
				break;
			case 4:
				$('#'+day5_hi_id).html(  data.dwml.data.parameters.temperature[0].value[i]  );
				$('#'+day5_lo_id).html(  data.dwml.data.parameters.temperature[1].value[i]  );

				var AM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[8];
				var PM_Chance = data.dwml.data.parameters["probability-of-precipitation"].value[9];
				var AVG_CHANCE = (parseInt(AM_Chance) + parseInt(PM_Chance)) / (2);
				$('#'+day5_p_id).html(AVG_CHANCE + "%");
				var imageUrl5 = "images/anim-gif-1.gif";
				$('#'+day5_img_id).css('background-image', 'url(' + five_day_images_array[i] + ')');
				$('#'+day5_img_id).css('background-size', 'contain');
				//$('#'+day5_img_id).css('min-width', '200px');
				//$('#'+day5_img_id).css('min-height', '200px');
				break;

			default:
				var AM_Chance = 0;
				var PM_Chance = 0;
				var AVG_CHANCE = 0;
			}

		}

		// DATE AND TIME =======
		var dnew = new Date();
		var hourz = dnew.getHours();
		var minz = dnew.getMinutes();
		var amPm = "AM";
		if (parseInt(hourz) > 12) {
			hourz = hourz - 12;
			amPm = "PM";
		}
		if (parseInt(minz) < 10) {
			minz = "0" + minz;
		}
		//console.log(hourz + ":" + minz + ":" + amPm);

		//$("#Stage_city_state").html(CITY + ", " + STATE);
		$(".weather_city").html(CITY);
		$(".weather_state").html(STATE);
		//$("#Stage_time").html(hourz + ":" + minz + amPm);

		///////////   PRECIPITATION:  INFO IS FOR 5 days Am/PM
		//var Precipitation_12HR_Info = data.dwml.data.parameters["probability-of-precipitation"].value[0];
		////console.log("Precipitation_12HR_Info:"+Precipitation_12HR_Info);
		//value indexes:
		//0,1  Day 1
		//2,3  Day 2
		//4,5  Day 3
		//6,7  Day 4
		//8,9  Day 5
		///////////////////////////////////////////////////////////////////////////////////////

		///--------------------------------------------------------------------------



		// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

	//}
	//WEATHER_PARSED = true;

}// END OF parse_WEATHER_json

///  DEV FUNCTONS
function displayChoice(obj) {

	$(".Stage_development #chosenWeather").html('');
	var result = " " + decodeURI(obj.value) + " ";
	var display = "<img src=" + result + "/>";
	$(".Stage_development #chosenWeather").html(display);
}

function compare_weatherConditions(data, givenCondition) {
	var weatherCategory = "NONE";
	//var obj = data.weatherConditions;
	var obj = data;
	//var obj = JSON.stringify(data);
	if (obj !== null) {

		var count = obj.length;

		for (var i = 0; i < count; i++) {
			if (obj[i]["value"] == givenCondition) {
				weatherCategory = obj[i]["type"];
			}
		}
	} else {
		//console.log('compare_weatherConditions data is null');
	}

	return weatherCategory;
}

function get_weatherCategoryObject(data, weatherCategoryId) {
	var weatherCategoryValue = "NONE";
	//var obj = data.weatherCategories;
	var obj = data;
	if (obj !== null) {
		var count = obj.length;
		for (var i = 0; i < count; i++) {
			if (obj[i]["id"] == weatherCategoryId) {
				var object = [];
				object["value"] = obj[i]["value"];
				object["url"] = obj[i]["url"];
				object["html"] = obj[i]["html"];
				object["symbol"] = obj[i]["symbol"];
			}
		}

		return object;
	} else {
		//console.log('get_weatherCategoryObject data is null');
		return false;
	}

}

function get_ALL_weatherCategoryObjects(data) {
	var weatherCategoryValue = "NONE";
	//var obj = data.weatherCategories;
	var obj = data;
	var count = obj.length;
	var objects = [];
	for (var i = 0; i < count; i++) {
		var object = [];
		object["value"] = obj[i]["value"];
		object["url"] = obj[i]["url"];
		object["html"] = obj[i]["html"];
		objects[i] = object;
	}
	return objects;
}
///////////////////////////////////////////////////////////////////////////
//MAI.js

//GO-DYNAMIC JS PARAMETERS:
// DOM ids  ---   used: $('#'+state_id).html('etc....');




	var state_id = "Element_1470257067260";
	var city_id  = "Element_1467743193886";
	var date_id  = "Element_1470257157180";
	var month_id    = "Element_1470257180826";
	var time_id  = "Element_1470257191840";
	var amPm_id  = "Element_1470257222817";


	var day1_img_id = "Element_1470239852351";
	var day1_hi_id = "Element_1470239859056";
	var day1_lo_id = "Element_1470239901024";
	var day1_p_id = "Element_1470239905872";
	//////////////////////
	var day2_img_id = "Element_1470243232113";
	var day2_hi_id = "Element_1470243259533";
	var day2_lo_id = "Element_1470243282773";
	var day2_p_id = "Element_1470243292319";

	var day3_img_id = "Element_1470243238988";
	var day3_hi_id = "Element_1470243307493";
	var day3_lo_id = "Element_1470243372566";
	var day3_p_id = "Element_1470243437290";

	var day4_img_id = "Element_1470243242963";
	var day4_hi_id = "Element_1470243312023";
	var day4_lo_id = "Element_1470243388429";
	var day4_p_id = "Element_1470243447927";

	var day5_img_id = "Element_1470243247934";
	var day5_hi_id = "Element_1470243350909";
	var day5_lo_id = "Element_1470243412884";
	var day5_p_id = "Element_1470243453324";




//----

var dur = "3600"; //3600 duration to wait for response(I think)
var expire = "86400"; //86400  cache query expiration (I think)
var json_use = "use"; // use or empty
var PROXY_URL = "//proxy.gocodigo.net/cimProxy.aspx?json=" + json_use + "&dur=" + dur + "&expire=" + expire + "&url=";
var PROXY_XML = "//proxy.gocodigo.net/cimProxy.aspx?json=use&file="; //params: path/to/file.xml
var CENSORED = false;
var SCRIPT_LOADED = false;

//CONTENT SPECIFIC PARAMETERS:
