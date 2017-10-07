declare var require: any;

const MidiWriter: any = require('midi-writer-js');

// this.pitch = [{wait: 2, duration: 2, pitch: 60}, ...]
function buildData() {
  this.data = [];

  const NOTE_ON = this.getNoteOnStatus();
  const NOTE_OFF = this.getNoteOffStatus();

  // Push empty events list. 4 events = 4 quarter measures

  let sortedByOn: any[] = [...this.pitch];
  sortedByOn
    .sort((a: any, b: any) => { return a.wait - b.wait});

  sortedByOn = sortedByOn
    .map((a: any) => { return { pitch: a.pitch, wait: a.wait, code: NOTE_ON}});

  let sortedByOff: any[] = [...this.pitch];
  sortedByOff
    .sort((a: any, b: any) => { return (a.wait + a.duration) - (b.wait + b.duration) });

  sortedByOff = sortedByOff
    .map((a: any) => { return { pitch: a.pitch, wait: a.wait + a.duration, code: NOTE_OFF} });

  let events: any[] = (sortedByOn.concat(sortedByOff));
  events.sort((a: any, b: any) => { return a.wait - b.wait });

  let tick = MidiWriter.Utils.numberFromBytes(
    MidiWriter.Constants.HEADER_CHUNK_DIVISION
  ); // 0x0080 = 128

  var data: any[] = [];
  for (var i = 0; i < events.length; i++) {
    var e = events[i];
    var wait: any = 0;
    if (i > 0) {
      wait = e.wait - events[i - 1].wait;
    }
    wait = MidiWriter.Utils.numberToVariableLength(tick * wait / 4);
    let pitch: number = Math.max(Math.min(e.pitch, 127), 0)
    data = data.concat(wait, e.code, pitch, this.velocity);
  }
  this.data = this.data.concat(data);
  
  return this;
};

// Override existing builddata function
MidiWriter.NoteEvent.prototype.buildData = buildData;

export default MidiWriter;
