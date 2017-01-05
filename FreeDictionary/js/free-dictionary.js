/*
///////////////////////////////////////////////
Dependencies:
rxjs
jquery
Gomedia_Dynamic
-Ryan Giordano
//////////////////////////////////////////////
*/
class Free_Dictionary_Module extends Gomedia_Dynamic {
    constructor(optionsData) {
        super();
        for (let key in optionsData) {
            if (optionsData.hasOwnProperty(key)) {
                this[key] = optionsData[key];
            }
        }
        if (this.checkParams === true) {
            this.feedId = this.getParameterByName('feed-id') !== "" ? this.getParameterByName('feed-id') : this.feedId;
        }
        //Set's a BehaviorSubject with initial isLoaded value set to "false";
        //isLoaded$ is the observable that is subscribed to in dynamicData() in main.js
        //After the script is loaded and the data is secured, onCompleted() is called to complete the observable sequence in the callback of the ajax call at the bottom of init().
        //We need this to know when it is okay to begin parsing the data we've received from the url.  For further reading on RxJS: https://xgrommx.github.io/rx-book/content/resources/reactive_libraries/rx.html
        this.scriptStatus$ = new Rx.BehaviorSubject({
            isLoaded: false
        });
        this.isLoaded$ = this.scriptStatus$.map(status => status.isLoaded);
    }
    init() {
        let dur = "3600";
        let expire = "86400";
        let json_use = "use"; // use/empty
        const PROXY_URL = "//proxy.gocodigo.net/cimProxy.aspx?json=" + json_use + "&dur=" + dur + "&expire=" + expire + "&url=";
        const PROXY_XML = "//proxy.gocodigo.net/cimProxy.aspx?json=use&file="; //params: path/to/file.xml
        //CONTENT SPECIFIC PARAMETERS:
        const FD_URL = "https%3A%2F%2Fwww.thefreedictionary.com%2F_%2FWoD%2Frss.aspx%3Ftype%3D";
        const URL = PROXY_URL + FD_URL + this.feedId;
        let url_array = URL;
        console.log(URL);
        this.loadScript(url_array, () => {
            this.scriptStatus$.onCompleted({
                isLoaded: true
            })
        });
    }
    parseResponse(json) {
        // Gets the data from the script file , chooses a random one, and populates variables with information.  Ultimately, it runs display_result which filters formatted_title and description for any bad words.
        let items = json.rss.channel.item;
        let cleanItems = items.filter((item) => {
          //replace the image with a regular string
            let description = item.description.value.replace(/<img .*?>/g,"");
            item.description = description;
            let title = item.title;

            if(typeof item.title == "object"){
              title = item.title.i;
            }
            return (!this.filterContent(description) && !this.filterContent(title))
        });
        this.populatePage(cleanItems)
    }
    populatePage(cleanItems) {
        //in here, display result is checked for any bad words.  If none found, populates the elements on screen with dynamic data
        let cutOff = 0;
        if (cleanItems.length > 0) {
            let scenes = $('.scene');
            for (let i = 0; i < scenes.length; i++) {
                let sceneNumber = i + 1;
                let titleElement = this.DOMelements.titleElement;
                let descriptionElement = this.DOMelements.descriptionElement;
                if ($('#scene' + sceneNumber).find(titleElement).length >= 1 && $('#scene' + sceneNumber).find(descriptionElement).length >= 1 && cleanItems.length !==0) {
                    let randomIndex = Math.floor((Math.random() * cleanItems.length));
                    let randomItem = cleanItems.splice(randomIndex, 1);
                    $('#scene' + sceneNumber + ' ' + titleElement).html(randomItem[0].title);
                    $('#scene' + sceneNumber + ' ' + descriptionElement).html(randomItem[0].description);
                };
            }
            this.addOnFunctions();
            this.removeDynamicScripts();
        } else {
            console.error("No clean items for display.")
        }
    }
}
