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
    if(document.getElementsByClassName('Marquee__wrapper__content')[0]) {
        var t = document.getElementsByClassName('Marquee__wrapper__content')[0].innerHTML;
    }
    else {
        var t = document.getElementsByClassName('Marquee__wrapper__content__child')[0].innerHTML;
    }
    return {
        'title': t,
        'artist': document.getElementsByClassName('nowPlayingTopInfo__current__artistName')[0].innerHTML,
        'album': document.getElementsByClassName('nowPlayingTopInfo__current__albumName')[0].innerHTML
    };
};

var checkForNewTrack = setInterval(function () {
    var track = fetchTrackInfo();

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
    var d = new Date();
    var t = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    console.log(titleInfo + " " + artistInfo + " " + t);
    var thumbDownButton = document.getElementsByClassName("TunerControl ThumbDownButton Tuner__Control__Button Tuner__Control__ThumbDown__Button");
    if(isLive(title) || isBlacklisted(artist)) {
        thumbDownButton[0].click();
    };
}
