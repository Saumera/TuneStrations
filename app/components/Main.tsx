import * as React from 'react'
import DrawContainer from './DrawContainer'
import GenerateContainer from './GenerateContainer'
import {viewType} from '../reducers/StateTypes'

export interface MainStateProps {
  view: viewType;
}

export interface MainDispatchProps { }

export interface MainProps extends MainStateProps, MainDispatchProps {};

export default function render(props: MainProps) {
  switch (props.view) {
    case "draw": return <DrawContainer />;
    case "generate": return <GenerateContainer />;
  }
}

