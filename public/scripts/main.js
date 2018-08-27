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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxNQUFKLEdBQWEsaUNBQWI7QUFDQSxJQUFJLE1BQUosR0FBYSxTQUFiO0FBQ0EsSUFBSSxpQkFBSixHQUF3Qix5QkFBeEI7QUFDQSxJQUFJLGVBQUosR0FBc0IsdUJBQXRCOztBQUVBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSxZQUFZLEVBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQWpCO0FBQ0EsSUFBSSxtQkFBbUIsRUFBdkI7O0FBR0EsSUFBSSxNQUFKLEdBQWEsWUFBTTtBQUNqQixJQUFFLElBQUYsRUFBUSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFVLENBQVYsRUFBYTtBQUMvQixNQUFFLGNBQUY7O0FBRUEsTUFBRSxvQkFBRixFQUF3QixXQUF4QixDQUFvQyxVQUFwQztBQUNBLE1BQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsT0FBekIsRUFBa0MsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsQ0FBbEM7O0FBRUEsUUFBSSxFQUFFLElBQUYsRUFBUSxFQUFSLENBQVcsUUFBWCxDQUFKLEVBQTBCO0FBQ3hCLFFBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsQ0FBekI7QUFDRCxLQUZELE1BRU87QUFDTCxRQUFFLElBQUYsRUFBUSxRQUFSLENBQWlCLFVBQWpCO0FBQ0EsUUFBRSxnQkFBRixFQUFvQixJQUFwQixDQUF5QixFQUFFLElBQUYsRUFBUSxJQUFSLEVBQXpCO0FBQ0Q7O0FBRUQ7QUFDQSxvQkFBZ0IsRUFBRSxJQUFGLEVBQVEsSUFBUixDQUFhLE9BQWIsQ0FB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SUFBaEI7QUFDRCxLQUhEO0FBSUQ7QUFDRixDQW5FRDs7QUFxRUEsSUFBSSxJQUFKLEdBQVcsWUFBWTtBQUNyQixNQUFJLE1BQUo7QUFDRCxDQUZEOztBQUlBLEVBQUUsWUFBWTtBQUNaLE1BQUksSUFBSjtBQUNELENBRkQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvL3VzZXIgYXJyaXZlcyBvbiBwYWdlXG4vL3VzZXIgYXNrZWQgZm9yIHRoZWlyIG5hbWUgYW5kIGFnZS4gYWdlIG11c3QgYmUgPj0gMTlcbi8vaWYgdXNlciBpcyBub3QgPj0gIHNlcnZlIHVwIGEgcGFnZSB0aGF0IHNheXMgXCJvb3BzIHlvdSdyZSB0byB5b3VuZ1wiXG4vL2lmIGFnZSByZXF1aXJlbWVudCBpcyBtZXQsIGxvYWQgbWFpbiBwYWdlXG4vLyBvbiBtYWluIHBhZ2Ugd2UgZ3JlZXQgdGhlIHVzZXIgYW5kIHByZXNlbnQgdGhlbSB3aXRoIGEgbmF0dXJhbCBsYW5ndWFnZSBmaWx0ZXJcbi8vbmF0dXJhbCBsYW5ndWFnZSBmaWx0ZXIgc2F5cyBzb21ldGhpbmcgbGlrZSBcIkkgd2FudCB0byBmZWVsIF9fX19fX19fX1wiIHdpdGggYSBkcm9wZG93biBvZiBzZWxlY3Rpb25zLlxuLy9vcHRpb25zIGNvdWxkIGluY2x1ZGUgcmVsZWlmIGZyb20gZGVwcmVzc2lvbiwgcGFpbiwgYW54aWV0eSwgZXRjLiBvciBzaW1wbHkgbW9vZHMgbGlrZSBoYXBweSwgcmVsYXhlZCwgaHVuZ3J5Li4uXG4vL3VzZXIgc2VsZWN0cyBhbiBvcHRpb24gYW5kIGFyZSBzZXJ2ZWQgc3RyYWlucyB0aGF0IG1hdGNoIHRoYXQgb3B0aW9uLlxuLy9zdHJhaW5zIHdpbGwgYmUgZGlzcGxheWVkIHdpdGggcmFuZG9tIHBob3RvIChzdHJldGNoIGdvYWwgaXMgdG8gaGF2ZSBhIHJlYWwgb25lKSwgdGhlaXIgbmFtZSwgZmxhdm91cnMsIGFsbCBlZmZlY3RzLCByYWNlLlxuLy9uYW1lIHBob3RvIGFuZCBcblxuY29uc3QgYXBwID0ge31cbmFwcC5hcGlVcmwgPSAnaHR0cDovL3N0cmFpbmFwaS5ldmFuYnVzc2UuY29tLydcbmFwcC5hcGlLZXkgPSAnT2NuSmc4TidcbmFwcC5zZWFyY2hRdWVyeUVmZmVjdCA9ICcvc3RyYWlucy9zZWFyY2gvZWZmZWN0LydcbmFwcC5zZWFyY2hRdWVyeU5hbWUgPSAnL3N0cmFpbnMvc2VhcmNoL25hbWUvJ1xuXG5sZXQgdXNlclNlbGVjdGlvbiA9ICcnXG5sZXQgc3RyYWluczE1ID0gW107XG5sZXQgZGVzY3JpcHQxNSA9IFtdO1xubGV0IGRlc2NyaXB0UmVzcG9uc2UgPSAnJ1xuXG5cbmFwcC5ldmVudHMgPSAoKSA9PiB7XG4gICQoJ2xpJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAkKCcuZWZmZWN0cyAuc2VsZWN0ZWQnKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAkKCcuZWZmZWN0cyBsYWJlbCcpLmF0dHIoJ3ZhbHVlJywgJCh0aGlzKS5hdHRyKCd2YWx1ZScpKTtcblxuICAgIGlmICgkKHRoaXMpLmlzKCcjY2xlYXInKSkge1xuICAgICAgJCgnLmVmZmVjdHMgbGFiZWwnKS50ZXh0KCQodGhpcykuYXR0cigndmFsdWUnKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAkKCcuZWZmZWN0cyBsYWJlbCcpLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xuICAgIH1cblxuICAgIC8vIGNvbnNvbGUubG9nKCdkaWQgdGhpcyB3b3JrPycpO1xuICAgIHVzZXJTZWxlY3Rpb24gPSAkKHRoaXMpLmF0dHIoJ3ZhbHVlJyk7XG4gICAgLy8gY29uc29sZS5sb2codXNlclNlbGVjdGlvbik7XG4gICAgYXBwLmdldEVmZmVjdCh1c2VyU2VsZWN0aW9uKTtcbiAgICAvL2NsZWFyXG4gICAgJCgnLnJlc3VsdHNDb250YWluZXInKS5lbXB0eSgpO1xuICB9KVxuJChcIiNzdGFydFwiKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICQoW2RvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgZG9jdW1lbnQuYm9keV0pLmFuaW1hdGUoe1xuICAgIHNjcm9sbFRvcDogJChcIiNxdWVyeVwiKS5vZmZzZXQoKS50b3BcbiAgfSwgMjAwMCk7XG59KTtcbn1cblxuXG5hcHAuZ2V0RWZmZWN0ID0gKHVzZXIpID0+IHtcbiAgbGV0IGVmZmVjdCA9IHVzZXJcbiAgJC5hamF4KHtcbiAgICAgIHVybDogYCR7YXBwLmFwaVVybH0ke2FwcC5hcGlLZXl9JHthcHAuc2VhcmNoUXVlcnlFZmZlY3R9JHtlZmZlY3R9YCxcbiAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nXG4gICAgfSlcbiAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgICAgLy9maW5kIG91dCB0aGUgbnVtYmVyIG9mIHN0cmFpbnMgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgY29uc29sZS5sb2coYG51bWJlciBvZiBpdGVtcyBpbiB0aGUgYXJyYXk6ICR7cmVzLmxlbmd0aH1gKTtcbiAgICAgIC8vc2VsZWN0IGEgcmFuZG9tIG51bWJlciBmcm9tIDAgdG8gdGhlIG51bWJlciBvZiBpdGVtcyBpbiB0aGUgYXJyYXlcbiAgICAgIGxldCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcmVzLmxlbmd0aCkgKyAxKTtcbiAgICAgIGNvbnNvbGUubG9nKHJhbmRvbU51bWJlcik7XG4gICAgICAvLyBsb2cgdGhlIHJhbmRvbWx5IHNlbGVjdGVkIG5hbWUgaW4gdGhlIHVzZXJzIHNlbGVjdGVkIGVmZmVjdFxuICAgICAgY29uc29sZS5sb2cocmVzW3JhbmRvbU51bWJlcl0ubmFtZSk7XG5cbiAgICAgIGxldCByYW5kb21TdHJhaW4gPSByZXNbcmFuZG9tTnVtYmVyXS5uYW1lO1xuICAgICAgc3RyYWluczE1ID0gW107XG4gICAgICAvL21ha2UgYW4gYXJyYXkgd2l0aCAxNSByYW5kb20gc3RyYWlucyBnZW5lcmF0ZWQgZnJvbSB0aGUgdXNlcnMgY2hvc2VuIGVmZmVjdC5cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTQ7IGkrKykge1xuICAgICAgICBsZXQgcmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcigoTWF0aC5yYW5kb20oKSAqIHJlcy5sZW5ndGgpICsgMSk7XG4gICAgICAgIC8vIGxvZyB0aGUgcmFuZG9tbHkgc2VsZWN0ZWQgbmFtZSBpbiB0aGUgdXNlcnMgc2VsZWN0ZWQgZWZmZWN0XG4gICAgICAgIGxldCByYW5kb21TdHJhaW4gPSByZXNbcmFuZG9tTnVtYmVyXS5uYW1lO1xuICAgICAgICBjb25zb2xlLmxvZyhyYW5kb21TdHJhaW4pO1xuICAgICAgICBzdHJhaW5zMTUucHVzaChyYW5kb21TdHJhaW4pO1xuICAgICAgfVxuXG4gICAgICAvL3RoaXMgaXMgYSByYW5kb21seSBnZW5lcmF0ZWQgYXJyYXkgb2YgMTUgc3RyYWlucyBpbiB0aGUgdXNlcnMgY2hvc2VuIGVmZmVjdCBjYXRlZ29yeS5cbiAgICAgIGNvbnNvbGUubG9nKHN0cmFpbnMxNSk7XG5cbiAgICAgIGNvbnN0IGdldERlc2NyaXB0aW9uID0gKG5hbWUpID0+IHtcbiAgICAgICAgcmV0dXJuICQuYWpheCh7XG4gICAgICAgICAgdXJsOiBgJHthcHAuYXBpVXJsfSR7YXBwLmFwaUtleX0ke2FwcC5zZWFyY2hRdWVyeU5hbWV9JHtuYW1lfWAsXG4gICAgICAgICAgLy91cmw6ICdodHRwOi8vc3RyYWluYXBpLmV2YW5idXNzZS5jb20vT2NuSmc4Ti9zdHJhaW5zL3NlYXJjaC9uYW1lL1JveWFsJTIwS3VzaCcsXG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVzY3JpcHRpb25SZXF1ZXN0cyA9IHN0cmFpbnMxNS5tYXAoZ2V0RGVzY3JpcHRpb24pXG4gICAgICAkLndoZW4oLi4uZGVzY3JpcHRpb25SZXF1ZXN0cylcbiAgICAgICAgLnRoZW4oKC4uLnJlc3BvbnNlcykgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlcyk7XG4gICAgICAgICAgcmVzcG9uc2VzID0gcmVzcG9uc2VzLm1hcCgoaXRlbSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW1bMF1bMF1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGRlc2NyaXB0UmVzcG9uc2UgPSByZXNwb25zZXMuZm9yRWFjaCgocmVzcG9uc2UpID0+IHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc3BvbnNlLmRlc2MpXG4gICAgICAgICAgICBkZXNjcmlwdDE1LnB1c2gocmVzcG9uc2UuZGVzYyk7XG4gICAgICAgICAgfSlcblxuICAgICAgICAgIGFwcC5kaXNwbGF5RWZmZWN0KHN0cmFpbnMxNSwgZGVzY3JpcHQxNSlcbiAgICAgICAgfSk7XG4gICAgfSlcbn1cblxuXG5cbmFwcC5kaXNwbGF5RWZmZWN0ID0gZnVuY3Rpb24gKHN0cmFpbnNBcnJheSwgZGVzY0FycmF5KSB7XG4gIC8vIGNvbnNvbGUubG9nKFwidGhpcyBpcyB0aGUgcmFuZG9tIHN0cmFpbnMgYXJyYXkgcGFzc2VkIGludG8gZGlzcGxheSBlZmZlY3QgXCIgKyBzdHJhaW5zQXJyYXkpO1xuICAvLyB3ZSBjcmVhdGVkIGEgZm9yIGxvb3AgdG8gZ28gdGhyb3VnaCB0aGUgbGVuZ3RoIG9mIHRoZSBhcnJheVxuICAvLyBjcmVhdGUgaHRtbCBjYXJkIGZvciBlYWNoIGl0ZW0gW2ldXG4gIC8vY29uc29sZS5sb2coYHRoaXMgaXMgd29ya2luZyAke2Rlc2NBcnJheX1gKTtcbiAgY29uc29sZS5sb2coc3RyYWluc0FycmF5LCBkZXNjQXJyYXkpO1xuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3RyYWluc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgLy8gd2UgaW5zZXJ0ZWQgYSB0ZW1wbGF0ZSBsaXRlcmFsIHdpdGggdGhlIFtpXSBpbnRvIHRoZSBjYXJkXG4gICAgLy8gZGlzcGxheWluZyBhIGRpZmZlcm50IHN0cmFpbiBuYW1lXG4gICAgJCgnLnJlc3VsdHNDb250YWluZXInKS5hcHBlbmQoYDxkaXYgY2xhc3M9XCJjYXJkXCI+XG4gICAgPGRpdiBjbGFzcz1cImNhcmRUb3BcIj5cbiAgICA8ZmlndXJlIGNsYXNzPVwiY2FyZEltYWdlXCI+PGltZyBzcmM9XCJhc3NldHMvbGVhZi5wbmdcIiBhbHQ9XCJjYW5uYWJpcyBsZWFmXCI+PC9maWd1cmU+XG4gICAgPC9kaXY+XG4gICAgPGRpdiBjbGFzcz1cImNhcmRCb3R0b21cIj5cbiAgICA8aDMgY2xhc3M9XCJzdHJhaW5OYW1lXCI+JHtzdHJhaW5zQXJyYXlbaV19PC9oMz5cbiAgICA8ZGl2IGNsYXNzPVwiZXhwYW5kXCI+PGE+PGkgY2xhc3MgPSBcImZhcyBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2E+PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPC9kaXY+YClcblxuICAgIGxldCBpID0gMTtcbiAgICAkKCcuY2FyZEJvdHRvbScpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygnbXljbGFzcycgKyBpKTtcbiAgICAgIGkrKztcbiAgICB9KTtcblxuICAgIGxldCBzID0gMVxuICAgICQoJy5leHBhbmQnKS5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICQodGhpcykuYWRkQ2xhc3MoJ3RyaWdnZXInICsgcyk7XG4gICAgICBzKys7XG4gICAgfSk7XG4gIH1cblxuXG4gICAgbGV0IGogPSAxXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXNjQXJyYXkubGVuZ3RoOyBpKyspIHtcblxuICAgICAgaWYgKGRlc2NBcnJheVtpXSAhPSBudWxsKSB7XG4gICAgICAgICQoJy5teWNsYXNzJyArIGopLmFwcGVuZChgXG4gICAgPGRpdiBjbGFzcz1cImNhcmREZXNjclwiPlxuICAgIDxwPiR7ZGVzY0FycmF5W2ldfTwvcD5cbiAgICA8L2Rpdj5gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLm15Y2xhc3MnICsgaikuYXBwZW5kKGBcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZERlc2NyXCI+XG4gICAgPHA+VGhpcyBzdHJhaW4gZG9lc24ndCBoYXZlIGEgZGVzY3JpcHRpb24geWV0LjwvcD5cbiAgICA8L2Rpdj5gKVxuXG4gICAgICB9XG4gICAgICBqKytcblxuICAgICQoJy5jYXJkRGVzY3InKS5oaWRlKCk7XG5cblxuICAgIC8vRXhwYW5kIG9uXG4gICAgJCgnLmZhLXBsdXMtY2lyY2xlJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgY29uc29sZS5sb2coXCJjbGlja2VkXCIpXG4gICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5jYXJkRGVzY3InKS5zbGlkZURvd24oKTtcbiAgICAgIC8vICQoJy5jYXJkRGVzY3InKS5zbGlkZVVwKCk7XG4gICAgfSk7XG5cbiAgICAvLyBFeHBhbmQgb2ZmXG4gICAgJCgnLmV4cGFuZCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGNvbnNvbGUubG9nKCd0ZXN0Jyk7XG4gICAgICAkKCcuY2FyZERlc2NyJykuaGlkZSgpO1xuICAgIH0pO1xuICB9XG59XG5cbmFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBhcHAuZXZlbnRzKCk7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICBhcHAuaW5pdCgpO1xufSk7XG4iXX0=
