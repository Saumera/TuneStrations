import 'fabric'
import {getBounds, CanvasBounds} from '../actions/convert'

declare let fabric: any;


/** Utility function to create a K:V from a list of strings */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export const Key = strEnum(['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B']);
export type Key = keyof typeof Key;

export function makeNoteMatrix(w: number, h: number): NoteMatrix {
  let array: number[][] = [];
  for (let i = 0; i < w; i++) {
    array[i] = [];
    for (let j = 0; j < h; j++) {
      array[i][j] = 0;
    }
  }

  return array;
}

export type NoteMatrix = number[][];


export function drawNotes(canvas: any, matrix: NoteMatrix) {
  const bounds = getBounds(canvas);
  canvas.add(new fabric.Rect({
    left: bounds.xMin,
    top: bounds.yMin,
    width: (bounds.xMax - bounds.xMin),
    height: (bounds.yMax - bounds.yMin),
    stroke: 'orange',
    fill: 'transparent',
    strokeWidth: 1,
  }));

  const [pX, pY] = [
    Math.ceil((bounds.xMax - bounds.xMin) / matrix.length), 
    Math.ceil((bounds.yMax - bounds.yMin) / matrix[0].length)
  ];

  for (let time = 0; time < matrix.length; time++) {
    for (let note = 0; note < matrix[0].length; note++) {
      if (!matrix[time][note]) {
        continue;
      }
      var rect = new fabric.Rect({
        left: bounds.xMin + time * pX,
        top: bounds.yMin + (matrix[0].length - note) * pY,
        width: pX * matrix[time][note],
        height: pY,
        fill: 'blue',
        stroke: 'grey',
        strokeWidth: 1,
      });
      canvas.add(rect);
    }
  }

  // Draw a baseline at C4 and additional octave lines
  const C4 = Math.round(matrix[0].length / 2);
  for (let note = (C4 % 12); note < matrix[0].length; note += 12) {
    const top = bounds.yMin + (matrix[0].length - note) * pY;
    canvas.add(new fabric.Line(
      [0, top, canvas.getWidth(), top], 
      {
        fill: 'grey',
        stroke: 'grey',
        strokeWidth: (note === C4) ? 3 : 1,
        selectable: false
      }));
  }
}
