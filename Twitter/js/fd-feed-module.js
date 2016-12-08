//fd-feed-module.js
/*
////////////////////////////////////////////////////////////////////////////
makeFDModule is a module for gomedia-dynamic content files to call inorder to make their
own encapsulated API interface if you will. That builds a URL to our proxy with parameters
sent to it from the content file.
This module has some dependency on this javascript: https://shout.gocodigo.net/gomedia-dynamic/gomedia-dynamic-util-2.0.js
-bayon forte 8-5-16
//////////////////////////////////////////////

//////////////////////////////////////////////
*/


function makeFDModule(name, id) {
    var MODULE = (function() {
        var obj = {};
        //var REQUEST_PARSED = false;
        obj.REQUEST_PARSED = false;
        obj.name = name;
        obj.id = id;
        obj.jsonObject = null;
        obj.get_FDFeed = function() {
          console.log("gomediaDynamicInit is run, and the url is created");
            var dur = "3600"; //3600 duration to wait for response(I think)
            var expire = "86400"; //86400  cache query expiration (I think)
            var json_use = "use"; // use or empty
            var PROXY_URL = "//proxy.gocodigo.net/cimProxy.aspx?json=" + json_use + "&dur=" + dur + "&expire=" + expire + "&url=";
            var PROXY_XML = "//proxy.gocodigo.net/cimProxy.aspx?json=use&file="; //params: path/to/file.xml
            //CONTENT SPECIFIC PARAMETERS:
            var FD_URL = "https%3A%2F%2Fwww.thefreedictionary.com%2F_%2FWoD%2Frss.aspx%3Ftype%3D";
            var jsonObject;
            var URL = PROXY_URL + FD_URL + this.id;
            //var url_array = [GOMEDIA_DYNAMIC_UTIL_URL,URL];
            // console.log('getting ' + URL);
            var url_array = URL;
            loadScript(url_array, this.scriptLoadedSuccessfully);
        }
        obj.scriptLoadedSuccessfully = function() {
          console.log("Script created and appended to top of document");
            SCRIPT_LOADED = true;
        }
        obj.fd_parse_request = function(json, title_class, description_class) {
          console.log("fd_parse_request is run.  I take the json and push items to an array to display.");
            // Gets the data from the script file , chooses a random one, and populates variables with information.  Ultimately, it runs display_result which filters formatted_title and description for any bad words.
            this.jsonObject = json;
            if (obj.REQUEST_PARSED == false) {
                var items = json.rss.channel.item;
                var numOfItems = items.length;
                var itemArray = [];
                for (i = 0; i < numOfItems; i++) {
                    var item = {}
                    var title = items[i].title;
                    var formatted_title = title.replace(/^@+/i, '');
                    var description = items[i].description;
                    if (description == "") {
                        description = items[i].description.value;
                    }
                    if (typeof description == "object") {
                        description = items[i].description.value;
                    }
                    item['title'] = title;
                    item['description'] = description;
                    itemArray.push(item);
                }

                var CURRENT_FEED = this.id;
                var lc_feed_id = CURRENT_FEED.toLowerCase();
                if (lc_feed_id == "history" || lc_feed_id == "article" || lc_feed_id == "birthday") {
                    var src = null;
                    var w = null;
                    var h = null;
                    //GET IMAGES
                    for (var i = 0; i < itemArray.length; i++) {

                        var html = $(itemArray[i].description);
                        var img = html.filter('img');
                        if (img != "") {
                            var src = img[0].attributes.src.value;
                            var w = img[0].attributes.width.value;
                            var h = img[0].attributes.height.value;
                            var imgInfo = {
                                src: src,
                                width: w,
                                height: h
                            };

                        }
                        itemArray[i]['img'] = imgInfo;
                    }
                }
                obj["itemArray"] = itemArray;
                obj["titleClass"] = title_class;
                obj["descriptionClass"] = description_class;
                this.fd_display_result();

                this.REQUEST_PARSED = true;
            }
        }
        obj.fd_display_result = function() {
          console.log("fd_display_result -- I filter for bad words and display the content at random.");
            //in here, display result is checked for any bad words.  If none found, populates the elements on screen with dynamic data
            var cutOff = 0;
            var filteredItemArray = [];
            var itemArrayLength = this.itemArray.length;
            for(var i = 0; i< itemArrayLength; i++){
              if(filterContent(this.itemArray[i].description) !=1 && filterContent(this.itemArray[i].title) !=1){
                filteredItemArray.push(this.itemArray[i]);
              }
            }
            // TODO: Reinstate filtering
            // if (filteredItemArray.length >0) {
            if (this.itemArray.length >0) {

              var scenes = $('.scene');
              for(i=0; i<scenes.length; i++){


                var randomIndex = Math.floor((Math.random()* this.itemArray.length));
                var randomItem = this.itemArray.splice(randomIndex, 1);
                var sceneNumber = i + 1;
                console.log("Setting data for scene "+ sceneNumber);
                var titleElement = this.titleClass;
                var descriptionElement = this.descriptionClass;

                if ($('#scene' + sceneNumber).find(titleElement).length == 1 && $('#scene' + sceneNumber).find(descriptionElement).length == 1) {
                    $('#scene' + sceneNumber + ' '+titleElement).html(randomItem[0].title);
                    var description_img = randomItem[0].description;
                    var description_no_img = description_img.replace(/<img .*?>/g, "");
                    $('#scene' + sceneNumber + ' '+descriptionElement).html(description_no_img);
                    console.log(`I chose ${randomItem[0].title}`);
                    console.log(`The description is ${description_no_img}`);
                };
              }
                addOnFunctions();
                removeDynamicScripts();
            } else {
                this.fd_parse_request(this.jsonObject, this.titleClass, this.descriptionClass);
            }
        }
        return obj;
    }());
    return MODULE;
}
