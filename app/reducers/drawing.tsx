declare var paper: any;

export default function drawing(state: any = [], action: any) {
  switch (action.type) {
    case 'ADD_PATH':
    	return [...state, action.path];
    case 'CLEAR_DRAWING':
      paper.project.activeLayer.removeChildren();
      paper.view.draw();
    	return [];
    default:
      	return state
  }
}
