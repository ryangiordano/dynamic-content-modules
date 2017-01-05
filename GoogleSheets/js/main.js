$('.gomedia-image.image').css('background-image', "");

let optionsData = {
    rowPerScene: 10, //how many rows
    checkParams: false,
    random: false,
    googleSheetsUrl: "https://spreadsheets.google.com/feeds/list/10_NbV0h2F_eEvoJXu6LAzD0KKDW3rpHeWKB6_9t4CAk/od6/public/values?alt=json",
    DOMelements: {
        textElement: ".google-sheets-text",
        descriptionElement: ".google-sheets-description"
    }
};
console.log(optionsData.googleSheetsUrl+optionsData.spreadSheetId + optionsData.UrlParameters);
let google_sheets = new Google_Sheets_Module(optionsData);

function gomediaDynamicInit() {
}

google_sheets.init();

gomediaDynamicInit();
