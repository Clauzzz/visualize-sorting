Array.prototype.spliceArray = function ( index, splicedArray) {
    for(let i= splicedArray.length-1; i>=0; i--)
    {
        this.splice(index, 0, splicedArray[i]);
    }
    return this;
}
class Main
{
    static canvas;
    static canvases;
    static numbers;
    static timer;
    static stepByStep = false;
    static steps;
    static running;

    static defaultColor = "rgba(127,127,255,1)";
    static indexColor = "rgba(255,127,127,1)";
    static selectedColor = "rgba(255,255,127,1)";
    static switchColors = "rgba(127,255,127,1)";
    static finalColor = "rgba(127,127,127,1)";
    static pivotColor = "rgba(255,255,255,1)";
    static canvasPadding = 30;
    static canvasMargin = 6;

    static initialize = () =>
    {
        Main.createCanvas();
        Main.addSortListeners();
        Main.addSpeedListeners();
        Main.setSpeedLabel();
        Main.addGenerateNumbersListener();
        Main.generateSetOfNumbers();
    }
    static generateSetOfNumbers= () => {
        Sorting.isRunning = false;
        let rangeMin = document.getElementById('rangeMin');
        let rangeMax = document.getElementById('rangeMax');
        let numberLength = document.getElementById('numberLength');
        let numbers = Main.generateNumbers(Number(numberLength.value), Number(rangeMin.value), Number(rangeMax.value));
        Main.drawBars(numbers, Main.canvas);
    }
    static addGenerateNumbersListener = () => {
        document.getElementById('generate').addEventListener("click", function () { Main.generateSetOfNumbers();})

    }
    static addSortListeners = () => {
        let buttons = document.getElementsByTagName('button');
        for(let i = 0; i<buttons.length; i++) {
            if(buttons[i].dataset && buttons[i].dataset.sort) {
                let sortingAlg = buttons[i].dataset.sort;
                buttons[i].addEventListener("click", function() {Sorting.sort(sortingAlg, Main.numbers)});
            }
        }
    }
    static addSpeedListeners = () =>
    {
        document.getElementById("decrease").addEventListener("click", Main.decreaseSpeed);
        document.getElementById("increase").addEventListener("click", Main.increaseSpeed);
    }
    static increaseSpeed = () =>
    {
        if(Main.timer>1)
        {
            Main.timer = Main.timer / 2;
        }
        Main.setSpeedLabel();
    }
    static decreaseSpeed = () =>
    {
        if(Main.timer < 2048)
        {
            Main.timer = Main.timer *2;
        }
        
        Main.setSpeedLabel();
    }
    static setSpeedLabel = () =>
    {
        let speedLabel = document.getElementById('speed');
        if(Main.timer > 1000)
        {
            speedLabel.innerHTML = Main.timer/1000 + " s";
        } 
        else if(Main.timer > 100)
        {
            speedLabel.innerHTML ="0."+ Main.timer + " s";
        }
        else 
        {
            speedLabel.innerHTML = Main.timer + " ms";
        }
        
    }
    static createCanvas = async () =>
    {
        Main.canvas = [];
        Main.bars = [];
        Main.numbers = [];
        Main.timer = 512;
        Main.steps = [];

        let mainCanvas = document.getElementById('sortingCanvas');
        Main.canvas = new Canvas('main',mainCanvas,1);
        Main.canvas.calculateSizesBasedOnScreen();
    }
    static generateNumbers = (size, min, max) =>
    {
        let numbers = [];
        for(let i=0; i<size; i++)
        {
            numbers.push(min + Math.floor(Math.random()*(max - min)));
        }
        return numbers;
    }
    static drawState = (numbers) => {
        Main.canvas.clearCanvas();
        let maxH = Main.canvas.height;
        let maxW = Main.canvas.width;
        let barW = (maxW - 2* Main.canvasPadding + Main.canvasMargin) / numbers.length - Main.canvasMargin;
        let minBW = Main.canvasPadding;
        let minBH = Main.canvasPadding;
        let maxBH = maxH - Main.canvasPadding;
        let maxN;
        if(numbers && numbers.length && typeof numbers[0] == 'number') {
            maxN = Math.max(...numbers);
        } else if(numbers && numbers.length && typeof numbers[0] == 'object') {
            maxN = Math.max(...numbers.map(x=>x.number));
        }
        Main.numbers = [];
        for(let i=0; i<numbers.length; i++)
        {
            let pointBottomLeft = new Point(minBW + i*(barW + Main.canvasMargin), maxBH);
            let pointTopRight;
            let number;
            if(numbers[i].id ) {
                pointTopRight = new Point(minBW + i*(barW + Main.canvasMargin) + barW ,maxBH - Math.floor(numbers[i].number/maxN * (maxBH -minBH)));
                number = new NumberBar(pointBottomLeft, pointTopRight, numbers[i].number, numbers[i].id);
            } else {
                pointTopRight = new Point(minBW + i*(barW + Main.canvasMargin) + barW ,maxBH - Math.floor(numbers[i]/maxN * (maxBH -minBH)));
                number = new NumberBar(pointBottomLeft, pointTopRight, numbers[i]);
            }
            number.draw();
            Main.numbers.push(number);
        }
    }
    static drawBars = (numbers, canvas) =>
    {
        if(!canvas) {
            let mainCanvas = document.getElementById('sortingCanvas');
            Main.canvas = new Canvas('main',mainCanvas,1);
            Main.canvas.calculateSizesBasedOnScreen();
        }
        Main.drawState(numbers);
    }
    static sleep = (delay) =>
    {
        return new Promise((resolve) =>
        {
            setTimeout(()=>{resolve()}, delay);
        });
    }
    
}
Main.initialize();