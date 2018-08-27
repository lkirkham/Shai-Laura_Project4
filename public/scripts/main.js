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

    $('.effects .selected').removeClass('selected');
    $('.effects label').attr('value', $(this).attr('value'));

    if ($(this).is('#clear')) {
      $('.effects label').text($(this).attr('value'));
    } else {
      $(this).addClass('selected');
      $('.effects label').text($(this).text());
    }

    // console.log('did this work?');
    userSelection = $(this).attr('value');
    // console.log(userSelection);
    app.getEffect(userSelection);
    //clear
    $('.resultsContainer').empty();
  });
  $("#start").click(function () {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#query").offset().top
    }, 2000);
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
    $('.cardBottom').each(function () {
      $(this).addClass('myclass' + i);
      i++;
    });

    var s = 1;
    $('.expand').each(function () {
      $(this).addClass('trigger' + s);
      s++;
    });
  };

  for (var i = 0; i < strainsArray.length; i++) {
    _loop(i);
  }

  var j = 1;
  for (var i = 0; i < descArray.length; i++) {

    if (descArray[i] != null) {
      $('.myclass' + j).append('\n    <div class="cardDescr">\n    <p>' + descArray[i] + '</p>\n    </div>');
    } else {
      $('.myclass' + j).append('\n    <div class="cardDescr">\n    <p>This strain doesn\'t have a description yet.</p>\n    </div>');
    }
    j++;

    $('.cardDescr').hide();

    //Expand on
    $('.fa-plus-circle').on('click', function () {
      console.log("clicked");
      $(this).parent().parent().parent().find('.cardDescr').slideDown();
      // $('.cardDescr').slideUp();
    });

    // Expand off
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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxNQUFKLEdBQWEsaUNBQWI7QUFDQSxJQUFJLE1BQUosR0FBYSxTQUFiO0FBQ0EsSUFBSSxpQkFBSixHQUF3Qix5QkFBeEI7QUFDQSxJQUFJLGVBQUosR0FBc0IsdUJBQXRCOztBQUVBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSxZQUFZLEVBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQWpCO0FBQ0EsSUFBSSxtQkFBbUIsRUFBdkI7O0FBR0EsSUFBSSxNQUFKLEdBQWEsWUFBTTtBQUNqQixJQUFFLElBQUYsRUFBUSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFVLENBQVYsRUFBYTtBQUMvQixNQUFFLGNBQUY7O0FBRUEsTUFBRSxvQkFBRixFQUF3QixXQUF4QixDQUFvQyxVQUFwQztBQUNBLE1BQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0MsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsQ0FBbEM7O0FBRUEsUUFBSSxFQUFFLElBQUYsRUFBUSxFQUFSLENBQVcsUUFBWCxDQUFKLEVBQTBCO0FBQ3hCLFFBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsQ0FBekI7QUFDRCxLQUZELE1BRU87QUFDTCxRQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFVBQWpCO0FBQ0EsUUFBRSxnQkFBRixFQUFvQixJQUFwQixDQUF5QixFQUFFLElBQUYsRUFBUSxJQUFSLEVBQXpCO0FBQ0Q7O0FBRUQ7QUFDQSxvQkFBZ0IsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsQ0FB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LElBQWhCO0FBQ0QsS0FKRDtBQUtEO0FBQ0YsQ0FwRUQ7O0FBc0VBLElBQUksSUFBSixHQUFXLFlBQVk7QUFDckIsTUFBSSxNQUFKO0FBQ0QsQ0FGRDs7QUFJQSxFQUFFLFlBQVk7QUFDWixNQUFJLElBQUo7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy91c2VyIGFycml2ZXMgb24gcGFnZVxuLy91c2VyIGFza2VkIGZvciB0aGVpciBuYW1lIGFuZCBhZ2UuIGFnZSBtdXN0IGJlID49IDE5XG4vL2lmIHVzZXIgaXMgbm90ID49ICBzZXJ2ZSB1cCBhIHBhZ2UgdGhhdCBzYXlzIFwib29wcyB5b3UncmUgdG8geW91bmdcIlxuLy9pZiBhZ2UgcmVxdWlyZW1lbnQgaXMgbWV0LCBsb2FkIG1haW4gcGFnZVxuLy8gb24gbWFpbiBwYWdlIHdlIGdyZWV0IHRoZSB1c2VyIGFuZCBwcmVzZW50IHRoZW0gd2l0aCBhIG5hdHVyYWwgbGFuZ3VhZ2UgZmlsdGVyXG4vL25hdHVyYWwgbGFuZ3VhZ2UgZmlsdGVyIHNheXMgc29tZXRoaW5nIGxpa2UgXCJJIHdhbnQgdG8gZmVlbCBfX19fX19fX19cIiB3aXRoIGEgZHJvcGRvd24gb2Ygc2VsZWN0aW9ucy5cbi8vb3B0aW9ucyBjb3VsZCBpbmNsdWRlIHJlbGVpZiBmcm9tIGRlcHJlc3Npb24sIHBhaW4sIGFueGlldHksIGV0Yy4gb3Igc2ltcGx5IG1vb2RzIGxpa2UgaGFwcHksIHJlbGF4ZWQsIGh1bmdyeS4uLlxuLy91c2VyIHNlbGVjdHMgYW4gb3B0aW9uIGFuZCBhcmUgc2VydmVkIHN0cmFpbnMgdGhhdCBtYXRjaCB0aGF0IG9wdGlvbi5cbi8vc3RyYWlucyB3aWxsIGJlIGRpc3BsYXllZCB3aXRoIHJhbmRvbSBwaG90byAoc3RyZXRjaCBnb2FsIGlzIHRvIGhhdmUgYSByZWFsIG9uZSksIHRoZWlyIG5hbWUsIGZsYXZvdXJzLCBhbGwgZWZmZWN0cywgcmFjZS5cbi8vbmFtZSBwaG90byBhbmQgXG5cbmNvbnN0IGFwcCA9IHt9XG5hcHAuYXBpVXJsID0gJ2h0dHA6Ly9zdHJhaW5hcGkuZXZhbmJ1c3NlLmNvbS8nXG5hcHAuYXBpS2V5ID0gJ09jbkpnOE4nXG5hcHAuc2VhcmNoUXVlcnlFZmZlY3QgPSAnL3N0cmFpbnMvc2VhcmNoL2VmZmVjdC8nXG5hcHAuc2VhcmNoUXVlcnlOYW1lID0gJy9zdHJhaW5zL3NlYXJjaC9uYW1lLydcblxubGV0IHVzZXJTZWxlY3Rpb24gPSAnJ1xubGV0IHN0cmFpbnMxNSA9IFtdO1xubGV0IGRlc2NyaXB0MTUgPSBbXTtcbmxldCBkZXNjcmlwdFJlc3BvbnNlID0gJydcblxuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAkKCdsaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgJCgnLmVmZmVjdHMgLnNlbGVjdGVkJykucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgJCgnLmVmZmVjdHMgbGFiZWwnKS5hdHRyKCd2YWx1ZScsICQodGhpcykuYXR0cigndmFsdWUnKSk7XG5cbiAgICBpZiAoJCh0aGlzKS5pcygnI2NsZWFyJykpIHtcbiAgICAgICQoJy5lZmZlY3RzIGxhYmVsJykudGV4dCgkKHRoaXMpLmF0dHIoJ3ZhbHVlJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgJCgnLmVmZmVjdHMgbGFiZWwnKS50ZXh0KCQodGhpcykudGV4dCgpKTtcbiAgICB9XG5cbiAgICAvLyBjb25zb2xlLmxvZygnZGlkIHRoaXMgd29yaz8nKTtcbiAgICB1c2VyU2VsZWN0aW9uID0gJCh0aGlzKS5hdHRyKCd2YWx1ZScpO1xuICAgIC8vIGNvbnNvbGUubG9nKHVzZXJTZWxlY3Rpb24pO1xuICAgIGFwcC5nZXRFZmZlY3QodXNlclNlbGVjdGlvbik7XG4gICAgLy9jbGVhclxuICAgICQoJy5yZXN1bHRzQ29udGFpbmVyJykuZW1wdHkoKTtcbiAgfSlcbiQoXCIjc3RhcnRcIikuY2xpY2soZnVuY3Rpb24gKCkge1xuICAkKFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsIGRvY3VtZW50LmJvZHldKS5hbmltYXRlKHtcbiAgICBzY3JvbGxUb3A6ICQoXCIjcXVlcnlcIikub2Zmc2V0KCkudG9wXG4gIH0sIDIwMDApO1xufSk7XG59XG5cblxuYXBwLmdldEVmZmVjdCA9ICh1c2VyKSA9PiB7XG4gIGxldCBlZmZlY3QgPSB1c2VyXG4gICQuYWpheCh7XG4gICAgICB1cmw6IGAke2FwcC5hcGlVcmx9JHthcHAuYXBpS2V5fSR7YXBwLnNlYXJjaFF1ZXJ5RWZmZWN0fSR7ZWZmZWN0fWAsXG4gICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuICAgIH0pXG4gICAgLnRoZW4oKHJlcykgPT4ge1xuICAgICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAgIC8vZmluZCBvdXQgdGhlIG51bWJlciBvZiBzdHJhaW5zIGluIHRoZSB1c2VycyBzZWxlY3RlZCBlZmZlY3RcbiAgICAgIGNvbnNvbGUubG9nKGBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGFycmF5OiAke3Jlcy5sZW5ndGh9YCk7XG4gICAgICAvL3NlbGVjdCBhIHJhbmRvbSBudW1iZXIgZnJvbSAwIHRvIHRoZSBudW1iZXIgb2YgaXRlbXMgaW4gdGhlIGFycmF5XG4gICAgICBsZXQgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHJlcy5sZW5ndGgpICsgMSk7XG4gICAgICBjb25zb2xlLmxvZyhyYW5kb21OdW1iZXIpO1xuICAgICAgLy8gbG9nIHRoZSByYW5kb21seSBzZWxlY3RlZCBuYW1lIGluIHRoZSB1c2VycyBzZWxlY3RlZCBlZmZlY3RcbiAgICAgIGNvbnNvbGUubG9nKHJlc1tyYW5kb21OdW1iZXJdLm5hbWUpO1xuXG4gICAgICBsZXQgcmFuZG9tU3RyYWluID0gcmVzW3JhbmRvbU51bWJlcl0ubmFtZTtcbiAgICAgIHN0cmFpbnMxNSA9IFtdO1xuICAgICAgLy9tYWtlIGFuIGFycmF5IHdpdGggMTUgcmFuZG9tIHN0cmFpbnMgZ2VuZXJhdGVkIGZyb20gdGhlIHVzZXJzIGNob3NlbiBlZmZlY3QuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDE0OyBpKyspIHtcbiAgICAgICAgbGV0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiByZXMubGVuZ3RoKSArIDEpO1xuICAgICAgICAvLyBsb2cgdGhlIHJhbmRvbWx5IHNlbGVjdGVkIG5hbWUgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgICBsZXQgcmFuZG9tU3RyYWluID0gcmVzW3JhbmRvbU51bWJlcl0ubmFtZTtcbiAgICAgICAgY29uc29sZS5sb2cocmFuZG9tU3RyYWluKTtcbiAgICAgICAgc3RyYWluczE1LnB1c2gocmFuZG9tU3RyYWluKTtcbiAgICAgIH1cblxuICAgICAgLy90aGlzIGlzIGEgcmFuZG9tbHkgZ2VuZXJhdGVkIGFycmF5IG9mIDE1IHN0cmFpbnMgaW4gdGhlIHVzZXJzIGNob3NlbiBlZmZlY3QgY2F0ZWdvcnkuXG4gICAgICBjb25zb2xlLmxvZyhzdHJhaW5zMTUpO1xuXG4gICAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9IChuYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgIHVybDogYCR7YXBwLmFwaVVybH0ke2FwcC5hcGlLZXl9JHthcHAuc2VhcmNoUXVlcnlOYW1lfSR7bmFtZX1gLFxuICAgICAgICAgIC8vdXJsOiAnaHR0cDovL3N0cmFpbmFwaS5ldmFuYnVzc2UuY29tL09jbkpnOE4vc3RyYWlucy9zZWFyY2gvbmFtZS9Sb3lhbCUyMEt1c2gnLFxuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uUmVxdWVzdHMgPSBzdHJhaW5zMTUubWFwKGdldERlc2NyaXB0aW9uKVxuICAgICAgJC53aGVuKC4uLmRlc2NyaXB0aW9uUmVxdWVzdHMpXG4gICAgICAgIC50aGVuKCguLi5yZXNwb25zZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZXMpO1xuICAgICAgICAgIHJlc3BvbnNlcyA9IHJlc3BvbnNlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtWzBdWzBdXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBkZXNjcmlwdFJlc3BvbnNlID0gcmVzcG9uc2VzLmZvckVhY2goKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNwb25zZS5kZXNjKVxuICAgICAgICAgICAgZGVzY3JpcHQxNS5wdXNoKHJlc3BvbnNlLmRlc2MpO1xuICAgICAgICAgIH0pXG5cbiAgICAgICAgICBhcHAuZGlzcGxheUVmZmVjdChzdHJhaW5zMTUsIGRlc2NyaXB0MTUpXG4gICAgICAgIH0pO1xuICAgIH0pXG59XG5cblxuXG5hcHAuZGlzcGxheUVmZmVjdCA9IGZ1bmN0aW9uIChzdHJhaW5zQXJyYXksIGRlc2NBcnJheSkge1xuICAvLyBjb25zb2xlLmxvZyhcInRoaXMgaXMgdGhlIHJhbmRvbSBzdHJhaW5zIGFycmF5IHBhc3NlZCBpbnRvIGRpc3BsYXkgZWZmZWN0IFwiICsgc3RyYWluc0FycmF5KTtcbiAgLy8gd2UgY3JlYXRlZCBhIGZvciBsb29wIHRvIGdvIHRocm91Z2ggdGhlIGxlbmd0aCBvZiB0aGUgYXJyYXlcbiAgLy8gY3JlYXRlIGh0bWwgY2FyZCBmb3IgZWFjaCBpdGVtIFtpXVxuICAvL2NvbnNvbGUubG9nKGB0aGlzIGlzIHdvcmtpbmcgJHtkZXNjQXJyYXl9YCk7XG4gIGNvbnNvbGUubG9nKHN0cmFpbnNBcnJheSwgZGVzY0FycmF5KTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHN0cmFpbnNBcnJheS5sZW5ndGg7IGkrKykge1xuICAgIC8vIHdlIGluc2VydGVkIGEgdGVtcGxhdGUgbGl0ZXJhbCB3aXRoIHRoZSBbaV0gaW50byB0aGUgY2FyZFxuICAgIC8vIGRpc3BsYXlpbmcgYSBkaWZmZXJudCBzdHJhaW4gbmFtZVxuICAgICQoJy5yZXN1bHRzQ29udGFpbmVyJykuYXBwZW5kKGA8ZGl2IGNsYXNzPVwiY2FyZFwiPlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkVG9wXCI+XG4gICAgPGZpZ3VyZSBjbGFzcz1cImNhcmRJbWFnZVwiPjxpbWcgc3JjPVwiYXNzZXRzL2xlYWYucG5nXCIgYWx0PVwiY2FubmFiaXMgbGVhZlwiPjwvZmlndXJlPlxuICAgIDwvZGl2PlxuICAgIDxkaXYgY2xhc3M9XCJjYXJkQm90dG9tXCI+XG4gICAgPGgzIGNsYXNzPVwic3RyYWluTmFtZVwiPiR7c3RyYWluc0FycmF5W2ldfTwvaDM+XG4gICAgPGRpdiBjbGFzcz1cImV4cGFuZFwiPjxhPjxpIGNsYXNzID0gXCJmYXMgZmEtcGx1cy1jaXJjbGVcIj48L2k+PC9hPjwvZGl2PlxuICAgIDwvZGl2PlxuICAgIDwvZGl2PmApXG5cbiAgICBsZXQgaSA9IDE7XG4gICAgJCgnLmNhcmRCb3R0b20nKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ215Y2xhc3MnICsgaSk7XG4gICAgICBpKys7XG4gICAgfSk7XG5cbiAgICBsZXQgcyA9IDFcbiAgICAkKCcuZXhwYW5kJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCd0cmlnZ2VyJyArIHMpO1xuICAgICAgcysrO1xuICAgIH0pO1xuICB9XG5cblxuICAgIGxldCBqID0gMVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGVzY0FycmF5Lmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgIGlmIChkZXNjQXJyYXlbaV0gIT0gbnVsbCkge1xuICAgICAgICAkKCcubXljbGFzcycgKyBqKS5hcHBlbmQoYFxuICAgIDxkaXYgY2xhc3M9XCJjYXJkRGVzY3JcIj5cbiAgICA8cD4ke2Rlc2NBcnJheVtpXX08L3A+XG4gICAgPC9kaXY+YClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5teWNsYXNzJyArIGopLmFwcGVuZChgXG4gICAgPGRpdiBjbGFzcz1cImNhcmREZXNjclwiPlxuICAgIDxwPlRoaXMgc3RyYWluIGRvZXNuJ3QgaGF2ZSBhIGRlc2NyaXB0aW9uIHlldC48L3A+XG4gICAgPC9kaXY+YClcblxuICAgICAgfVxuICAgICAgaisrXG5cbiAgICAkKCcuY2FyZERlc2NyJykuaGlkZSgpO1xuXG5cbiAgICAvL0V4cGFuZCBvblxuICAgICQoJy5mYS1wbHVzLWNpcmNsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKVxuICAgICAgJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKCcuY2FyZERlc2NyJykuc2xpZGVEb3duKCk7XG4gICAgICAvLyAkKCcuY2FyZERlc2NyJykuc2xpZGVVcCgpO1xuICAgIH0pO1xuXG4gICAgLy8gRXhwYW5kIG9mZlxuICAgICQoJy5leHBhbmQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xuXG4gICAgICAkKCcuY2FyZERlc2NyJykuaGlkZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBhcHAuZXZlbnRzKCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICBhcHAuaW5pdCgpO1xufSk7XG4iXX0=
