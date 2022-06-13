class Utils {
    public static createArray1d(size: number, value: any): any[] {
        let array = [];
        for (let i = 0; i < size; i++) {
            array.push(value);
        }
        return array;
    }

    public static createArray2d(height: number, width: number, value: number): any[][] {
        let array = [];
        for (let y = 0; y < height; y++) {
            let row = [];
            for (let x = 0; x < width; x++) {
                row.push(value);
            }
            array.push(row);
        }
        return array;
    }

    public static deepcopyArray1d(array: readonly any[]): any[] {
        let output = [];
        for (let i = 0; i < array.length; i++) {
            output.push(array[i]);
        }
        return output;
    }

    public static deepcopyArray2d(array: readonly any[][]): any[][] {
        let output = [];
        for (let y = 0; y < array.length; y++) {
            let row = [];
            for (let x = 0; x < array[y].length; x++) {
                row.push(array[y][x]);
            }
            output.push(row);
        }
        return output;
    }
}