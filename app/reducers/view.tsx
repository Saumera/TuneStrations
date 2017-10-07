import * as Redux from 'redux'
import {viewType} from './StateTypes'
import {ChangeViewAction} from '../actions/view'

export default function view(state: viewType = "draw", action: Redux.Action) {
  switch (action.type) {
    case 'CHANGE_VIEW':
      return (action as ChangeViewAction).view;
    default:
      return state
  }
}
