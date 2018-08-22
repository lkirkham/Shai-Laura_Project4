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
    // console.log(res[this].name);
    var randomNumber = Math.floor(Math.random() * res.length) + 1;
    console.log(randomNumber);

    var randomStrain = res[randomNumber].name;
    app.displayEffect(randomStrain);
    //console.log(randomStrain);
  });
};

app.displayEffect = function (strain) {
  //let item = Math.floor(Math.random)*userSelection[item].length;
  console.log(strain);
};

app.init = function () {
  console.log('hey girl');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLE1BQU0sRUFBWjtBQUNFLElBQUksTUFBSixHQUFhLGlDQUFiO0FBQ0EsSUFBSSxNQUFKLEdBQWEsU0FBYjtBQUNBLElBQUksaUJBQUosR0FBd0IseUJBQXhCOztBQUVGLElBQUksZ0JBQWdCLEVBQXBCOztBQUVBLElBQUksTUFBSixHQUFhLFlBQU07QUFDbkIsSUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBUyxDQUFULEVBQVc7QUFDaEMsTUFBRSxjQUFGO0FBQ0E7QUFDQyxvQkFBZ0IsRUFBRSxpQkFBRixFQUFxQixHQUFyQixFQUFoQjtBQUNEO0FBQ0EsUUFBSSxTQUFKLENBQWMsYUFBZDtBQUNELEdBTkQ7QUFPQyxDQVJEOztBQVVBLElBQUksU0FBSixHQUFnQixVQUFDLElBQUQsRUFBUTtBQUN0QixNQUFJLFNBQVMsSUFBYjtBQUNBLElBQUUsSUFBRixDQUFPO0FBQ0wsY0FBTyxJQUFJLE1BQVgsR0FBb0IsSUFBSSxNQUF4QixHQUFpQyxJQUFJLGlCQUFyQyxHQUF5RCxNQURwRDtBQUVMLFlBQU8sS0FGRjtBQUdMLGNBQVM7QUFISixHQUFQLEVBS0MsSUFMRCxDQUtNLFVBQUMsR0FBRCxFQUFPO0FBQ1gsWUFBUSxHQUFSLENBQVksR0FBWjtBQUNBO0FBQ0EsUUFBSSxlQUFnQixLQUFLLEtBQUwsQ0FBVyxLQUFLLE1BQUwsS0FBZ0IsSUFBSSxNQUEvQixJQUF5QyxDQUE3RDtBQUNBLFlBQVEsR0FBUixDQUFZLFlBQVo7O0FBRUEsUUFBSSxlQUFlLElBQUksWUFBSixFQUFrQixJQUFyQztBQUNBLFFBQUksYUFBSixDQUFrQixZQUFsQjtBQUNBO0FBRUQsR0FmRDtBQWdCRCxDQWxCRDs7QUFvQkEsSUFBSSxhQUFKLEdBQW9CLFVBQVMsTUFBVCxFQUFnQjtBQUNqQztBQUNBLFVBQVEsR0FBUixDQUFZLE1BQVo7QUFHRixDQUxEOztBQU9BLElBQUksSUFBSixHQUFXLFlBQVU7QUFDbkIsVUFBUSxHQUFSLENBQVksVUFBWjtBQUNBLE1BQUksTUFBSjtBQUVELENBSkQ7O0FBTUEsRUFBRSxZQUFVO0FBQ1YsTUFBSSxJQUFKO0FBQ0QsQ0FGRDs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vdXNlciBhcnJpdmVzIG9uIHBhZ2Vcbi8vdXNlciBhc2tlZCBmb3IgdGhlaXIgbmFtZSBhbmQgYWdlLiBhZ2UgbXVzdCBiZSA+PSAxOVxuLy9pZiB1c2VyIGlzIG5vdCA+PSAgc2VydmUgdXAgYSBwYWdlIHRoYXQgc2F5cyBcIm9vcHMgeW91J3JlIHRvIHlvdW5nXCJcbi8vaWYgYWdlIHJlcXVpcmVtZW50IGlzIG1ldCwgbG9hZCBtYWluIHBhZ2Vcbi8vIG9uIG1haW4gcGFnZSB3ZSBncmVldCB0aGUgdXNlciBhbmQgcHJlc2VudCB0aGVtIHdpdGggYSBuYXR1cmFsIGxhbmd1YWdlIGZpbHRlclxuLy9uYXR1cmFsIGxhbmd1YWdlIGZpbHRlciBzYXlzIHNvbWV0aGluZyBsaWtlIFwiSSB3YW50IHRvIGZlZWwgX19fX19fX19fXCIgd2l0aCBhIGRyb3Bkb3duIG9mIHNlbGVjdGlvbnMuXG4vL29wdGlvbnMgY291bGQgaW5jbHVkZSByZWxlaWYgZnJvbSBkZXByZXNzaW9uLCBwYWluLCBhbnhpZXR5LCBldGMuIG9yIHNpbXBseSBtb29kcyBsaWtlIGhhcHB5LCByZWxheGVkLCBodW5ncnkuLi5cbi8vdXNlciBzZWxlY3RzIGFuIG9wdGlvbiBhbmQgYXJlIHNlcnZlZCBzdHJhaW5zIHRoYXQgbWF0Y2ggdGhhdCBvcHRpb24uXG4vL3N0cmFpbnMgd2lsbCBiZSBkaXNwbGF5ZWQgd2l0aCByYW5kb20gcGhvdG8gKHN0cmV0Y2ggZ29hbCBpcyB0byBoYXZlIGEgcmVhbCBvbmUpLCB0aGVpciBuYW1lLCBmbGF2b3VycywgYWxsIGVmZmVjdHMsIHJhY2UuXG4vL25hbWUgcGhvdG8gYW5kIFxuXG5jb25zdCBhcHAgPSB7fVxuICBhcHAuYXBpVXJsID0gJ2h0dHA6Ly9zdHJhaW5hcGkuZXZhbmJ1c3NlLmNvbS8nXG4gIGFwcC5hcGlLZXkgPSAnT2NuSmc4TidcbiAgYXBwLnNlYXJjaFF1ZXJ5RWZmZWN0ID0gJy9zdHJhaW5zL3NlYXJjaC9lZmZlY3QvJ1xuXG5sZXQgdXNlclNlbGVjdGlvbiA9ICcnXG5cbmFwcC5ldmVudHMgPSAoKSA9PiB7XG4kKCdmb3JtJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vIGNvbnNvbGUubG9nKCdkaWQgdGhpcyB3b3JrPycpO1xuICAgdXNlclNlbGVjdGlvbiA9ICQoJ29wdGlvbjpzZWxlY3RlZCcpLnZhbCgpO1xuICAvLyBjb25zb2xlLmxvZyh1c2VyU2VsZWN0aW9uKTtcbiAgYXBwLmdldEVmZmVjdCh1c2VyU2VsZWN0aW9uKTtcbn0pXG59XG5cbmFwcC5nZXRFZmZlY3QgPSAodXNlcik9PntcbiAgbGV0IGVmZmVjdCA9IHVzZXJcbiAgJC5hamF4KHtcbiAgICB1cmw6YCR7YXBwLmFwaVVybH0ke2FwcC5hcGlLZXl9JHthcHAuc2VhcmNoUXVlcnlFZmZlY3R9JHtlZmZlY3R9YCxcbiAgICBtZXRob2Q6J0dFVCcsXG4gICAgZGF0YVR5cGU6J2pzb24nXG4gIH0pXG4gIC50aGVuKChyZXMpPT57XG4gICAgY29uc29sZS5sb2cocmVzKTtcbiAgICAvLyBjb25zb2xlLmxvZyhyZXNbdGhpc10ubmFtZSk7XG4gICAgbGV0IHJhbmRvbU51bWJlciA9IChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiByZXMubGVuZ3RoKSArIDEpO1xuICAgIGNvbnNvbGUubG9nKHJhbmRvbU51bWJlcik7XG4gICAgXG4gICAgbGV0IHJhbmRvbVN0cmFpbiA9IHJlc1tyYW5kb21OdW1iZXJdLm5hbWU7XG4gICAgYXBwLmRpc3BsYXlFZmZlY3QocmFuZG9tU3RyYWluKTtcbiAgICAvL2NvbnNvbGUubG9nKHJhbmRvbVN0cmFpbik7XG4gICAgXG4gIH0pO1xufVxuXG5hcHAuZGlzcGxheUVmZmVjdCA9IGZ1bmN0aW9uKHN0cmFpbil7XG4gICAvL2xldCBpdGVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSkqdXNlclNlbGVjdGlvbltpdGVtXS5sZW5ndGg7XG4gICBjb25zb2xlLmxvZyhzdHJhaW4pO1xuXG4gIFxufVxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKCdoZXkgZ2lybCcpO1xuICBhcHAuZXZlbnRzKCk7XG4gIFxufVxuXG4kKGZ1bmN0aW9uKCl7XG4gIGFwcC5pbml0KCk7XG59KTtcblxuXG4vLyBpbnNpZGUgd2Ugd2FudCB0byBwdXQgYSB2YXJhdWJsZSBpbnNpZGUgW10gb2Ygb3VyIGFycmF5XG4vLyB2YXJpYWJsZSB3aWxsIGdlbmVyYXRlIHJhbmRvbSBudW1iZXIgdGhhdCB3aWxsIGdvIGludG8gW11cbi8vIHBhcmEgMCAtIGVuZCBvZiBhcnJheSAtMVxuLy8gYXJyYXkubGVuZ3RoIFxuLy8gcmVzLmxlbmd0aCBcbi8vIHJhbmRvbSBudWJlbWVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSkoKSpyZXMubGVuZ3RoIFxuLy8gZm9yKGxldCBpdGVtID0gMDsgaXRlbSA+IHJlcy5sZW5ndGggPiBpdGVtKyspIl19
