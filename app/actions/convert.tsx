import {getKeyTranspose, diatonicize} from '../theory/Key'
import {makeNoteMatrix} from '../theory/Note'

declare var require: any;

var MIDIUtils = require('midiutils');

const MidiWriter: any = require('midi-writer-js');

// Given the canvas complexity
// Returns dimensions of midi data (number of key values, number of event values)
export function getQuantScale(canvas: any): [number, number] {
  // Take complexity
  const numKeys = Math.max(Math.sqrt(canvas.complexity()), 12);
  const numTimes = Math.sqrt(canvas.complexity());

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
    Math.ceil(numTimes * (canvas.getWidth()/boundX))
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
        matrix[x][y] = 1;
      }
    }
  }

  return matrix;
}

export function generateMIDI(canvas: any) {
  let matrix = getMatrix(canvas);
  let transposeOffset = getKeyTranspose(matrix);
  matrix = diatonicize(matrix, transposeOffset);
  console.log(matrix);
  // TODO: make it music now plz
}

function getNoteName(noteVal: number): string {
  return MIDIUtils.noteNumberToName(noteVal).replace(/-/g, '');
}

export function example() {
  const track: any = new MidiWriter.Track();

  track.addEvent([
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
        new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
        new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
        new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
    ], function(event:any, index:any) {
      return {sequential:true};
    }
  );

  var write = new MidiWriter.Writer([track]);
  console.log(write.dataUri());
}
