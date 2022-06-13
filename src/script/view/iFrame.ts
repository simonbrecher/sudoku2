interface IFrame {
    setText: (y: number, x: number, text: string | string[]) => void;
    setBorderWidth: (y: number, x: number, orientation: number, width: number) => void;
    setBorderWidthMultiple: (offsetY: number, offsetX: number, amountY: number, amountX: number, orientation: number, width: number) => void;
    isInside: (y: number, x: number) => boolean;
}