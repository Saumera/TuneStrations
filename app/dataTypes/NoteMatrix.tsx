export default class NoteMatrix {
  private data: number[][];

  constructor(w: number, h: number) {
    let array: number[][] = [];
    for (let i = 0; i < w; i++) {
      array[i] = [];
      for (let j = 0; j < h; j++) {
        array[i][j] = 0;
      }
    }

    this.data = array;
  }

  width(): number {
    return this.data.length
  }

  height(): number {
    return this.data[0] ? this.data[0].length : 0;
  }

  set(x: number, y: number, value: number) {
    this.data[x][y] = value;
  }

  get(x: number, y: number): number {
    return this.data[x]
      ? (this.data[x][y] || 0)
      : 0;
  }

  setData(data: number[][]) {
    this.data = data
  }

  getData(): number[][] {
    return this.data;
  }

  copy(): NoteMatrix {
    const matrix = new NoteMatrix(0, 0);
    matrix.setData(this.data);
    return matrix;
  }
}