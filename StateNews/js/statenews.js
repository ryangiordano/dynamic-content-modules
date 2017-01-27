/*
///////////////////////////////////////////////
Dependencies:
rxjs
jquery
Gomedia_Dynamic
-Ryan Giordano
//////////////////////////////////////////////
*/
const stateFileMap =[ {"AL" : "19179_s145435.xml"},{"AK" : "19179_s145458.xml"},{"AZ" : "19179_s145459.xml"},{"AR" : "19179_s145525.xml"},{"CA" : "19179_s145427.xml"},{"CO" : "19179_s145619.xml"},{"CT" : "19179_s145662.xml"},{"DE" : "19179_s145665.xml"},{"DC" : "19179_s145916.xml"},{"FL" : "19179_s144461.xml"},{"GA" : "19179_s145666.xml"},{"HI" : "19179_s145676.xml"},{"ID" : "19179_s145683.xml"},{"IL" : "19179_s145912.xml"},{"IN" : "19179_s145913.xml"},{"IA" : "19179_s145914.xml"},{"KS" : "19179_s145578.xml"},{"KY" : "19179_s144465.xml"},{"LA" : "19179_s145915.xml"},{"ME" : "19179_s145526.xml"},{"MD" : "19179_s145539.xml"},{"MA" : "19179_s145308.xml"},{"MI" : "19179_s145540.xml"},{"MN" : "19179_s145541.xml"},{"MS" : "19179_s145543.xml"},{"MO" : "19179_s145544.xml"},{"MT" : "19179_s145546.xml"},{"NE" : "19179_s145547.xml"},{"NV" : "19179_s145466.xml"},{"NH" : "19179_s145464.xml"},{"NJ" : "19179_s145442.xml"},{"NM" : "19179_s145473.xml"},{"NY" : "19179_s145524.xml"},{"NC" : "19179_s145626.xml"},{"ND" : "19179_s145552.xml"},{"OH" : "19179_s145597.xml"},{"OK" : "19179_s145551.xml"},{"OR" : "19179_s145550.xml"},{"PA" : "19179_s145463.xml"},{"RI" : "19179_s145564.xml"},{"SC" : "19179_s145579.xml"},{"SD" : "19179_s145649.xml"},{"TN" : "19179_s145555.xml"},{"TX" : "19179_s145574.xml"},{"UT" : "19179_s145561.xml"},{"VT" : "19179_s145554.xml"},{"VA" : "19179_s145603.xml"},{"WA" : "19179_s145545.xml"},{"WV" : "19179_s145542.xml"},{"WI" : "19179_s145501.xml"},{"WY" : "19179_s145470.xml"}];
class State_News_Module extends Gomedia_Dynamic {
    constructor(optionsData) {
        super();
        for (let key in optionsData) {
            if (optionsData.hasOwnProperty(key)) {
                this[key] = optionsData[key];
            }
        }
        let flag = new Flag('#errors', 'Class instantiated');
        //Observable starts, capped at five loops at .7 seconds per loop.
        this.sourceScript$ = Rx.Observable.interval(700).take(5);
    }
    init() {
        let flag = new Flag('#errors', 'Init has run');
        if (this.checkParams === true) {
            //overwriting default parameters with those supplied by the player
            this.state = this.getParameterByName('state') !== "" ? this.getParameterByName('state') : this.state;
        }
        let dur = "10";
        let expire = "10";
        let json_use = "use"; // use/empty
        const PROXY_URL = "//proxy.gocodigo.net/cimProxy.aspx?json=" + json_use + "&dur=" + dur + "&expire=" + expire + "&url=";
        const PROXY_XML = "//proxy.gocodigo.net/cimProxy.aspx?json=use&file=";
        const NEWSEDGE_URL = "http%3A%2F%2Fnew.newsedge.com%2Fservlet%2Frssfeed%2Frssfeed%3Ffile%3D";
        for (let i = 0; i < this.stateFileMap.length; i++) {
            if (this.stateFileMap[i].hasOwnProperty(this.state)) {
                this.stateFilename = this.stateFileMap[i][this.state];
            }
        }
        let URL = PROXY_URL + NEWSEDGE_URL + this.stateFilename;
        let url_array = URL;
        //Subscribe to observable, appending the script element to the DOM that brings in data via jsonp.  If the data call is successful, it will unsubscribe from the observable.
        this.subscription = this.sourceScript$.subscribe(
            next => {
                this.loadScript(url_array, () => {
                    let flag = new Flag("#errors", `script ${next} appended to DOM`);
                    // this.scriptStatus$.onCompleted({isLoaded:true})
                });
            },
            error => {
                let flag = new Flag("#errors", `there was an error: ${error}`);
            }
        );

    };
    stateNews_parse_request(json) {
        let items = json.rss.channel.item;
        //filter through the items to get an array of clean news stories
        let cleanItems = items.filter((item) => {
            return (!this.filterContent(item.description + " " + item.title));
        }).map((item) => {
            //unclickbaitify!
            item.description = item.description.replace("Click to Continue", "");
            return item;
        });
        this.populatePage(cleanItems);
    };
    populatePage(cleanItems) {
        let DOMelements = this.DOMelements;
        let scenes = $('.scene');
        let numOfItems = cleanItems.length;
        for (let i = 0; i < scenes.length; i++) {
            let sceneNumber = i + 1;
            if ($('#scene' + sceneNumber).find(DOMelements.titleElement).length >= 1 && $('#scene' + sceneNumber).find(DOMelements.descriptionElement).length >= 1) {
                let randomIndex = Math.floor((Math.random() * numOfItems)),
                    item = cleanItems[randomIndex],
                    scene = '#scene' + sceneNumber,
                    capitalizedState = this.capitalizeFirstLetter(this.state),
                    state_name = this.abbrState(capitalizedState, "name"),
                    title = item.title,
                    formatted_title = title.replace(/^@+/i, ''),
                    description = item.description;
                if (description == "") {
                    description = item.description.value;
                }
                $(scene + ' ' + DOMelements.stateElement).html(state_name);
                $(scene + ' ' + DOMelements.titleElement).html(title);
                $(scene + ' ' + DOMelements.descriptionElement).html(description);
            };
        }
        this.addOnFunctions(); //hides links in text responses
    };
    populateWithDefaultStory(defaultStory) {
        let DOMelements = this.DOMelements;
        let scenes = $('.scene');
        for (let i = 0; i < scenes.length; i++) {
            let sceneNumber = i + 1;
            if ($('#scene' + sceneNumber).find(DOMelements.titleElement).length >= 1 && $('#scene' + sceneNumber).find(DOMelements.descriptionElement).length >= 1) {
                let scene = '#scene' + sceneNumber,
                    capitalizedState = this.capitalizeFirstLetter(this.state),
                    state_name = this.abbrState(capitalizedState, "name"),
                    title = defaultStory.title,
                    formatted_title = title.replace(/^@+/i, ''),
                    description = defaultStory.description;
                if (typeof description == "object") {
                    description = defaultStory.description.value;
                }
                $(scene + ' ' + DOMelements.stateElement).html(state_name);
                $(scene + ' ' + DOMelements.titleElement).html(title);
                $(scene + ' ' + DOMelements.descriptionElement).html(description);
            };
        }
    }
}
