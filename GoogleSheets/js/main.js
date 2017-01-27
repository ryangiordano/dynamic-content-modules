$('.gomedia-image.image').css('background-image', "");
let optionsData = {
    rowPerScene: 1, //how many rows
    checkParams: true,
    random: true,
    // TODO: Run this through the proxy server
    googleSheetsPrefix: "https://spreadsheets.google.com/feeds/list/",
    googleSheetsSuffix: "/od6/public/values?alt=json",
    googleSheetsID: "19SBXwkla_27vd3-mmV9a5KaH9iDHRUEufSa0beJxljg",
    DOMelements: {
        titleElement: {el:".google-sheets-a"},
        descriptionElement: {el:".google-sheets-b"},
        // imageElement: {el:".google-sheets-c", col:"image"}
    }
};
// console.log(optionsData.googleSheetsUrl);
let google_sheets = new Google_Sheets_Module(optionsData);

function gomediaDynamicInit() {
}

google_sheets.init();

gomediaDynamicInit();
