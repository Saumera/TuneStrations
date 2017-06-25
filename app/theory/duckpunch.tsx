declare var require: any;

const MidiWriter: any = require('midi-writer-js');

// this.pitch = [{wait: 2, duration: 2, pitch: 60}, ...]
function buildData() {
  const NOTE_ON = this.getNoteOnStatus();
  const NOTE_OFF = this.getNoteOffStatus();

  let events: any = [];
  for(let i = 0; i < 5; i++) {
    events.push({
      on: [],
      off: [],
    });
  }

  for (let p of this.pitch) {
    events[p.wait].on.push(p.pitch);
    events[p.wait+p.duration].off.push(p.pitch);
  }

  this.data = [];
  if (this.pitch.length) {
    console.log(events);
  }
  for (let i = 0; i < events.length; i++) {
    let timestamp = MidiWriter.Utils.numberFromBytes(
      MidiWriter.Constants.HEADER_CHUNK_DIVISION) * i;
    let e = events[i];

    if (e.on.length) {
      this.data.concat(timestamp, NOTE_ON);
      for (let n of e.on) {
        this.data.concat(n, this.velocity, 0);
      }
      this.data.pop();
    }
    

    if (e.off.length) {
      this.data.concat(timestamp, NOTE_OFF);
      for (let n of e.off) {
        this.data.concat(n, this.velocity, 0);
      }
      this.data.pop();
    }
  }
  return this;
};

MidiWriter.NoteEvent.prototype.buildData = buildData;

export default MidiWriter;