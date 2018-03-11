import * as React from 'react'
import DrawContainer from './DrawContainer'
import ModifyContainer from './ModifyContainer'
import {viewType} from '../reducers/StateTypes'
import AudioControlContainer from './AudioControlContainer'
import NoteMatrix from '../dataTypes/NoteMatrix'

export interface MainStateProps {
  view: viewType;
}

export interface MainDispatchProps { }

export interface MainProps extends MainStateProps, MainDispatchProps {};

export default function render(props: MainProps) {
  let drawer;

  switch (props.view) {
    case "draw":
      drawer = <DrawContainer />;
      break;
    case "modify":
      drawer = <ModifyContainer />;
      break;
  }

  return (
    <div className='tunestrations-app'>
      {drawer}
      <AudioControlContainer />
    </div>
  )
}

