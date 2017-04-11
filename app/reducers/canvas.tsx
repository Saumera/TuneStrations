

export default function canvas(state: any = null, action: any) {
  switch (action.type) {
    case 'CANVAS_CHANGE':
      return action.value;
    default:
      return state
  }
}