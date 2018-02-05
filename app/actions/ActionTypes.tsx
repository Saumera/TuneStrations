import Redux from 'redux';
import { Modifier } from '../dataTypes/Modifier';

export interface AddModifierAction extends Redux.Action {
  type: 'ADD_MODIFIER';
  modifier: Modifier;
}

export interface RemoveModifierAction extends Redux.Action {
  type: 'REMOVE_MODIFIER';
}

export type ModifierAction = AddModifierAction | RemoveModifierAction;
