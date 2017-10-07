import Redux from 'redux'
import {connect} from 'react-redux'
import Main, {MainStateProps, MainDispatchProps} from './Main'

const mapStateToProps = (state: any, ownProps: MainStateProps): MainStateProps => {
  return {
    view: state.view,
  };
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: MainDispatchProps): MainDispatchProps => {
  return {};
}

const MainContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default MainContainer
