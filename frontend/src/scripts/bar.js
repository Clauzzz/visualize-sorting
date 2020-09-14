class Bar
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
    highlight = (color) =>
    {
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight,color);
    }
    draw = () =>
    {
        Main.canvas.drawBar(this.pointBottomLeft,this.pointTopRight, Main.defaultColor);
    }
}