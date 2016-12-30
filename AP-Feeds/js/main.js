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
 */
let optionsData = {
	feed_id: "31996",//national news string id
	checkParams: true,
	DOMelements:{
		idElement: ".feed-id",
		titleElement: ".title",
		descriptionElement: ".description"
	}
}
let ap_feeds = new AP_Feeds_Module(optionsData);
function gomediaDynamicInit(){
	ap_feeds.init();

}

function dynamicData(json){
	ap_feeds.isLoaded$.subscribe(
		next=>{
			ap_feeds.parse_request(json);
			ap_feeds.removeDynamicScripts();
		},
		error=>{console.error(error)}
	);
}
gomediaDynamicInit();
///////////
