import Redux from 'redux';
import {connect} from 'react-redux';
import AudioControl, {
  AudioControlStateProps,
  AudioControlDispatchProps
} from './AudioControl'
import { setPlayPosition, setPlaying } from '../actions/audio'
import { getCurrentMatrix } from '../selectors/matrix'

const mapStateToProps = (state: any, ownProps: any): AudioControlStateProps => {
  return {
    noteMatrix: getCurrentMatrix(state),
    isPlaying: false,
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>, ownProps: AudioControlDispatchProps): AudioControlDispatchProps => {
  return {
    onPlayToggle: (playing: boolean) => {
      dispatch(setPlaying(playing));
    },
    onSeek: (position: number) => {
      dispatch(setPlayPosition(position));
    },
  };
}

const AudioControlContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AudioControl);

export default AudioControlContainer;
