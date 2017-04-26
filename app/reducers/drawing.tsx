export default function drawing(state: any = [], action: any) {
  switch (action.type) {
    case 'ADD_PATH':
    	return [...state, action.path];
    case 'CLEAR_DRAWING':
    	return [];
    default:
      	return state
  }
}
