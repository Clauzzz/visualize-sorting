class NumberBar
{
    number;
    pointBottomLeft;
    pointTopRight;

    constructor(pointBottomLeft, pointTopRight, number)
    {
        this.pointBottomLeft = pointBottomLeft;
        this.pointTopRight = pointTopRight;
        this.number = number;
    }

    highlightFinal = async () => {
        Main.canvas.deleteArea(this.pointBottomLeft,this.pointTopRight);
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, Main.finalColor);
        await Main.sleep(Main.timer);
    }
    highlightIndex = async () => {
        Main.canvas.deleteArea(this.pointBottomLeft,this.pointTopRight);
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, Main.indexColor);
        await Main.sleep(Main.timer);
        Main.canvas.deleteArea(this.pointBottomLeft,this.pointTopRight);
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, Main.defaultColor);
    }
    deselect = async () => {
        Main.canvas.deleteArea(this.pointBottomLeft,this.pointTopRight);
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, Main.indexColor);
        Main.canvas.deleteArea(this.pointBottomLeft,this.pointTopRight);
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, Main.defaultColor);  
    }
    highlightSelect = async () => {
        Main.canvas.deleteArea(this.pointBottomLeft,this.pointTopRight);
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, Main.selectedColor);
        await Main.sleep(Main.timer);
    }
    highlight = (color) => {
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, color);
    }
    delete = () => {
        Main.canvas.deleteArea(this.pointBottomLeft,this.pointTopRight);
    }
    draw = () =>
    {
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, Main.defaultColor);
    }
}