declare var require: any;

const MidiWriter: any = require('midi-writer-js');

// this.pitch = [{wait: 2, duration: 2, pitch: 60}, ...]
function buildData() {
  this.data = [];

  const NOTE_ON = this.getNoteOnStatus();
  const NOTE_OFF = this.getNoteOffStatus();

  // Push empty events list. 4 events = 4 quarter measures
  let events: any = [];
  for(let i = 0; i < 5; i++) {
    events.push({
      on: [],
      off: [],
    });
  }

  // Add on and off pitches to each event.
  for (let p of this.pitch) {
    events[p.wait].on.push(p.pitch);
    events[p.wait+p.duration].off.push(p.pitch);
  }

  // Construct the actual midi strings.
  for (let i = 0; i < events.length; i++) {
    let tick = MidiWriter.Utils.numberFromBytes(
      MidiWriter.Constants.HEADER_CHUNK_DIVISION); // 0x0080 = 128
    let e = events[i];

    let onData: any[] = [];
    for (let i = 0; i < e.on.length; i++) {
      if (i === 0) {
        onData = onData.concat(MidiWriter.Utils.numberToVariableLength(tick), NOTE_ON, e.on[i], this.velocity);
        continue;
      }
      onData = onData.concat(0, e.on[i], this.velocity);      
    }
    this.data = this.data.concat(onData);
    
    let offData: any[] = [];  
    for (let i = 0; i < e.off.length; i++) {
      if (i === 0) {
        offData = offData.concat(0, NOTE_OFF, e.off[i], this.velocity);
        continue;
      }
      offData = offData.concat(0, e.off[i], this.velocity);
    }

    // TODO: Start here. Figure out issue with note sustain. All notes are currently the same
    // length, which shouldn't be the case.
    // 
    // Could try making a single NoteEvent that builds the entire sequence (prevents measure boundary errors)

    if (i === (events.length - 1)) {
      continue;
    }
  }

  if (this.pitch.length) {
    console.log(events);
  }
  return this;
};

// Override existing builddata function
MidiWriter.NoteEvent.prototype.buildData = buildData;

export default MidiWriter;