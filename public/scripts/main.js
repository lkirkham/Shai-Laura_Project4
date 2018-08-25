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
  $('li').on('click', function (e) {
    e.preventDefault();
    //TRIAL
    $('.effects .selected').removeClass('selected');
    $('.effects label').attr('value', $(this).attr('value'));

    if ($(this).is('#clear')) {
      $('.effects label').text($(this).attr('value'));
    } else {
      $(this).addClass('selected');
      $('.effects label').text($(this).text());
    }
    //TRIAL
    // console.log('did this work?');
    userSelection = $(this).attr('value');
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

      descriptResponse = responses.forEach(function (response) {
        // console.log(response.desc)
        descript15.push(response.desc);
      });

      app.displayEffect(strains15, descript15);
    });
  });
};

app.displayEffect = function (strainsArray, descArray) {
  // console.log("this is the random strains array passed into display effect " + strainsArray);
  // we created a for loop to go through the length of the array
  // create html card for each item [i]
  //console.log(`this is working ${descArray}`);
  console.log(strainsArray, descArray);

  var _loop = function _loop(i) {
    // we inserted a template literal with the [i] into the card
    // displaying a differnt strain name
    $('.resultsContainer').append('<div class="card">\n    <div class="cardTop">\n    <figure class="cardImage"><img src="assets/leaf.png" alt="cannabis leaf"></figure>\n    </div>\n    <div class="cardBottom">\n    <h3 class="strainName">' + strainsArray[i] + '</h3>\n    <div class="expand"><a><i class = "fas fa-plus-circle"></i></a></div>\n    </div>\n    </div>');

    var i = 1;
    $('.card').each(function () {
      $(this).addClass('myclass' + i);
      i++;
    });

    var s = 1;
    $('.expand').each(function () {
      $(this).addClass('toggle' + s);
      s++;
    });
  };

  for (var i = 0; i < strainsArray.length; i++) {
    _loop(i);
  }
  // we inserted a template literal with the [i] into the card
  // displaying a differnt strain name


  var j = 1;
  for (var i = 0; i < descArray.length; i++) {
    // we inserted a template literal with the [i] into the card
    // displaying a differnt strain name

    $('.myclass' + j).append('\n    <div class="cardDescr">\n    <p>' + descArray[i] + '</p>\n    </div>');
    j++;

    $('.cardDescr').hide();

    $('.fa-plus-circle').on('click', function () {
      console.log("clicked");
      $('.cardDescr').slideDown();
      //$('.cardDescr').slideUp();
    });

    $('.expand').on('click', function () {
      console.log('test');

      $('.cardDescr').hide();
    });
  }
};

app.init = function () {
  app.events();
};

$(function () {
  app.init();
});

// TRIAL
// $(".effects li").click(function () {
//   $(".effects .selected").removeClass('selected');
//   $(".effects label").attr('value', $(this).attr('value'));
//   if ($(this).is("#clear")) {
//     $(".effects label").text($(this).attr('value'));
//   } else {
//     $(this).addClass('selected');
//     $(".effects label").text($(this).text());
//   }
// });


// TRIAL

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxNQUFKLEdBQWEsaUNBQWI7QUFDQSxJQUFJLE1BQUosR0FBYSxTQUFiO0FBQ0EsSUFBSSxpQkFBSixHQUF3Qix5QkFBeEI7QUFDQSxJQUFJLGVBQUosR0FBc0IsdUJBQXRCOztBQUVBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSxZQUFZLEVBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQWpCO0FBQ0EsSUFBSSxtQkFBbUIsRUFBdkI7O0FBR0EsSUFBSSxNQUFKLEdBQWEsWUFBTTtBQUNqQixJQUFFLElBQUYsRUFBUSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFVLENBQVYsRUFBYTtBQUMvQixNQUFFLGNBQUY7QUFDSjtBQUNJLE1BQUUsb0JBQUYsRUFBd0IsV0FBeEIsQ0FBb0MsVUFBcEM7QUFDQSxNQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxPQUFiLENBQWxDOztBQUlBLFFBQUksRUFBRSxJQUFGLEVBQVEsRUFBUixDQUFXLFFBQVgsQ0FBSixFQUEwQjtBQUN4QixRQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxPQUFiLENBQXpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsUUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixVQUFqQjtBQUNBLFFBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsRUFBRSxJQUFGLEVBQVEsSUFBUixFQUF6QjtBQUNEO0FBQ0w7QUFDSTtBQUNBLG9CQUFnQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEs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QzVCLFFBQUUsSUFBRixFQUFRLFFBQVIsQ0FBaUIsV0FBVyxDQUE1QjtBQUNBO0FBQ0QsS0FIRDtBQTNCbUQ7O0FBT3JELE9BQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxhQUFhLE1BQWpDLEVBQXlDLEdBQXpDLEVBQThDO0FBQUEsVUFBckMsQ0FBcUM7QUEwQjdDO0FBQ0M7QUFDQTs7O0FBR0EsTUFBSSxJQUFJLENBQVI7QUFDQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksVUFBVSxNQUE5QixFQUFzQyxHQUF0QyxFQUEyQztBQUN6QztBQUNBOztBQUVBLE1BQUUsYUFBYSxDQUFmLEVBQWtCLE1BQWxCLDRDQUVHLFVBQVUsQ0FBVixDQUZIO0FBSUE7O0FBSUEsTUFBRSxZQUFGLEVBQWdCLElBQWhCOztBQUVBLE1BQUUsaUJBQUYsRUFBcUIsRUFBckIsQ0FBd0IsT0FBeEIsRUFBaUMsWUFBVTtBQUN6QyxjQUFRLEdBQVIsQ0FBWSxTQUFaO0FBQ0EsUUFBRSxZQUFGLEVBQWdCLFNBQWhCO0FBQ0E7QUFDRCxLQUpEOztBQU9BLE1BQUUsU0FBRixFQUFhLEVBQWIsQ0FBZ0IsT0FBaEIsRUFBeUIsWUFBVTtBQUMvQixjQUFRLEdBQVIsQ0FBWSxNQUFaOztBQUVBLFFBQUUsWUFBRixFQUFnQixJQUFoQjtBQUNILEtBSkQ7QUFLRDtBQUVKLENBbkVEOztBQXdFQSxJQUFJLElBQUosR0FBVyxZQUFZO0FBQ3JCLE1BQUksTUFBSjtBQUNELENBRkQ7O0FBS0EsRUFBRSxZQUFZO0FBQ1osTUFBSSxJQUFKO0FBQ0QsQ0FGRDs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vdXNlciBhcnJpdmVzIG9uIHBhZ2Vcbi8vdXNlciBhc2tlZCBmb3IgdGhlaXIgbmFtZSBhbmQgYWdlLiBhZ2UgbXVzdCBiZSA+PSAxOVxuLy9pZiB1c2VyIGlzIG5vdCA+PSAgc2VydmUgdXAgYSBwYWdlIHRoYXQgc2F5cyBcIm9vcHMgeW91J3JlIHRvIHlvdW5nXCJcbi8vaWYgYWdlIHJlcXVpcmVtZW50IGlzIG1ldCwgbG9hZCBtYWluIHBhZ2Vcbi8vIG9uIG1haW4gcGFnZSB3ZSBncmVldCB0aGUgdXNlciBhbmQgcHJlc2VudCB0aGVtIHdpdGggYSBuYXR1cmFsIGxhbmd1YWdlIGZpbHRlclxuLy9uYXR1cmFsIGxhbmd1YWdlIGZpbHRlciBzYXlzIHNvbWV0aGluZyBsaWtlIFwiSSB3YW50IHRvIGZlZWwgX19fX19fX19fXCIgd2l0aCBhIGRyb3Bkb3duIG9mIHNlbGVjdGlvbnMuXG4vL29wdGlvbnMgY291bGQgaW5jbHVkZSByZWxlaWYgZnJvbSBkZXByZXNzaW9uLCBwYWluLCBhbnhpZXR5LCBldGMuIG9yIHNpbXBseSBtb29kcyBsaWtlIGhhcHB5LCByZWxheGVkLCBodW5ncnkuLi5cbi8vdXNlciBzZWxlY3RzIGFuIG9wdGlvbiBhbmQgYXJlIHNlcnZlZCBzdHJhaW5zIHRoYXQgbWF0Y2ggdGhhdCBvcHRpb24uXG4vL3N0cmFpbnMgd2lsbCBiZSBkaXNwbGF5ZWQgd2l0aCByYW5kb20gcGhvdG8gKHN0cmV0Y2ggZ29hbCBpcyB0byBoYXZlIGEgcmVhbCBvbmUpLCB0aGVpciBuYW1lLCBmbGF2b3VycywgYWxsIGVmZmVjdHMsIHJhY2UuXG4vL25hbWUgcGhvdG8gYW5kIFxuXG5jb25zdCBhcHAgPSB7fVxuYXBwLmFwaVVybCA9ICdodHRwOi8vc3RyYWluYXBpLmV2YW5idXNzZS5jb20vJ1xuYXBwLmFwaUtleSA9ICdPY25KZzhOJ1xuYXBwLnNlYXJjaFF1ZXJ5RWZmZWN0ID0gJy9zdHJhaW5zL3NlYXJjaC9lZmZlY3QvJ1xuYXBwLnNlYXJjaFF1ZXJ5TmFtZSA9ICcvc3RyYWlucy9zZWFyY2gvbmFtZS8nXG5cbmxldCB1c2VyU2VsZWN0aW9uID0gJydcbmxldCBzdHJhaW5zMTUgPSBbXTtcbmxldCBkZXNjcmlwdDE1ID0gW107XG5sZXQgZGVzY3JpcHRSZXNwb25zZSA9ICcnXG5cblxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiAgJCgnbGknKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbi8vVFJJQUxcbiAgICAkKCcuZWZmZWN0cyAuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAkKCcuZWZmZWN0cyBsYWJlbCcpLmF0dHIoJ3ZhbHVlJywgJCh0aGlzKS5hdHRyKCd2YWx1ZScpKTtcblxuICAgXG4gICAgXG4gICAgaWYgKCQodGhpcykuaXMoJyNjbGVhcicpKSB7XG4gICAgICAkKCcuZWZmZWN0cyBsYWJlbCcpLnRleHQoJCh0aGlzKS5hdHRyKCd2YWx1ZScpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICQoJy5lZmZlY3RzIGxhYmVsJykudGV4dCgkKHRoaXMpLnRleHQoKSk7XG4gICAgfVxuLy9UUklBTFxuICAgIC8vIGNvbnNvbGUubG9nKCdkaWQgdGhpcyB3b3JrPycpO1xuICAgIHVzZXJTZWxlY3Rpb24gPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XG4gICAgLy8gY29uc29sZS5sb2codXNlclNlbGVjdGlvbik7XG4gICAgYXBwLmdldEVmZmVjdCh1c2VyU2VsZWN0aW9uKTtcbiAgfSlcbn1cblxuXG5hcHAuZ2V0RWZmZWN0ID0gKHVzZXIpID0+IHtcbiAgbGV0IGVmZmVjdCA9IHVzZXJcbiAgJC5hamF4KHtcbiAgICAgIHVybDogYCR7YXBwLmFwaVVybH0ke2FwcC5hcGlLZXl9JHthcHAuc2VhcmNoUXVlcnlFZmZlY3R9JHtlZmZlY3R9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgLy9maW5kIG91dCB0aGUgbnVtYmVyIG9mIHN0cmFpbnMgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgY29uc29sZS5sb2coYG51bWJlciBvZiBpdGVtcyBpbiB0aGUgYXJyYXk6ICR7cmVzLmxlbmd0aH1gKTtcbiAgICAgIC8vc2VsZWN0IGEgcmFuZG9tIG51bWJlciBmcm9tIDAgdG8gdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgYXJyYXlcbiAgICAgIGxldCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcmVzLmxlbmd0aCkgKyAxKTtcbiAgICAgIGNvbnNvbGUubG9nKHJhbmRvbU51bWJlcik7XG4gICAgICAvLyBsb2cgdGhlIHJhbmRvbWx5IHNlbGVjdGVkIG5hbWUgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgY29uc29sZS5sb2cocmVzW3JhbmRvbU51bWJlcl0ubmFtZSk7XG5cbiAgICAgIGxldCByYW5kb21TdHJhaW4gPSByZXNbcmFuZG9tTnVtYmVyXS5uYW1lO1xuICAgICAgc3RyYWluczE1ID0gW107XG4gICAgICAvL21ha2UgYW4gYXJyYXkgd2l0aCAxNSByYW5kb20gc3RyYWlucyBnZW5lcmF0ZWQgZnJvbSB0aGUgdXNlcnMgY2hvc2VuIGVmZmVjdC5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTQ7IGkrKykge1xuICAgICAgICBsZXQgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHJlcy5sZW5ndGgpICsgMSk7XG4gICAgICAgIC8vIGxvZyB0aGUgcmFuZG9tbHkgc2VsZWN0ZWQgbmFtZSBpbiB0aGUgdXNlcnMgc2VsZWN0ZWQgZWZmZWN0XG4gICAgICAgIGxldCByYW5kb21TdHJhaW4gPSByZXNbcmFuZG9tTnVtYmVyXS5uYW1lO1xuICAgICAgICBjb25zb2xlLmxvZyhyYW5kb21TdHJhaW4pO1xuICAgICAgICBzdHJhaW5zMTUucHVzaChyYW5kb21TdHJhaW4pO1xuICAgICAgfVxuXG4gICAgICAvL3RoaXMgaXMgYSByYW5kb21seSBnZW5lcmF0ZWQgYXJyYXkgb2YgMTUgc3RyYWlucyBpbiB0aGUgdXNlcnMgY2hvc2VuIGVmZmVjdCBjYXRlZ29yeS5cbiAgICAgIGNvbnNvbGUubG9nKHN0cmFpbnMxNSk7XG5cblxuICAgICAgY29uc3QgZ2V0RGVzY3JpcHRpb24gPSAobmFtZSkgPT4ge1xuICAgICAgICByZXR1cm4gJC5hamF4KHtcbiAgICAgICAgICB1cmw6IGAke2FwcC5hcGlVcmx9JHthcHAuYXBpS2V5fSR7YXBwLnNlYXJjaFF1ZXJ5TmFtZX0ke25hbWV9YCxcbiAgICAgICAgICAvL3VybDogJ2h0dHA6Ly9zdHJhaW5hcGkuZXZhbmJ1c3NlLmNvbS9PY25KZzhOL3N0cmFpbnMvc2VhcmNoL25hbWUvUm95YWwlMjBLdXNoJyxcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkZXNjcmlwdGlvblJlcXVlc3RzID0gc3RyYWluczE1Lm1hcChnZXREZXNjcmlwdGlvbilcbiAgICAgICQud2hlbiguLi5kZXNjcmlwdGlvblJlcXVlc3RzKVxuICAgICAgICAudGhlbigoLi4ucmVzcG9uc2VzKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2cocmVzcG9uc2VzKTtcbiAgICAgICAgICByZXNwb25zZXMgPSByZXNwb25zZXMubWFwKChpdGVtKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbVswXVswXVxuICAgICAgICAgIH0pO1xuXG5cblxuICAgICAgICAgIGRlc2NyaXB0UmVzcG9uc2UgPSByZXNwb25zZXMuZm9yRWFjaCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRlc2MpXG4gICAgICAgICAgICBkZXNjcmlwdDE1LnB1c2gocmVzcG9uc2UuZGVzYyk7XG4gICAgICAgICAgfSlcblxuXG4gICAgICAgICAgYXBwLmRpc3BsYXlFZmZlY3Qoc3RyYWluczE1LCBkZXNjcmlwdDE1KVxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gIH1cblxuXG5cbmFwcC5kaXNwbGF5RWZmZWN0ID0gZnVuY3Rpb24gKHN0cmFpbnNBcnJheSwgZGVzY0FycmF5KSB7XG4gIC8vIGNvbnNvbGUubG9nKFwidGhpcyBpcyB0aGUgcmFuZG9tIHN0cmFpbnMgYXJyYXkgcGFzc2VkIGludG8gZGlzcGxheSBlZmZlY3QgXCIgKyBzdHJhaW5zQXJyYXkpO1xuICAvLyB3ZSBjcmVhdGVkIGEgZm9yIGxvb3AgdG8gZ28gdGhyb3VnaCB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxuICAvLyBjcmVhdGUgaHRtbCBjYXJkIGZvciBlYWNoIGl0ZW0gW2ldXG4gIC8vY29uc29sZS5sb2coYHRoaXMgaXMgd29ya2luZyAke2Rlc2NBcnJheX1gKTtcbiAgY29uc29sZS5sb2coc3RyYWluc0FycmF5LCBkZXNjQXJyYXkpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyYWluc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gd2UgaW5zZXJ0ZWQgYSB0ZW1wbGF0ZSBsaXRlcmFsIHdpdGggdGhlIFtpXSBpbnRvIHRoZSBjYXJkXG4gICAgLy8gZGlzcGxheWluZyBhIGRpZmZlcm50IHN0cmFpbiBuYW1lXG4gICAgJCgnLnJlc3VsdHNDb250YWluZXInKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmRUb3BcIj5cbiAgICA8ZmlndXJlIGNsYXNzPVwiY2FyZEltYWdlXCI+PGltZyBzcmM9XCJhc3NldHMvbGVhZi5wbmdcIiBhbHQ9XCJjYW5uYWJpcyBsZWFmXCI+PC9maWd1cmU+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNhcmRCb3R0b21cIj5cbiAgICA8aDMgY2xhc3M9XCJzdHJhaW5OYW1lXCI+JHtzdHJhaW5zQXJyYXlbaV19PC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwiZXhwYW5kXCI+PGE+PGkgY2xhc3MgPSBcImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2E+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPC9kaXY+YClcblxuICAgIGxldCBpID0gMTtcbiAgICAkKCcuY2FyZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbXljbGFzcycgKyBpKTtcbiAgICAgIGkrKztcbiAgICB9KTtcblxuICAgIGxldCBzID0gMVxuICAgICQoJy5leHBhbmQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3RvZ2dsZScgKyBzKTtcbiAgICAgIHMrKztcbiAgICB9KTtcblxuXG4gIH1cbiAgICAvLyB3ZSBpbnNlcnRlZCBhIHRlbXBsYXRlIGxpdGVyYWwgd2l0aCB0aGUgW2ldIGludG8gdGhlIGNhcmRcbiAgICAvLyBkaXNwbGF5aW5nIGEgZGlmZmVybnQgc3RyYWluIG5hbWVcblxuXG4gICAgbGV0IGogPSAxXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgIC8vIHdlIGluc2VydGVkIGEgdGVtcGxhdGUgbGl0ZXJhbCB3aXRoIHRoZSBbaV0gaW50byB0aGUgY2FyZFxuICAgICAgLy8gZGlzcGxheWluZyBhIGRpZmZlcm50IHN0cmFpbiBuYW1lXG4gICAgICBcbiAgICAgICQoJy5teWNsYXNzJyArIGopLmFwcGVuZChgXG4gICAgPGRpdiBjbGFzcz1cImNhcmREZXNjclwiPlxuICAgIDxwPiR7ZGVzY0FycmF5W2ldfTwvcD5cbiAgICA8L2Rpdj5gKVxuICAgICAgaisrXG5cblxuXG4gICAgICAkKCcuY2FyZERlc2NyJykuaGlkZSgpO1xuXG4gICAgICAkKCcuZmEtcGx1cy1jaXJjbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZyhcImNsaWNrZWRcIilcbiAgICAgICAgJCgnLmNhcmREZXNjcicpLnNsaWRlRG93bigpO1xuICAgICAgICAvLyQoJy5jYXJkRGVzY3InKS5zbGlkZVVwKCk7XG4gICAgICB9KTtcblxuXG4gICAgICAkKCcuZXhwYW5kJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xuICAgICAgICAgIFxuICAgICAgICAgICQoJy5jYXJkRGVzY3InKS5oaWRlKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICBcbn1cblxuXG5cblxuYXBwLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gIGFwcC5ldmVudHMoKTtcbn1cblxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgYXBwLmluaXQoKTtcbn0pO1xuXG5cbi8vIFRSSUFMXG4vLyAkKFwiLmVmZmVjdHMgbGlcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuLy8gICAkKFwiLmVmZmVjdHMgLnNlbGVjdGVkXCIpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuLy8gICAkKFwiLmVmZmVjdHMgbGFiZWxcIikuYXR0cigndmFsdWUnLCAkKHRoaXMpLmF0dHIoJ3ZhbHVlJykpO1xuLy8gICBpZiAoJCh0aGlzKS5pcyhcIiNjbGVhclwiKSkge1xuLy8gICAgICQoXCIuZWZmZWN0cyBsYWJlbFwiKS50ZXh0KCQodGhpcykuYXR0cigndmFsdWUnKSk7XG4vLyAgIH0gZWxzZSB7XG4vLyAgICAgJCh0aGlzKS5hZGRDbGFzcygnc2VsZWN0ZWQnKTtcbi8vICAgICAkKFwiLmVmZmVjdHMgbGFiZWxcIikudGV4dCgkKHRoaXMpLnRleHQoKSk7XG4vLyAgIH1cbi8vIH0pO1xuXG5cbi8vIFRSSUFMIl19
