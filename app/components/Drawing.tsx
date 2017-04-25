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
  paper: any;

  onRef(ref: any) {
    this.ref = ref;
    var path: any;
    
    this.paper = new paper.PaperScope();
    this.paper.setup(this.ref);
    var tool = new paper.Tool();

    tool.onMouseDown = (event: any) => {
      if (path) {
        path.selected = false;
      }
      path = new paper.Path();
      path.strokeColor = 'black';
      path.add(event.point);
    }

    tool.onMouseDrag = (event: any) => {
      path.add(event.point);
    }

    tool.onMouseUp = (event: any) => {
      path.simplify(10);
      path.fullySelected = true;
      return this.props.onPathAdd(path);
    }

    // TODO: make this not horrifying
    this.paper.view.viewSize.width = 1000;
    this.paper.view.viewSize.height = 800;
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
