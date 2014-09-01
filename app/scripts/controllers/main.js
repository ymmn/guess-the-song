'use strict';

angular.module('guessTheSongApp')
  .controller('MainCtrl', function($scope) {

    var mostCommonNotes = [];
    var unlockedNotesIndex = 1;

    var calculateMostCommonNotes = function(notes) {
      var notesToCount = {};
      for (var i = 0; i < notes.length; i++) {
        var noteNumber = notes[i].noteNumber;
        if (notesToCount[noteNumber] === undefined) {
          notesToCount[noteNumber] = 1;
        } else {
          notesToCount[noteNumber] += 1;
        }
      }
      return Object.keys(notesToCount).sort(function(a, b) {
        return notesToCount[a] - notesToCount[b];
      });
    };

    $scope.unlockOneMoreNote = function() {
      // var noteToUnlock = mostCommonNotes[unlockedNotesIndex];
      // unlockedNotesIndex++;
      // // window.SongPlayer.unlockNote(noteToUnlock);
      // window.SongPlayer.stop();
    };

    $scope.playSong = function() {
      var abcSong = $scope.abcMusicString;
      $scope.beatTimeFormat = window.convertAbcToBeatTimeFormat(window.parser(abcSong));
      mostCommonNotes = calculateMostCommonNotes($scope.beatTimeFormat.notes);
      window.SongPlayer.lockAllNotes(mostCommonNotes[0]);
      window.SongPlayer.playSong($scope.beatTimeFormat);
    };

    $scope.abcMusicString = 'X: 2\nT: Twinkle Little Star\nR: reel\nM: 4/4\nL: 1/8\nK: Cmaj\nC2C2G2G2|A2A2G4|F2F2E2E2|D2D2C4|\nG2G2F2F2|E2E2D4|G2G2F2F2|E2E2D4|\nC2C2G2G2|A2A2G4|F2F2E2E2|D2D2C4:|';

  });
