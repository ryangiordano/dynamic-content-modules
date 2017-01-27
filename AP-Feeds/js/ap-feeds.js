/*
////////////////////////////////////////////////////////////////////////////
Dependencies:
rxjs
jquery
Gomedia_Dynamic
-Ryan Giordano
//////////////////////////////////////////////
AP FEED ID REFERENCE:
let NATIONAL_NEWS_STRING_ID = "31996";
let BUSINESS_UPDATE_STRING_ID = "36414";
let HEALTH_MINUTE_STRING_ID = "36418";
let SCIENCE_NEWS_STRING_ID = "36420";
let STAR_SPOTLIGHT_STRING_ID = "36416";
let STRANGER_THAN_FICTION_STRING_ID = "36419";
let TECH101_STRING_ID = "36415";
let US_POLITICS_STRING_ID = "36411";
let WORLD_POLITICS_STRING_ID = "36412";
//////////////////////////////////////////////
*/

class AP_Feeds_Module extends Gomedia_Dynamic {
    constructor(optionsData) {
        super();
        for (let key in optionsData) {
            if (optionsData.hasOwnProperty(key)) {
                this[key] = optionsData[key];
            }
        }
        this.scriptStatus$ = new Rx.BehaviorSubject({
            isLoaded: false
        });
        this.isLoaded$ = this.scriptStatus$.map(status => status.isLoaded);
    }
    init() {
        if (this.checkParams) {
            let param = this.getParameterByName('feed-id');
            this.feed_id = param != "" ? param : this.feed_id;
        }
        let dur = "60", //3600 duration to wait for response
            expire = "60", //86400  cache query expiration
            json_use = "use"; // use or empty
        const PROXY_URL = "//proxy.gocodigo.net/cimProxy.aspx?json=" + json_use + "&url=",
            PROXY_XML = "//proxy.gocodigo.net/cimProxy.aspx?json=use&file=",
            AP_URL = "http%3A%2F%2Fproxy.captiveindoormedia.net%2Fcimapfeed.aspx%3Fid%3D",
            AP_URL_SUFFIX = "%26dur%3D" + dur + "%26expire%3D" + expire + "",
            URL = PROXY_URL + AP_URL + this.feed_id + AP_URL_SUFFIX;
        this.loadScript(URL, () => {
            this.scriptStatus$.onCompleted({
                isLoaded: true
            })
        });
    }
    //load generic news story if for some reason the other story fails to get brought in.
    genericNewsStory(){

    }
    parse_request(json) {
        let items = json.rss.channel.item;
        this.feed = json.rss.channel.title;
        let cleanItems = items.filter((item) => {
            return (!this.filterContent(`${item.description} ${item.title}`));
        });
        console.log(cleanItems);
        let numOfItems = items.length;
        let randomIndex = Math.floor((Math.random() * numOfItems));
        let item = items[randomIndex];
        let title = item.title;
        let formatted_title = title.replace(/^@+/i, '');
        let description = item.description;
        if (description == "") {
            description = item.description.value;
        }
        if (typeof description == "object") {
            description = item.description.value;
        }
        this.populate_page(cleanItems);
    }
    populate_page(cleanItems) {
        let DOMelements = this.DOMelements;
        let scenes = $('.scene');
        let numOfItems = cleanItems.length;
        for (let i = 0; i < scenes.length; i++) {
            let sceneNumber = i + 1;
            if ($('#scene' + sceneNumber).find(DOMelements.titleElement).length >= 1 && $('#scene' + sceneNumber).find(DOMelements.descriptionElement).length >= 1) {
                let randomIndex = Math.floor((Math.random() * numOfItems)),
                    item = cleanItems[randomIndex],
                    scene = '#scene' + sceneNumber,
                    title = item.title,
                    formatted_title = title.replace(/^@+/i, ''),
                    description = item.description;
                if (typeof description == "object") {
                    description = item.description.value;
                }
                $(scene + ' ' + DOMelements.idElement).html(this.feed);
                $(scene + ' ' + DOMelements.titleElement).html(title);
                $(scene + ' ' + DOMelements.descriptionElement).html(description);
            };
        }
        this.addOnFunctions(); //hides links in text responses
    }
    populateWithDefaultStory(defaultStory){
      console.log("???");
      let DOMelements = this.DOMelements;
      let scenes = $('.scene');
      for (let i = 0; i < scenes.length; i++) {
          let sceneNumber = i + 1;
          if ($('#scene' + sceneNumber).find(DOMelements.titleElement).length >= 1 && $('#scene' + sceneNumber).find(DOMelements.descriptionElement).length >= 1) {
              let scene = '#scene' + sceneNumber,
                  title = defaultStory.title,
                  formatted_title = title.replace(/^@+/i, ''),
                  description = defaultStory.description;
              if (typeof description == "object") {
                  description = defaultStory.description.value;
              }
              $(scene + ' ' + DOMelements.idElement).html(this.feed);
              $(scene + ' ' + DOMelements.titleElement).html(title);
              $(scene + ' ' + DOMelements.descriptionElement).html(description);
          };
      }
    }
}
