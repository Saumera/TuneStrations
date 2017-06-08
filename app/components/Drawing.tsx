import * as React from 'react'
import FlatButton from 'material-ui/FlatButton'
import 'fabric'

declare let fabric: any;

export interface DrawingStateProps {
  paths: any[];
}

export interface DrawingDispatchProps {
  onPathAdd: (path: any) => void;
  onClear: () => void;
  onGenerate: (canvas: any) => void;
}

export interface DrawingProps extends DrawingStateProps, DrawingDispatchProps {};

fabric.Object.prototype.objectCaching = false;

class Drawing extends React.Component<DrawingProps, {}> {
  ref: any;
  canvas: any;

  onRef(ref: any) {
    this.ref = ref;
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.ref, {
      selection: false,
      isDrawingMode: true,
      objectCaching: false,
      needsItsOwnCache: true,
    });
    this.canvas.setWidth(1000);
    this.canvas.setHeight(800);

    this.canvas.on('path:created', (e: any) => {
      let path = fabric.util.object.clone(e.path);
      this.props.onPathAdd(path);
    });
  }

  componentWillReceiveProps(nextProps: any) {
    this.canvas.clear();
    for (let path of nextProps.paths) {
      let newPath = fabric.util.object.clone(path);
      this.canvas.add(newPath);
    }
  }

  render() {
    return (
      <div>
        <canvas 
          ref={this.onRef.bind(this)}
          width="1000"
          height="800"
          id="drawing" >
        </canvas>
        <FlatButton onClick={() => this.props.onClear()}>Clear it</FlatButton>
        <FlatButton onClick={() => this.props.onGenerate(this.canvas)}>Generate</FlatButton>
      </div>
    );
  }
}


export default Drawing;
