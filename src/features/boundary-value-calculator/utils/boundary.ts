export interface BoundaryValues {
  below: number;
  min: number;
  minAbove: number;
  maxBelow: number;
  max: number;
  above: number;
}

export function calculateBoundaries(min: number, max: number): BoundaryValues {
  return {
    below: min - 1,
    min,
    minAbove: min + 1,
    maxBelow: max - 1,
    max,
    above: max + 1,
  };
}
