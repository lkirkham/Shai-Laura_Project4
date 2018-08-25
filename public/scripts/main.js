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

    $('.myclass' + j).append('\n    <div class="cardDescr" id="modal">\n    <p>' + descArray[i] + '</p>\n    </div>');
    j++;

    // //LEAN MODAL
    // $('.fa-plus-circle').on('click', function(){
    //   console.log("clicked")
    // //   $(this).parent().parent().find('.cardDescr').slideDown();
    // //   // $('.cardDescr').slideUp();
    // });


    $('.cardDescr').hide();

    //ALL DISCRIPTIONS APPEAR AND TOGGLE
    // $('.fa-plus-circle').on('click', function () {
    //   console.log("clicked")
    //   $('.cardDescr').slideDown();
    //   //$('.cardDescr').slideUp();
    // });

    //ONLY CLICKED DESCRIPT APPEARS, ALL BOXES TOGGLE
    $('.fa-plus-circle').on('click', function () {
      console.log("clicked");
      $(this).parent().parent().parent().find('.cardDescr').slideDown();
      // $('.cardDescr').slideUp();
    });

    // HIDE DISCRIPTIOSN WHEN CLICKED
    $('.expand').on('click', function () {
      console.log('test');

      $('.cardDescr').hide();
    });
  }
};

// $("#").leanModal();


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQU0sTUFBTSxFQUFaO0FBQ0EsSUFBSSxNQUFKLEdBQWEsaUNBQWI7QUFDQSxJQUFJLE1BQUosR0FBYSxTQUFiO0FBQ0EsSUFBSSxpQkFBSixHQUF3Qix5QkFBeEI7QUFDQSxJQUFJLGVBQUosR0FBc0IsdUJBQXRCOztBQUVBLElBQUksZ0JBQWdCLEVBQXBCO0FBQ0EsSUFBSSxZQUFZLEVBQWhCO0FBQ0EsSUFBSSxhQUFhLEVBQWpCO0FBQ0EsSUFBSSxtQkFBbUIsRUFBdkI7O0FBR0EsSUFBSSxNQUFKLEdBQWEsWUFBTTtBQUNqQixJQUFFLElBQUYsRUFBUSxFQUFSLENBQVcsT0FBWCxFQUFvQixVQUFVLENBQVYsRUFBYTtBQUMvQixNQUFFLGNBQUY7QUFDSjtBQUNJLE1BQUUsb0JBQUYsRUFBd0IsV0FBeEIsQ0FBb0MsVUFBcEM7QUFDQSxNQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLE9BQXpCLEVBQWtDLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxPQUFiLENBQWxDOztBQUlBLFFBQUksRUFBRSxJQUFGLEVBQVEsRUFBUixDQUFXLFFBQVgsQ0FBSixFQUEwQjtBQUN4QixRQUFFLGdCQUFGLEVBQW9CLElBQXBCLENBQXlCLEVBQUUsSUFBRixFQUFRLElBQVIsQ0FBYSxPQUFiLENBQXpCO0FBQ0QsS0FGRCxNQUVPO0FBQ0wsUUFBRSxJQUFGLEVBQVEsUUFBUixDQUFpQixVQUFqQjtBQUNBLFFBQUUsZ0JBQUYsRUFBb0IsSUFBcEIsQ0FBeUIsRUFBRSxJQUFGLEVBQVEsSUFBUixFQUF6QjtBQUNEO0FBQ0w7QUFDSTtBQUNBLG9CQUFnQixFQUFFLElBQUYsRUFBUSxJQUFSLENBQWEs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dXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy91c2VyIGFycml2ZXMgb24gcGFnZVxuLy91c2VyIGFza2VkIGZvciB0aGVpciBuYW1lIGFuZCBhZ2UuIGFnZSBtdXN0IGJlID49IDE5XG4vL2lmIHVzZXIgaXMgbm90ID49ICBzZXJ2ZSB1cCBhIHBhZ2UgdGhhdCBzYXlzIFwib29wcyB5b3UncmUgdG8geW91bmdcIlxuLy9pZiBhZ2UgcmVxdWlyZW1lbnQgaXMgbWV0LCBsb2FkIG1haW4gcGFnZVxuLy8gb24gbWFpbiBwYWdlIHdlIGdyZWV0IHRoZSB1c2VyIGFuZCBwcmVzZW50IHRoZW0gd2l0aCBhIG5hdHVyYWwgbGFuZ3VhZ2UgZmlsdGVyXG4vL25hdHVyYWwgbGFuZ3VhZ2UgZmlsdGVyIHNheXMgc29tZXRoaW5nIGxpa2UgXCJJIHdhbnQgdG8gZmVlbCBfX19fX19fX19cIiB3aXRoIGEgZHJvcGRvd24gb2Ygc2VsZWN0aW9ucy5cbi8vb3B0aW9ucyBjb3VsZCBpbmNsdWRlIHJlbGVpZiBmcm9tIGRlcHJlc3Npb24sIHBhaW4sIGFueGlldHksIGV0Yy4gb3Igc2ltcGx5IG1vb2RzIGxpa2UgaGFwcHksIHJlbGF4ZWQsIGh1bmdyeS4uLlxuLy91c2VyIHNlbGVjdHMgYW4gb3B0aW9uIGFuZCBhcmUgc2VydmVkIHN0cmFpbnMgdGhhdCBtYXRjaCB0aGF0IG9wdGlvbi5cbi8vc3RyYWlucyB3aWxsIGJlIGRpc3BsYXllZCB3aXRoIHJhbmRvbSBwaG90byAoc3RyZXRjaCBnb2FsIGlzIHRvIGhhdmUgYSByZWFsIG9uZSksIHRoZWlyIG5hbWUsIGZsYXZvdXJzLCBhbGwgZWZmZWN0cywgcmFjZS5cbi8vbmFtZSBwaG90byBhbmQgXG5cbmNvbnN0IGFwcCA9IHt9XG5hcHAuYXBpVXJsID0gJ2h0dHA6Ly9zdHJhaW5hcGkuZXZhbmJ1c3NlLmNvbS8nXG5hcHAuYXBpS2V5ID0gJ09jbkpnOE4nXG5hcHAuc2VhcmNoUXVlcnlFZmZlY3QgPSAnL3N0cmFpbnMvc2VhcmNoL2VmZmVjdC8nXG5hcHAuc2VhcmNoUXVlcnlOYW1lID0gJy9zdHJhaW5zL3NlYXJjaC9uYW1lLydcblxubGV0IHVzZXJTZWxlY3Rpb24gPSAnJ1xubGV0IHN0cmFpbnMxNSA9IFtdO1xubGV0IGRlc2NyaXB0MTUgPSBbXTtcbmxldCBkZXNjcmlwdFJlc3BvbnNlID0gJydcblxuXG5hcHAuZXZlbnRzID0gKCkgPT4ge1xuICAkKCdsaScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuLy9UUklBTFxuICAgICQoJy5lZmZlY3RzIC5zZWxlY3RlZCcpLnJlbW92ZUNsYXNzKCdzZWxlY3RlZCcpO1xuICAgICQoJy5lZmZlY3RzIGxhYmVsJykuYXR0cigndmFsdWUnLCAkKHRoaXMpLmF0dHIoJ3ZhbHVlJykpO1xuXG4gICBcbiAgICBcbiAgICBpZiAoJCh0aGlzKS5pcygnI2NsZWFyJykpIHtcbiAgICAgICQoJy5lZmZlY3RzIGxhYmVsJykudGV4dCgkKHRoaXMpLmF0dHIoJ3ZhbHVlJykpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdzZWxlY3RlZCcpO1xuICAgICAgJCgnLmVmZmVjdHMgbGFiZWwnKS50ZXh0KCQodGhpcykudGV4dCgpKTtcbiAgICB9XG4vL1RSSUFMXG4gICAgLy8gY29uc29sZS5sb2coJ2RpZCB0aGlzIHdvcms/Jyk7XG4gICAgdXNlclNlbGVjdGlvbiA9ICQodGhpcykuYXR0cigndmFsdWUnKTtcbiAgICAvLyBjb25zb2xlLmxvZyh1c2VyU2VsZWN0aW9uKTtcbiAgICBhcHAuZ2V0RWZmZWN0KHVzZXJTZWxlY3Rpb24pO1xuICB9KVxufVxuXG5cbmFwcC5nZXRFZmZlY3QgPSAodXNlcikgPT4ge1xuICBsZXQgZWZmZWN0ID0gdXNlclxuICAkLmFqYXgoe1xuICAgICAgdXJsOiBgJHthcHAuYXBpVXJsfSR7YXBwLmFwaUtleX0ke2FwcC5zZWFyY2hRdWVyeUVmZmVjdH0ke2VmZmVjdH1gLFxuICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgIGRhdGFUeXBlOiAnanNvbidcbiAgICB9KVxuICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgIGNvbnNvbGUubG9nKHJlcyk7XG4gICAgICAvL2ZpbmQgb3V0IHRoZSBudW1iZXIgb2Ygc3RyYWlucyBpbiB0aGUgdXNlcnMgc2VsZWN0ZWQgZWZmZWN0XG4gICAgICBjb25zb2xlLmxvZyhgbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBhcnJheTogJHtyZXMubGVuZ3RofWApO1xuICAgICAgLy9zZWxlY3QgYSByYW5kb20gbnVtYmVyIGZyb20gMCB0byB0aGUgbnVtYmVyIG9mIGl0ZW1zIGluIHRoZSBhcnJheVxuICAgICAgbGV0IHJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoKE1hdGgucmFuZG9tKCkgKiByZXMubGVuZ3RoKSArIDEpO1xuICAgICAgY29uc29sZS5sb2cocmFuZG9tTnVtYmVyKTtcbiAgICAgIC8vIGxvZyB0aGUgcmFuZG9tbHkgc2VsZWN0ZWQgbmFtZSBpbiB0aGUgdXNlcnMgc2VsZWN0ZWQgZWZmZWN0XG4gICAgICBjb25zb2xlLmxvZyhyZXNbcmFuZG9tTnVtYmVyXS5uYW1lKTtcblxuICAgICAgbGV0IHJhbmRvbVN0cmFpbiA9IHJlc1tyYW5kb21OdW1iZXJdLm5hbWU7XG4gICAgICBzdHJhaW5zMTUgPSBbXTtcbiAgICAgIC8vbWFrZSBhbiBhcnJheSB3aXRoIDE1IHJhbmRvbSBzdHJhaW5zIGdlbmVyYXRlZCBmcm9tIHRoZSB1c2VycyBjaG9zZW4gZWZmZWN0LlxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxNDsgaSsrKSB7XG4gICAgICAgIGxldCByYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKChNYXRoLnJhbmRvbSgpICogcmVzLmxlbmd0aCkgKyAxKTtcbiAgICAgICAgLy8gbG9nIHRoZSByYW5kb21seSBzZWxlY3RlZCBuYW1lIGluIHRoZSB1c2VycyBzZWxlY3RlZCBlZmZlY3RcbiAgICAgICAgbGV0IHJhbmRvbVN0cmFpbiA9IHJlc1tyYW5kb21OdW1iZXJdLm5hbWU7XG4gICAgICAgIGNvbnNvbGUubG9nKHJhbmRvbVN0cmFpbik7XG4gICAgICAgIHN0cmFpbnMxNS5wdXNoKHJhbmRvbVN0cmFpbik7XG4gICAgICB9XG5cbiAgICAgIC8vdGhpcyBpcyBhIHJhbmRvbWx5IGdlbmVyYXRlZCBhcnJheSBvZiAxNSBzdHJhaW5zIGluIHRoZSB1c2VycyBjaG9zZW4gZWZmZWN0IGNhdGVnb3J5LlxuICAgICAgY29uc29sZS5sb2coc3RyYWluczE1KTtcblxuXG4gICAgICBjb25zdCBnZXREZXNjcmlwdGlvbiA9IChuYW1lKSA9PiB7XG4gICAgICAgIHJldHVybiAkLmFqYXgoe1xuICAgICAgICAgIHVybDogYCR7YXBwLmFwaVVybH0ke2FwcC5hcGlLZXl9JHthcHAuc2VhcmNoUXVlcnlOYW1lfSR7bmFtZX1gLFxuICAgICAgICAgIC8vdXJsOiAnaHR0cDovL3N0cmFpbmFwaS5ldmFuYnVzc2UuY29tL09jbkpnOE4vc3RyYWlucy9zZWFyY2gvbmFtZS9Sb3lhbCUyMEt1c2gnLFxuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uUmVxdWVzdHMgPSBzdHJhaW5zMTUubWFwKGdldERlc2NyaXB0aW9uKVxuICAgICAgJC53aGVuKC4uLmRlc2NyaXB0aW9uUmVxdWVzdHMpXG4gICAgICAgIC50aGVuKCguLi5yZXNwb25zZXMpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZXMpO1xuICAgICAgICAgIHJlc3BvbnNlcyA9IHJlc3BvbnNlcy5tYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtWzBdWzBdXG4gICAgICAgICAgfSk7XG5cblxuXG4gICAgICAgICAgZGVzY3JpcHRSZXNwb25zZSA9IHJlc3BvbnNlcy5mb3JFYWNoKChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzcG9uc2UuZGVzYylcbiAgICAgICAgICAgIGRlc2NyaXB0MTUucHVzaChyZXNwb25zZS5kZXNjKTtcbiAgICAgICAgICB9KVxuXG5cbiAgICAgICAgICBhcHAuZGlzcGxheUVmZmVjdChzdHJhaW5zMTUsIGRlc2NyaXB0MTUpXG4gICAgICAgIH0pO1xuICAgICAgfSlcbiAgfVxuXG5cblxuYXBwLmRpc3BsYXlFZmZlY3QgPSBmdW5jdGlvbiAoc3RyYWluc0FycmF5LCBkZXNjQXJyYXkpIHtcbiAgLy8gY29uc29sZS5sb2coXCJ0aGlzIGlzIHRoZSByYW5kb20gc3RyYWlucyBhcnJheSBwYXNzZWQgaW50byBkaXNwbGF5IGVmZmVjdCBcIiArIHN0cmFpbnNBcnJheSk7XG4gIC8vIHdlIGNyZWF0ZWQgYSBmb3IgbG9vcCB0byBnbyB0aHJvdWdoIHRoZSBsZW5ndGggb2YgdGhlIGFycmF5XG4gIC8vIGNyZWF0ZSBodG1sIGNhcmQgZm9yIGVhY2ggaXRlbSBbaV1cbiAgLy9jb25zb2xlLmxvZyhgdGhpcyBpcyB3b3JraW5nICR7ZGVzY0FycmF5fWApO1xuICBjb25zb2xlLmxvZyhzdHJhaW5zQXJyYXksIGRlc2NBcnJheSk7XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdHJhaW5zQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAvLyB3ZSBpbnNlcnRlZCBhIHRlbXBsYXRlIGxpdGVyYWwgd2l0aCB0aGUgW2ldIGludG8gdGhlIGNhcmRcbiAgICAvLyBkaXNwbGF5aW5nIGEgZGlmZmVybnQgc3RyYWluIG5hbWVcbiAgICAkKCcucmVzdWx0c0NvbnRhaW5lcicpLmFwcGVuZChgPGRpdiBjbGFzcz1cImNhcmRcIj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZFRvcFwiPlxuICAgIDxmaWd1cmUgY2xhc3M9XCJjYXJkSW1hZ2VcIj48aW1nIHNyYz1cImFzc2V0cy9sZWFmLnBuZ1wiIGFsdD1cImNhbm5hYmlzIGxlYWZcIj48L2ZpZ3VyZT5cbiAgICA8L2Rpdj5cbiAgICA8ZGl2IGNsYXNzPVwiY2FyZEJvdHRvbVwiPlxuICAgIDxoMyBjbGFzcz1cInN0cmFpbk5hbWVcIj4ke3N0cmFpbnNBcnJheVtpXX08L2gzPlxuICAgIDxkaXYgY2xhc3M9XCJleHBhbmRcIj48YT48aSBjbGFzcyA9IFwiZmFzIGZhLXBsdXMtY2lyY2xlXCI+PC9pPjwvYT48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgICA8L2Rpdj5gKVxuXG4gICAgbGV0IGkgPSAxO1xuICAgICQoJy5jYXJkQm90dG9tJykuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAkKHRoaXMpLmFkZENsYXNzKCdteWNsYXNzJyArIGkpO1xuICAgICAgaSsrO1xuICAgIH0pO1xuXG4gICAgbGV0IHMgPSAxXG4gICAgJCgnLmV4cGFuZCcpLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgJCh0aGlzKS5hZGRDbGFzcygndHJpZ2dlcicgKyBzKTtcbiAgICAgIHMrKztcbiAgICB9KTtcbiAgfVxuXG5cbiAgICBsZXQgaiA9IDFcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRlc2NBcnJheS5sZW5ndGg7IGkrKykge1xuXG4gICAgICBcbiAgICAgICQoJy5teWNsYXNzJyArIGopLmFwcGVuZChgXG4gICAgPGRpdiBjbGFzcz1cImNhcmREZXNjclwiIGlkPVwibW9kYWxcIj5cbiAgICA8cD4ke2Rlc2NBcnJheVtpXX08L3A+XG4gICAgPC9kaXY+YClcbiAgICAgIGorK1xuXG5cblxuICAgICBcblxuXG4gIC8vIC8vTEVBTiBNT0RBTFxuICAvLyAkKCcuZmEtcGx1cy1jaXJjbGUnKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAvLyAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKVxuICAvLyAvLyAgICQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZCgnLmNhcmREZXNjcicpLnNsaWRlRG93bigpO1xuICAvLyAvLyAgIC8vICQoJy5jYXJkRGVzY3InKS5zbGlkZVVwKCk7XG4gIC8vIH0pO1xuXG5cblxuXG4gICAgICAkKCcuY2FyZERlc2NyJykuaGlkZSgpO1xuXG4gICAgICAvL0FMTCBESVNDUklQVElPTlMgQVBQRUFSIEFORCBUT0dHTEVcbiAgICAgIC8vICQoJy5mYS1wbHVzLWNpcmNsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIC8vICAgY29uc29sZS5sb2coXCJjbGlja2VkXCIpXG4gICAgICAvLyAgICQoJy5jYXJkRGVzY3InKS5zbGlkZURvd24oKTtcbiAgICAgIC8vICAgLy8kKCcuY2FyZERlc2NyJykuc2xpZGVVcCgpO1xuICAgICAgLy8gfSk7XG5cbiAgICAgIC8vT05MWSBDTElDS0VEIERFU0NSSVBUIEFQUEVBUlMsIEFMTCBCT1hFUyBUT0dHTEVcbiAgICAgICQoJy5mYS1wbHVzLWNpcmNsZScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiY2xpY2tlZFwiKVxuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoJy5jYXJkRGVzY3InKS5zbGlkZURvd24oKTtcbiAgICAgICAgLy8gJCgnLmNhcmREZXNjcicpLnNsaWRlVXAoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBISURFIERJU0NSSVBUSU9TTiBXSEVOIENMSUNLRURcbiAgICAgICQoJy5leHBhbmQnKS5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndGVzdCcpO1xuXG4gICAgICAgICAgICAkKCcuY2FyZERlc2NyJykuaGlkZSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgXG59XG5cbi8vICQoXCIjXCIpLmxlYW5Nb2RhbCgpO1xuXG5cbmFwcC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICBhcHAuZXZlbnRzKCk7XG59XG5cblxuJChmdW5jdGlvbiAoKSB7XG4gIGFwcC5pbml0KCk7XG59KTtcblxuXG4vLyBUUklBTFxuLy8gJChcIi5lZmZlY3RzIGxpXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbi8vICAgJChcIi5lZmZlY3RzIC5zZWxlY3RlZFwiKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbi8vICAgJChcIi5lZmZlY3RzIGxhYmVsXCIpLmF0dHIoJ3ZhbHVlJywgJCh0aGlzKS5hdHRyKCd2YWx1ZScpKTtcbi8vICAgaWYgKCQodGhpcykuaXMoXCIjY2xlYXJcIikpIHtcbi8vICAgICAkKFwiLmVmZmVjdHMgbGFiZWxcIikudGV4dCgkKHRoaXMpLmF0dHIoJ3ZhbHVlJykpO1xuLy8gICB9IGVsc2Uge1xuLy8gICAgICQodGhpcykuYWRkQ2xhc3MoJ3NlbGVjdGVkJyk7XG4vLyAgICAgJChcIi5lZmZlY3RzIGxhYmVsXCIpLnRleHQoJCh0aGlzKS50ZXh0KCkpO1xuLy8gICB9XG4vLyB9KTtcblxuXG4vLyBUUklBTCJdfQ==
