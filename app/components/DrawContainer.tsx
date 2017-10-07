import Redux from 'redux'
import {connect} from 'react-redux'
import Draw, {DrawStateProps, DrawDispatchProps} from './Draw'
import {addDrawingPath, clearDrawing} from '../actions/draw'
import {createNoteMatrix} from '../actions/generate'
import {changeView} from '../actions/view'

const mapStateToProps = (state: any, ownProps: any): DrawStateProps => {
  return {
    paths: state.drawing,
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: any): DrawDispatchProps => {
  return {
    onPathAdd(path: any): void {
      dispatch(addDrawingPath(path));
    },
    onClear(): void {
      dispatch(clearDrawing());
    },
    onGenerate(canvas: any): void {
      dispatch(createNoteMatrix(canvas));
      dispatch(changeView("generate"))
    }
  };
}

const DrawContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Draw);

export default DrawContainer
