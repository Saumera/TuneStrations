import * as React from 'react'
import Card, { CardHeader, CardActions, CardMedia } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import {CanvasBounds} from '../inputs/drawing'
import NoteMatrix from '../dataTypes/NoteMatrix'
import { Modifier } from '../dataTypes/Modifier'
import ModifierList from './ModifierList'
import 'fabric'

declare let fabric: any;

export interface ModifyStateProps {
  bounds: CanvasBounds;
  sourceMatrix: NoteMatrix;
  modifiedMatrix: NoteMatrix;
  modifierList: string[];
}

export interface ModifyDispatchProps {
  addModifier: (modifierType: string) => void;
  removeModifier: (modifierType: string) => void;
}

export interface ModifyProps extends ModifyStateProps, ModifyDispatchProps {};

fabric.Object.prototype.objectCaching = false;

export default class Modify extends React.Component<ModifyProps, {}> {
  ref: any;
  canvas: any;

  onRef(ref: any) {
    this.ref = ref;
  }

  drawNotes(noteMatrix: NoteMatrix, bounds: any) {
    this.canvas.clear();
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
    this.drawNotes(this.props.modifiedMatrix, this.props.bounds)
  }

  componentWillUpdate(nextProps: ModifyProps, nextState: any) {
    this.drawNotes(nextProps.modifiedMatrix, nextProps.bounds)
  }

  render() {
    return (
      <Card>
        <CardHeader title="Here's your thing" />
        <CardMedia>
          <div className="make-me-flex">
            <div className="toolbar">
              <ModifierList
                modifierList={this.props.modifierList}
                onAdd={this.props.addModifier}
                onRemove={this.props.removeModifier}
              />
            </div>
            <div className="card-content-canvas-container">
              <canvas 
                ref={this.onRef.bind(this)}
                width="800"
                height="600"
                style={{border: "1px solid #bbb"}}
                id="drawing" >
              </canvas>
            </div>
          </div>
        </CardMedia>
      </Card>
    );
  }
}
