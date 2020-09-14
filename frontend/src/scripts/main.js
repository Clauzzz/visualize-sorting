class Main
{
    static canvas;
    static canvases;
    static numbers;
    static bars;

    static defaultColor = "rgba(29,0,92,1)";
    static indexColor = "rgba(0,97,110,1)";
    static selectedColor = "rgba(0,178,181,1)";
    static switchColors = "rgba(212,67,0,1)";
    static finalColor = "rgba(0,110,7,1)";

    static initialize = () =>
    {
        Main.createCanvas();
    }
    static createCanvas = () =>
    {
        Main.canvases = [];
        Main.bars = [];
        Main.numbers = [];

        let mainCanvas = document.getElementById('sortingCanvas');
        Main.canvas = new Canvas('main',mainCanvas,1);
        Main.canvas.calculateSizesBasedOnScreen();
        Main.generateNumbers(10, 0, 100);
        Main.drawBars(Main.numbers, Main.canvas, 100);
        Numbers.selectionSortMin();
    }
    static generateNumbers = (size, min, max) =>
    {
        Main.numbers = [];
        for(let i=0; i<size; i++)
        {
            Main.numbers.push(min + Math.floor(Math.random()*(max - min)));
        }
    }
    static drawBars = (numbers, canvas) =>
    {
        let maxH = canvas.height;
        let maxW = canvas.width;
        let padding = 30;
        let margin = 10;

        let barW = (maxW - 2*padding + margin) / numbers.length - margin;
        let minBW = padding;
        let minBH = padding;
        let maxBW = maxW - padding; 
        let maxBH = maxH - padding;
        let maxN = Math.max(...numbers);
        for(let i=0; i<numbers.length; i++)
        {
            let pointBottomLeft = new Point(minBW + i*(barW + margin), maxBH);
            let pointTopRight = new Point(minBW + i*(barW + margin) + barW ,maxBH - Math.floor(numbers[i]/maxN * (maxBH -minBH)));
            let bar = new Bar(pointBottomLeft, pointTopRight, numbers[i]);
            bar.draw();
            Main.bars.push(bar);
        }
    }
    static sleep = (delay) =>
    {
        return new Promise((resolve) =>
        {
            setTimeout(()=>{resolve()},delay);
        });
    }
    
}
Main.initialize();