class Main {
    private static init(): void {
        Placer.init();
    }

    public static main(): void {
        this.init();

        let superFrame = Placer.create(13, 13, 50);

        let frame1 = Frame.createByOffset(9, 9, 0, 0, superFrame);
        Placer.makeBorder(frame1);

        let frame2 = Frame.createByOffset(6, 6, 7, 7, superFrame);
        Placer.makeBorder(frame2);

        // let frame = Frame.createByMapping([[[1, 1], [1, 3]], [[3, 1], [3, 3]]], superFrame);
        // Placer.makeBorder(frame);
    }
}