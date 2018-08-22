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
  });
};

// app.displayEffect = (effect) =>{
//   console.log(effect);

// }

app.init = function () {
  console.log('hey girl');
  app.events();
};

$(function () {
  app.init();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLE1BQU0sRUFBWjtBQUNFLElBQUksTUFBSixHQUFhLGlDQUFiO0FBQ0EsSUFBSSxNQUFKLEdBQWEsU0FBYjtBQUNBLElBQUksaUJBQUosR0FBd0IseUJBQXhCOztBQUVGLElBQUksZ0JBQWdCLEVBQXBCOztBQUVBLElBQUksTUFBSixHQUFhLFlBQU07QUFDbkIsSUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFFBQWIsRUFBdUIsVUFBUyxDQUFULEVBQVc7QUFDaEMsTUFBRSxjQUFGO0FBQ0E7QUFDQyxvQkFBZ0IsRUFBRSxpQkFBRixFQUFxQixHQUFyQixFQUFoQjtBQUNEO0FBQ0EsUUFBSSxTQUFKLENBQWMsYUFBZDtBQUNELEdBTkQ7QUFPQyxDQVJEOztBQVVBLElBQUksU0FBSixHQUFnQixVQUFDLElBQUQsRUFBUTtBQUN0QixNQUFJLFNBQVMsSUFBYjtBQUNBLElBQUUsSUFBRixDQUFPO0FBQ0wsY0FBTyxJQUFJLE1BQVgsR0FBb0IsSUFBSSxNQUF4QixHQUFpQyxJQUFJLGlCQUFyQyxHQUF5RCxNQURwRDtBQUVMLFlBQU8sS0FGRjtBQUdMLGNBQVM7QUFISixHQUFQLEVBS0MsSUFMRCxDQUtNLFVBQUMsR0FBRCxFQUFPO0FBQ1gsWUFBUSxHQUFSLENBQVksR0FBWjtBQUdELEdBVEQ7QUFVRCxDQVpEOztBQWNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBSSxJQUFKLEdBQVcsWUFBVTtBQUNuQixVQUFRLEdBQVIsQ0FBWSxVQUFaO0FBQ0EsTUFBSSxNQUFKO0FBRUQsQ0FKRDs7QUFNQSxFQUFFLFlBQVU7QUFDVixNQUFJLElBQUo7QUFDRCxDQUZEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiLy91c2VyIGFycml2ZXMgb24gcGFnZVxuLy91c2VyIGFza2VkIGZvciB0aGVpciBuYW1lIGFuZCBhZ2UuIGFnZSBtdXN0IGJlID49IDE5XG4vL2lmIHVzZXIgaXMgbm90ID49ICBzZXJ2ZSB1cCBhIHBhZ2UgdGhhdCBzYXlzIFwib29wcyB5b3UncmUgdG8geW91bmdcIlxuLy9pZiBhZ2UgcmVxdWlyZW1lbnQgaXMgbWV0LCBsb2FkIG1haW4gcGFnZVxuLy8gb24gbWFpbiBwYWdlIHdlIGdyZWV0IHRoZSB1c2VyIGFuZCBwcmVzZW50IHRoZW0gd2l0aCBhIG5hdHVyYWwgbGFuZ3VhZ2UgZmlsdGVyXG4vL25hdHVyYWwgbGFuZ3VhZ2UgZmlsdGVyIHNheXMgc29tZXRoaW5nIGxpa2UgXCJJIHdhbnQgdG8gZmVlbCBfX19fX19fX19cIiB3aXRoIGEgZHJvcGRvd24gb2Ygc2VsZWN0aW9ucy5cbi8vb3B0aW9ucyBjb3VsZCBpbmNsdWRlIHJlbGVpZiBmcm9tIGRlcHJlc3Npb24sIHBhaW4sIGFueGlldHksIGV0Yy4gb3Igc2ltcGx5IG1vb2RzIGxpa2UgaGFwcHksIHJlbGF4ZWQsIGh1bmdyeS4uLlxuLy91c2VyIHNlbGVjdHMgYW4gb3B0aW9uIGFuZCBhcmUgc2VydmVkIHN0cmFpbnMgdGhhdCBtYXRjaCB0aGF0IG9wdGlvbi5cbi8vc3RyYWlucyB3aWxsIGJlIGRpc3BsYXllZCB3aXRoIHJhbmRvbSBwaG90byAoc3RyZXRjaCBnb2FsIGlzIHRvIGhhdmUgYSByZWFsIG9uZSksIHRoZWlyIG5hbWUsIGZsYXZvdXJzLCBhbGwgZWZmZWN0cywgcmFjZS5cbi8vbmFtZSBwaG90byBhbmQgXG5cbmNvbnN0IGFwcCA9IHt9XG4gIGFwcC5hcGlVcmwgPSAnaHR0cDovL3N0cmFpbmFwaS5ldmFuYnVzc2UuY29tLydcbiAgYXBwLmFwaUtleSA9ICdPY25KZzhOJ1xuICBhcHAuc2VhcmNoUXVlcnlFZmZlY3QgPSAnL3N0cmFpbnMvc2VhcmNoL2VmZmVjdC8nXG5cbmxldCB1c2VyU2VsZWN0aW9uID0gJydcblxuYXBwLmV2ZW50cyA9ICgpID0+IHtcbiQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy8gY29uc29sZS5sb2coJ2RpZCB0aGlzIHdvcms/Jyk7XG4gICB1c2VyU2VsZWN0aW9uID0gJCgnb3B0aW9uOnNlbGVjdGVkJykudmFsKCk7XG4gIC8vIGNvbnNvbGUubG9nKHVzZXJTZWxlY3Rpb24pO1xuICBhcHAuZ2V0RWZmZWN0KHVzZXJTZWxlY3Rpb24pO1xufSlcbn1cblxuYXBwLmdldEVmZmVjdCA9ICh1c2VyKT0+e1xuICBsZXQgZWZmZWN0ID0gdXNlclxuICAkLmFqYXgoe1xuICAgIHVybDpgJHthcHAuYXBpVXJsfSR7YXBwLmFwaUtleX0ke2FwcC5zZWFyY2hRdWVyeUVmZmVjdH0ke2VmZmVjdH1gLFxuICAgIG1ldGhvZDonR0VUJyxcbiAgICBkYXRhVHlwZTonanNvbidcbiAgfSlcbiAgLnRoZW4oKHJlcyk9PntcbiAgICBjb25zb2xlLmxvZyhyZXMpO1xuICAgIFxuXG4gIH0pXG59XG5cbi8vIGFwcC5kaXNwbGF5RWZmZWN0ID0gKGVmZmVjdCkgPT57XG4vLyAgIGNvbnNvbGUubG9nKGVmZmVjdCk7XG4gIFxuLy8gfVxuXG5hcHAuaW5pdCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUubG9nKCdoZXkgZ2lybCcpO1xuICBhcHAuZXZlbnRzKCk7XG4gIFxufVxuXG4kKGZ1bmN0aW9uKCl7XG4gIGFwcC5pbml0KCk7XG59KTsiXX0=
