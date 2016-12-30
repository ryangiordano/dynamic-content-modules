let optionsData = {
  zipcode: "33076",
  DOMelements:{
    dayOne: {
      weekDay: ".day-1",
      weatherImage: ".day-1-weather-image",
      hi: ".day-1-hi",
      lo: ".day-1-lo"
    },
    dayTwo: {
      weekDay: ".day-2",
      weatherImage: ".day-2-weather-image",
      hi: ".day-2-hi",
      lo: ".day-2-lo"
    },
    dayThree: {
      weekDay: ".day-3",
      weatherImage: ".day-3-weather-image",
      hi: ".day-3-hi",
      lo: ".day-3-lo"
    },
    dayFour: {
      weekDay: ".day-4",
      weatherImage: ".day-4-weather-image",
      hi: ".day-4-hi",
      lo: ".day-4-lo"
    },
    dayFive: {
      weekDay: ".day-5",
      weatherImage: ".day-5-weather-image",
      hi: ".day-5-hi",
      lo: ".day-5-lo"
    },
    date: ".date",
    time: ".time",
    city: ".city",
    state: ".state"
  }
}


 ///////WEATHER JS////////////////////////////////////////////////////////////////////////////////////////////
 let weather = new Weather_Module(optionsData);
 function gomediaDynamicInit(){
 	weather.init();

 }

 function dynamicData(json){
 	weather.isLoaded$.subscribe(
 		next=>{
 			weather.parse_request(json);
 			weather.removeDynamicScripts();
 		},
 		error=>{console.error(error)}
 	);
 }
 gomediaDynamicInit();
 ///////////////////////////////////////////////////////////////////////////////////////////////////
