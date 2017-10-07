import NoteMatrix from '../dataTypes/NoteMatrix'

type CanvasBounds = {xMin: number, xMax: number, yMin: number, yMax: number};

export function getBounds(canvas: any): CanvasBounds {
  // Get all paths and find the bounding box
  const bounds = {xMin: 99999, xMax: 0, yMin: 999999, yMax: 0};
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
  return bounds;
}

// Given the canvas complexity
// Returns dimensions of midi data (number of key values, number of event values)
function getQuantScale(canvas: any): [number, number, CanvasBounds] {
  // Take complexity
  const numKeys  = Math.min(Math.max(Math.sqrt(canvas.complexity()*16), 12), 88);
  const numTimes = Math.min(Math.max(Math.sqrt(canvas.complexity()*16), 12), 100);
  const bounds = getBounds(canvas);

  // Scale by bounding box of the complexity to make sure
  // we get enough features
  return [
    numKeys,
    numTimes,
    bounds
  ];
}

export function drawingToMatrix(canvas: any): NoteMatrix {
  const [scaleX, scaleY, bounds] = getQuantScale(canvas);
  const matrix = new NoteMatrix(scaleX, scaleY);

  const C4 = 60;
  let top = Math.floor(Math.min(C4 + scaleY / 2, 127));

  // Loop through XY pixel clusters
  // IMPLEMENTATION NOTE: Fabric has a "lower" and "upper" canvas.
  // The size of the two may differ ("upper" is the expected width/height)
  // so we do a ratio here since getImageData gets it from the lower canvas.
  const pxScaleX = canvas.lowerCanvasEl.width / canvas.getWidth();
  const pxScaleY = canvas.lowerCanvasEl.height / canvas.getHeight();

  const pixelSize = [
    Math.ceil((bounds.xMax - bounds.xMin) / scaleX) * Math.round(pxScaleX),
    Math.ceil((bounds.yMax - bounds.yMin) / scaleY) * Math.round(pxScaleY)
  ];
  for (let x = 0; x < scaleX; x++) {
    let notes: string[] = [];

    for (let y = scaleY - 1; y >= 0; y--) {
      const pixelCluster = canvas.getContext("2d").getImageData(
        (bounds.xMin * pxScaleX + x * pixelSize[0]),
        (bounds.yMin * pxScaleY + y * pixelSize[1]),
        pixelSize[0],
        pixelSize[1]
      ).data;

      let sumVal = 0;
      for (let i = 3; i < pixelCluster.length; i+=4) {
        sumVal += pixelCluster[i];
      }
      let average = Math.floor(sumVal / (pixelCluster.length / 4));

      if (average > 0) {
        matrix.set(x, scaleY - y, 1);
      }
    }
  }

  return matrix;
}
