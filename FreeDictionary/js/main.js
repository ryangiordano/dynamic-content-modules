let optionsData = {
    feedId: "history", //word,history,article, or birthday
    checkParams: true,
    DOMelements: {
        titleElement: ".title",
        descriptionElement: ".description",
        feedElement: ".feed"
    }
};
let freeDictionary = new Free_Dictionary_Module(optionsData);
function gomediaDynamicInit() {
  //clear out the image saved previously.
  freeDictionary.init();
}
function dynamicData(json) {
    freeDictionary.isLoaded$.subscribe(
      next=>{
        freeDictionary.parseResponse(json);
        freeDictionary.removeDynamicScripts();
      },
      error=>{console.error(error)}
    );
}
gomediaDynamicInit();
