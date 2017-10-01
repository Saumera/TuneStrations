import {NoteMatrix} from './theory/Note'

export class Loop {
  private audioCtx: any;
  private gainNode: any;
  private oscillators: any[];
  private matrix: NoteMatrix;

  constructor(matrix: NoteMatrix) {
    this.audioCtx = new ((window as any)
        .AudioContext || (window as any)
        .webkitAudioContext
    )();
    this.gainNode = this.audioCtx.createGain();
    this.oscillators = [];
    this.matrix = matrix;

    this.gainNode.connect(this.audioCtx.destination);
    this.gainNode.gain.value = 0.2;
  }

  registerOscillator(oscillator: any) {
    this.oscillators.push(oscillator);
  }

  stopOscillators() {
    this.oscillators.map(function(o) {
      o.stop();
    })

    this.oscillators = [];
  }

  scheduleNotes() {

    const C4 = 60;
    let bottom = C4 - Math.round(this.matrix[0].length / 2);

    const startTime = this.audioCtx.currentTime;

    for (let time = 0; time < this.matrix.length; time++) {
      for (let note = 0; note < this.matrix[0].length; note++) {
        if (this.matrix[time] && this.matrix[time][note]) {
          let noteVal = bottom + note;
          const oscillator = this.audioCtx.createOscillator();
          oscillator.connect(this.gainNode);
          this.registerOscillator(oscillator);

          oscillator.type = 'triangle'; // sine wave — other values are 'square', 'sawtooth', 'triangle' and 'custom'
          oscillator.frequency.value = this.midiNoteToFrequency(noteVal); // value in hertz
          oscillator.start( startTime + 1 + time*0.4 );
          oscillator.stop( startTime + 1 + time*0.4 + this.matrix[time][note]*0.4);
        }
      }
    }
  }

  private midiNoteToFrequency(note: number) {
    return Math.pow(2, ((note-69)/12)) * 440;
  }
}
