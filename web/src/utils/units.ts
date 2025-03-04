export const cmToPx = (cm: number) => (cm / 2.54) * 96;
export const pxToCm = (px: number) => (px / 96) * 2.54;
export const pxToM = (px: number) => pxToCm(px) / 100;
export const pxToKm = (px: number) => pxToM(px) / 1000;
