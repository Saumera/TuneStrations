import * as React from 'react'
import FlatButton from 'material-ui/FlatButton'

declare var paper: any;


export interface DrawingStateProps {
  canvas: any;
}

export interface DrawingDispatchProps {
  onPathAdd: (path: any) => void;
  onClear: () => void;
}

export interface DrawingProps extends DrawingStateProps, DrawingDispatchProps {};

class Drawing extends React.Component<DrawingProps, {}> {
  state: any;
  ref: any;

  onRef(ref: any) {
    this.ref = ref;
    var path: any;
    
    paper.setup(this.ref);
    var tool = new paper.Tool();
    tool.onMouseDown = function(event: any) {
      path = new paper.Path();
      path.strokeColor = 'black';
      path.add(event.point);
    }
    tool.onMouseDrag = function(event: any) {
      path.add(event.point);
    }
    tool.onMouseUp = function(event: any) {
      return this.props.onPathAdd(path);
    }
    console.log("Setup");
    console.log(ref);
  }

  render() {
    return (
      <div>
        <canvas 
          ref={this.onRef.bind(this)}
          id="drawing" >
        </canvas>
        <FlatButton onClick={() => this.props.onClear()}>Clear it</FlatButton>
      </div>
    );
  }
}


export default Drawing;