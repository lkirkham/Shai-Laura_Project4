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
var descript15 = [];
var descriptResponse = '';

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
        return item[0][0];
      });

      //  descript15 = [];
      //   for (let i = 0;  i < responses.length; i++ ){
      //     descript15.push(response.desc);
      //   }

      descriptResponse = responses.forEach(function (response) {
        // console.log(response.desc)
        descript15.push(response.desc);
      });

      //console.log(descript15);

      // const strainsDescriptions = responses.filter((des)=>{
      //   return des.desc;
      // });
      // console.log(strainsDescription);


      // LEFT OFF HERE
      // const strainDescriptions = responses.filter(responses[item].desc) =>{
      //   console.log(strainDescriptions)
      // })
    });

    // we are calling the app.displayEffects and passing through
    // the array
    app.displayEffect(strains15, descript15);
  });
};

app.displayEffect = function (strainsArray, descArray) {
  // console.log("this is the random strains array passed into display effect " + strainsArray);
  // we created a for loop to go through the length of the array
  // create html card for each item [i]
  //console.log(`this is working ${descArray}`);
  console.log(strainsArray, descArray);
  for (var i = 0; i < descArray.length; i++) {
    // we inserted a template literal with the [i] into the card
    // displaying a differnt strain name
    $('.resultsContainer').append('<div class="card">\n  <div class="cardTop">\n  <figure></figure>\n  </div>\n  <div class="cardBottom">\n  <h3 class="strainName">' + descArray[i] + '</h3>\n  </div>\n  </div>');
  }

  for (var _i = 0; _i < strainsArray.length; _i++) {
    // we inserted a template literal with the [i] into the card
    // displaying a differnt strain name
    $('.resultsContainer').append('<div class="card">\n  <div class="cardTop">\n  <figure></figure>\n  </div>\n  <div class="cardBottom">\n  <h3 class="strainName">' + strainsArray[_i] + '</h3>\n  </div>\n  </div>');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxNQUFKLEdBQWEsaUNBQWI7QUFDQSxJQUFJLE1BQUosR0FBYSxTQUFiO0FBQ0EsSUFBSSxpQkFBSixHQUF3Qix5QkFBeEI7QUFDQSxJQUFJLGVBQUosR0FBc0IsdUJBQXRCOztBQUlBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSxZQUFZLEVBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQWpCO0FBQ0EsSUFBSSxtQkFBbUIsRUFBdkI7O0FBRUEsSUFBSSxNQUFKLEdBQWEsWUFBTTtBQUNqQixJQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsUUFBYixFQUF1QixVQUFVLENBQVYsRUFBYTtBQUNsQyxNQUFFLGNBQUY7QUFDQTtBQUNBLG9CQUFnQixFQUFFLGlCQUFGLEVBQXFCLEdBQXJCLEVBQWhCO0FBQ0E7QUFDQSxRQUFJLFNBQUosQ0FBYyxhQUFkO0FBQ0QsR0FORDtBQU9ELENBUkQ7O0FBWUEsSUFBSSxTQUFKLEdBQWdCLFVBQUMsSUFBRCxFQUFVO0FBQ3hCLE1BQUksU0FBUyxJQUFiO0FBQ0EsSUFBRSxJQUFGLENBQU87QUFDSCxjQUFRLElBQUksTUFBWixHQUFxQixJQUFJLE1BQXpCLEdBQWtDLElBQUksaUJBQXRDLEdBQTBELE1BRHZEO0FBRUgsWUFBUSxLQUZMO0FBR0gsY0FBVTtBQUhQLEdBQVAsRUFLRyxJQUxILENBS1EsVUFBQyxHQUFELEVBQVM7QUFBQTs7QUFDYixZQUFRLEdBQVIsQ0FBWSxHQUFaOztBQUVBO0FBQ0EsWUFBUSxHQUFSLG9DQUE2QyxJQUFJLE1BQWpEO0FBQ0E7QUFDQSxRQUFJLGVBQWUsS0FBSyxLQUFMLENBQVksS0FBSyxNQUFMLEtBQWdCLElBQUksTUFBckIsR0FBK0IsQ0FBMUMsQ0FBbkI7QUFDQSxZQUFRLEdBQVIsQ0FBWSxZQUFaO0FBQ0E7QUFDQSxZQUFRLEdBQVIsQ0FBWSxJQUFJLFlBQUosRUFBa0IsSUFBOUI7O0FBR0EsUUFBSSxlQUFlLElBQUksWUFBSixFQUFrQixJQUFyQzs7QUFFQSxnQkFBWSxFQUFaO0FBQ0E7QUFDQSxTQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksRUFBcEIsRUFBd0IsR0FBeEIsRUFBNkI7QUFDM0IsVUFBSSxnQkFBZSxLQUFLLEtBQUwsQ0FBWSxLQUFLLE1BQUwsS0FBZ0IsSUFBSSxNQUFyQixHQUErQixDQUExQyxDQUFuQjtBQUNBO0FBQ0EsVUFBSSxnQkFBZSxJQUFJLGFBQUosRUFBa0IsSUFBckM7QUFDQSxjQUFRLEdBQVIsQ0FBWSxhQUFaO0FBQ0EsZ0JBQVUsSUFBVixDQUFlLGFBQWY7QUFDRDtBQUNEO0FBQ0EsWUFBUSxHQUFSLENBQVksU0FBWjs7QUFFQSxRQUFNLGlCQUFpQixTQUFqQixjQUFpQixDQUFDLElBQUQsRUFBVTtBQUMvQixhQUFPLEVBQUUsSUFBRixDQUFPO0FBQ1osa0JBQVEsSUFBSSxNQUFaLEdBQXFCLElBQUksTUFBekIsR0FBa0MsSUFBSSxlQUF0QyxHQUF3RCxJQUQ1QztBQUVaO0FBQ0EsZ0JBQVEsS0FISTtBQUlaLGtCQUFVO0FBSkUsT0FBUCxDQUFQO0FBTUQsS0FQRDtBQVFBLFFBQU0sc0JBQXNCLFVBQVUsR0FBVixDQUFjLGNBQWQsQ0FBNUI7O0FBR0EsYUFBRSxJQUFGLDhCQUFVLG1CQUFWLEdBQ0csSUFESCxDQUNRLFlBQWtCO0FBQUEsd0NBQWQsU0FBYztBQUFkLGlCQUFjO0FBQUE7O0FBQ3RCLGNBQVEsR0FBUixDQUFZLFNBQVo7QUFDQSxrQkFBWSxVQUFVLEdBQVYsQ0FBYyxVQUFDLElBQUQsRUFBVTtBQUNsQyxlQUFPLEtBQUssQ0FBTCxFQUFRLENBQVIsQ0FBUDtBQUNELE9BRlcsQ0FBWjs7QUFJRjtBQUNBO0FBQ0E7QUFDQTs7QUFFRyx5QkFBbUIsVUFBVSxPQUFWLENBQWtCLFVBQUMsUUFBRCxFQUFjO0FBQ25EO0FBQ0EsbUJBQVcsSUFBWCxDQUFnQixTQUFTLElBQXpCO0FBQ0EsT0FIbUIsQ0FBbkI7O0FBS0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0QsS0E3Qkg7O0FBaUNBO0FBQ0E7QUFDQSxRQUFJLGFBQUosQ0FBa0IsU0FBbEIsRUFBNkIsVUFBN0I7QUFHRCxHQWhGSDtBQWlGRCxDQW5GRDs7QUFxRkEsSUFBSSxhQUFKLEdBQW9CLFVBQVUsWUFBVixFQUF3QixTQUF4QixFQUFtQztBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVEsR0FBUixDQUFZLFlBQVosRUFBMEIsU0FBMUI7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBVSxNQUE5QixFQUFzQyxHQUF0QyxFQUEyQztBQUN6QztBQUNBO0FBQ0EsTUFBRSxtQkFBRixFQUF1QixNQUF2Qix1SUFLdUIsVUFBVSxDQUFWLENBTHZCO0FBUUQ7O0FBSUQsT0FBSyxJQUFJLEtBQUksQ0FBYixFQUFnQixLQUFJLGFBQWEsTUFBakMsRUFBeUMsSUFBekMsRUFBOEM7QUFDNUM7QUFDQTtBQUNBLE1BQUUsbUJBQUYsRUFBdUIsTUFBdkIsdUlBS3VCLGFBQWEsRUFBYixDQUx2QjtBQVFEO0FBRUYsQ0FsQ0Q7O0FBb0NBLElBQUksSUFBSixHQUFXLFlBQVk7O0FBRXJCLE1BQUksTUFBSjtBQUVELENBSkQ7O0FBTUEsRUFBRSxZQUFZO0FBQ1osTUFBSSxJQUFKO0FBQ0QsQ0FGRDs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vdXNlciBhcnJpdmVzIG9uIHBhZ2Vcbi8vdXNlciBhc2tlZCBmb3IgdGhlaXIgbmFtZSBhbmQgYWdlLiBhZ2UgbXVzdCBiZSA+PSAxOVxuLy9pZiB1c2VyIGlzIG5vdCA+PSAgc2VydmUgdXAgYSBwYWdlIHRoYXQgc2F5cyBcIm9vcHMgeW91J3JlIHRvIHlvdW5nXCJcbi8vaWYgYWdlIHJlcXVpcmVtZW50IGlzIG1ldCwgbG9hZCBtYWluIHBhZ2Vcbi8vIG9uIG1haW4gcGFnZSB3ZSBncmVldCB0aGUgdXNlciBhbmQgcHJlc2VudCB0aGVtIHdpdGggYSBuYXR1cmFsIGxhbmd1YWdlIGZpbHRlclxuLy9uYXR1cmFsIGxhbmd1YWdlIGZpbHRlciBzYXlzIHNvbWV0aGluZyBsaWtlIFwiSSB3YW50IHRvIGZlZWwgX19fX19fX19fXCIgd2l0aCBhIGRyb3Bkb3duIG9mIHNlbGVjdGlvbnMuXG4vL29wdGlvbnMgY291bGQgaW5jbHVkZSByZWxlaWYgZnJvbSBkZXByZXNzaW9uLCBwYWluLCBhbnhpZXR5LCBldGMuIG9yIHNpbXBseSBtb29kcyBsaWtlIGhhcHB5LCByZWxheGVkLCBodW5ncnkuLi5cbi8vdXNlciBzZWxlY3RzIGFuIG9wdGlvbiBhbmQgYXJlIHNlcnZlZCBzdHJhaW5zIHRoYXQgbWF0Y2ggdGhhdCBvcHRpb24uXG4vL3N0cmFpbnMgd2lsbCBiZSBkaXNwbGF5ZWQgd2l0aCByYW5kb20gcGhvdG8gKHN0cmV0Y2ggZ29hbCBpcyB0byBoYXZlIGEgcmVhbCBvbmUpLCB0aGVpciBuYW1lLCBmbGF2b3VycywgYWxsIGVmZmVjdHMsIHJhY2UuXG4vL25hbWUgcGhvdG8gYW5kIFxuXG5jb25zdCBhcHAgPSB7fVxuYXBwLmFwaVVybCA9ICdodHRwOi8vc3RyYWluYXBpLmV2YW5idXNzZS5jb20vJ1xuYXBwLmFwaUtleSA9ICdPY25KZzhOJ1xuYXBwLnNlYXJjaFF1ZXJ5RWZmZWN0ID0gJy9zdHJhaW5zL3NlYXJjaC9lZmZlY3QvJ1xuYXBwLnNlYXJjaFF1ZXJ5TmFtZSA9ICcvc3RyYWlucy9zZWFyY2gvbmFtZS8nXG5cblxuXG5sZXQgdXNlclNlbGVjdGlvbiA9ICcnXG5sZXQgc3RyYWluczE1ID0gW107XG5sZXQgZGVzY3JpcHQxNSA9IFtdO1xubGV0IGRlc2NyaXB0UmVzcG9uc2UgPSAnJyBcblxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgJCgnZm9ybScpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAvLyBjb25zb2xlLmxvZygnZGlkIHRoaXMgd29yaz8nKTtcbiAgICB1c2VyU2VsZWN0aW9uID0gJCgnb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG4gICAgLy8gY29uc29sZS5sb2codXNlclNlbGVjdGlvbik7XG4gICAgYXBwLmdldEVmZmVjdCh1c2VyU2VsZWN0aW9uKTtcbiAgfSlcbn1cblxuXG5cbmFwcC5nZXRFZmZlY3QgPSAodXNlcikgPT4ge1xuICBsZXQgZWZmZWN0ID0gdXNlclxuICAkLmFqYXgoe1xuICAgICAgdXJsOiBgJHthcHAuYXBpVXJsfSR7YXBwLmFwaUtleX0ke2FwcC5zZWFyY2hRdWVyeUVmZmVjdH0ke2VmZmVjdH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG5cbiAgICAgIC8vZmluZCBvdXQgdGhlIG51bWJlciBvZiBzdHJhaW5zIGluIHRoZSB1c2VycyBzZWxlY3RlZCBlZmZlY3RcbiAgICAgIGNvbnNvbGUubG9nKGBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGFycmF5OiAke3Jlcy5sZW5ndGh9YCk7XG4gICAgICAvL3NlbGVjdCBhIHJhbmRvbSBudW1iZXIgZnJvbSAwIHRvIHRoZSBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGFycmF5XG4gICAgICBsZXQgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHJlcy5sZW5ndGgpICsgMSk7XG4gICAgICBjb25zb2xlLmxvZyhyYW5kb21OdW1iZXIpO1xuICAgICAgLy8gbG9nIHRoZSByYW5kb21seSBzZWxlY3RlZCBuYW1lIGluIHRoZSB1c2VycyBzZWxlY3RlZCBlZmZlY3RcbiAgICAgIGNvbnNvbGUubG9nKHJlc1tyYW5kb21OdW1iZXJdLm5hbWUpO1xuXG5cbiAgICAgIGxldCByYW5kb21TdHJhaW4gPSByZXNbcmFuZG9tTnVtYmVyXS5uYW1lO1xuXG4gICAgICBzdHJhaW5zMTUgPSBbXTtcbiAgICAgIC8vbWFrZSBhbiBhcnJheSB3aXRoIDE1IHJhbmRvbSBzdHJhaW5zIGdlbmVyYXRlZCBmcm9tIHRoZSB1c2VycyBjaG9zZW4gZWZmZWN0LlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNDsgaSsrKSB7XG4gICAgICAgIGxldCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcmVzLmxlbmd0aCkgKyAxKTtcbiAgICAgICAgLy8gbG9nIHRoZSByYW5kb21seSBzZWxlY3RlZCBuYW1lIGluIHRoZSB1c2VycyBzZWxlY3RlZCBlZmZlY3RcbiAgICAgICAgbGV0IHJhbmRvbVN0cmFpbiA9IHJlc1tyYW5kb21OdW1iZXJdLm5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHJhbmRvbVN0cmFpbik7XG4gICAgICAgIHN0cmFpbnMxNS5wdXNoKHJhbmRvbVN0cmFpbik7XG4gICAgICB9XG4gICAgICAvL3RoaXMgaXMgYSByYW5kb21seSBnZW5lcmF0ZWQgYXJyYXkgb2YgMTUgc3RyYWlucyBpbiB0aGUgdXNlcnMgY2hvc2VuIGVmZmVjdCBjYXRlZ29yeS5cbiAgICAgIGNvbnNvbGUubG9nKHN0cmFpbnMxNSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKG5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgdXJsOiBgJHthcHAuYXBpVXJsfSR7YXBwLmFwaUtleX0ke2FwcC5zZWFyY2hRdWVyeU5hbWV9JHtuYW1lfWAsXG4gICAgICAgICAgLy91cmw6ICdodHRwOi8vc3RyYWluYXBpLmV2YW5idXNzZS5jb20vT2NuSmc4Ti9zdHJhaW5zL3NlYXJjaC9uYW1lL1JveWFsJTIwS3VzaCcsXG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uUmVxdWVzdHMgPSBzdHJhaW5zMTUubWFwKGdldERlc2NyaXB0aW9uKVxuXG5cbiAgICAgICQud2hlbiguLi5kZXNjcmlwdGlvblJlcXVlc3RzKVxuICAgICAgICAudGhlbigoLi4ucmVzcG9uc2VzKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VzKTtcbiAgICAgICAgICByZXNwb25zZXMgPSByZXNwb25zZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVswXVswXSBcbiAgICAgICAgICB9KTtcblxuICAgICAgICAvLyAgZGVzY3JpcHQxNSA9IFtdO1xuICAgICAgICAvLyAgIGZvciAobGV0IGkgPSAwOyAgaSA8IHJlc3BvbnNlcy5sZW5ndGg7IGkrKyApe1xuICAgICAgICAvLyAgICAgZGVzY3JpcHQxNS5wdXNoKHJlc3BvbnNlLmRlc2MpO1xuICAgICAgICAvLyAgIH1cbiAgXG4gICAgICAgICAgIGRlc2NyaXB0UmVzcG9uc2UgPSByZXNwb25zZXMuZm9yRWFjaCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UuZGVzYylcbiAgICAgICAgICAgZGVzY3JpcHQxNS5wdXNoKHJlc3BvbnNlLmRlc2MpO1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgICAvL2NvbnNvbGUubG9nKGRlc2NyaXB0MTUpO1xuICAgICAgICAgIFxuICAgICAgICAgIC8vIGNvbnN0IHN0cmFpbnNEZXNjcmlwdGlvbnMgPSByZXNwb25zZXMuZmlsdGVyKChkZXMpPT57XG4gICAgICAgICAgLy8gICByZXR1cm4gZGVzLmRlc2M7XG4gICAgICAgICAgLy8gfSk7XG4gICAgICAgICAgLy8gY29uc29sZS5sb2coc3RyYWluc0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgICBcblxuICAgICAgICAgIC8vIExFRlQgT0ZGIEhFUkVcbiAgICAgICAgICAvLyBjb25zdCBzdHJhaW5EZXNjcmlwdGlvbnMgPSByZXNwb25zZXMuZmlsdGVyKHJlc3BvbnNlc1tpdGVtXS5kZXNjKSA9PntcbiAgICAgICAgICAvLyAgIGNvbnNvbGUubG9nKHN0cmFpbkRlc2NyaXB0aW9ucylcbiAgICAgICAgICAvLyB9KVxuICAgICAgICB9KTtcblxuXG5cbiAgICAgIC8vIHdlIGFyZSBjYWxsaW5nIHRoZSBhcHAuZGlzcGxheUVmZmVjdHMgYW5kIHBhc3NpbmcgdGhyb3VnaFxuICAgICAgLy8gdGhlIGFycmF5XG4gICAgICBhcHAuZGlzcGxheUVmZmVjdChzdHJhaW5zMTUsIGRlc2NyaXB0MTUpXG4gICAgICBcblxuICAgIH0pXG59XG5cbmFwcC5kaXNwbGF5RWZmZWN0ID0gZnVuY3Rpb24gKHN0cmFpbnNBcnJheSwgZGVzY0FycmF5KSB7XG4gIC8vIGNvbnNvbGUubG9nKFwidGhpcyBpcyB0aGUgcmFuZG9tIHN0cmFpbnMgYXJyYXkgcGFzc2VkIGludG8gZGlzcGxheSBlZmZlY3QgXCIgKyBzdHJhaW5zQXJyYXkpO1xuICAvLyB3ZSBjcmVhdGVkIGEgZm9yIGxvb3AgdG8gZ28gdGhyb3VnaCB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxuICAvLyBjcmVhdGUgaHRtbCBjYXJkIGZvciBlYWNoIGl0ZW0gW2ldXG4gIC8vY29uc29sZS5sb2coYHRoaXMgaXMgd29ya2luZyAke2Rlc2NBcnJheX1gKTtcbiAgY29uc29sZS5sb2coc3RyYWluc0FycmF5LCBkZXNjQXJyYXkpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc2NBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIC8vIHdlIGluc2VydGVkIGEgdGVtcGxhdGUgbGl0ZXJhbCB3aXRoIHRoZSBbaV0gaW50byB0aGUgY2FyZFxuICAgIC8vIGRpc3BsYXlpbmcgYSBkaWZmZXJudCBzdHJhaW4gbmFtZVxuICAgICQoJy5yZXN1bHRzQ29udGFpbmVyJykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICA8ZGl2IGNsYXNzPVwiY2FyZFRvcFwiPlxuICA8ZmlndXJlPjwvZmlndXJlPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNhcmRCb3R0b21cIj5cbiAgPGgzIGNsYXNzPVwic3RyYWluTmFtZVwiPiR7ZGVzY0FycmF5W2ldfTwvaDM+XG4gIDwvZGl2PlxuICA8L2Rpdj5gKVxuICB9XG4gIFxuICBcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmFpbnNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIC8vIHdlIGluc2VydGVkIGEgdGVtcGxhdGUgbGl0ZXJhbCB3aXRoIHRoZSBbaV0gaW50byB0aGUgY2FyZFxuICAgIC8vIGRpc3BsYXlpbmcgYSBkaWZmZXJudCBzdHJhaW4gbmFtZVxuICAgICQoJy5yZXN1bHRzQ29udGFpbmVyJykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICA8ZGl2IGNsYXNzPVwiY2FyZFRvcFwiPlxuICA8ZmlndXJlPjwvZmlndXJlPlxuICA8L2Rpdj5cbiAgPGRpdiBjbGFzcz1cImNhcmRCb3R0b21cIj5cbiAgPGgzIGNsYXNzPVwic3RyYWluTmFtZVwiPiR7c3RyYWluc0FycmF5W2ldfTwvaDM+XG4gIDwvZGl2PlxuICA8L2Rpdj5gKVxuICB9XG5cbn1cblxuYXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgYXBwLmV2ZW50cygpO1xuXG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICBhcHAuaW5pdCgpO1xufSk7XG5cblxuLy8gaW5zaWRlIHdlIHdhbnQgdG8gcHV0IGEgdmFyYXVibGUgaW5zaWRlIFtdIG9mIG91ciBhcnJheVxuLy8gdmFyaWFibGUgd2lsbCBnZW5lcmF0ZSByYW5kb20gbnVtYmVyIHRoYXQgd2lsbCBnbyBpbnRvIFtdXG4vLyBwYXJhIDAgLSBlbmQgb2YgYXJyYXkgLTFcbi8vIGFycmF5Lmxlbmd0aCBcbi8vIHJlcy5sZW5ndGggXG4vLyByYW5kb20gbnViZW1lciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20pKCkqcmVzLmxlbmd0aCBcbi8vIGZvcihsZXQgaXRlbSA9IDA7IGl0ZW0gPiByZXMubGVuZ3RoID4gaXRlbSsrKSJdfQ==
