
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
