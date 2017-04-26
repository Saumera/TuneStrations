import Redux from 'redux'
import {connect} from 'react-redux'
import Drawing, {DrawingStateProps, DrawingDispatchProps} from './Drawing'
import {addDrawingPath, clearDrawing} from '../actions/action'
import * as fabric from 'fabric'

const mapStateToProps = (state: any, ownProps: any): DrawingStateProps => {
  return {
    paths: state.drawing,
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: any): DrawingDispatchProps => {
  return {
    onPathAdd(path: any): void {
      dispatch(addDrawingPath(path));
    },
    onClear(): void {
      dispatch(clearDrawing());
    }
  };
}

const DrawingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Drawing);

export default DrawingContainer
