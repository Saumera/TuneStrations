import * as Redux from 'redux'
import {drawingToMatrix} from '../inputs/drawing'
import {diatonicize} from '../modifiers/basic'
import NoteMatrix from '../dataTypes/NoteMatrix'
import {changeView} from '../actions/view'

declare var require: any;

function sustain(matrix: NoteMatrix) {
  const newMatrix = matrix.copy();

  // Accumulate all values right-to-left, stopping when a zero is encountered.
  for (let time = newMatrix.width() - 2; time > 0; time--) {
    for (let note = 0; note < newMatrix.height() ; note++) {
      if (newMatrix.get(time, note) && newMatrix.get(time+1, note)) {
        newMatrix.set(time, note, newMatrix.get(time+1, note));
        if (newMatrix.get(time+1, note)) {
          newMatrix.set(time+1, note, 0);
        }
      }
    }
  }

  return newMatrix;
}

export interface SetGeneratedMatrixAction {
  type: 'SET_GENERATED_MATRIX';
  noteMatrix: NoteMatrix;
}

export function createNoteMatrix(canvas: any) {
  let noteMatrix: NoteMatrix = sustain(diatonicize(drawingToMatrix(canvas)));
  return (dispatch: Redux.Dispatch<any>) => {
    dispatch({type: 'SET_GENERATED_MATRIX', noteMatrix});
    dispatch(changeView("generate"));
  };
}

