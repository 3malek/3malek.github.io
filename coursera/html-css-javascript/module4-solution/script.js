
(function () {

  var names = ["Yaakov", "John", "Jen", "Jason", "Paul", "Frank", "Larry", "Paula", "Laura", "Jim"];
  var lengthOfArray = names.length;

  for (var i=0; i<lengthOfArray; i++) {

    var name = names[i];
    var firstLetter = names[i].charAt(0);
    var firstLetterLowerCase = firstLetter.toLowerCase();

    if (firstLetterLowerCase == 'j') {
      byeSpeaker.speakFncObj(name);
    } 
    else {
      helloSpeaker.speakFncObj(name);
    }
  }

})();