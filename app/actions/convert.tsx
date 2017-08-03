import {getKeyTranspose, diatonicize} from '../theory/Key'
import {makeNoteMatrix, NoteMatrix} from '../theory/Note'
import {drawNotes} from '../theory/Note'
import MidiWriter from '../theory/duckpunch'

declare var require: any;

var MIDIUtils = require('midiutils');

// Given the canvas complexity
// Returns dimensions of midi data (number of key values, number of event values)
export function getQuantScale(canvas: any): [number, number] {
  // Take complexity
  const numKeys  = Math.min(Math.max(Math.sqrt(canvas.complexity()*16), 12), 88);
  const numTimes = Math.min(Math.max(Math.sqrt(canvas.complexity()*16), 12), 100);

  // Get all paths and find the bounding box
  let bounds = {xMin: 99999, xMax: 0, yMin: 999999, yMax: 0};
  for (let o of canvas.getObjects()) {
    if (o.type !== 'path') {
      continue;
    }
    const rect = o.getBoundingRect();
    bounds.xMin = Math.min(bounds.xMin, rect.left);
    bounds.yMin = Math.min(bounds.yMin, rect.top);
    bounds.xMax = Math.max(rect.left + rect.width);
    bounds.yMax = Math.max(rect.top + rect.height);
  }

  // Scale by bounding box of the complexity to make sure
  // we get enough features
  var boundX = bounds.xMax - bounds.xMin;
  var boundY = bounds.yMax - bounds.yMin;
  return [
    Math.ceil(numKeys * (canvas.getHeight()/boundY)), 
    Math.ceil(numTimes * (canvas.getWidth()/boundX)),
  ];
}

export function getMatrix(canvas: any) {
  const scale = getQuantScale(canvas);
  const pixelSize = [canvas.getWidth() / scale[0], canvas.getHeight() / scale[1]];
  const matrix = makeNoteMatrix(scale[0], scale[1]); 

  const C4 = 60;
  let top = Math.floor(Math.min(C4 + scale[1] / 2, 127));

  // Loop through XY pixel clusters
  for (let x = 0; x < scale[0]; x++) {
    let notes: string[] = [];

    for (let y = scale[1] - 1; y >= 0; y--) {
      const pixelCluster = canvas.getContext("2d").getImageData(
        x * pixelSize[0], 
        y * pixelSize[1], 
        pixelSize[0], 
        pixelSize[1]
      ).data;

      let sumVal = 0;
      for (let i = 3; i < pixelCluster.length; i+=4) {
        sumVal += pixelCluster[i];
      }
      let average = Math.floor(sumVal / (pixelCluster.length / 4));

      if (average > 0) {
        matrix[x][scale[1] - y] = 1;
      }
    }
  }

  return matrix;
}

function sustain(matrix:NoteMatrix) {
  // Accumulate all values right-to-left, stopping when a zero is encountered.
  for (let time = matrix.length - 2; time > 0; time--) {
    for (let note = 0; note < matrix[0].length; note++) {
      if (matrix[time][note] && matrix[time+1][note]) {
        matrix[time][note] += matrix[time+1][note];
        if (matrix[time+1][note]) {
          matrix[time+1][note] = 0;
        }
      }
    }
  }
}

export function generateMIDI(canvas: any) {
  let matrix = getMatrix(canvas);
  let transposeOffset = getKeyTranspose(matrix);
  matrix = diatonicize(matrix, transposeOffset);
  sustain(matrix);
  drawNotes(canvas, matrix);
  matrixToMidi(matrix);
  // TODO: make it music now plz
}

function getNoteName(noteVal: number): string {
  return MIDIUtils.noteNumberToName(noteVal).replace(/-/g, '');
}

function getDuration(timeVal: number): string {
  let durationMap: {[key: number]: string} = {
    1: '4',
    2: '2',
    3: 'd2',
    4: '1'
  };

  return durationMap[timeVal];
}

export function matrixToMidi(matrix: NoteMatrix) {
  const track: any = new MidiWriter.Track();
  track.setTempo(120);

  const C4 = 60;
  let height = matrix[0].length;
  let bottom = C4 - Math.round(height / 2);

  for (let time = 0; time < matrix.length; time++) {
    let pitches: any = [];
    for (let note = 0; note < matrix[0].length; note++) {
      if (matrix[time] && matrix[time][note]) {
        let noteVal = bottom + note;
        pitches.push({wait: time, duration: matrix[time][note], pitch: noteVal});
      }
    }
    const event = new MidiWriter.NoteEvent({pitch: pitches});
    track.addEvent(event);
  }

  var write = new MidiWriter.Writer([track]);
  console.log(write.dataUri());
}
