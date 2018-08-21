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
app.apiURL = 'http://strainapi.evanbusse.com/';
app.apiKey = 'OcnJg8N';
app.searchQueryEffect = '/strains/search/effect/';

$('form').on('submit', function (e) {
  e.preventDefault();
  console.log('did this work?');
  var userSelection = $('option:selected').val();
  console.log(userSelection);
});

// app.getEffect = (query) => {

//     //use $.ajax to make our request to the server
//     $.ajax({
//       url: `${app.apiURL}${app.apiKey}${app.searchQueryEffect}`,
//       method: 'GET',
//       dataType: 'json'
//     });

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkZXYvc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNLE1BQU0sRUFBWjtBQUNBLElBQUksTUFBSixHQUFhLGlDQUFiO0FBQ0EsSUFBSSxNQUFKLEdBQWEsU0FBYjtBQUNBLElBQUksaUJBQUosR0FBd0IseUJBQXhCOztBQUdBLEVBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxRQUFiLEVBQXVCLFVBQVMsQ0FBVCxFQUFXO0FBQ2hDLElBQUUsY0FBRjtBQUNBLFVBQVEsR0FBUixDQUFZLGdCQUFaO0FBQ0EsTUFBTSxnQkFBZ0IsRUFBRSxpQkFBRixFQUFxQixHQUFyQixFQUF0QjtBQUNBLFVBQVEsR0FBUixDQUFZLGFBQVo7QUFDRCxDQUxEOztBQVNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsIi8vdXNlciBhcnJpdmVzIG9uIHBhZ2Vcbi8vdXNlciBhc2tlZCBmb3IgdGhlaXIgbmFtZSBhbmQgYWdlLiBhZ2UgbXVzdCBiZSA+PSAxOVxuLy9pZiB1c2VyIGlzIG5vdCA+PSAgc2VydmUgdXAgYSBwYWdlIHRoYXQgc2F5cyBcIm9vcHMgeW91J3JlIHRvIHlvdW5nXCJcbi8vaWYgYWdlIHJlcXVpcmVtZW50IGlzIG1ldCwgbG9hZCBtYWluIHBhZ2Vcbi8vIG9uIG1haW4gcGFnZSB3ZSBncmVldCB0aGUgdXNlciBhbmQgcHJlc2VudCB0aGVtIHdpdGggYSBuYXR1cmFsIGxhbmd1YWdlIGZpbHRlclxuLy9uYXR1cmFsIGxhbmd1YWdlIGZpbHRlciBzYXlzIHNvbWV0aGluZyBsaWtlIFwiSSB3YW50IHRvIGZlZWwgX19fX19fX19fXCIgd2l0aCBhIGRyb3Bkb3duIG9mIHNlbGVjdGlvbnMuXG4vL29wdGlvbnMgY291bGQgaW5jbHVkZSByZWxlaWYgZnJvbSBkZXByZXNzaW9uLCBwYWluLCBhbnhpZXR5LCBldGMuIG9yIHNpbXBseSBtb29kcyBsaWtlIGhhcHB5LCByZWxheGVkLCBodW5ncnkuLi5cbi8vdXNlciBzZWxlY3RzIGFuIG9wdGlvbiBhbmQgYXJlIHNlcnZlZCBzdHJhaW5zIHRoYXQgbWF0Y2ggdGhhdCBvcHRpb24uXG4vL3N0cmFpbnMgd2lsbCBiZSBkaXNwbGF5ZWQgd2l0aCByYW5kb20gcGhvdG8gKHN0cmV0Y2ggZ29hbCBpcyB0byBoYXZlIGEgcmVhbCBvbmUpLCB0aGVpciBuYW1lLCBmbGF2b3VycywgYWxsIGVmZmVjdHMsIHJhY2UuXG4vL25hbWUgcGhvdG8gYW5kIFxuXG5jb25zdCBhcHAgPSB7fVxuYXBwLmFwaVVSTCA9ICdodHRwOi8vc3RyYWluYXBpLmV2YW5idXNzZS5jb20vJ1xuYXBwLmFwaUtleSA9ICdPY25KZzhOJ1xuYXBwLnNlYXJjaFF1ZXJ5RWZmZWN0ID0gJy9zdHJhaW5zL3NlYXJjaC9lZmZlY3QvJ1xuXG5cbiQoJ2Zvcm0nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgY29uc29sZS5sb2coJ2RpZCB0aGlzIHdvcms/Jyk7XG4gIGNvbnN0IHVzZXJTZWxlY3Rpb24gPSAkKCdvcHRpb246c2VsZWN0ZWQnKS52YWwoKTtcbiAgY29uc29sZS5sb2codXNlclNlbGVjdGlvbik7XG59KVxuXG5cblxuLy8gYXBwLmdldEVmZmVjdCA9IChxdWVyeSkgPT4ge1xuXG4vLyAgICAgLy91c2UgJC5hamF4IHRvIG1ha2Ugb3VyIHJlcXVlc3QgdG8gdGhlIHNlcnZlclxuLy8gICAgICQuYWpheCh7XG4vLyAgICAgICB1cmw6IGAke2FwcC5hcGlVUkx9JHthcHAuYXBpS2V5fSR7YXBwLnNlYXJjaFF1ZXJ5RWZmZWN0fWAsXG4vLyAgICAgICBtZXRob2Q6ICdHRVQnLFxuLy8gICAgICAgZGF0YVR5cGU6ICdqc29uJ1xuLy8gICAgIH0pOyJdfQ==
