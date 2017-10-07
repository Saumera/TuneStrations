import NoteMatrix from '../dataTypes/NoteMatrix'
import MidiWriter from './MidiWriter'

export function matrixToMidi(matrix: NoteMatrix) {
  const track: any = new MidiWriter.Track();
  track.setTempo(120);

  const C4 = 60;
  let height = matrix.height();
  let bottom = C4 - Math.round(height / 2);

  let pitches: any = [];
  for (let time = 0; time < matrix.width(); time++) {
    for (let note = 0; note < matrix.height(); note++) {
      if (matrix.get(time, note)) {
        let noteVal = bottom + note;
        pitches.push({wait: time, duration: matrix.get(time, note), pitch: noteVal});
      }
    }
  }
  const event = new MidiWriter.NoteEvent({pitch: pitches});
  track.addEvent(event);

  var write = new MidiWriter.Writer([track]);
  let midiUrl: any = write.dataUri();
  window.open(midiUrl);
  console.log(midiUrl);
}
