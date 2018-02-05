import * as React from 'react'
import DrawContainer from './DrawContainer'
import ModifyContainer from './ModifyContainer'
import {viewType} from '../reducers/StateTypes'

export interface MainStateProps {
  view: viewType;
}

export interface MainDispatchProps { }

export interface MainProps extends MainStateProps, MainDispatchProps {};

export default function render(props: MainProps) {
  switch (props.view) {
    case "draw": return <DrawContainer />;
    case "modify": return <ModifyContainer />;
  }
}

