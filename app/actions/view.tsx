import {viewType} from '../reducers/StateTypes'

export interface ChangeViewAction {
	type: 'CHANGE_VIEW'
    view: viewType;
}

export function changeView(view: viewType) {
	return {type: 'CHANGE_VIEW', view};
}
