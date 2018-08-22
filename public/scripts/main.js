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
    app.displayEffect(randomStrain);
  });
};

app.displayEffect = function (strain) {
  console.log("this is the random strain passed into display effect " + strain);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLE1BQU0sRUFBWjtBQUNFLElBQUksTUFBSixHQUFhLGlDQUFiO0FBQ0EsSUFBSSxNQUFKLEdBQWEsU0FBYjtBQUNBLElBQUksaUJBQUosR0FBd0IseUJBQXhCOztBQUVGLElBQUksZ0JBQWdCLEVBQXBCOztBQUVBLElBQUksTUFBSixHQUFhLFlBQU07QUFDbkIsSUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBUyxDQUFULEVBQVc7QUFDaEMsTUFBRSxjQUFGO0FBQ0E7QUFDQyxvQkFBZ0IsRUFBRSxpQkFBRixFQUFxQixHQUFyQixFQUFoQjtBQUNEO0FBQ0EsUUFBSSxTQUFKLENBQWMsYUFBZDtBQUNELEdBTkQ7QUFPQyxDQVJEOztBQVVBLElBQUksU0FBSixHQUFnQixVQUFDLElBQUQsRUFBUTtBQUN0QixNQUFJLFNBQVMsSUFBYjtBQUNBLElBQUUsSUFBRixDQUFPO0FBQ0wsY0FBTyxJQUFJLE1BQVgsR0FBb0IsSUFBSSxNQUF4QixHQUFpQyxJQUFJLGlCQUFyQyxHQUF5RCxNQURwRDtBQUVMLFlBQU8sS0FGRjtBQUdMLGNBQVM7QUFISixHQUFQLEVBS0MsSUFMRCxDQUtNLFVBQUMsR0FBRCxFQUFPO0FBQ1gsWUFBUSxHQUFSLENBQVksR0FBWjtBQUNBO0FBQ0EsWUFBUSxHQUFSLG9DQUE2QyxJQUFJLE1BQWpEO0FBQ0E7QUFDQSxRQUFJLGVBQWUsS0FBSyxLQUFMLENBQVksS0FBSyxNQUFMLEtBQWdCLElBQUksTUFBckIsR0FBK0IsQ0FBMUMsQ0FBbkI7QUFDQSxZQUFRLEdBQVIsQ0FBWSxZQUFaO0FBQ0E7QUFDQSxZQUFRLEdBQVIsQ0FBWSxJQUFJLFlBQUosRUFBa0IsSUFBOUI7QUFDQSxRQUFJLGVBQWUsSUFBSSxZQUFKLEVBQWtCLElBQXJDO0FBQ0EsUUFBSSxhQUFKLENBQWtCLFlBQWxCO0FBRUQsR0FqQkQ7QUFrQkQsQ0FwQkQ7O0FBc0JBLElBQUksYUFBSixHQUFvQixVQUFTLE1BQVQsRUFBZ0I7QUFDbEMsVUFBUSxHQUFSLENBQVksMERBQTBELE1BQXRFO0FBRUQsQ0FIRDs7QUFLQSxJQUFJLElBQUosR0FBVyxZQUFVOztBQUVuQixNQUFJLE1BQUo7QUFFRCxDQUpEOztBQU1BLEVBQUUsWUFBVTtBQUNWLE1BQUksSUFBSjtBQUNELENBRkQ7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL3VzZXIgYXJyaXZlcyBvbiBwYWdlXG4vL3VzZXIgYXNrZWQgZm9yIHRoZWlyIG5hbWUgYW5kIGFnZS4gYWdlIG11c3QgYmUgPj0gMTlcbi8vaWYgdXNlciBpcyBub3QgPj0gIHNlcnZlIHVwIGEgcGFnZSB0aGF0IHNheXMgXCJvb3BzIHlvdSdyZSB0byB5b3VuZ1wiXG4vL2lmIGFnZSByZXF1aXJlbWVudCBpcyBtZXQsIGxvYWQgbWFpbiBwYWdlXG4vLyBvbiBtYWluIHBhZ2Ugd2UgZ3JlZXQgdGhlIHVzZXIgYW5kIHByZXNlbnQgdGhlbSB3aXRoIGEgbmF0dXJhbCBsYW5ndWFnZSBmaWx0ZXJcbi8vbmF0dXJhbCBsYW5ndWFnZSBmaWx0ZXIgc2F5cyBzb21ldGhpbmcgbGlrZSBcIkkgd2FudCB0byBmZWVsIF9fX19fX19fX1wiIHdpdGggYSBkcm9wZG93biBvZiBzZWxlY3Rpb25zLlxuLy9vcHRpb25zIGNvdWxkIGluY2x1ZGUgcmVsZWlmIGZyb20gZGVwcmVzc2lvbiwgcGFpbiwgYW54aWV0eSwgZXRjLiBvciBzaW1wbHkgbW9vZHMgbGlrZSBoYXBweSwgcmVsYXhlZCwgaHVuZ3J5Li4uXG4vL3VzZXIgc2VsZWN0cyBhbiBvcHRpb24gYW5kIGFyZSBzZXJ2ZWQgc3RyYWlucyB0aGF0IG1hdGNoIHRoYXQgb3B0aW9uLlxuLy9zdHJhaW5zIHdpbGwgYmUgZGlzcGxheWVkIHdpdGggcmFuZG9tIHBob3RvIChzdHJldGNoIGdvYWwgaXMgdG8gaGF2ZSBhIHJlYWwgb25lKSwgdGhlaXIgbmFtZSwgZmxhdm91cnMsIGFsbCBlZmZlY3RzLCByYWNlLlxuLy9uYW1lIHBob3RvIGFuZCBcblxuY29uc3QgYXBwID0ge31cbiAgYXBwLmFwaVVybCA9ICdodHRwOi8vc3RyYWluYXBpLmV2YW5idXNzZS5jb20vJ1xuICBhcHAuYXBpS2V5ID0gJ09jbkpnOE4nXG4gIGFwcC5zZWFyY2hRdWVyeUVmZmVjdCA9ICcvc3RyYWlucy9zZWFyY2gvZWZmZWN0LydcblxubGV0IHVzZXJTZWxlY3Rpb24gPSAnJ1xuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvLyBjb25zb2xlLmxvZygnZGlkIHRoaXMgd29yaz8nKTtcbiAgIHVzZXJTZWxlY3Rpb24gPSAkKCdvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgLy8gY29uc29sZS5sb2codXNlclNlbGVjdGlvbik7XG4gIGFwcC5nZXRFZmZlY3QodXNlclNlbGVjdGlvbik7XG59KVxufVxuXG5hcHAuZ2V0RWZmZWN0ID0gKHVzZXIpPT57XG4gIGxldCBlZmZlY3QgPSB1c2VyXG4gICQuYWpheCh7XG4gICAgdXJsOmAke2FwcC5hcGlVcmx9JHthcHAuYXBpS2V5fSR7YXBwLnNlYXJjaFF1ZXJ5RWZmZWN0fSR7ZWZmZWN0fWAsXG4gICAgbWV0aG9kOidHRVQnLFxuICAgIGRhdGFUeXBlOidqc29uJ1xuICB9KVxuICAudGhlbigocmVzKT0+e1xuICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgLy9maW5kIG91dCB0aGUgbnVtYmVyIG9mIHN0cmFpbnMgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgIGNvbnNvbGUubG9nKGBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGFycmF5OiAke3Jlcy5sZW5ndGh9YCk7XG4gICAgLy9zZWxlY3QgYSByYW5kb20gbnVtYmVyIGZyb20gMCB0byB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBhcnJheVxuICAgIGxldCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcmVzLmxlbmd0aCkgKyAxKTtcbiAgICBjb25zb2xlLmxvZyhyYW5kb21OdW1iZXIpO1xuICAgIC8vIGxvZyB0aGUgcmFuZG9tbHkgc2VsZWN0ZWQgbmFtZSBpbiB0aGUgdXNlcnMgc2VsZWN0ZWQgZWZmZWN0XG4gICAgY29uc29sZS5sb2cocmVzW3JhbmRvbU51bWJlcl0ubmFtZSk7XG4gICAgbGV0IHJhbmRvbVN0cmFpbiA9IHJlc1tyYW5kb21OdW1iZXJdLm5hbWU7XG4gICAgYXBwLmRpc3BsYXlFZmZlY3QocmFuZG9tU3RyYWluKVxuXG4gIH0pXG59XG5cbmFwcC5kaXNwbGF5RWZmZWN0ID0gZnVuY3Rpb24oc3RyYWluKXtcbiAgY29uc29sZS5sb2coXCJ0aGlzIGlzIHRoZSByYW5kb20gc3RyYWluIHBhc3NlZCBpbnRvIGRpc3BsYXkgZWZmZWN0IFwiICsgc3RyYWluKTtcbiAgXG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24oKXtcbiAgXG4gIGFwcC5ldmVudHMoKTtcbiAgXG59XG5cbiQoZnVuY3Rpb24oKXtcbiAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vIGluc2lkZSB3ZSB3YW50IHRvIHB1dCBhIHZhcmF1YmxlIGluc2lkZSBbXSBvZiBvdXIgYXJyYXlcbi8vIHZhcmlhYmxlIHdpbGwgZ2VuZXJhdGUgcmFuZG9tIG51bWJlciB0aGF0IHdpbGwgZ28gaW50byBbXVxuLy8gcGFyYSAwIC0gZW5kIG9mIGFycmF5IC0xXG4vLyBhcnJheS5sZW5ndGggXG4vLyByZXMubGVuZ3RoIFxuLy8gcmFuZG9tIG51YmVtZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKSgpKnJlcy5sZW5ndGggXG4vLyBmb3IobGV0IGl0ZW0gPSAwOyBpdGVtID4gcmVzLmxlbmd0aCA+IGl0ZW0rKykiXX0=
