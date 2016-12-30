 window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    var html = 'ERROR:</br>  message: ' + errorMsg + '</br> lineNumber: '+ lineNumber + '</br>  url: '+ url+ '</br>  column: '+ column+ '</br>  errorObj: '+ errorObj;
       $("#error_div").css('display','block');
       $("#error_div").html(html);
        return true;
};