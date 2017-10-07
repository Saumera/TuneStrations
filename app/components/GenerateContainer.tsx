import Redux from 'redux'
import {connect} from 'react-redux'
import {getPathBounds} from '../inputs/drawing'
import Generate, {GenerateStateProps, GenerateDispatchProps} from './Generate'

const mapStateToProps = (state: any, ownProps: any): GenerateStateProps => {
  return {
    bounds: getPathBounds(state.draw),
    noteMatrix: state.generate.noteMatrix,
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: any): GenerateDispatchProps => {
  return {};
}

const GenerateContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Generate);

export default GenerateContainer
