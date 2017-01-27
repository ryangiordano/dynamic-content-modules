//clear out errors
$('#errors').html('');

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
let defaultStory = {
    title: "Tech innovator Codigo welcomes new challenges with expanded product offering",
    description: {
        value: "LOUISVILLE, KY – With retail media solutions ranging from digital menu boards to interactive touchscreen kiosks, Louisville-based technology company Codigo is broadening their online software to include a web-based tool for creating animated digital content. Users are now able to log into the web portal from any compatible device and work from hundreds of professionally-designed ad templates or build their own masterpieces from scratch using image assets they upload themselves. For marketers hoping to get messages to their audiences quickly, the new functionality is a critical part of the digital marketing spectrum."
    }
}
let stateNews = new State_News_Module(optionsData);

function gomediaDynamicInit() {
		stateNews.populateWithDefaultStory(defaultStory);
    stateNews.init();
}

function dynamicData(json) {
    //Quits the subscription when the data has been retrieved.
    stateNews.subscription.dispose();
    error = new Flag('#errors', 'data successfully loaded');
    stateNews.stateNews_parse_request(json);
    stateNews.removeDynamicScripts();
}

function clearScreenElements() {
    $(stateNews.DOMelements.state).html("");
    $(stateNews.DOMelements.title).html("");
    $(stateNews.DOMelements.description).html("");
}
clearScreenElements();
gomediaDynamicInit();
