import Redux from 'redux'
import {connect} from 'react-redux'
import Drawing, {DrawingStateProps, DrawingDispatchProps} from './Drawing'
import {canvasChange} from '../actions/action'

const mapStateToProps = (state: any, ownProps: any): DrawingStateProps => {
  return {
    canvas: state.canvas,
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: any): DrawingDispatchProps => {
  return {
    onDrawingChange(change: any): void {
      dispatch(canvasChange(Date.now()));
    },
  };
}

const DrawingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawing);

export default DrawingContainer