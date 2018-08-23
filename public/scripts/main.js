(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

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
app.searchQueryName = '/strains/search/name/';

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
    var _$;

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
    //this is a randomly generated array of 15 strains in the users chosen effect category.
    console.log(strains15);

    var getDescription = function getDescription(name) {
      return $.ajax({
        url: '' + app.apiUrl + app.apiKey + app.searchQueryName + name,
        //url: 'http://strainapi.evanbusse.com/OcnJg8N/strains/search/name/Royal%20Kush',
        method: 'GET',
        dataType: 'json'
      });
    };
    var descriptionRequests = strains15.map(getDescription);

    (_$ = $).when.apply(_$, _toConsumableArray(descriptionRequests)).then(function () {
      for (var _len = arguments.length, responses = Array(_len), _key = 0; _key < _len; _key++) {
        responses[_key] = arguments[_key];
      }

      console.log(responses);
      responses = responses.map(function (item) {
        return item[0];
      });
      console.log(responses);

      //LEFT OFF HERE
      // const strainDescriptions = responses[0].filter((desc) =>{
      //   console.log(strainDescriptions)
      // })
    });

    // we are calling the app.displayEffects and passing through
    // the array
    app.displayEffect(strains15);
  });
};

app.displayEffect = function (strainsArray) {
  // console.log("this is the random strains array passed into display effect " + strainsArray);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxNQUFKLEdBQWEsaUNBQWI7QUFDQSxJQUFJLE1BQUosR0FBYSxTQUFiO0FBQ0EsSUFBSSxpQkFBSixHQUF3Qix5QkFBeEI7QUFDQSxJQUFJLGVBQUosR0FBc0IsdUJBQXRCOztBQUlBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSxZQUFZLEVBQWhCOztBQUVBLElBQUksTUFBSixHQUFhLFlBQU07QUFDakIsSUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBVSxDQUFWLEVBQWE7QUFDbEMsTUFBRSxjQUFGO0FBQ0E7QUFDQSxvQkFBZ0IsRUFBRSxpQkFBRixFQUFxQixHQUFyQixFQUFoQjtBQUNBO0FBQ0EsUUFBSSxTQUFKLENBQWMsYUFBZDtBQUNELEdBTkQ7QUFPRCxDQVJEOztBQVlBLElBQUksU0FBSixHQUFnQixVQUFDLElBQUQsRUFBVTtBQUN4QixNQUFJLFNBQVMsSUFBYjtBQUNBLElBQUUsSUFBRixDQUFPO0FBQ0gsY0FBUSxJQUFJLE1BQVosR0FBcUIsSUFBSSxNQUF6QixHQUFrQyxJQUFJLGlCQUF0QyxHQUEwRCxNQUR2RDtBQUVILFlBQVEsS0FGTDtBQUdILGNBQVU7QUFIUCxHQUFQLEVBS0csSUFMSCxDQUtRLFVBQUMsR0FBRCxFQUFTO0FBQUE7O0FBQ2IsWUFBUSxHQUFSLENBQVksR0FBWjs7QUFFQTtBQUNBLFlBQVEsR0FBUixvQ0FBNkMsSUFBSSxNQUFqRDtBQUNBO0FBQ0EsUUFBSSxlQUFlLEtBQUssS0FBTCxDQUFZLEtBQUssTUFBTCxLQUFnQixJQUFJLE1BQXJCLEdBQStCLENBQTFDLENBQW5CO0FBQ0EsWUFBUSxHQUFSLENBQVksWUFBWjtBQUNBO0FBQ0EsWUFBUSxHQUFSLENBQVksSUFBSSxZQUFKLEVBQWtCLElBQTlCOztBQUdBLFFBQUksZUFBZSxJQUFJLFlBQUosRUFBa0IsSUFBckM7O0FBRUEsZ0JBQVksRUFBWjtBQUNBO0FBQ0EsU0FBSyxJQUFJLElBQUksQ0FBYixFQUFnQixJQUFJLEVBQXBCLEVBQXdCLEdBQXhCLEVBQTZCO0FBQzNCLFVBQUksZ0JBQWUsS0FBSyxLQUFMLENBQVksS0FBSyxNQUFMLEtBQWdCLElBQUksTUFBckIsR0FBK0IsQ0FBMUMsQ0FBbkI7QUFDQTtBQUNBLFVBQUksZ0JBQWUsSUFBSSxhQUFKLEVBQWtCLElBQXJDO0FBQ0EsY0FBUSxHQUFSLENBQVksYUFBWjtBQUNBLGdCQUFVLElBQVYsQ0FBZSxhQUFmO0FBQ0Q7QUFDRDtBQUNBLFlBQVEsR0FBUixDQUFZLFNBQVo7O0FBRUEsUUFBTSxpQkFBaUIsU0FBakIsY0FBaUIsQ0FBQyxJQUFELEVBQVU7QUFDL0IsYUFBTyxFQUFFLElBQUYsQ0FBTztBQUNaLGtCQUFRLElBQUksTUFBWixHQUFxQixJQUFJLE1BQXpCLEdBQWtDLElBQUksZUFBdEMsR0FBd0QsSUFENUM7QUFFWjtBQUNBLGdCQUFRLEtBSEk7QUFJWixrQkFBVTtBQUpFLE9BQVAsQ0FBUDtBQU1ELEtBUEQ7QUFRQSxRQUFNLHNCQUFzQixVQUFVLEdBQVYsQ0FBYyxjQUFkLENBQTVCOztBQUdBLGFBQUUsSUFBRiw4QkFBVSxtQkFBVixHQUNHLElBREgsQ0FDUSxZQUFrQjtBQUFBLHdDQUFkLFNBQWM7QUFBZCxpQkFBYztBQUFBOztBQUN0QixjQUFRLEdBQVIsQ0FBWSxTQUFaO0FBQ0Esa0JBQVksVUFBVSxHQUFWLENBQWMsVUFBQyxJQUFELEVBQVU7QUFDbEMsZUFBTyxLQUFLLENBQUwsQ0FBUDtBQUNELE9BRlcsQ0FBWjtBQUdBLGNBQVEsR0FBUixDQUFZLFNBQVo7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDRCxLQVpIOztBQWdCQTtBQUNBO0FBQ0EsUUFBSSxhQUFKLENBQWtCLFNBQWxCO0FBRUQsR0E5REg7QUErREQsQ0FqRUQ7O0FBbUVBLElBQUksYUFBSixHQUFvQixVQUFVLFlBQVYsRUFBd0I7QUFDMUM7QUFDQTtBQUNBOztBQUVBLE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxhQUFhLE1BQWpDLEVBQXlDLEdBQXpDLEVBQThDO0FBQzVDO0FBQ0E7QUFDQSxNQUFFLG1CQUFGLEVBQXVCLE1BQXZCLHVJQUt1QixhQUFhLENBQWIsQ0FMdkI7QUFRRDtBQUVGLENBbEJEOztBQW9CQSxJQUFJLElBQUosR0FBVyxZQUFZOztBQUVyQixNQUFJLE1BQUo7QUFFRCxDQUpEOztBQU1BLEVBQUUsWUFBWTtBQUNaLE1BQUksSUFBSjtBQUNELENBRkQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL3VzZXIgYXJyaXZlcyBvbiBwYWdlXG4vL3VzZXIgYXNrZWQgZm9yIHRoZWlyIG5hbWUgYW5kIGFnZS4gYWdlIG11c3QgYmUgPj0gMTlcbi8vaWYgdXNlciBpcyBub3QgPj0gIHNlcnZlIHVwIGEgcGFnZSB0aGF0IHNheXMgXCJvb3BzIHlvdSdyZSB0byB5b3VuZ1wiXG4vL2lmIGFnZSByZXF1aXJlbWVudCBpcyBtZXQsIGxvYWQgbWFpbiBwYWdlXG4vLyBvbiBtYWluIHBhZ2Ugd2UgZ3JlZXQgdGhlIHVzZXIgYW5kIHByZXNlbnQgdGhlbSB3aXRoIGEgbmF0dXJhbCBsYW5ndWFnZSBmaWx0ZXJcbi8vbmF0dXJhbCBsYW5ndWFnZSBmaWx0ZXIgc2F5cyBzb21ldGhpbmcgbGlrZSBcIkkgd2FudCB0byBmZWVsIF9fX19fX19fX1wiIHdpdGggYSBkcm9wZG93biBvZiBzZWxlY3Rpb25zLlxuLy9vcHRpb25zIGNvdWxkIGluY2x1ZGUgcmVsZWlmIGZyb20gZGVwcmVzc2lvbiwgcGFpbiwgYW54aWV0eSwgZXRjLiBvciBzaW1wbHkgbW9vZHMgbGlrZSBoYXBweSwgcmVsYXhlZCwgaHVuZ3J5Li4uXG4vL3VzZXIgc2VsZWN0cyBhbiBvcHRpb24gYW5kIGFyZSBzZXJ2ZWQgc3RyYWlucyB0aGF0IG1hdGNoIHRoYXQgb3B0aW9uLlxuLy9zdHJhaW5zIHdpbGwgYmUgZGlzcGxheWVkIHdpdGggcmFuZG9tIHBob3RvIChzdHJldGNoIGdvYWwgaXMgdG8gaGF2ZSBhIHJlYWwgb25lKSwgdGhlaXIgbmFtZSwgZmxhdm91cnMsIGFsbCBlZmZlY3RzLCByYWNlLlxuLy9uYW1lIHBob3RvIGFuZCBcblxuY29uc3QgYXBwID0ge31cbmFwcC5hcGlVcmwgPSAnaHR0cDovL3N0cmFpbmFwaS5ldmFuYnVzc2UuY29tLydcbmFwcC5hcGlLZXkgPSAnT2NuSmc4TidcbmFwcC5zZWFyY2hRdWVyeUVmZmVjdCA9ICcvc3RyYWlucy9zZWFyY2gvZWZmZWN0LydcbmFwcC5zZWFyY2hRdWVyeU5hbWUgPSAnL3N0cmFpbnMvc2VhcmNoL25hbWUvJ1xuXG5cblxubGV0IHVzZXJTZWxlY3Rpb24gPSAnJ1xubGV0IHN0cmFpbnMxNSA9IFtdO1xuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAkKCdmb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIC8vIGNvbnNvbGUubG9nKCdkaWQgdGhpcyB3b3JrPycpO1xuICAgIHVzZXJTZWxlY3Rpb24gPSAkKCdvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VyU2VsZWN0aW9uKTtcbiAgICBhcHAuZ2V0RWZmZWN0KHVzZXJTZWxlY3Rpb24pO1xuICB9KVxufVxuXG5cblxuYXBwLmdldEVmZmVjdCA9ICh1c2VyKSA9PiB7XG4gIGxldCBlZmZlY3QgPSB1c2VyXG4gICQuYWpheCh7XG4gICAgICB1cmw6IGAke2FwcC5hcGlVcmx9JHthcHAuYXBpS2V5fSR7YXBwLnNlYXJjaFF1ZXJ5RWZmZWN0fSR7ZWZmZWN0fWAsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcblxuICAgICAgLy9maW5kIG91dCB0aGUgbnVtYmVyIG9mIHN0cmFpbnMgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgY29uc29sZS5sb2coYG51bWJlciBvZiBpdGVtcyBpbiB0aGUgYXJyYXk6ICR7cmVzLmxlbmd0aH1gKTtcbiAgICAgIC8vc2VsZWN0IGEgcmFuZG9tIG51bWJlciBmcm9tIDAgdG8gdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgYXJyYXlcbiAgICAgIGxldCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcmVzLmxlbmd0aCkgKyAxKTtcbiAgICAgIGNvbnNvbGUubG9nKHJhbmRvbU51bWJlcik7XG4gICAgICAvLyBsb2cgdGhlIHJhbmRvbWx5IHNlbGVjdGVkIG5hbWUgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgY29uc29sZS5sb2cocmVzW3JhbmRvbU51bWJlcl0ubmFtZSk7XG5cblxuICAgICAgbGV0IHJhbmRvbVN0cmFpbiA9IHJlc1tyYW5kb21OdW1iZXJdLm5hbWU7XG5cbiAgICAgIHN0cmFpbnMxNSA9IFtdO1xuICAgICAgLy9tYWtlIGFuIGFycmF5IHdpdGggMTUgcmFuZG9tIHN0cmFpbnMgZ2VuZXJhdGVkIGZyb20gdGhlIHVzZXJzIGNob3NlbiBlZmZlY3QuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcbiAgICAgICAgbGV0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiByZXMubGVuZ3RoKSArIDEpO1xuICAgICAgICAvLyBsb2cgdGhlIHJhbmRvbWx5IHNlbGVjdGVkIG5hbWUgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgICBsZXQgcmFuZG9tU3RyYWluID0gcmVzW3JhbmRvbU51bWJlcl0ubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2cocmFuZG9tU3RyYWluKTtcbiAgICAgICAgc3RyYWluczE1LnB1c2gocmFuZG9tU3RyYWluKTtcbiAgICAgIH1cbiAgICAgIC8vdGhpcyBpcyBhIHJhbmRvbWx5IGdlbmVyYXRlZCBhcnJheSBvZiAxNSBzdHJhaW5zIGluIHRoZSB1c2VycyBjaG9zZW4gZWZmZWN0IGNhdGVnb3J5LlxuICAgICAgY29uc29sZS5sb2coc3RyYWluczE1KTtcbiAgICAgIFxuICAgICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAobmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICB1cmw6IGAke2FwcC5hcGlVcmx9JHthcHAuYXBpS2V5fSR7YXBwLnNlYXJjaFF1ZXJ5TmFtZX0ke25hbWV9YCxcbiAgICAgICAgICAvL3VybDogJ2h0dHA6Ly9zdHJhaW5hcGkuZXZhbmJ1c3NlLmNvbS9PY25KZzhOL3N0cmFpbnMvc2VhcmNoL25hbWUvUm95YWwlMjBLdXNoJyxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgY29uc3QgZGVzY3JpcHRpb25SZXF1ZXN0cyA9IHN0cmFpbnMxNS5tYXAoZ2V0RGVzY3JpcHRpb24pXG5cblxuICAgICAgJC53aGVuKC4uLmRlc2NyaXB0aW9uUmVxdWVzdHMpXG4gICAgICAgIC50aGVuKCguLi5yZXNwb25zZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZXMpO1xuICAgICAgICAgIHJlc3BvbnNlcyA9IHJlc3BvbnNlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtWzBdXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VzKVxuXG4gICAgICAgICAgLy9MRUZUIE9GRiBIRVJFXG4gICAgICAgICAgLy8gY29uc3Qgc3RyYWluRGVzY3JpcHRpb25zID0gcmVzcG9uc2VzWzBdLmZpbHRlcigoZGVzYykgPT57XG4gICAgICAgICAgLy8gICBjb25zb2xlLmxvZyhzdHJhaW5EZXNjcmlwdGlvbnMpXG4gICAgICAgICAgLy8gfSlcbiAgICAgICAgfSk7XG5cblxuXG4gICAgICAvLyB3ZSBhcmUgY2FsbGluZyB0aGUgYXBwLmRpc3BsYXlFZmZlY3RzIGFuZCBwYXNzaW5nIHRocm91Z2hcbiAgICAgIC8vIHRoZSBhcnJheVxuICAgICAgYXBwLmRpc3BsYXlFZmZlY3Qoc3RyYWluczE1KVxuXG4gICAgfSlcbn1cblxuYXBwLmRpc3BsYXlFZmZlY3QgPSBmdW5jdGlvbiAoc3RyYWluc0FycmF5KSB7XG4gIC8vIGNvbnNvbGUubG9nKFwidGhpcyBpcyB0aGUgcmFuZG9tIHN0cmFpbnMgYXJyYXkgcGFzc2VkIGludG8gZGlzcGxheSBlZmZlY3QgXCIgKyBzdHJhaW5zQXJyYXkpO1xuICAvLyB3ZSBjcmVhdGVkIGEgZm9yIGxvb3AgdG8gZ28gdGhyb3VnaCB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxuICAvLyBjcmVhdGUgaHRtbCBjYXJkIGZvciBlYWNoIGl0ZW0gW2ldXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJhaW5zQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAvLyB3ZSBpbnNlcnRlZCBhIHRlbXBsYXRlIGxpdGVyYWwgd2l0aCB0aGUgW2ldIGludG8gdGhlIGNhcmRcbiAgICAvLyBkaXNwbGF5aW5nIGEgZGlmZmVybnQgc3RyYWluIG5hbWVcbiAgICAkKCcucmVzdWx0c0NvbnRhaW5lcicpLmFwcGVuZChgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgPGRpdiBjbGFzcz1cImNhcmRUb3BcIj5cbiAgPGZpZ3VyZT48L2ZpZ3VyZT5cbiAgPC9kaXY+XG4gIDxkaXYgY2xhc3M9XCJjYXJkQm90dG9tXCI+XG4gIDxoMyBjbGFzcz1cInN0cmFpbk5hbWVcIj4ke3N0cmFpbnNBcnJheVtpXX08L2gzPlxuICA8L2Rpdj5cbiAgPC9kaXY+YClcbiAgfVxuXG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gIGFwcC5ldmVudHMoKTtcblxufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vIGluc2lkZSB3ZSB3YW50IHRvIHB1dCBhIHZhcmF1YmxlIGluc2lkZSBbXSBvZiBvdXIgYXJyYXlcbi8vIHZhcmlhYmxlIHdpbGwgZ2VuZXJhdGUgcmFuZG9tIG51bWJlciB0aGF0IHdpbGwgZ28gaW50byBbXVxuLy8gcGFyYSAwIC0gZW5kIG9mIGFycmF5IC0xXG4vLyBhcnJheS5sZW5ndGggXG4vLyByZXMubGVuZ3RoIFxuLy8gcmFuZG9tIG51YmVtZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKSgpKnJlcy5sZW5ndGggXG4vLyBmb3IobGV0IGl0ZW0gPSAwOyBpdGVtID4gcmVzLmxlbmd0aCA+IGl0ZW0rKykiXX0=
