class Square {
    private static BORDER_NAME = ["top", "bottom", "left", "right"];

    private readonly column: HTMLElement;
    private readonly square: HTMLElement;

    private baseSize: number;
    private relativeHeight: number;
    private relativeWidth: number;

    private text: string;

    private borderWidth: number[];

    constructor(parentDiv: HTMLElement) {
        this.column = document.createElement("td");
        parentDiv.appendChild(this.column);
        this.column.classList.add("puzzle-cell");

        this.square = document.createElement("div");
        this.column.appendChild(this.square);
        this.square.classList.add("square");

        this.baseSize = 0;
        this.relativeHeight = 0;
        this.relativeWidth = 0;

        this.text = "";
        this.borderWidth = [0, 0, 0, 0]; // top, bottom, left, right
    }

    public setSize(baseSize: number, relativeHeight: number, relativeWidth: number): void {
        if (baseSize !== this.baseSize || relativeHeight !== this.relativeHeight) {
            this.baseSize = baseSize;
            this.relativeHeight = relativeHeight;
            this.column.style.setProperty("--puzzle-cell-height", `${this.baseSize * this.relativeHeight}px`)
        }
        if (baseSize !== this.baseSize || relativeWidth !== this.relativeWidth) {
            this.baseSize = baseSize;
            this.relativeWidth = relativeWidth;
            this.column.style.setProperty("--puzzle-cell-width", `${this.baseSize * this.relativeWidth}px`)
        }
    }

    public setText(text: string | string[]): void {
        if (typeof text === "string") {
            if (this.text !== text) {
                this.text = text;
                this.square.innerText = this.text;
            }
        } else {
            if (this.text !== text.toString()) {
                this.text = text.toString();
                this.square.innerText = this.text;
            }
        }
    }

    public setBorderWidth(orientation: number, width: number) {
        for (let i = 0; i < 4; i++) {
            if ((orientation & 1 << i) !== 0) {
                if (this.borderWidth[i] !== width) {
                    this.borderWidth[i] = width;
                    this.column.style.setProperty(`border-${Square.BORDER_NAME[i]}-width`, `var(--border-width-${width})`);
                    this.column.style.setProperty(`border-${Square.BORDER_NAME[i]}-style`, `var(--border-style-${width})`);
                }
            }
        }
    }
}