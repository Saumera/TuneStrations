// TODO: connect actions for setting the loop
export default function audio(state: any = null, action: any) {
  switch (action.type) {
    case 'SET_LOOP':
      return action.loop;
    default:
      return state
  }
}
