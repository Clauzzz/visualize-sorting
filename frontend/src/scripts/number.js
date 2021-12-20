class NumberBar
{
    number;
    pointBottomLeft;
    pointTopRight;
    width;
    height;

    constructor(pointBottomLeft, pointTopRight, number, id )
    {
        this.pointBottomLeft = pointBottomLeft;
        this.pointTopRight = pointTopRight;
        this.width = Math.abs(this.pointBottomLeft.x -this.pointTopRight.x);
        this.height = Math.abs(this.pointBottomLeft.y - this.pointTopRight.y);
        this.number = number;
        if(id) {
            this.id = id;
        } else {
            this.id = this.generateRandomId();
        }
    }
    generateRandomId = () => {
        let length = 20;
        let alphabet = 'abcdefghijklmnopqsrtuvxyz1234567890';
        let id = '';
        for(let i=0; i<length; i++) {
            id+=alphabet[Math.floor(Math.random()*alphabet.length)];
        }
        return id;
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