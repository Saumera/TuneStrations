import * as React from 'react'
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import 'fabric'

declare let fabric: any;

export interface DrawStateProps {
  paths: any[];
}

export interface DrawDispatchProps {
  onPathAdd: (path: any) => void;
  onClear: () => void;
  onGenerate: (canvas: any) => void;
}

export interface DrawProps extends DrawStateProps, DrawDispatchProps {}

fabric.Object.prototype.objectCaching = false;

class Draw extends React.Component<DrawProps, {}> {
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
      <div className="card-content-canvas-container">
        <Card>
          <CardHeader title="Draw a thing" />
          <CardMedia>
            <canvas 
              ref={this.onRef.bind(this)}
              width="800"
              height="600"
              style={{border: "1px solid #bbb"}}
              id="drawing" >
            </canvas>
          </CardMedia>
          <CardActions>
            <FlatButton onClick={() => this.props.onClear()}>Clear it</FlatButton>
            <FlatButton onClick={() => this.props.onGenerate(this.canvas)}>Generate</FlatButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}


export default Draw;
