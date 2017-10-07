import 'fabric'
import {getBounds, CanvasBounds} from '../actions/generate'

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

export function copyMatrix(matrix: NoteMatrix): NoteMatrix {
  return matrix.map((m) => { return m.slice() });
}

export function drawNotes(canvas: any, matrix: NoteMatrix) {
  const bounds = getBounds(canvas);

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
}
