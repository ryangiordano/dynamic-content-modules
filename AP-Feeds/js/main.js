//clear out errors
$('#errors').html('');

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
let defaultStory = {
  title:"Tech innovator Codigo welcomes new challenges with expanded product offering",
  description:{value:"LOUISVILLE, KY – With retail media solutions ranging from digital menu boards to interactive touchscreen kiosks, Louisville-based technology company Codigo is broadening their online software to include a web-based tool for creating animated digital content. Users are now able to log into the web portal from any compatible device and work from hundreds of professionally-designed ad templates or build their own masterpieces from scratch using image assets they upload themselves. For marketers hoping to get messages to their audiences quickly, the new functionality is a critical part of the digital marketing spectrum."}
}
let ap_feeds = new AP_Feeds_Module(optionsData);
function gomediaDynamicInit(){
	//First populate with default story, then fill in with new news article.
	ap_feeds.populateWithDefaultStory(defaultStory);
	ap_feeds.init();

}


function dynamicData(json){
	ap_feeds.isLoaded$.subscribe(
		next=>{
			error = new Error('#errors', 'dynamicData has run');
			ap_feeds.parse_request(json);
			ap_feeds.removeDynamicScripts();
		},
		error=>{console.error(error)}
	);
}
gomediaDynamicInit();
///////////
