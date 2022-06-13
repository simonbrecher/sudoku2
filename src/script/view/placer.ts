class Placer {
    private static bodyTag: HTMLElement;

    public static init(): void {
        let bodyTag = document.getElementById("body");
        if (bodyTag === null) {
            throw "BODY_TAG DOES NOT EXIST";
        } else {
            this.bodyTag = bodyTag;
        }
    }

    public static create(rowCount: number, columnCount: number, squareSize: number): SuperFrame {
        let superFrame = new SuperFrame(rowCount, columnCount, squareSize);
        this.bodyTag.appendChild(superFrame.table);

        return superFrame;
    }

    /* Temporary method */
    public static makeBorder(frame: Frame): void {
        frame.setBorderWidthMultiple(0, 0, frame.rowCount, frame.columnCount, SuperFrame.BORDER_ORIENTATION_ALL, SuperFrame.BORDER_WIDTH_NORMAL);
        frame.setBorderWidthMultiple(0, 0, 1, frame.columnCount, SuperFrame.BORDER_ORIENTATION_TOP, SuperFrame.BORDER_WIDTH_THICK);
        frame.setBorderWidthMultiple(frame.rowCount - 1, 0, 1, frame.columnCount, SuperFrame.BORDER_ORIENTATION_BOTTOM, SuperFrame.BORDER_WIDTH_THICK);
        frame.setBorderWidthMultiple(0, 0, frame.rowCount, 1, SuperFrame.BORDER_ORIENTATION_LEFT, SuperFrame.BORDER_WIDTH_THICK);
        frame.setBorderWidthMultiple(0, frame.columnCount - 1, frame.rowCount, 1, SuperFrame.BORDER_ORIENTATION_RIGHT, SuperFrame.BORDER_WIDTH_THICK);
    }
}