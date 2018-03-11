import * as React from 'react'
import { Loop } from '../outputs/audio'
import NoteMatrix from '../dataTypes/NoteMatrix'
import PlayIcon from 'material-ui/svg-icons/av/play-circle-outline'
import PauseIcon from 'material-ui/svg-icons/av/pause-circle-outline'
import Card from 'material-ui/Card'
import Slider from 'material-ui/Slider'
import IconButton from 'material-ui/IconButton'

export interface AudioControlStateProps {
  noteMatrix: NoteMatrix;
  isPlaying: boolean;
}

export interface AudioControlDispatchProps {}

export interface AudioControlProps extends AudioControlStateProps, AudioControlDispatchProps {}

export default class AudioControl extends React.Component<AudioControlProps, {}> {
  constructor(props: AudioControlProps) {
    super(props);
  }

  render() {
    return (
      <Card>
        <div className='make-me-flex make-my-children-flex'>
          <IconButton disabled={this.props.noteMatrix.isEmpty()}>
            <PlayIcon />
          </IconButton>
          <Slider disabled={this.props.noteMatrix.isEmpty()}/>
        </div>
      </Card>
    )
  }
}
