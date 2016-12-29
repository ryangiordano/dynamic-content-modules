let optionsData = {
		state: "FL",
		stateFileMap: stateFileMap,
		checkParams: true,
    DOMelements: {
        stateElement: ".state",
        titleElement: ".title",
        descriptionElement: ".description"
    }
}
let stateNews = new State_News_Module(optionsData);
function gomediaDynamicInit() {
    stateNews.init();
}
function dynamicData(json) {
	//rxjs subscribe to the BehaviorSubject initialized in stateNews.
	//Once the script is loaded, it notifies isLoaded$ through its subscription, and starts parsing the json received.
	stateNews.isLoaded$.subscribe(
	    next => {
	        stateNews.stateNews_parse_request(json);
	        stateNews.removeDynamicScripts();
	    },
	    error => {console.error(error)},
	    () => {
	        console.log("complete")
	    }
	);
}

function clearScreenElements() {
    $(stateNews.DOMelements.state).html("");
    $(stateNews.DOMelements.title).html("");
    $(stateNews.DOMelements.description).html("");
}
clearScreenElements();
gomediaDynamicInit();
