/*
///////////////////////////////////////////////
Dependencies:
jquery
Gomedia_Dynamic
-Ryan Giordano
//////////////////////////////////////////////
*/

class Twitter_Module extends Gomedia_Dynamic{
    constructor(optionsData) {
        super();
        for (let key in optionsData) {
            if (optionsData.hasOwnProperty(key)) {
                this[key] = optionsData[key];
            }
        }

    }
    init() {
        if (this.checkParams) { //If We don't have hardcoded parameters
            this.count = this.getParameterByName('count');
            //If parameters are not set to look for user timeline, load in hashtags from the url
            if(this.method !== "twitter_user_timeline"){
              this.hashtags = [
                  this.getParameterByName('hashtag1'),
                  this.getParameterByName('hashtag2'),
                  this.getParameterByName('hashtag3')
              ]
            }else{
              this.handle = this.getParameterByName('handle') !==""? this.getParameterByName('handle') : this.handle;
            }

            if (this.count == "" || this.count == undefined) {
                this.count = "3";
            }
            if (this.hashtags.filter((hashtag) => {
                    return hashtag == ""
                }).length >= this.hashtags.length) {
                console.error("No hashtags provided");
            }
            if (this.handle == "") {
              console.error("No handle provided");
            }

            switch (this.method) { //twitter hashtag listener
                case "twitter_user_timeline":
                    this.handle_listener();
                    break;
                case "twitter_hashtag_listener":
                    this.hashtag_listener();
                    break;
                case "multiple_hashtags_all":
                    this.hashtag_listener();
                    break;
                case "multiple_hashtags_some":
                    this.hashtag_listener();
                    break;
                default:
                    this.method = "twitter_user_timeline";
                    this.handle_listener();
            }
        } else { //if we have hardcoded parameters
            let params = 'method=' + this.method + '&hashtag=' + this.hashtags[0] + '&count=' + this.count + '&hashtag2=' + this.hashtags[1] + '&hashtag3=' + this.hashtags[2]+"&screen_name="+this.handle;

            if(this.method="twitter_user_timeline"){
              this.handleSubmit(params);
            }else{
              this.hashtagSubmit(params);
            }

        }
    }
    handle_listener() {
        let params = 'method=' + this.method + '&screen_name=' + this.handle + "&count=" + this.count+ "&customer_id=999";
        this.handleSubmit(params);

    }
    hashtag_listener() {
        let params = 'method=' + this.method + '&hashtag=' + this.hashtags[0] + '&count=' + this.count + '&hashtag2=' + this.hashtags[1] + '&hashtag3=' + this.hashtags[2];
        this.hashtagSubmit(params);
    }
    handleSubmit(dataString) {
        this.ajax_datastring_URL_callback(dataString, this.twitterInterfaceUrl, (data)=>{
          let obj = JSON.parse(data);
          this.parseTwitterData(obj);
        });
    }
    hashtagSubmit(dataString) {

        this.ajax_datastring_URL_callback(dataString, this.twitterInterfaceUrl,(data)=>{
          let obj = JSON.parse(data);
          this.parseTwitterData(obj)
        });
    }
    parseTwitterData(obj) {
        let twitterData = [];
        //depending on whether you query by handle or hashtag, the object you receive back will be different.
        let newObj = obj.hasOwnProperty("statuses") ? obj.statuses : obj;
        newObj.map(status => {
            let singleStatus = {}
            let created_date = new Date(Date.parse(status.created_at));
            let created_month = this.numberToMonth(created_date.getMonth());
            let created_day = created_date.getDate();
            singleStatus["created_at"] = created_month +' '+ created_day;
            singleStatus["userName"] = status.user.name;
            singleStatus["userLocation"] = status.user.location;
            singleStatus["text"] = status.text;
            if(status.entities.hashtags.length >=1){
              singleStatus["hashtag"] = status.entities.hashtags[0].text
            };
            if (status.entities.media !== undefined) {
                singleStatus["imageUrl"] = status.entities.media[0].media_url_https;
                singleStatus["imageDimensions"] = {
                    "height": status.entities.media[0].sizes.large.h,
                    "width": status.entities.media[0].sizes.large.w
                }
            }
            twitterData.push(singleStatus);
        });
        if (twitterData.length < 1) {
            // return this.twitter_init();
            return console.log("You've got no tweets");
        }
        this.populatePage(twitterData)
    }
    populatePage(twitterData) {
        let DOMelements = this.DOMelements;
        let scenes = $('.scene');
        //behavior: unique item on each scene that can display it.  When there are more scenes than items, loop back from the beginning.
        let counter = 0;
        const numOfItems = twitterData.length;
        console.log(twitterData);

        for (let i = 0; i < scenes.length; i++) {
            let sceneNumber = i + 1;
            let randomIndex = Math.floor((Math.random() * numOfItems));
            if ($('#scene' + sceneNumber).find(DOMelements.handleElement).length == 1 && $('#scene' + sceneNumber).find(DOMelements.textElement).length == 1) {
                if (counter > twitterData.length) {
                  //loop back to first tweet if there are more scenes than tweets.
                    counter = 0
                }
                let item = twitterData[counter];
                counter++;

                let scene = '#scene' + sceneNumber;
                $(scene + ' ' + DOMelements.handleElement).html(item.userName);
                $(scene + ' ' + DOMelements.textElement).html(item.text);
                $(scene + ' ' + DOMelements.dateElement).html(item.created_at);
                $(scene + ' ' + DOMelements.hashtagElement).html(item.hashtag);
                if ($(scene).find(DOMelements.imageElement).length == 1 & item.imageUrl !== undefined) {
                    $(scene + ' ' + DOMelements.imageElement).css('background-image', 'url(' + item.imageUrl + ')');
                }
            };
        }
    }
}
