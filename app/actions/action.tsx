
export interface AddPathAction {
	type: 'ADD_PATH'
	path: any;
}

export function addDrawingPath(path: any) {
	// simplify()
	// Calculate complexity from segments
	// Return path?

	return {type: 'ADD_PATH', path};
}

export interface ClearDrawingAction {
	type: 'CLEAR_DRAWING'
}

export function clearDrawing() {
	return {type: 'CLEAR_DRAWING'};
}