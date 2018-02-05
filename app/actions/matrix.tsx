import Redux from 'redux'
import {drawingToMatrix} from '../inputs/drawing'
import {diatonicize, legato} from '../modifiers/basic'
import NoteMatrix from '../dataTypes/NoteMatrix'
import {changeView} from '../actions/view'
import {Loop} from '../outputs/audio'

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

