//playNote
var freqs = {
	"Cn":261.626,
	"C#":277.183,
	"Db":277.183,
	"Dn":293.665,
	"D#":311.127,
	"Eb":311.127,
	"En":329.628,
	"Fb":329.628,
	"E#":349.228,
	"Fn":349.228,
	"F#":369.994,
	"Gb":369.994,
	"Gn":391.995,
	"G#":415.305,
	"Ab":415.305,
	"An":440.000,
	"A#":466.164,
	"Bb":466.164,
	"Bn":493.883,
	"Cb":493.883
}
var sin = T("sin");

function getFreq(note,octave) {
	return freqs[note] * Math.pow(2,(octave-4));
}

// takes in note name (letter followed by #, n, or b)
function playNote(note,octave) {
	sin.set({freq:getFreq(note,octave)});
}

function start() {
	sin.play();
}

function stop() {
	sin.pause();
}

// var synth = T("OscGen", {wave:"saw", mul:0.25}).play();

// var keydict = T("ndict.key");
// var midicps = T("midicps");
// T("keyboard").on("keydown", function(e) {
//   var midi = keydict.at(e.keyCode);
//   if (midi) {
//     var freq = midicps.at(midi);
//     synth.noteOnWithFreq(freq, 100);
//   }
// }).on("keyup", function(e) {
//   var midi = keydict.at(e.keyCode);
//   if (midi) {
//     synth.noteOff(midi, 100);
//   }
// }).start();