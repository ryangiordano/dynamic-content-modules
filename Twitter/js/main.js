$('.gomedia-image.image').css('background-image', "");

let optionsData = {
    count: 10, //how many tweets to return
    method:  "twitter_hashtag_listener", //twitter_user_timeline, multiple_hashtags_some,multiple_hashtags_all, twitter_hashtag_listener
    handle: "gocodigo", //string
    hashtags: ["nintendo"], //hashtags to use to get tweets
    checkParams: true,
    defaultImageUrl: 'images/twitterlogo.png',
    twitterInterfaceUrl: 'https://shout.gocodigo.net/TWITTER_UTIL/twitter_api/twitter_api_interface.php',
    DOMelements: {
        textElement: ".twitter-text",
        nameElement: ".user-name",
        imageElement: ".image",
        userLocationsElement: ".user-location",
        imageElement: ".image",
        dateElement: ".created-at",
        hashtagElement: ".hashtag",
        handleElement: ".handle",
        reachElement: ".reach"
    }
};
let twitter = new Twitter_Module(optionsData);
function gomediaDynamicInit() {
}
function dynamicData(json){
  console.log(json);
}
twitter.init();

gomediaDynamicInit();
