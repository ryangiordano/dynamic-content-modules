/*
gomedia-dynamic-util.js
-bayon forte 7-28-2016
This file will be 'ACTIVELY LIVE' getting pulled into and used by thousands of pieces of dynamic content.
Primarily new Digital Signage (v2) or html+ content.
DO NOT DELETE OR WORK ON IT DIRECTLY.
I. Functions
	1. QueryStringToJSON()
	2. filterContent(string)
	3. addOnFunctions()
	4. hideLinks()
	5. capitalizeFirstLetter(string)
	6. abbrState(input, to)
	7. checkParameters()
	8. getParameterByName(name)
	9. goMediaDynamicSceneRefresh
	10. loadScript(url, callback)
	11. removeDynamicScripts()
	12. edgeIsReady()

DEVELOPER NOTES:
1) All content files need to contain this function , gomediaDynamicInit(), because the
portal uses this function like a 'callback' when a scene is refreshed.
2) ANy content file that writes  a script to the head of the html document with the global loadScripts() function,
for example JSONP requests to a proxy,
needs to call this function, removeDynamicScripts(), once it has received the data it needs.
Otherwise, scripts will continue to get added to the html because of the way that the portal software works.
It takes a 'snapshot' of the html that was edited and saves it.

*/
class Gomedia_Dynamic{
  constructor(){
    this.arrayOfDynamicScriptIds = [];
  }
  QueryStringToJSON() {
      var pairs = location.search.slice(1).split('&');
      var result = {};
      pairs.forEach(function(pair) {
          pair = pair.split('=');
          result[pair[0]] = decodeURIComponent(pair[1] || '');
      });

      return JSON.parse(JSON.stringify(result));
  }
  filterContent(string) {
      var filter = ["abortion", "bloody", "boobs", "breasts", "butt", "cannibal", "condom", "cruelty", "dead", "dick", "ejaculate", "fatal","fatally","fornicate", "fuck", "homicide","kill","kills", "killed", "masturbate", "manslaughter","molest", "murder", "orgasm", "panty", "pedophile", "penis", "porn", "prostitute", "pussy", "rape", "rapist", "scrotum", "semen", "sex", "shit", "shooting", "slain", "slaying", "slayings", "sodomy", "stabbed", "stabbing", "strangled", "suicide", "tampon", "testicle", "topless", "vagina", "vasectomy", "viagra", "x-rated", "xxx"];
      let res;
      if (typeof string != "undefined") {
          res = string.split(" ");
      } else {
          return false;
      }
      let result = res.filter(item => {
          if (filter.indexOf(item.toLowerCase()) > -1) {
              return true;
          }
      });
      if (result.length >= 1) {
          return true;
      }
      return false;
  }
  addOnFunctions() {
      this.hideLinks();
  }
  hideLinks() {
      $('a').hide();
  }
  capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
  }
  abbrState(input, to) {
      //credit: Caleb Grove: https://gist.github.com/CalebGrove/c285a9510948b633aa47
      var a_states = [
          ['Alabama', 'AL'],
          ['Alaska', 'AK'],
          ['Arizona', 'AZ'],
          ['Arkansas', 'AR'],
          ['California', 'CA'],
          ['Colorado', 'CO'],
          ['Connecticut', 'CT'],
          ['Delaware', 'DE'],
          ['Florida', 'FL'],
          ['Georgia', 'GA'],
          ['Hawaii', 'HI'],
          ['Idaho', 'ID'],
          ['Illinois', 'IL'],
          ['Indiana', 'IN'],
          ['Iowa', 'IA'],
          ['Kansas', 'KS'],
          ['Kentucky', 'KY'],
          ['Louisiana', 'LA'],
          ['Maine', 'ME'],
          ['Maryland', 'MD'],
          ['Massachusetts', 'MA'],
          ['Michigan', 'MI'],
          ['Minnesota', 'MN'],
          ['Mississippi', 'MS'],
          ['Missouri', 'MO'],
          ['Montana', 'MT'],
          ['Nebraska', 'NE'],
          ['Nevada', 'NV'],
          ['New Hampshire', 'NH'],
          ['New Jersey', 'NJ'],
          ['New Mexico', 'NM'],
          ['New York', 'NY'],
          ['North Carolina', 'NC'],
          ['North Dakota', 'ND'],
          ['Ohio', 'OH'],
          ['Oklahoma', 'OK'],
          ['Oregon', 'OR'],
          ['Pennsylvania', 'PA'],
          ['Rhode Island', 'RI'],
          ['South Carolina', 'SC'],
          ['South Dakota', 'SD'],
          ['Tennessee', 'TN'],
          ['Texas', 'TX'],
          ['Utah', 'UT'],
          ['Vermont', 'VT'],
          ['Virginia', 'VA'],
          ['Washington', 'WA'],
          ['West Virginia', 'WV'],
          ['Wisconsin', 'WI'],
          ['Wyoming', 'WY'],
      ];
      if (to == 'abbr') {
          input = input.replace(/\w\S*/g, function(txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
          });
          for (let i = 0; i < a_states.length; i++) {
              if (a_states[i][0] == input) {
                  localStorage.setItem("returnAbbr", a_states[i][1]);
                  return (a_states[i][1]);
              }
          }
      } else if (to == 'name') {
          input = input.toUpperCase();
          for (let i = 0; i < a_states.length; i++) {
              if (a_states[i][1] == input) {
                  return (a_states[i][0]);
              }
          }
      }
  }
  checkParameters() {
      $("#Stage_checkParameters").html('<br>location.href: ' + location.href + "<hr>");
      $("#Stage_checkParameters").append('<br>Parameters Received: ' + location.search + '<hr>');
      var otherResult = null;
      if (location.search == "") {
          $("#Stage_checkParameters").append('<br>EMPTY<hr>');
          otherResult = 'empty';
      } else if (location.search == "undefined") {
          $("#Stage_checkParameters").append('<br>UNDEFINED<hr>');
          otherResult = 'undefined';
      } else {
          var rez = typeof location.search;
          $("#Stage_checkParameters").append('<br>DEFINED OR SOMETHING ELSE TYPEOF:' + rez + "<hr>");
      }

  }
  getParameterByName(name) {
      name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
      var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
          results = regex.exec(location.search);
      // console.log(decodeURIComponent(results[1].replace(/\+/g, " ")));
      return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }
  goMediaDynamicSceneRefresh() {
      gomediaDynamicInit();
  }
  loadScript(url, callback) {
      // LOAD SCRIPT OR ARRAY OF SCRIPTS
      //in: string or array
      //out: append script to head
      //out: callback function
      const self = this;
      function getScript(url) {
          var head = document.getElementsByTagName('head')[0];
          var script = document.createElement('script');
          script.type = 'text/javascript';
          script.src = url;
          //////////////////////////////////////////////////////////////
          //id is important for removing duplicate appends.
          script.id = url;
          script.classList = "dynamicScript";
          // script.crossOrigin="anonymous";
          self.arrayOfDynamicScriptIds.push(url);
          console.log(script);
          //////////////////////////////////////////////////////////////////////
          script.onreadystatechange = callback;
          script.onload = callback;
          head.appendChild(script);
      }
      if (Object.prototype.toString.call(url) === '[object Array]') {
          for (var i = 0, max = url.length; i < max; i++) {
              getScript(url[i]);
          }
      } else {
          getScript(url);
      }
  }
  removeDynamicScripts() {
      this.arrayOfDynamicScriptIds = [];
      $('.dynamicScript').remove();
  }
  numberToMonth(date) {
      let monthArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      return monthArray[date];
  }
  ajax_datastring_URL_callback(dataString, URL, callback) {
      var xmlhttp;
      if (window.XMLHttpRequest) {
          xmlhttp = new XMLHttpRequest();
      } else {
          xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
      }
      xmlhttp.onreadystatechange = function() {
          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
              callback(xmlhttp.responseText);
          };
      };
      xmlhttp.open("POST", URL, true);
      xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
      xmlhttp.send(dataString);
  }
}
