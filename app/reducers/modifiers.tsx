import * as redux from 'redux';
import { Modifier } from '../dataTypes/modifier';
import { ModifierAction } from '../actions/ActionTypes';

export default function modifiers(state: string[] = [], action: ModifierAction) {
  switch (action.type) {
    case 'ADD_MODIFIER':
      return [ ...state, action.modifier ];
    case 'REMOVE_MODIFIER':
      return state.slice(0, state.length - 1);
    default:
      return state;
  }
}
