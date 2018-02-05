import Redux from 'redux'
import {connect} from 'react-redux'
import {getPathBounds} from '../inputs/drawing'
import Modify, {ModifyStateProps, ModifyDispatchProps} from './Modify'
import NoteMatrix from '../dataTypes/NoteMatrix'
import { Modifier } from '../dataTypes/Modifier'
import { addModifier, removeModifier } from '../actions/modifiers'
import { modifierMap } from '../modifiers/basic'

const mapStateToProps = (state: any, ownProps: any): ModifyStateProps => {
  return {
    bounds: getPathBounds(state.draw),
    sourceMatrix: state.matrix.source,
    modifiedMatrix: state.matrix.modified,
    modifierList: state.modifiers,
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: any): ModifyDispatchProps => {
  return {
    addModifier: (modifierType: string) => {
      dispatch(addModifier(modifierType))
    },
    removeModifier: (modifierType: string) => {
      dispatch(removeModifier(modifierType))
    }
  };
}

const ModifyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Modify);

export default ModifyContainer
