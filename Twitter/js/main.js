$('.gomedia-image.image').css('background-image', "");

let optionsData = {
    count: 10, //how many tweets to return
    method:  "twitter_user_timeline", //twitter_user_timeline, multiple_hashtags_some,multiple_hashtags_all, twitter_hashtag_listener
    handle: "gocodigo", //string
    hashtags: ["nintendo"], //hashtags to use to get tweets
    checkParams: true,
    twitterInterfaceUrl: 'https://shout.gocodigo.net/TWITTER_UTIL/twitter_api/twitter_api_interface.php',
    DOMelements: {
        textElement: ".twitter-text",
        handleElement: ".user-name",
        imageElement: ".image",
        userLocationsElement: ".user-location",
        imageElement: ".image",
        dateElement: ".created-at",
        hashtagElement: ".hashtag"
    }
};

let twitter = new Twitter_Module(optionsData);
function gomediaDynamicInit() {
}

twitter.init();

gomediaDynamicInit();
