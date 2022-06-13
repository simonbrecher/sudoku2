class Frame implements IFrame {
    private readonly master: IFrame;

    public readonly rowCount: number;
    public readonly columnCount: number;

    private readonly mapping: number[][][]; // [my Y][my X][master Y, master X]

    public static createByOffset(rowCount: number, columnCount: number, offsetY: number, offsetX: number, master: IFrame): Frame {
        let mapping = [];
        for (let y = 0; y < rowCount; y++) {
            let row = [];
            for (let x = 0; x < columnCount; x++) {
                let column = [y + offsetY, x + offsetX];
                row.push(column);
            }
            mapping.push(row);
        }

        return new Frame(mapping, master);
    }

    public static createByMapping(mapping: number[][][], master: IFrame): Frame {
        return new Frame(mapping, master);
    }

    constructor(mapping: number[][][], master: IFrame) {
        this.master = master;

        this.mapping = mapping;
        this.rowCount = this.mapping.length;
        this.columnCount = this.mapping[0].length;

        let isOk = this.checkMapping();
        if (! isOk) {
            throw "Frame->constructor - INVALID MAPPING";
        }
    }

    public isInside(y: number, x: number): boolean {
        return y >= 0 && y < this.rowCount && x >= 0 && x < this.columnCount;
    }

    public setText(y: number, x: number, text: string | string[]): void {
        let mapping = this.mapping[y][x]
        this.master.setText(mapping[0], mapping[1], text);
    }

    public setBorderWidth(y: number, x: number, orientation: number, width: number): void {
        let mapping = this.mapping[y][x];
        this.master.setBorderWidth(mapping[0], mapping[1], orientation, width);
    }

    public setBorderWidthMultiple(offsetY: number, offsetX: number, amountY: number, amountX: number, orientation: number, width: number): void {
        for (let y = 0; y < amountY; y++) {
            for (let x = 0; x < amountX; x++) {
                let mapping = this.mapping[offsetY + y][offsetX + x];
                this.master.setBorderWidth(mapping[0], mapping[1], orientation, width);
            }
        }
    }

    private checkMapping(): boolean {
        if (this.mapping.length !== this.rowCount) {
            return false;
        }

        for (let y = 0; y < this.rowCount; y++) {
            if (this.mapping[y].length !== this.columnCount) {
                return false;
            }

            for (let x = 0; x < this.columnCount; x++) {
                let squareMapping = this.mapping[y][x];
                if (squareMapping.length !== 2) {
                    return false;
                }
                if (! this.master.isInside(squareMapping[0], squareMapping[1])) {
                    return false;
                }
            }
        }

        return true;
    }
}