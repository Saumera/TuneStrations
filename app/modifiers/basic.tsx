import NoteMatrix from '../dataTypes/NoteMatrix'

const chromaticIntervals: number[] = [0, 2, 4, 5, 7, 9, 11];

function getKeyTranspose(m: NoteMatrix): number {
	const counters = new Array(12);
	for (let i = 0; i < 12; i++) {
		counters[i] = 0;
	}

  for (let t = 0; t < m.width(); t++) {
    for (let n = 0; n < m.height(); n++) {
      if (m.get(t, n) === null) {
        continue;
      }

      for (let i of chromaticIntervals) {
        counters[n % 12] += m.get(t, n+i);
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

export function diatonicize(matrix: NoteMatrix): NoteMatrix {
  const offset: number = getKeyTranspose(matrix);
  let newMatrix: NoteMatrix = new NoteMatrix(matrix.width(), matrix.height());

  for (let time = 0; time < matrix.width(); time++) {
    for (let note = 0; note < matrix.height(); note++) {
      if (chromaticIntervals.indexOf((note - offset + 12) % 12) === -1
          && matrix.get(time, note) !== 0) {
        newMatrix.set(time, note, 0);
        if (note !== 0) {
          newMatrix.set(time, note-1, 1);
        }
      } else {
        newMatrix.set(time, note, matrix.get(time, note));
      }
    }
  }

  return newMatrix;
}
