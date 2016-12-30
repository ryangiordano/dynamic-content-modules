let optionsData{

}

//////////////////////////////<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 /*
 AP FEED ID REFERENCE:
  var NATIONAL_NEWS_STRING_ID = "31996";
  var BUSINESS_UPDATE_STRING_ID = "36414";
  var HEALTH_MINUTE_STRING_ID = "36418";
  var SCIENCE_NEWS_STRING_ID = "36420";
  var STAR_SPOTLIGHT_STRING_ID = "36416";
  var STRANGER_THAN_FICTION_STRING_ID = "36419";
  var TECH101_STRING_ID = "36415";
  var US_POLITICS_STRING_ID = "36411";
  var WORLD_POLITICS_STRING_ID = "36412";
   36413 - AP Newsbriefs - Sports
  */
 var ap_feed_id = null; //"36415";

 // DOM ids  ---
 /*var title_id = "Element_1467743223793";
 var title_id2 = "Element_1467743223794";
 var title_id3 = "Element_1467743223795";
 var description_id = "Element_1467743688989";*/

 var jsonObject;
 var REQUEST_PARSED = false;
 // Dynamic Feed Module:
 var ap_module = null; //makeAPModule("tech101",ap_feed_id);

 function gomediaDynamicInit() {
     ap_module.get_APFeed();
     clock();



 }

 function dynamicData(json) {
     //JSONP is created to call this function in the javascript that is loaded, and added to the header.
     var t = setInterval(function() {
         //Checks to see if the script with the json data is loaded. When loaded, it will initialize and stop listening.
         if (SCRIPT_LOADED == true) {
             clearInterval(t);
             // HANDLE THE JSON
             //ap_module.ap_parse_request(json,title_id,description_id);
             jsonObject = json;
             if (REQUEST_PARSED == false) {
                 parse_request(json);
                 weather_main();
             }

             removeDynamicScripts();

         }
         //////////////  condition for just weather
         if (ALL_SCRIPTS_LOADED == true) {
             if (!got_it) {
                 //queryStringObj = QueryStringToJSON();

                 //jsonObject = json;
                 parse_WEATHER_json(jsonObject);
                 //console.log('getting it...the weather...');
                 //console.log('the city element  id:'+ city_id);
                 got_it = true;
                 //console.log('about to ... removeDynamicScripts()');
                 removeDynamicScripts();
                 clearInterval(t);
             }

         }

         //////////////////////////////////////////////
     }, 100);
     //Because of this certain piece of content and how it sets the time after load, I wait 100ms.
     //Ideally this would be 1  and not 100 but that caused the article to be set then the time would overwrite the article
 }

 function parse_request(json) {
     REQUEST_PARSED = true;
     // Gets the data from the script file , chooses a random one, and populates variables with information.  Ultimately, it runs display_result which filters formatted_title and description for any bad words.
     // start CONTENT SPECIFIC parseing code here ///////////////////////////////////////////////////////
     var items = json.rss.channel.item;

     var numOfItems = items.length;
     ///////////////////////////////////////////////////
     function AP_shuffle(o) {
         //shuffles an array even an array of objects.
         for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
         return o;
     };

     var shuffledItems = AP_shuffle(items);

     //var randomIndex = Math.floor((Math.random() * numOfItems));
     //var item = items[randomIndex];
     var scenes = $('.scene');

     for (var i = 0; i < scenes.length; i++) {

         var item = shuffledItems[i];
         var title = item.title;
         var formatted_title = title.replace(/^@+/i, '');
         var description = item.description;
         if (description == "") {
             description = item.description.value;
         }
         if (typeof description == "object") {
             description = item.description.value;
         }
         //---start putting them into elements-------

				 var chosenItem1 = shuffledItems.splice(0, 1);
				 var chosenItem2 = shuffledItems.splice(0, 1);
				 var chosenItem3 = shuffledItems.splice(0, 1);

         var sceneNumber = i + 1;
					 console.log($('#scene'+sceneNumber).find('.ap_title').length);
         if ($('#scene' + sceneNumber).find('.ap_title').length == 1 || $('#scene' + sceneNumber).find('.ap_title2').length == 1 || $('#scene' + sceneNumber).find('.ap_title3').length == 1) {
             $('#scene' + sceneNumber + ' .ap_title').html(chosenItem1[0].title);
             $('#scene' + sceneNumber + ' .ap_title2').html(chosenItem2[0].title);
             $('#scene' + sceneNumber + ' .ap_title3').html(chosenItem3[0].title);
         };
     }
     // for(var j = 0; j <3; j++){
     // 	var item = shuffledItems[j];
     // 	var title = item.title;
     // 	var formatted_title = title.replace(/^@+/i, '');
     // 	var description = item.description;
     // 	if (description == "") {
     // 		description = item.description.value;
     // 	}
     // 	if ( typeof description == "object") {
     // 		description = item.description.value;
     // 	}
     // 	//override description
     // 	description = "";
     //
     // 	 if(j==0){
     // 	 	display_result(formatted_title, description,"ap_title");
     // 	 }else if(j==1){
     // 	 	display_result(formatted_title, description,"ap_title2");
     // 	 }else if(j==2){
     // 	 	display_result(formatted_title, description,"ap_title3");
     // 	 }
     // }

     // end CONTENT SPECIFIC parseing code here ///////////////////////////////////////////////////////
 }

 function display_result(title, description, className) {
     var title_res = filterContent(title);
     var description_res = filterContent(description);
    //  console.log('filter results:' + title_res + "::" + description_res);
    //  console.log(typeof title_res);
    //  console.log(typeof description_res);

     if (filterContent(title) == 0 && filterContent(description) == 0) {
         $('.' + className).html(title);
         //	$('.'+description_id).html(description);
         //return false;
     } else {
         //else it will call parse_request again, and the cycle will continue until a news article with no bad words was found and displayed.
         parse_request(jsonObject);
     }
 }



 ///////WEATHER JS////////////////////////////////////////////////////////////////////////////////////////////
 var jsonObject;
 var queryStringObj = null;

 var got_it = false;
 var ALL_SCRIPTS_LOADED = false;

 function weather_main() {
     queryStringObj = QueryStringToJSON();
     //checkParameters();
     //console.log(queryStringObj);
     //console.log('init the weather....');
     init_weather();

 }
 var scriptLoadedSuccessfully = function() {
     ALL_SCRIPTS_LOADED = true; //trigger for 'dynamicData() function  in main.js
 };
 ///////////////////////////////////////////////////////////////////////////////////////////////////

 function init() {
     var obj = QueryStringToJSON();
     //check for query string parameter first.
     if (obj.hasOwnProperty('ap_feed_id')) {
         if (obj['ap_feed_id'] != "") {
             ap_feed_id = obj['ap_feed_id'];
         } else {
             ap_feed_id = "36414";
         }
     } else {
         ap_feed_id = "36414";
     }
     // Dynamic Feed Module:
     ap_module = makeAPModule("ap-feed-by-id", ap_feed_id);
     gomediaDynamicInit();
 }
 init();
