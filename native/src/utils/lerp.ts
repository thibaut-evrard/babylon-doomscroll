export const lerp = (x: number, y: number, alpha: number) =>
  x * (1 - alpha) + y * alpha;
