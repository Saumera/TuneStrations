
export interface AddPathAction {
	type: 'ADD_PATH'
	path: any;
}

export function addDrawingPath(path: any) {
	return {type: 'ADD_PATH', path};
}

export interface ClearDrawingAction {
	type: 'CLEAR_DRAWING'
}

export function clearDrawing() {
	return {type: 'CLEAR_DRAWING'};
}
