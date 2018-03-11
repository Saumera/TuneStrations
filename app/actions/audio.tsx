import {Loop} from '../outputs/audio'

export interface SetPlayPositionAction {
  type: 'SET_PLAY_POSITION';
  position: number;
}

export function setPlayPosition(position: number): SetPlayPositionAction {
  return {
    type: 'SET_PLAY_POSITION',
    position,
  };
}

export interface SetPlayingAction {
  type: 'SET_PLAYING';
  playing: boolean;
}

export function setPlaying(playing: boolean): SetPlayingAction {
  return {
    type: 'SET_PLAYING',
    playing,
  };
}


