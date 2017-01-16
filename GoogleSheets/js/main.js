$('.gomedia-image.image').css('background-image', "");
let optionsData = {
    rowPerScene: 2, //how many rows
    checkParams: false,
    random: false,
    // TODO: Run this through the proxy server
    googleSheetsUrl: "https://spreadsheets.google.com/feeds/list/1PRu9d6daRb8pYiYpPhUkX3v7NLZXfPqsNmCRDmaBfk0/od6/public/values?alt=json",
    DOMelements: {
        titleElement: {el:".google-sheets-title",col:"name"},
        descriptionElement: {el:".google-sheets-description",col:"description"},
        imageElement: {el:".google-sheets-image", col:"image"}
    }
};
console.log(optionsData.googleSheetsUrl+optionsData.spreadSheetId + optionsData.UrlParameters);
let google_sheets = new Google_Sheets_Module(optionsData);

function gomediaDynamicInit() {
}

google_sheets.init();

gomediaDynamicInit();
