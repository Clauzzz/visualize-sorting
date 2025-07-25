import './point.js';
import './number.js';
import './canvas.js';
import './sorting.js';

Array.prototype.spliceArray = function (index, splicedArray) {
    for (let i = splicedArray.length - 1; i >= 0; i--) {
        this.splice(index, 0, splicedArray[i]);
    }
    return this;
}
window.Main = class Main {
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

    static initialize = () => {
        Main.setCanvasMarginBasedOnScreen();
        Main.createCanvas();
        Main.addSortListeners();
        Main.addSpeedListeners();
        Main.addNumberLengthListener();
        Main.setSpeedLabel();
        Main.addGenerateNumbersListener();
        Main.generateSetOfNumbers();
        Main.addModalListeners();
        Main.addToolbarListener();

    }
    static toggleToolbar = () => {
        let icon = document.getElementById('toolbar_toggle_icon');
        let toolbar = document.getElementsByClassName('sorting_toolbar_container')[0];
        let toggleBody = document.getElementsByClassName('toolbar_toggle_body')[0];
        let toolbarShortcuts = document.getElementsByClassName('toolbar_shortcuts')[0];
        if (icon.dataset.toggled == 'true') {
            icon.dataset.toggled = 'false';
            icon.style.animationName = 'rotateArrowRight';
            toolbar.style.animationName = 'slideToLeft';
            toggleBody.style.animationName = 'slideToLeft';
            setTimeout(function () {
                toolbarShortcuts.style.display = 'flex';
                toolbarShortcuts.style.animationName = 'fadeIn';
            }, 500);
        } else {
            icon.dataset.toggled = 'true';
            icon.style.animationName = 'rotateArrowLeft';
            toolbar.style.animationName = 'slideToRight';
            toggleBody.style.animationName = 'slideToRight';
            toolbarShortcuts.style.display = 'none';
        }
    }
    static addToolbarListener = () => {
        let icon = document.getElementById('toolbar_toggle_icon');
        icon.addEventListener("click", Main.toggleToolbar)
    }
    static setCanvasMarginBasedOnScreen = () => {
        if (window.innerWidth < 1024) {
            Main.canvasMargin = 4;
        }
        if (window.innerWidth < 768) {
            Main.canvasMargin = 1;
        }
    }
    static addModalListeners = () => {
        let modalClose = document.getElementById('modal_close');
        modalClose.addEventListener("click", function () {
            let modalBody = document.getElementById('explanation_modal_background');
            modalBody.style.display = 'none';
        });

        let modalOpen = document.getElementsByClassName('help_icon')[0];
        modalOpen.addEventListener("click", function () {
            let modalBody = document.getElementById('explanation_modal_background');
            modalBody.style.display = 'flex';
        });

    }
    static addNumberLengthListener = () => {
        let numberLength = document.getElementById('numberLength');
        let decreaseLength = document.getElementById('decreaseLength');
        decreaseLength.addEventListener("click", function () {
            let number = Number(numberLength.innerHTML);
            if (number > 1) {
                number = number / 2;
                numberLength.innerHTML = number;
            }
        })
        let increaseLength = document.getElementById('increaseLength');
        increaseLength.addEventListener("click", function () {
            let number = Number(numberLength.innerHTML);
            if (number < 128) {
                number = number * 2;
                numberLength.innerHTML = number;
            }
        })
    }
    static generateSetOfNumbers = () => {
        Sorting.isRunning = false;
        let rangeMin = document.getElementById('rangeMin');
        let rangeMax = document.getElementById('rangeMax');
        let numberLength = document.getElementById('numberLength');
        let numbersLength = Number(numberLength.innerHTML);
        switch (numbersLength) {
            case 128:
                Main.timer = 4;
                break;
            case 64:
                Main.timer = 16;
                break;
            case 32:
                Main.timer = 32;
                break;
            case 16:
                Main.timer = 64;
                break;
            case 8:
                Main.timer = 128;
                break;
            case 4:
                Main.timer = 256;
                break;
            case 2:
                Main.timer = 512;
                break;
        }
        let numbers = Main.generateNumbers(numbersLength, Number(rangeMin.value), Number(rangeMax.value));
        Main.drawBars(numbers, Main.canvas);
    }
    static addGenerateNumbersListener = () => {
        document.getElementById('generate_shortcut').addEventListener("click", Main.generateSetOfNumbers);
        document.getElementById('generate').addEventListener("click", Main.generateSetOfNumbers);

    }
    static addSortListeners = () => {
        let buttons = document.getElementsByTagName('button');
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].dataset && buttons[i].dataset.sort) {
                let sortingAlg = buttons[i].dataset.sort;
                buttons[i].addEventListener("click", function () { Sorting.sort(sortingAlg, Main.numbers) });
            }
        }
        let toolbarShortcuts = document.getElementsByClassName('sort_shortcut');
        for (let i = 0; i < toolbarShortcuts.length; i++) {
            if (toolbarShortcuts[i].dataset && toolbarShortcuts[i].dataset.sort) {
                let sortingAlg = toolbarShortcuts[i].dataset.sort;
                toolbarShortcuts[i].addEventListener("click", function () { Sorting.sort(sortingAlg, Main.numbers) });
            }
        }

    }
    static addSpeedListeners = () => {
        document.getElementById("decrease").addEventListener("click", Main.decreaseSpeed);
        document.getElementById("increase").addEventListener("click", Main.increaseSpeed);
    }
    static increaseSpeed = () => {
        if (Main.timer > 1) {
            Main.timer = Main.timer / 2;
        }
        Main.setSpeedLabel();
    }
    static decreaseSpeed = () => {
        if (Main.timer < 2048) {
            Main.timer = Main.timer * 2;
        }

        Main.setSpeedLabel();
    }
    static setSpeedLabel = () => {
        let speedLabel = document.getElementById('speed');
        if (Main.timer > 1000) {
            speedLabel.innerHTML = Main.timer / 1000 + " s";
        }
        else if (Main.timer > 100) {
            speedLabel.innerHTML = "0." + Main.timer + " s";
        }
        else {
            speedLabel.innerHTML = Main.timer + " ms";
        }

    }
    static createCanvas = async () => {
        Main.canvas = [];
        Main.bars = [];
        Main.numbers = [];
        Main.timer = 2;
        Main.steps = [];

        let mainCanvas = document.getElementById('sortingCanvas');
        Main.canvas = new Canvas('main', mainCanvas, 1);
        Main.canvas.calculateSizesBasedOnScreen();
    }
    static generateNumbers = (size, min, max) => {
        let numbers = [];
        for (let i = 0; i < size; i++) {
            numbers.push(min + Math.floor(Math.random() * (max - min)));
        }
        return numbers;
    }
    static drawState = (numbers) => {
        Main.canvas.clearCanvas();
        let maxH = Main.canvas.height;
        let maxW = Main.canvas.width;
        let barW = (maxW - 2 * Main.canvasPadding + Main.canvasMargin) / numbers.length - Main.canvasMargin;
        let minBW = Main.canvasPadding;
        let minBH = Main.canvasPadding;
        let maxBH = maxH - Main.canvasPadding;
        let maxN;
        if (numbers && numbers.length && typeof numbers[0] == 'number') {
            maxN = Math.max(...numbers);
        } else if (numbers && numbers.length && typeof numbers[0] == 'object') {
            maxN = Math.max(...numbers.map(x => x.number));
        }
        Main.numbers = [];
        for (let i = 0; i < numbers.length; i++) {
            let pointBottomLeft = new Point(minBW + i * (barW + Main.canvasMargin), maxBH);
            let pointTopRight;
            let number;
            if (numbers[i].id) {
                pointTopRight = new Point(minBW + i * (barW + Main.canvasMargin) + barW, maxBH - Math.floor(numbers[i].number / maxN * (maxBH - minBH)));
                number = new NumberBar({ pointBottomLeft, pointTopRight, number: numbers[i].number, id: numbers[i].id });
            } else {
                pointTopRight = new Point(minBW + i * (barW + Main.canvasMargin) + barW, maxBH - Math.floor(numbers[i] / maxN * (maxBH - minBH)));
                number = new NumberBar({ pointBottomLeft, pointTopRight, number: numbers[i] });
            }
            number.draw();
            Main.numbers.push(number);
        }
    }
    static drawBars = (numbers, canvas) => {
        if (!canvas) {
            let mainCanvas = document.getElementById('sortingCanvas');
            Main.canvas = new Canvas('main', mainCanvas, 1);
            Main.canvas.calculateSizesBasedOnScreen();
        }
        Main.drawState(numbers);
    }
    static sleep = (delay) => {
        return new Promise((resolve) => {
            setTimeout(() => { resolve() }, delay);
        });
    }

}

Main.initialize();

