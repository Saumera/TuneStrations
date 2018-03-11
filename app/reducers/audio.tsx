// TODO: connect actions for setting the loop
export default function audio(state: any = null, action: any) {
  switch (action.type) {
    case 'SET_PLAY_POSITION':
      return {
        ...state,
        position: action.position
      }
    case 'SET_PLAYING':
      return {
        ...state,
        playing: action.playing
      }
    default:
      return state
  }
}
