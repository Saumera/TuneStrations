import * as React from 'react'
import FlatButton from 'material-ui/FlatButton'

export interface DrawingStateProps {
  canvas: any;
}

export interface DrawingDispatchProps {
  onDrawingChange: (change: any) => void;
}

export interface DrawingProps extends DrawingStateProps, DrawingDispatchProps {};


const Drawing = (props: DrawingProps): JSX.Element => {
  return (
    <div>
      {props.canvas}
      <FlatButton onClick={() => props.onDrawingChange("test")}>Hay yo</FlatButton>
    </div>
  );
}

export default Drawing;