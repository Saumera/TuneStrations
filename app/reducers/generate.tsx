import NoteMatrix from '../dataTypes/NoteMatrix'

export interface GenerateState {
  noteMatrix?: NoteMatrix
}

export default function generate(state: GenerateState = {}, action: any) {
  switch (action.type) {
    case 'SET_GENERATED_MATRIX':
      return {...state, noteMatrix: action.noteMatrix };
    default:
      return state
  }
}
