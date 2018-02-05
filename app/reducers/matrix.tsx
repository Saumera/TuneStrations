import NoteMatrix, { EmptyMatrix } from '../dataTypes/NoteMatrix'

export interface MatrixState {
  source: NoteMatrix;
  modified: NoteMatrix;
  final: NoteMatrix;
}

const InitialState: MatrixState = {
  source: EmptyMatrix,
  modified: EmptyMatrix,
  final: EmptyMatrix,
}

export default function matrix(state: MatrixState = InitialState, action: any) {
  switch (action.type) {
    case 'SET_SOURCE_MATRIX':
      return {
        ...state,
        source: action.noteMatrix,
        modified: action.noteMatrix,
        final: action.noteMatrix,
      };
    case 'SET_MODIFIED_MATRIX':
      return {
        ...state,
        modified: action.noteMatrix,
        final: action.noteMatrix,
      };
    case 'SET_FINAL_MATRIX':
      return {...state, final: action.noteMatrix};
    default:
      return state
  }
}
