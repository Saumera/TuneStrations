import {drawingToMatrix} from '../inputs/drawing'
import NoteMatrix from '../dataTypes/NoteMatrix'

declare var require: any;

export function createSourceMatrix(canvas: any) {
  return {
    type: 'SET_SOURCE_MATRIX',
    noteMatrix: drawingToMatrix(canvas)
  };
}

export function setModifiedMatrix(noteMatrix: NoteMatrix) {
  return {
    type: 'SET_MODIFIED_MATRIX',
    noteMatrix
  }
}

