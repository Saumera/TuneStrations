import NoteMatrix from '../dataTypes/NoteMatrix'

export const getCurrentMatrix = (state: any): NoteMatrix => {
  switch (state.view) {
    case 'draw': return state.matrix.source;
    case 'modify': return state.matrix.modified;
    case 'finalize': return state.matrix.final;
  }
}
