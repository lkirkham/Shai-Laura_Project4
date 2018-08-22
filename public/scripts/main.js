(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

//user arrives on page
//user asked for their name and age. age must be >= 19
//if user is not >=  serve up a page that says "oops you're to young"
//if age requirement is met, load main page
// on main page we greet the user and present them with a natural language filter
//natural language filter says something like "I want to feel _________" with a dropdown of selections.
//options could include releif from depression, pain, anxiety, etc. or simply moods like happy, relaxed, hungry...
//user selects an option and are served strains that match that option.
//strains will be displayed with random photo (stretch goal is to have a real one), their name, flavours, all effects, race.
//name photo and 

var app = {};
app.apiUrl = 'http://strainapi.evanbusse.com/';
app.apiKey = 'OcnJg8N';
app.searchQueryEffect = '/strains/search/effect/';

var userSelection = '';
var strains15 = [];

app.events = function () {
  $('form').on('submit', function (e) {
    e.preventDefault();
    // console.log('did this work?');
    userSelection = $('option:selected').val();
    // console.log(userSelection);
    app.getEffect(userSelection);
  });
};

app.getEffect = function (user) {
  var effect = user;
  $.ajax({
    url: '' + app.apiUrl + app.apiKey + app.searchQueryEffect + effect,
    method: 'GET',
    dataType: 'json'
  }).then(function (res) {
    console.log(res);

    //find out the number of strains in the users selected effect
    console.log('number of items in the array: ' + res.length);
    //select a random number from 0 to the number of items in the array
    var randomNumber = Math.floor(Math.random() * res.length + 1);
    console.log(randomNumber);
    // log the randomly selected name in the users selected effect
    console.log(res[randomNumber].name);
    var randomStrain = res[randomNumber].name;

    strains15 = [];
    //make an array with 15 random strains generated from the users chosen effect.
    for (var i = 0; i < 14; i++) {
      var _randomNumber = Math.floor(Math.random() * res.length + 1);
      // log the randomly selected name in the users selected effect
      var _randomStrain = res[_randomNumber].name;
      console.log(_randomStrain);
      strains15.push(_randomStrain);
    }
    console.log(strains15);
    // we are calling the app.displayEffects and passing through
    // the array
    app.displayEffect(strains15);
  });
};

app.displayEffect = function (strainsArray) {
  console.log("this is the random strains array passed into display effect " + strainsArray);
  // we created a for loop to go through the length of the array
  // create html card for each item [i]

  for (var i = 0; i < strainsArray.length; i++) {
    // we inserted a template literal with the [i] into the card
    // displaying a differnt strain name
    $('.resultsContainer').append('<div class="card">\n  <div class="cardTop">\n  <figure></figure>\n  </div>\n  <div class="cardBottom">\n  <h3 class="strainName">' + strainsArray[i] + '</h3>\n  </div>\n  </div>');
  }
};

app.init = function () {

  app.events();
};

$(function () {
  app.init();
});

// inside we want to put a varauble inside [] of our array
// variable will generate random number that will go into []
// para 0 - end of array -1
// array.length 
// res.length 
// random nubemer = Math.floor(Math.random)()*res.length 
// for(let item = 0; item > res.length > item++)

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLE1BQU0sRUFBWjtBQUNBLElBQUksTUFBSixHQUFhLGlDQUFiO0FBQ0EsSUFBSSxNQUFKLEdBQWEsU0FBYjtBQUNBLElBQUksaUJBQUosR0FBd0IseUJBQXhCOztBQUVBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSxZQUFZLEVBQWhCOztBQUVBLElBQUksTUFBSixHQUFhLFlBQU07QUFDakIsSUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBVSxDQUFWLEVBQWE7QUFDbEMsTUFBRSxjQUFGO0FBQ0E7QUFDQSxvQkFBZ0IsRUFBRSxpQkFBRixFQUFxQixHQUFyQixFQUFoQjtBQUNBO0FBQ0EsUUFBSSxTQUFKLENBQWMsYUFBZDtBQUNELEdBTkQ7QUFPRCxDQVJEOztBQVVBLElBQUksU0FBSixHQUFnQixVQUFDLElBQUQsRUFBVTtBQUN4QixNQUFJLFNBQVMsSUFBYjtBQUNBLElBQUUsSUFBRixDQUFPO0FBQ0gsY0FBUSxJQUFJLE1BQVosR0FBcUIsSUFBSSxNQUF6QixHQUFrQyxJQUFJLGlCQUF0QyxHQUEwRCxNQUR2RDtBQUVILFlBQVEsS0FGTDtBQUdILGNBQVU7QUFIUCxHQUFQLEVBS0csSUFMSCxDQUtRLFVBQUMsR0FBRCxFQUFTO0FBQ2IsWUFBUSxHQUFSLENBQVksR0FBWjs7QUFHQTtBQUNBLFlBQVEsR0FBUixvQ0FBNkMsSUFBSSxNQUFqRDtBQUNBO0FBQ0EsUUFBSSxlQUFlLEtBQUssS0FBTCxDQUFZLEtBQUssTUFBTCxLQUFnQixJQUFJLE1BQXJCLEdBQStCLENBQTFDLENBQW5CO0FBQ0EsWUFBUSxHQUFSLENBQVksWUFBWjtBQUNBO0FBQ0EsWUFBUSxHQUFSLENBQVksSUFBSSxZQUFKLEVBQWtCLElBQTlCO0FBQ0EsUUFBSSxlQUFlLElBQUksWUFBSixFQUFrQixJQUFyQzs7QUFFQSxnQkFBWSxFQUFaO0FBQ0E7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksRUFBcEIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDM0IsVUFBSSxnQkFBZSxLQUFLLEtBQUwsQ0FBWSxLQUFLLE1BQUwsS0FBZ0IsSUFBSSxNQUFyQixHQUErQixDQUExQyxDQUFuQjtBQUNBO0FBQ0EsVUFBSSxnQkFBZSxJQUFJLGFBQUosRUFBa0IsSUFBckM7QUFDQSxjQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsZ0JBQVUsSUFBVixDQUFlLGFBQWY7QUFDRDtBQUNELFlBQVEsR0FBUixDQUFZLFNBQVo7QUFDQTtBQUNBO0FBQ0EsUUFBSSxhQUFKLENBQWtCLFNBQWxCO0FBRUQsR0FoQ0g7QUFpQ0QsQ0FuQ0Q7O0FBcUNBLElBQUksYUFBSixHQUFvQixVQUFTLFlBQVQsRUFBc0I7QUFDeEMsVUFBUSxHQUFSLENBQVksaUVBQWlFLFlBQTdFO0FBQ0E7QUFDQTs7QUFFQSxPQUFJLElBQUksSUFBSSxDQUFaLEVBQWMsSUFBSSxhQUFhLE1BQS9CLEVBQXVDLEdBQXZDLEVBQTJDO0FBQzNDO0FBQ0E7QUFDQSxNQUFFLG1CQUFGLEVBQXVCLE1BQXZCLHVJQUt5QixhQUFhLENBQWIsQ0FMekI7QUFRQztBQUVGLENBbEJEOztBQW9CQSxJQUFJLElBQUosR0FBVyxZQUFZOztBQUVyQixNQUFJLE1BQUo7QUFFRCxDQUpEOztBQU1BLEVBQUUsWUFBWTtBQUNaLE1BQUksSUFBSjtBQUNELENBRkQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL3VzZXIgYXJyaXZlcyBvbiBwYWdlXG4vL3VzZXIgYXNrZWQgZm9yIHRoZWlyIG5hbWUgYW5kIGFnZS4gYWdlIG11c3QgYmUgPj0gMTlcbi8vaWYgdXNlciBpcyBub3QgPj0gIHNlcnZlIHVwIGEgcGFnZSB0aGF0IHNheXMgXCJvb3BzIHlvdSdyZSB0byB5b3VuZ1wiXG4vL2lmIGFnZSByZXF1aXJlbWVudCBpcyBtZXQsIGxvYWQgbWFpbiBwYWdlXG4vLyBvbiBtYWluIHBhZ2Ugd2UgZ3JlZXQgdGhlIHVzZXIgYW5kIHByZXNlbnQgdGhlbSB3aXRoIGEgbmF0dXJhbCBsYW5ndWFnZSBmaWx0ZXJcbi8vbmF0dXJhbCBsYW5ndWFnZSBmaWx0ZXIgc2F5cyBzb21ldGhpbmcgbGlrZSBcIkkgd2FudCB0byBmZWVsIF9fX19fX19fX1wiIHdpdGggYSBkcm9wZG93biBvZiBzZWxlY3Rpb25zLlxuLy9vcHRpb25zIGNvdWxkIGluY2x1ZGUgcmVsZWlmIGZyb20gZGVwcmVzc2lvbiwgcGFpbiwgYW54aWV0eSwgZXRjLiBvciBzaW1wbHkgbW9vZHMgbGlrZSBoYXBweSwgcmVsYXhlZCwgaHVuZ3J5Li4uXG4vL3VzZXIgc2VsZWN0cyBhbiBvcHRpb24gYW5kIGFyZSBzZXJ2ZWQgc3RyYWlucyB0aGF0IG1hdGNoIHRoYXQgb3B0aW9uLlxuLy9zdHJhaW5zIHdpbGwgYmUgZGlzcGxheWVkIHdpdGggcmFuZG9tIHBob3RvIChzdHJldGNoIGdvYWwgaXMgdG8gaGF2ZSBhIHJlYWwgb25lKSwgdGhlaXIgbmFtZSwgZmxhdm91cnMsIGFsbCBlZmZlY3RzLCByYWNlLlxuLy9uYW1lIHBob3RvIGFuZCBcblxuY29uc3QgYXBwID0ge31cbmFwcC5hcGlVcmwgPSAnaHR0cDovL3N0cmFpbmFwaS5ldmFuYnVzc2UuY29tLydcbmFwcC5hcGlLZXkgPSAnT2NuSmc4TidcbmFwcC5zZWFyY2hRdWVyeUVmZmVjdCA9ICcvc3RyYWlucy9zZWFyY2gvZWZmZWN0LydcblxubGV0IHVzZXJTZWxlY3Rpb24gPSAnJ1xubGV0IHN0cmFpbnMxNSA9IFtdO1xuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdkaWQgdGhpcyB3b3JrPycpO1xuICAgIHVzZXJTZWxlY3Rpb24gPSAkKCdvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VyU2VsZWN0aW9uKTtcbiAgICBhcHAuZ2V0RWZmZWN0KHVzZXJTZWxlY3Rpb24pO1xuICB9KVxufVxuXG5hcHAuZ2V0RWZmZWN0ID0gKHVzZXIpID0+IHtcbiAgbGV0IGVmZmVjdCA9IHVzZXJcbiAgJC5hamF4KHtcbiAgICAgIHVybDogYCR7YXBwLmFwaVVybH0ke2FwcC5hcGlLZXl9JHthcHAuc2VhcmNoUXVlcnlFZmZlY3R9JHtlZmZlY3R9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuXG5cbiAgICAgIC8vZmluZCBvdXQgdGhlIG51bWJlciBvZiBzdHJhaW5zIGluIHRoZSB1c2VycyBzZWxlY3RlZCBlZmZlY3RcbiAgICAgIGNvbnNvbGUubG9nKGBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGFycmF5OiAke3Jlcy5sZW5ndGh9YCk7XG4gICAgICAvL3NlbGVjdCBhIHJhbmRvbSBudW1iZXIgZnJvbSAwIHRvIHRoZSBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGFycmF5XG4gICAgICBsZXQgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHJlcy5sZW5ndGgpICsgMSk7XG4gICAgICBjb25zb2xlLmxvZyhyYW5kb21OdW1iZXIpO1xuICAgICAgLy8gbG9nIHRoZSByYW5kb21seSBzZWxlY3RlZCBuYW1lIGluIHRoZSB1c2VycyBzZWxlY3RlZCBlZmZlY3RcbiAgICAgIGNvbnNvbGUubG9nKHJlc1tyYW5kb21OdW1iZXJdLm5hbWUpO1xuICAgICAgbGV0IHJhbmRvbVN0cmFpbiA9IHJlc1tyYW5kb21OdW1iZXJdLm5hbWU7XG5cbiAgICAgIHN0cmFpbnMxNSA9IFtdO1xuICAgICAgLy9tYWtlIGFuIGFycmF5IHdpdGggMTUgcmFuZG9tIHN0cmFpbnMgZ2VuZXJhdGVkIGZyb20gdGhlIHVzZXJzIGNob3NlbiBlZmZlY3QuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcbiAgICAgICAgbGV0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiByZXMubGVuZ3RoKSArIDEpO1xuICAgICAgICAvLyBsb2cgdGhlIHJhbmRvbWx5IHNlbGVjdGVkIG5hbWUgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgICBsZXQgcmFuZG9tU3RyYWluID0gcmVzW3JhbmRvbU51bWJlcl0ubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2cocmFuZG9tU3RyYWluKTtcbiAgICAgICAgc3RyYWluczE1LnB1c2gocmFuZG9tU3RyYWluKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKHN0cmFpbnMxNSlcbiAgICAgIC8vIHdlIGFyZSBjYWxsaW5nIHRoZSBhcHAuZGlzcGxheUVmZmVjdHMgYW5kIHBhc3NpbmcgdGhyb3VnaFxuICAgICAgLy8gdGhlIGFycmF5XG4gICAgICBhcHAuZGlzcGxheUVmZmVjdChzdHJhaW5zMTUpXG5cbiAgICB9KVxufVxuXG5hcHAuZGlzcGxheUVmZmVjdCA9IGZ1bmN0aW9uKHN0cmFpbnNBcnJheSl7XG4gIGNvbnNvbGUubG9nKFwidGhpcyBpcyB0aGUgcmFuZG9tIHN0cmFpbnMgYXJyYXkgcGFzc2VkIGludG8gZGlzcGxheSBlZmZlY3QgXCIgKyBzdHJhaW5zQXJyYXkpO1xuICAvLyB3ZSBjcmVhdGVkIGEgZm9yIGxvb3AgdG8gZ28gdGhyb3VnaCB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxuICAvLyBjcmVhdGUgaHRtbCBjYXJkIGZvciBlYWNoIGl0ZW0gW2ldXG4gIFxuICBmb3IobGV0IGkgPSAwO2kgPCBzdHJhaW5zQXJyYXkubGVuZ3RoOyBpKyspe1xuICAvLyB3ZSBpbnNlcnRlZCBhIHRlbXBsYXRlIGxpdGVyYWwgd2l0aCB0aGUgW2ldIGludG8gdGhlIGNhcmRcbiAgLy8gZGlzcGxheWluZyBhIGRpZmZlcm50IHN0cmFpbiBuYW1lXG4gICQoJy5yZXN1bHRzQ29udGFpbmVyJykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICA8ZGl2IGNsYXNzPVwiY2FyZFRvcFwiPlxuICA8ZmlndXJlPjwvZmlndXJlPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNhcmRCb3R0b21cIj5cbiAgPGgzIGNsYXNzPVwic3RyYWluTmFtZVwiPiR7c3RyYWluc0FycmF5W2ldfTwvaDM+XG4gIDwvZGl2PlxuICA8L2Rpdj5gKVxuICB9XG5cbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgYXBwLmV2ZW50cygpO1xuXG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICBhcHAuaW5pdCgpO1xufSk7XG5cblxuLy8gaW5zaWRlIHdlIHdhbnQgdG8gcHV0IGEgdmFyYXVibGUgaW5zaWRlIFtdIG9mIG91ciBhcnJheVxuLy8gdmFyaWFibGUgd2lsbCBnZW5lcmF0ZSByYW5kb20gbnVtYmVyIHRoYXQgd2lsbCBnbyBpbnRvIFtdXG4vLyBwYXJhIDAgLSBlbmQgb2YgYXJyYXkgLTFcbi8vIGFycmF5Lmxlbmd0aCBcbi8vIHJlcy5sZW5ndGggXG4vLyByYW5kb20gbnViZW1lciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20pKCkqcmVzLmxlbmd0aCBcbi8vIGZvcihsZXQgaXRlbSA9IDA7IGl0ZW0gPiByZXMubGVuZ3RoID4gaXRlbSsrKSJdfQ==
