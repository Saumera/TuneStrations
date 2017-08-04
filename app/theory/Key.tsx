/* Some notes here:
 * We have a couple ways we could move forward from here.  One is that we begin applying
 * the concept of a groove.  This would give the rhythm some kind of shape.

 * We could also look into applying some kind of harmonic filter or adjuster.
 * Chord progressions, cadences, etc.
 */


import {NoteMatrix, makeNoteMatrix} from './Note'

const chromaticIntervals: number[] = [0, 2, 4, 5, 7, 9, 11];

export function getKeyTranspose(m: NoteMatrix): number {
	const counters = new Array(12);
	for (let i = 0; i < 12; i++) {
		counters[i] = 0;
	}

  for (let t = 0; t < m.length; t++) {
    for (let n = 0; n < m[0].length; n++) {
      if (m[t][n] === null) {
        continue;
      }

      for (let i of chromaticIntervals) {
        counters[n % 12] += m[t][n+i];
      }

    }
  }

  let max = 0;
  let maxIdx = 0;
  for (let c = 0; c < counters.length; c++) {
    if (max < counters[c]) {
      max = counters[c];
      maxIdx = c;
    }
  }
  return maxIdx;
}

export function diatonicize(matrix: NoteMatrix, offset: number): NoteMatrix {
  let newMatrix: NoteMatrix = makeNoteMatrix(matrix.length, matrix[0].length);

  for (let time = 0; time < matrix.length; time++) {
    for (let note = 0; note < matrix[0].length; note++) {
      if (chromaticIntervals.indexOf((note - offset + 12) % 12) === -1
          && matrix[time][note] !== 0) {
        newMatrix[time][note] = 0;
        if (note !== 0) {
          newMatrix[time][note - 1] = 1;
        }
      } else {
        newMatrix[time][note] = matrix[time][note];
      }
    }
  }

  return newMatrix;
}
