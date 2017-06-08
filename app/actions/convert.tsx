
declare var require: any;

var MIDIUtils = require('midiutils');

const MidiWriter: any = require('midi-writer-js');

// Given the canvas complexity
// Returns dimensions of midi data (number of key values, number of event values)
export function getQuantScale(canvas: any): [number, number] {
	// Take complexity
	const numKeys = Math.sqrt(canvas.complexity());
	const numTimes = Math.sqrt(canvas.complexity());

	// Get all paths and find the bounding box
	let bounds = {xMin: 99999, xMax: 0, yMin: 999999, yMax: 0};
	for (let o of canvas.getObjects()) {
		if (o.type !== 'path') {
			continue;
		}
		const rect = o.getBoundingRect();
		bounds.xMin = Math.min(bounds.xMin, rect.left);
		bounds.yMin = Math.min(bounds.yMin, rect.top);
		bounds.xMax = Math.max(rect.left + rect.width);
		bounds.yMax = Math.max(rect.top + rect.height);
	}

	// Scale by bounding box of the complexity to make sure
	// we get enough features
	var boundX = bounds.xMax - bounds.xMin;
	var boundY = bounds.yMax - bounds.yMin;
	return [
		Math.ceil(numKeys * (canvas.getHeight()/boundY)), 
		Math.ceil(numTimes * (canvas.getWidth()/boundX))
	];
}

export function reduceImage(canvas: any) {
	const scale = getQuantScale(canvas);
	const pixelSize = [canvas.getWidth() / scale[0], canvas.getHeight() / scale[1]];
	const track: any = new MidiWriter.Track();

  const C4 = 60;
  let top    = Math.min(C4 + scale[1] / 2, 127);
  let bottom = Math.max(C4 - scale[1] / 2, 0);

	// Loop through XY pixel clusters
  for (let x = 0; x < scale[0]; x++) {
    let notes: string[] = [];

    for (let y = 0; y < scale[1]; y++) {
			const pixelCluster = canvas.getContext("2d").getImageData(
				x * pixelSize[0], 
				y * pixelSize[1], 
				pixelSize[0], 
				pixelSize[1]
      ).data;

      let sumVal = 0;
      for (let i = 3; i < pixelCluster.length; i+=4) {
        sumVal += pixelCluster[i];
      }
      let average = Math.floor(sumVal / (pixelCluster.length / 4));

      if (average > 0) {
        // create or continue note
        notes.push(getNoteName(top - y));
      } else {
        // NADA
      }
		}

    track.addEvent(new MidiWriter.NoteEvent({pitch: notes, duration: '4'}))
	}

  console.log(track);
  let write = new MidiWriter.Writer([track]);
  console.log(write.dataUri());

	// Determine if note is ON.

	// 
}

function getNoteName(noteVal: number): string {
  return MIDIUtils.noteNumberToName(noteVal).replace(/-/g, '');
}

export function example() {
	const track: any = new MidiWriter.Track();

	track.addEvent([
				new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
				new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
				new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
				new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'}),
				new MidiWriter.NoteEvent({pitch: ['C4', 'C4', 'C4', 'C4', 'D4', 'D4', 'D4', 'D4'], duration: '8'}),
				new MidiWriter.NoteEvent({pitch: ['E4','D4'], duration: '4'}),
				new MidiWriter.NoteEvent({pitch: ['C4'], duration: '2'})
		], function(event:any, index:any) {
	    return {sequential:true};
	  }
	);

	var write = new MidiWriter.Writer([track]);
	console.log(write.dataUri());
}
