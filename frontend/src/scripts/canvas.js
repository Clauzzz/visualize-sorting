class Canvas
{
    constructor(id,element,type)
    {
        try
        {
            for(let i = 0; i < Main.canvases.length; i+=1)
            {
                if(Main.canvases[i].id === id)
                {
                    throw "Canvas with the same id already exists!";
                }
            }
            if(!(typeof element === "object" && element.tagName && element.tagName === "CANVAS"))
            {
                throw "Element is not a canvas!";
            }
            this.id = id;
            this.element = element;
            this.type = type;
            this.contextInput = this.element.getContext("2d");
            Main.canvases.push(this);
        }
        catch(err)
        {
            console.error(err);
        }

    }
    calculateSizesBasedOnScreen = () =>
    {
        this.width = Number(getComputedStyle(this.element).width.replace('px',''));
        this.height = Number(getComputedStyle(this.element).height.replace('px',''));
        this.element.width = this.width;
        this.element.height = this.height;
    }
    setSizes = (width, height) =>
    {
        this.width = width;
        this.height = height;
        this.element.width = this.width;
        this.element.height= this.height;
    }
    clearCanvas()
    {
        this.contextInput.clearRect(0, 0, this.element.width, this.element.height);
    }
    deleteArea(pointA, pointB)
    {
        this.contextInput.clearRect(pointA.x-3, pointB.y-3, pointB.x - pointA.x + 6, pointA.y -  pointB.y + 6);
    }
    drawLine(pointA, pointB)
    {
        this.contextInput.strokeStyle = 'white';
        this.contextInput.lineWidth = 5;
        this.contextInput.moveTo(pointA.x,pointA.y);
        this.contextInput.lineTo(pointB.x,pointB.y);
        this.contextInput.stroke();
    }
    drawBar(pointA, pointB, color)
    {
        this.contextInput.fillStyle  = color;
        this.contextInput.fillRect(pointA.x, pointB.y, pointB.x - pointA.x, pointA.y -  pointB.y);
    }
}