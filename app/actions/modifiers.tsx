import Redux from 'redux'
import NoteMatrix from '../dataTypes/NoteMatrix'
import { modifierMap } from '../modifiers/basic'

export function removeModifier(modifierType: string) {
  return (dispatch: Redux.Dispatch<any>, getState: any) => {
    dispatch({type: 'REMOVE_MODIFIER'});

    // After removing the latest modifier, we need to reset the matrix
    // so we start from the Source matrix and reapply all the modifiers
    // in the order they were added up to the one just prior to the modifier
    // that was just removed
    const matrix: NoteMatrix = getState()
      .modifiers
      .reduce((matrix: NoteMatrix, modifierType: string) => {
        return modifierMap[modifierType](matrix)
      }, getState().matrix.source);

    dispatch({
      type: 'SET_MODIFIED_MATRIX',
      noteMatrix: matrix,
    })
  }
}

export function addModifier(modifierType: string) {
  return (dispatch: Redux.Dispatch<any>, getState: any) => {
    dispatch({type: 'ADD_MODIFIER', modifier: modifierType});

    const matrix: NoteMatrix = modifierMap[modifierType](getState().matrix.modified)
    dispatch({type: 'SET_MODIFIED_MATRIX', noteMatrix: matrix})
  }
}
