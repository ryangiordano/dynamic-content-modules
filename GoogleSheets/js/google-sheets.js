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
        console.log(this.rowPerScene,this.googleSheetsUrl,this.random);    $.get(this.googleSheetsUrl,data=>this.parseResponse(data))
    }
    parseResponse(json){
      let items = json.feed.entry;
      console.log(items);
    }
    populatePage(){
      let scenes = $('.scene');

    }
}
///////////////////////////////////////////////
//
// (function(){
//   $('.loading').hide();
//   var spreadsheetId = "18iqvv4EqhW7-WOn7xPPWxf0XkVXZOwETLi-JdKHXTGg",
//   url = "https://spreadsheets.google.com/feeds/list/" +
//           spreadsheetId +
//           "/od6/public/basic?alt=json",
//           table = $('#table');
//   function getData(){
//     $('.loading').show();
//     $.get({
//       url: url,
//       success: function(response){
//         var data = response.feed.entry,
//         len = data.length,
//           parsedData = [],
//         i = 0;
//                 console.log(data);
//         for(i = 0; i < len; i++){
//           parsedData.push({
//             name: data[i].title.$t,
//             value: data[i].content.$t.replace('email: ', '')
//           });
//         }
//         populateFields(parsedData);
//       }
//     })
//   }
//   var populateFields = function(parsedData){
//     var input = $('#input-field'), i = 0,
//     len = parsedData.length;
//     console.log(parsedData)
//     for (i = 0; i < len; i++){
//         $('.loading').hide();
//       $('#table tr:last').after('<tr class="added"><td>'+parsedData[i].name+'</td><td>'+parsedData[i].value+'</td></tr>');
//     }
//
//   }
//   var refreshData = function(){
//     $('#table .added').remove();
//     getData();
//   }
//   getData();
//   $('#refresh').on('click', refreshData);
// }());
