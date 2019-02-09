// This chunk of code gets the data from the page

var getSongContainer = function(){
  var songContainer = document.getElementsByClassName("Marquee__wrapper__content");
  if (typeof songContainer[0] == 'undefined'){
    songContainer = document.getElementsByClassName("Marquee__wrapper__content__child");
  }
  return songContainer[0];
};

var getSongTitle = function(){
  return getSongContainer().innerText;
};

var getArtist = function(){
  var artistContainer = document.getElementsByClassName("nowPlayingTopInfo__current__artistName nowPlayingTopInfo__current__link");
  return artistContainer[0].innerText;
};




// This chunk of code pushes thumb down if the artist is blacklisted
// Change the strings in the following array to artists you don't want to hear
var artistBlacklist = [
  'Artist01',
  'Artist02',
  'Artist03'
];

var thumbDownIfArtistBlacklisted = function(){
  var artist = getArtist();
  var isBlacklisted = false;
  var thumbDownButton = document.getElementsByClassName("TunerControl ThumbDownButton Tuner__Control__Button Tuner__Control__ThumbDown__Button");
  artistBlacklist.forEach(function(elem, index, arr){
    if (artist.includes(elem)) isBlacklisted = true;
  });
  console.log(artist + (isBlacklisted ? " is blacklisted" : " is not blacklisted"));
  if (isBlacklisted) thumbDownButton[0].click();
};




// This chunk of code pushes thumb down if the track is live

var isLive = function(title){
  if ( title.includes("(Live") || title.includes("[Live") || title.includes("Live)") )
    return true;
  else
    return false;
};

var thumbDownIfLive = function(){
  var songTitle = getSongTitle();
  var thumbDownButton = document.getElementsByClassName("TunerControl ThumbDownButton Tuner__Control__Button Tuner__Control__ThumbDown__Button");
  console.log(songTitle + (isLive(songTitle) ? " is live" : " is a studio track") );
  if (isLive(songTitle)) thumbDownButton[0].click();
};




var performChecks = function(){
  thumbDownIfLive();
  thumbDownIfArtistBlacklisted();
};
performChecks();




// This chunk of code monitors for song changes

var aboutArtist = document.getElementsByClassName("NowPlaying__belowFold");

// Select the node that will be observed for mutations
var targetNode = aboutArtist[0];

// Options for the observer (which mutations to observe)
var config = { attributes: true, characterData: true, childList: true, subtree: true };

// Callback function to execute when mutations are observed
var callback = function(mutationsList, observer) {
  performChecks();
};

// Create an observer instance linked to the callback function
var observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
