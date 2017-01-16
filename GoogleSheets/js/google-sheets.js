class Google_Sheets_Module extends Gomedia_Dynamic {
    constructor(optionsData) {
        super();
        for (let key in optionsData) {
            if (optionsData.hasOwnProperty(key)) {
                this[key] = optionsData[key];
            }
        }
    }
    init() {
        if (this.checkParams) {
            this.googleSheetsUrl = this.getParameterByName('row-per-scene') !== "" ? this.getParameterByName('row-per-scene') : this.googleSheetsUrl;
            this.random = this.getParameterByName('random') !== "" ? this.getParameterByName('random') : this.random;
            this.rowPerScene = this.getParameterByName('sheets-url') !== "" ? this.getParameterByName('sheets-url') : this.rowPerScene;
        }
        //ajax call to get the data from google sheets
        $.get(this.googleSheetsUrl, data => this.parseResponse(data));
        // this.parseResponse(dummyData);
    }
    parseResponse(json) {
        // let items = json.feed.entry;
        let items = json.feed.entry;
        this.populatePage(items);
    }
    populatePage(items) {
      console.log(items);
        const scenes = $('.scene'),
            scenesLength = scenes.length;
        //Get a length of the number of scenes that have elements to be written to in it, take the row per scene number and divide by the number of scenes.
        for (let i = 1; i < scenesLength+1; i += 1) {
            if (this.sceneChecker(i, this.DOMelements)) {
              for(let key in this.DOMelements){
                // TODO: populate items in scene.  Prepare for multiple items per scene using the "rowPerScene" option
                $(`#scene${i}`).find(key.el)

              }
            }
        }
    }
    entrySplitter(entry){
      //removes the google sheets "gsx" prefix from before the name of the column
      const split = entry.split("$");
      return split[1];
    }
}
