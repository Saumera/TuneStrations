import { combineReducers } from 'redux'
import audio from './audio'
import draw from './draw'
import view from './view'
import generate from './generate'

export default combineReducers({
  audio,
  draw,
  view,
  generate,
})
