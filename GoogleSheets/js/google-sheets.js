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
            //grab parameters from the content editor and replace supplied parameters in the optionsData object in main.js.
            this.rowPerScene = this.getParameterByName('row-per-scene') !== "" ? this.getParameterByName('row-per-scene') : this.rowPerScene;
            this.random = this.getParameterByName('random') !== "" ? this.getParameterByName('random') : this.random;
            //Allows customers to easily place the google sheets URL into the parameters.
            if(this.getParameterByName('sheets-url')!== ""){
              this.googleSheetsUrl = this.getParameterByName('sheets-url');
                          this.googleSheetsID = this.googleSheetsUrl.substring(this.googleSheetsUrl.lastIndexOf('d/')+2,this.googleSheetsUrl.lastIndexOf('/edit'));
            }

        }
        //ajax call to get the data from google sheets
        $.ajax({
            url: this.googleSheetsPrefix + this.googleSheetsID+this.googleSheetsSuffix,
            type: 'GET',
            success: data => this.parseResponse(data),
            error: data => console.error(data)
        });
    }
    parseResponse(json) {
        let newItems = [];
        let items = json.feed.entry;
        items.map((item) => {
            let newItem = {};
            for (let key in item) {
                if (item.hasOwnProperty(key) && key.indexOf('gsx') > -1) {
                    //Google sheets properties are prefixed with "gsx$".  This code removes that and normalizes the property name.
                    newItem[key.split('$')[1]] = item[key].$t;
                }
            }
            newItems.push(newItem);
        });

        this.fillInColData(newItems);
    }
    fillInColData(newItems) {
      //gets the column names from google sheets and assigns them to elements in the content piece.  Important, because now we don't have to explicitly tell the program the names of the columns.
        let propertyNameArray = [];
        let i = 0;
        for (let key in newItems[0]) {
            propertyNameArray.push(key);
        }
        for (let key in this.DOMelements) {
            this.DOMelements[key].col = propertyNameArray[i]
                ++i;
        }
        this.populatePage(newItems)
    }
    populatePage(items) {
        const scenes = $('.scene'),
            scenesLength = scenes.length;
        let currentItem;
        //Get a length of the number of scenes that have elements to be written to in it, take the row per scene number and divide by the number of scenes.
        for (let i = 1; i <= scenesLength; ++i) {
            if (!this.sceneChecker(i, this.DOMelements)) {
                continue;
            }
            if (items.length > 0) {
                currentItem = this.random ? items.splice(Math.floor(Math.random() * items.length), 1)[0] : items.shift();
            }
            console.log(currentItem);
            for (let key in this.DOMelements) {
                // TODO: populate items in scene.  Prepare for multiple items per scene using the "rowPerScene" option.  For right now, let's focus on getting information on the DOM
                $(`#scene${i}`).find(this.DOMelements[key].el).html(currentItem[this.DOMelements[key].col])
            }
        }
    }
}
