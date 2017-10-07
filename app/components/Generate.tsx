import * as React from 'react'
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {NoteMatrix} from '../theory/Note'
import 'fabric'

declare let fabric: any;

export interface GenerateStateProps {
  noteMatrix: NoteMatrix;
}

export interface GenerateDispatchProps {}

export interface GenerateProps extends GenerateStateProps, GenerateDispatchProps {};

fabric.Object.prototype.objectCaching = false;

export default class Generate extends React.Component<GenerateProps, {}> {
  ref: any;
  canvas: any;

  onRef(ref: any) {
    this.ref = ref;
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.ref, {
      selection: false,
        isDrawingMode: false,
        objectCaching: true,
        needsItsOwnCache: true
    })
  }

  render() {
    return (
      <div className="card-content-canvas-container">
        <Card>
          <CardHeader title="Here's your thing" />
          <CardMedia>
            <canvas 
              ref={this.onRef.bind(this)}
              width="800"
              height="600"
              style={{border: "1px solid #bbb"}}
              id="drawing" >
            </canvas>
          </CardMedia>
        </Card>
      </div>
    );
  }
}
