class SuperFrame implements IFrame {
    public static BORDER_WIDTH_NONE = 0;
    public static BORDER_WIDTH_NORMAL = 1;
    public static BORDER_WIDTH_THICK = 2;

    public static BORDER_ORIENTATION_TOP = 0b0001;
    public static BORDER_ORIENTATION_BOTTOM = 0b0010;
    public static BORDER_ORIENTATION_LEFT = 0b0100;
    public static BORDER_ORIENTATION_RIGHT = 0b1000;
    public static BORDER_ORIENTATION_HORIZONTAL = this.BORDER_ORIENTATION_TOP | this.BORDER_ORIENTATION_BOTTOM;
    public static BORDER_ORIENTATION_VERTICAL = this.BORDER_ORIENTATION_LEFT | this.BORDER_ORIENTATION_RIGHT;
    public static BORDER_ORIENTATION_ALL = this.BORDER_ORIENTATION_HORIZONTAL | this.BORDER_ORIENTATION_VERTICAL;

    public readonly rowCount: number;
    public readonly columnCount: number;
    public squareSize: number; // base size of square (width = squareSize * relativeWidth)
    private _relativeHeights: number[];
        get relativeHeights (): readonly number[] { return this._relativeHeights; }
        set relativeHeights(relativeHeights: readonly number[]) { }
    private _relativeWidths: number[];
        get relativeWidths(): readonly number[] { return this._relativeWidths; }
        set relativeWidths(relativeWidths: readonly number[]) { }

    public table: HTMLElement;
    public squares: Square[][]; // [y][x]

    constructor(rowCount: number, columnCount: number, squareSize: number) {
        this.rowCount = rowCount;
        this.columnCount = columnCount;
        this.squareSize = squareSize;
        this._relativeHeights = Utils.createArray1d(this.rowCount, 1);
        this._relativeWidths = Utils.createArray1d(this.columnCount, 1);

        this.table = this.createTable();
        this.squares = this.createSquares();

        this.updateDimensions();
    }

    public setRelativeDimensions(relativeHeight: readonly number[] | number, relativeWidth: readonly number[] | number): void {
        if (typeof relativeHeight === "number") {
            for (let i = 0; i < this.rowCount; i++) {
                this._relativeHeights[i] = relativeHeight;
            }
        } else {
            if (relativeHeight.length !== this._relativeHeights.length) {
                throw "SuperFrame->setRelativeDimensions - relativeHeight.length !== this._relativeHeights.length";
            }
            this._relativeHeights = Utils.deepcopyArray1d(relativeHeight);
        }
        if (typeof relativeWidth === "number") {
            for (let i = 0; i < this.columnCount; i++) {
                this._relativeWidths[i] = relativeWidth;
            }
        } else {
            if (relativeWidth.length !== this._relativeWidths.length) {
                throw "SuperFrame->setRelativeDimensions - relativeWidth.length !== this._relativeWidths.length";
            }
            this._relativeWidths = Utils.deepcopyArray1d(relativeWidth);
        }
        this.updateDimensions();
    }

    public isInside(y: number, x: number): boolean {
        return y >= 0 && y < this.rowCount && x >= 0 && x < this.columnCount;
    }

    public setText(y: number, x: number, text: string | string[]): void {
        this.squares[y][x].setText(text);
    }

    public setBorderWidth(y: number, x: number, orientation: number, width: number): void {
        this.squares[y][x].setBorderWidth(orientation, width);
    }

    public setBorderWidthMultiple(offsetY: number, offsetX: number, amountY: number, amountX: number, orientation: number, width: number): void {
        for (let y = 0; y < amountY; y++) {
            for (let x = 0; x < amountX; x++) {
                this.squares[offsetY + y][offsetX + x].setBorderWidth(orientation, width);
            }
        }
    }

    private createTable(): HTMLElement {
        let table = document.createElement("table");
        table.classList.add("puzzle-table");

        return table;
    }

    private createSquares(): Square[][] {
        let squares = [];
        for (let y = 0; y < this.rowCount; y++) {
            let rowArray: Square[] = [];
            squares.push(rowArray);

            let rowDiv = document.createElement("tr");
            this.table.appendChild(rowDiv);

            for (let x = 0; x < this.columnCount; x++) {
                let square = new Square(rowDiv);
                rowArray.push(square);
            }
        }

        return squares;
    }

    private updateDimensions(): void {
        this.table.style.setProperty("--frame-square-size", `${this.squareSize}px`);

        for (let y = 0; y < this.rowCount; y++) {
            for (let x = 0; x < this.columnCount; x++) {
                this.squares[y][x].setSize(
                    this.squareSize, this._relativeHeights[y], this._relativeWidths[x]
                );
            }
        }
    }
}