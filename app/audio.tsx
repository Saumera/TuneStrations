

function midiNoteToFrequency(note: number) {
  return Math.pow(2, ((note-69)/12)) * 440;
}

var audioCtx = new ((window as any).AudioContext || (window as any).webkitAudioContext)()
var gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);
gainNode.gain.value = 0.05;

export function scheduleNote(note: number, time: number, duration: number) {
  const oscillator = audioCtx.createOscillator();
  oscillator.connect(gainNode);
  oscillator.type = 'square'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
  oscillator.frequency.value = midiNoteToFrequency(note); // value in hertz
  oscillator.start( time );
  oscillator.stop( time + duration );
  console.log('Note ' + note + ' @ ' + time + ' duration ' + duration);
}
