import * as React from 'react'
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {CanvasBounds} from '../inputs/drawing'
import NoteMatrix from '../dataTypes/NoteMatrix'
import 'fabric'

declare let fabric: any;

export interface GenerateStateProps {
  bounds: CanvasBounds;
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

  drawNotes() {
    const noteMatrix: NoteMatrix = this.props.noteMatrix;
    const bounds = this.props.bounds;

    const [pX, pY] = [
      Math.ceil((bounds.xMax - bounds.xMin) / noteMatrix.width()), 
      Math.ceil((bounds.yMax - bounds.yMin) / noteMatrix.height())
    ];

    console.log(bounds);
    for (let time = 0; time < noteMatrix.width(); time++) {
      for (let note = 0; note < noteMatrix.height(); note++) {
        if (!noteMatrix.get(time, note)) {
          continue;
        }
        var rect = new fabric.Rect({
          left: bounds.xMin + time * pX,
          top: bounds.yMin + (noteMatrix.height() - note) * pY,
          width: pX * noteMatrix.get(time, note),
          height: pY,
          fill: 'blue',
          stroke: 'grey',
          strokeWidth: 1,
        });
        this.canvas.add(rect);
      }
    }
  }

  componentDidMount() {
    this.canvas = new fabric.Canvas(this.ref, {
      selection: false,
      isDrawingMode: false,
      objectCaching: true,
      needsItsOwnCache: true
    });
    this.drawNotes()
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
