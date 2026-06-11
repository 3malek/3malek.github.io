
(function(window) {

  var byeSpeaker = {};
  var speakWord = "Good Bye";

  byeSpeaker.speakFncObj = function speak(name) {
    console.log(speakWord + " " + name);
  }

  window.byeSpeaker = byeSpeaker;

})(window);