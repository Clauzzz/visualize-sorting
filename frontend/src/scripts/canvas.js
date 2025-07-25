window.Canvas = class Canvas {
    constructor(id, element, type) {
        try {
            this.id = id;
            this.element = element;
            this.type = type;
            this.contextInput = this.element.getContext("2d");
        }
        catch (err) {
            console.error(err);
        }

    }
    calculateSizesBasedOnScreen = () => {
        this.width = Number(getComputedStyle(this.element).width.replace('px', ''));
        this.height = Number(getComputedStyle(this.element).height.replace('px', ''));
        this.element.width = this.width;
        this.element.height = this.height;
    }
    setSizes = (width, height) => {
        this.width = width;
        this.height = height;
        this.element.width = this.width;
        this.element.height = this.height;
    }
    clearCanvas() {
        this.contextInput.clearRect(0, 0, this.element.width, this.element.height);
    }
    swapNumbers = async (i, min, numberA, numberB) => {
        Main.canvas.deleteArea(numberA.pointBottomLeft, numberA.pointTopRight);
        numberA.highlight(Main.switchColors);
        Main.canvas.deleteArea(numberB.pointBottomLeft, numberB.pointTopRight);
        numberB.highlight(Main.switchColors);
        await Main.sleep(Main.timer);

        Main.numbers.splice(i, 1, numberB);
        Main.numbers.splice(min, 1, numberA);
        Main.canvas.deleteArea(numberA.pointBottomLeft, numberA.pointTopRight);
        Main.canvas.deleteArea(numberB.pointBottomLeft, numberB.pointTopRight);

        let aux = JSON.parse(JSON.stringify(numberA));
        numberA.pointBottomLeft.x = numberB.pointBottomLeft.x;
        numberA.pointTopRight.x = numberB.pointTopRight.x;
        numberB.pointBottomLeft.x = aux.pointBottomLeft.x;
        numberB.pointTopRight.x = aux.pointTopRight.x;

        await Main.sleep(Main.timer);
        numberB.highlight(Main.defaultColor);
        numberA.highlight(Main.defaultColor);
        await Main.sleep(Main.timer);
    }
    drawStates = async (tree) => {
        if (Sorting.isRunning) {
            Main.drawState(tree.state);
            for (let i = 0; i < Main.numbers.length; i++) {
                if (tree.pivot && tree.pivot.id && Main.numbers[i].id == tree.pivot.id) {
                    Main.numbers[i].highlight(Main.pivotColor);
                } else if (tree && tree.index && tree.index.id && Main.numbers[i].id == tree.index.id) {
                    Main.numbers[i].highlight(Main.indexColor);
                }
            }
            await Main.sleep(Main.timer);
            if (tree.newstate) {
                Main.drawState(tree.newstate);
                for (let i = 0; i < Main.numbers.length; i++) {
                    if (tree.pivot && tree.pivot.id && Main.numbers[i].id == tree.pivot.id) {
                        Main.numbers[i].highlight(Main.pivotColor);
                    } else if (tree && tree.index && tree.index.id && Main.numbers[i].id == tree.index.id) {
                        Main.numbers[i].highlight(Main.switchColors);
                    }
                }
            }
            await Main.sleep(Main.timer);
            if (tree.next && tree.next.state) {
                return Main.canvas.drawStates(tree.next);
            } else {
                Main.canvas.highlightFinalGroup(Main.numbers);
                return;
            }
        }
        return;
    }
    clearCanvas = () => {
        this.contextInput.clearRect(0, 0, this.width, this.height);
    }
    deleteArea = (pointA, pointB) => {
        this.contextInput.clearRect(pointA.x - Main.canvasMargin / 2, 0, pointB.x - pointA.x + Main.canvasMargin, Main.canvas.height);
    }
    drawLine = (pointA, pointB) => {
        this.contextInput.strokeStyle = 'white';
        this.contextInput.lineWidth = 5;
        this.contextInput.moveTo(pointA.x, pointA.y);
        this.contextInput.lineTo(pointB.x, pointB.y);
        this.contextInput.stroke();
    }
    drawBar = (pointA, pointB, color) => {
        this.contextInput.fillStyle = color;
        this.contextInput.fillRect(pointA.x, pointB.y, pointB.x - pointA.x, pointA.y - pointB.y);
    }
    highlightFinalGroup = async (numbers) => {
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].delete()
            numbers[i].highlightFinal();
        }
        await Main.sleep(Main.timer);
    }
    redrawGroupWait = async (numbers) => {
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].delete()
            numbers[i].draw();
        }
        await Main.sleep(Main.timer);
    }
    redrawGroup = async (numbers) => {
        for (let i = 0; i < numbers.length; i++) {
            numbers[i].delete();
            numbers[i].draw();
        }
    }
}