// PanDoorUh ++
// Written by Nick Warner, 2019
// GPL 3 (Full license in COPYING file)

var title = '';
var artist = '';
var album = '';

var artistBlacklist = [
  'Artist01',
  'Artist02',
  'Artist03'
];

var fetchTrackInfo = function() {
    return {
        'title': $('.nowPlayingTopInfo__current__trackName').filter(":first").text(),
        'artist': $('.nowPlayingTopInfo__current__artistName').filter(":first").text(),
        'album': $('.nowPlayingTopInfo__current__albumName').filter(":first").text()
    };
};

var checkForNewTrack = setInterval(function () {
    var track = fetchTrackInfo();

    if($('.MiniCoachmarkBingeSkipper__x')) {
       $('.MiniCoachmarkBingeSkipper__x').click();
    }

    if (title != track.title || artist != track.artist || album != track.album) {
    	title = track.title ;
    	artist = track.artist;
    	album = track.album;
        analyzeTrack();
    }

}, 2000);

var isLive = function(t) {
    if( t.includes("(Live") || t.includes("[Live") || t.includes("Live)") ) {
        return true;
    }
    else {
        return false;
    }
};

var isBlacklisted = function(name) {
    var blacklisted = false;
    artistBlacklist.forEach(val => { if(name.includes(val)) blacklisted = true; });
    return blacklisted;
};

function analyzeTrack() {
    var titleInfo = title + ( isLive(title) ? " is a live track." : " is a studio track." );
    var artistInfo = artist + (isBlacklisted(artist) ? " is blacklisted." : " is not blacklisted.");
    console.log(titleInfo + " " + artistInfo);
    var thumbDownButton = document.getElementsByClassName("TunerControl ThumbDownButton Tuner__Control__Button Tuner__Control__ThumbDown__Button");
    if(isLive(title) || isBlacklisted(artist)) {
        thumbDownButton[0].click();
    };
}
