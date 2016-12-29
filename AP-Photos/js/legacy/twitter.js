function twitter_init() {

    if (!HARDCODE_PARAMETERS) { //If We don't have hardcoded parameters
        optionsData.count = getParameterByName('count');
        optionsData.method = getParameterByName('method') == "" ? DEFAULT_METHOD : getParameterByName('method'); // twitter_hashtag_listener
        optionsData.handle = getParameterByName('handle');
        console.log(optionsData.handle);
        optionsData.hashtags = [
            getParameterByName('hashtag1'),
            getParameterByName('hashtag2'),
            getParameterByName('hashtag3')
        ];

        if (optionsData.count == "" || optionsData.count == undefined) {
            optionsData.count = "3";
        }
        //if hashtags are empty, fill first element in the array with the default hashtag.
        if (optionsData.hashtags.filter((hashtag) => {
                return hashtag == ""
            }).length >= optionsData.hashtags.length) {
            optionsData.hashtags[0] = DEFAULT_HASHTAG;
        }
        if (optionsData.handle == "") {
            optionsData.handle = DEFAULT_HANDLE;
            //go_codigo
        }

        switch (optionsData.method) { //twitter hashtag listener
            case "twitter_user_timeline":
                API_REQUEST_TYPE = "handle";
                handle_listener();
                break;
            case "twitter_hashtag_listener":
                API_REQUEST_TYPE = "hashtag";
                hashtag_listener();
                //main take-away is here: API_REQUEST_TYPE = "handle"
                //then hashtag_listener is run
                break;
            case "multiple_hashtags_all":
                API_REQUEST_TYPE = "hashtag";
                hashtag_listener();
                break;
            case "multiple_hashtags_some":
                API_REQUEST_TYPE = "hashtag";
                hashtag_listener();
                break;
            default:
                optionsData.method = "twitter_user_timeline";
                handle_listener();
        }

        function handle_listener() {
            params = 'method=' + optionsData.method + '&handle=' + optionsData.handle + "&count=" + optionsData.count;
            handleSubmit(params);
        }

        function hashtag_listener() {
            params = 'method=' + optionsData.method + '&hashtag=' + optionsData.hashtags[0] + '&count=' + optionsData.count + '&hashtag2=' + optionsData.hashtags[1] + '&hashtag3=' + optionsData.hashtags[2];
            hashtagSubmit(params);
        }
    } else { //if we have hardcoded parameters
        params = 'method=' + optionsData.method + '&hashtag=' + optionsData.hashtags[0] + '&count=' + count + '&hashtag2=' + optionsData.hashtags[1] + '&hashtag3=' + optionsData.hashtags[2];
        hashtagSubmit(params);
    }
}

function handleSubmit(dataString) {
    ajax_datastring_URL_callback(dataString, SHOUT_TWITTER_INTERFACE, callback_handle);
}

function callback_handle(data) {
    obj = JSON.parse(data);
    console.log(obj);
    // makeArrayOfImagesToPreload(obj);
    parseTwitterData(obj);

    // if (TWEET_SELECTION === 'regular') {
    //     console.log('TWEET_SELECTION=' + TWEET_SELECTION);
    //     displayHandleAtIndex(0);
    //     // initHandleLoop();
    // } else if (TWEET_SELECTION === 'random') {
    //     var random_number = Math.floor((Math.random() * 2));
    //     displayHandleAtIndex(random_number);
    // } else {
    //     console.log('TWEET_SELECTION=' + TWEET_SELECTION);
    //     displayHandleAtIndex(0);
    //     // initHandleLoop();
    // }
}

function hashtagSubmit(dataString) {
    ajax_datastring_URL_callback(dataString, SHOUT_TWITTER_INTERFACE, callback_hashtag);
}

function callback_hashtag(data) {
    obj = JSON.parse(data);
    console.log(obj);
    // makeArrayOfImagesToPreload(obj);
    parseTwitterData(obj)
        // initDelayTimelineLoop();
}

function parseTwitterData(obj) {
    twitterData = [];
    console.log(obj);
    //depending on whether you query by handle or hashtag, the object you receive back will be different.
    let newObj = obj.hasOwnProperty("statuses") ? obj.statuses : obj;
      newObj.map(status => {
          singleStatus = {}
          singleStatus["created_at"] = Date.parse(status.created_at);
          singleStatus["userName"] = status.user.name;
          singleStatus["userLocation"] = status.user.location;
          singleStatus["text"] = status.text;
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
        return twitter_init();
    }
    populateData(twitterData)
}

function populateData(twitterData) {
    let DOMelements = optionsData.DOMelements;
    let scenes = $('.scene');
    //behavior: unique item on each scene that can display it.  When there are more scenes than items, loop back from the beginning.
    let counter = 0;
    for (i = 0; i < scenes.length; i++) {
        var sceneNumber = i + 1;
        if ($('#scene' + sceneNumber).find(DOMelements.handleElement).length == 1 && $('#scene' + sceneNumber).find(DOMelements.textElement).length == 1) {
            if (counter > twitterData.length) {
                counter = 0
            }
            var item = twitterData[counter];
            counter++;
            console.log(item);
            let scene = '#scene' + sceneNumber;
            $(scene + ' ' + DOMelements.handleElement).html(item.userName);
            $(scene + ' ' + DOMelements.textElement).html(item.text);
            if ($(scene).find(DOMelements.imageElement).length == 1 & item.imageUrl !== undefined) {
                console.log(item.imageUrl);
                $(scene + ' ' + DOMelements.imageElement).css('background-image', 'url(' + item.imageUrl + ')');
            }
        };
    }
}












function getImgSize(imgSrc) {
    var newImg = new Image();
    newImg.src = imgSrc;
    curHeight = newImg.height;
    curWidth = newImg.width;
}
//create image elements in the DOM from an array of image URLS
function makeArrayOfImagesToPreload(obj) {
    var arrayOfImages = new Array();
    for (var i = 0; i < obj.length; i++) {
        arrayOfImages.push(obj[i]['user']['profile_image_url']);
    }
    preloadImages(arrayOfImages);
}

function preloadImages(array) {
    //in: array of image URLS
    //out: array of Image() elements added to the DOM.
    if (!preloadImages.list) {
        preloadImages.list = [];
    }
    var list = preloadImages.list;
    for (var i = 0; i < array.length; i++) {
        var img = new Image();
        img.onload = function() {
            var index = list.indexOf(this);
            if (index !== -1) {
                list.splice(index, 1);
            }
        };
        list.push(img);
        img.src = array[i];
    }
}
function delayedDisplayOnTimeline() {
    console.log('START TWEET 0 ');
    displayHashtagAtIndex(0);
    console.log('start the loop');
    initHashtagLoop();
}
var loopDelayTimelineInterval;

function initDelayTimelineLoop() {
    loopDelayTimelineInterval = setInterval(loopDelayTimeline, 100);
}

function loopDelayTimeline() {
    if (TIMELINE_READY_FOR_DISPLAY) {
        delayedDisplayOnTimeline();
        clearInterval(loopDelayTimelineInterval);
    }
    // console.log("status looping timelline delay ...");
}

function initHashtagLoop() {
    HashtagLoopInterval = setInterval(HashtagLoop, TIME_INTERVAL);
}

function HashtagLoop() {
    if (interval_index >= INTERVAL_COUNT) {
        console.log('PROGRAM IS COMPLETE');
        GOMEDIA_COMPLETE = true;
        clearInterval(HashtagLoopInterval);
    } else {
        console.log("interval_index:" + interval_index);
        displayHashtagAtIndex(interval_index);
    }
    interval_index++;
}

function initHandleLoop() {
    HandleLoopInterval = setInterval(HandleLoop, TIME_INTERVAL);
}

function HandleLoop() {
    console.log("interval_index:" + interval_index);
    if (interval_index >= INTERVAL_COUNT) {
        console.log('PROGRAM IS COMPLETE');
        GOMEDIA_COMPLETE = true;
        clearInterval(HandleLoopInterval);
    } else {
        displayHandleAtIndex(interval_index);
    }
    interval_index++;
}

function displayHandleAtIndex(i) {
    if (typeof obj[i]['text'] != 'undefined') {
        $('#Stage_Hashtag').html("");
        var handle = obj[i]['user']['handle'];
        $('#Stage_Handle').html(handle);
        var followers_count = obj[i]['user']['followers_count'];
        $('#Stage_Reach').html(followers_count);
        var string_msg = obj[i]['text'];
        if (string_msg.indexOf('http') != -1) {
            var result = string_msg.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
            $('#Stage_Tweet').html(result);
        } else {
            $('#Stage_Tweet').html(obj[i]['text']);
        }
        if (WITHIMAGE) {
            if (typeof obj[i]['entities']['media'] != 'undefined' && typeof obj[i]['entities']['media'][0]['media_url_https'] != 'undefined') {
                var src = obj[i]['entities']['media'][0]['media_url_https'];
                if (src != '') {
                    getImgSize(src);
                    $('#Stage_Image').html("<div style='width:" + fixWidth + "; height:" + fixHeight + "; background: url(" + src + ") no-repeat center  ; background-size:contain;  '>  </div>");
                } else {
                    var default_src = "https://shout.gocodigo.net/TWITTER_UTIL/twitterbird-default.png";
                    getImgSize(default_src);
                    $('#Stage_Image').html("<div style='width:" + fixWidth + "; height:" + fixHeight + "; background: url(" + default_src + ") no-repeat center  ; background-size:contain;  '>  </div>");
                    console.log('middle: should show default twitter bird image.');
                    console.log(default_src);
                }
            } else {
                var default_src = "https://shout.gocodigo.net/TWITTER_UTIL/twitterbird-default.png";
                getImgSize(default_src);
                $('#Stage_Image').html("<div style='width:" + fixWidth + "; height:" + fixHeight + "; background: url(" + default_src + ") no-repeat center  ; background-size:contain;  '>  </div>");
                console.log('middle: should show default twitter bird image.');
                console.log(default_src);
            }
        }
    }
}

function displayHashtagAtIndex(i) {
    console.log('displaying:' + i);
    if (typeof obj['statuses'][i] != 'undefined') {
        $('#Stage_Hashtag').html(HASHTAG1);
        $('#Stage_Hashtag2').html(HASHTAG2);
        $('#Stage_Hashtag3').html(HASHTAG3);
        var handle = obj['statuses'][i]['user']['handle'];
        $('#Stage_Handle').html(handle);
        var followers_count = obj['statuses'][i]['user']['followers_count'];
        $('#Stage_Reach').html(followers_count);
        var string_msg = obj['statuses'][i]['text'];
        if (string_msg.indexOf('http') != -1) {
            var result = string_msg.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
            $('#Stage_Tweet').html(result);
        } else {
            $('#Stage_Tweet').html(obj['statuses'][i]['text']);
        }
        if (WITHIMAGE) {
            if (typeof obj['statuses'][i]['entities'] != 'undefined' && typeof obj['statuses'][i]['entities']['media'] != 'undefined') {
                var src = obj['statuses'][i]['entities']['media'][0]['media_url_https'];
                if (src != '') {
                    $('#Stage_Image').html("<div style='width:" + fixWidth + "; height:" + fixHeight + "; background: url(" + src + ") no-repeat center  ; background-size:contain;  '>  </div>");
                } else {
                    var default_src = "https://shout.gocodigo.net/TWITTER_UTIL/twitterbird-default.png";
                    getImgSize(default_src);
                    $('#Stage_Image').html("<div style='width:" + fixWidth + "; height:" + fixHeight + "; background: url(" + default_src + ") no-repeat center  ; background-size:contain;  '>  </div>");
                    console.log('middle: should show default twitter bird image.');
                    console.log(default_src);
                }
            } else {
                var default_src = "https://shout.gocodigo.net/TWITTER_UTIL/twitterbird-default.png";
                getImgSize(default_src);
                $('#Stage_Image').html("<div style='width:" + fixWidth + "; height:" + fixHeight + "; background: url(" + default_src + ") no-repeat center  ; background-size:contain;  '>  </div>");
                console.log('middle: should show default twitter bird image.');
                console.log(default_src);
            }
        }
    }
}
