import { combineReducers } from 'redux'
import audio from './audio'
import draw from './draw'
import view from './view'
import matrix from './matrix'
import modifiers from './modifiers'

export default combineReducers({
  audio,
  draw,
  view,
  matrix,
  modifiers,
})
