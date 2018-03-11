export interface AddPathAction {
	type: 'ADD_PATH'
	path: any;
}

export function addDrawingPath(path: any): AddPathAction {
	return {type: 'ADD_PATH', path};
}

export interface ClearDrawingAction {
	type: 'CLEAR_DRAWING'
}

export function clearDrawing(): ClearDrawingAction {
	return {type: 'CLEAR_DRAWING'};
}
