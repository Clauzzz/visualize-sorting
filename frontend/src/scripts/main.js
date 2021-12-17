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
    static indexColor = "rgba(255,0,0,1)";
    static selectedColor = "rgba(255,255,0,1)";
    static switchColors = "rgba(0,255,0,1)";
    static finalColor = "rgba(0,255,255,1)";

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
        if(Main.timer>2)
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
    static drawBars = (numbers, canvas) =>
    {
        
        if(!canvas) {
            let mainCanvas = document.getElementById('sortingCanvas');
            Main.canvas = new Canvas('main',mainCanvas,1);
            Main.canvas.calculateSizesBasedOnScreen();
            canvas = Main.canvas;
        }
        canvas.clearCanvas();
        let maxH = canvas.height;
        let maxW = canvas.width;
        let padding = 30;
        let margin = 6;

        let barW = (maxW - 2*padding + margin) / numbers.length - margin;
        let minBW = padding;
        let minBH = padding;
        let maxBW = maxW - padding; 
        let maxBH = maxH - padding;
        let maxN = Math.max(...numbers);
        Main.numbers = [];
        for(let i=0; i<numbers.length; i++)
        {
            let pointBottomLeft = new Point(minBW + i*(barW + margin), maxBH);
            let pointTopRight = new Point(minBW + i*(barW + margin) + barW ,maxBH - Math.floor(numbers[i]/maxN * (maxBH -minBH)));
            let number = new NumberBar(pointBottomLeft, pointTopRight, numbers[i]);
            number.draw();
            Main.numbers.push(number);
        }
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