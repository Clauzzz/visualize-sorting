class Sorting {
    
    static isRunning = false;
    static sort = async (sortingAlgorithm, numbers) => {
        if(!this.isRunning)
        {
            this.isRunning = true;
            await this[sortingAlgorithm](numbers);
        }
    }
    static radixSort = async (numbers) => {
        
    }
    static mergeSort = async (numbers) => {
        function merge (arr1, arr2) {
            let finalArr = [];
            let i = 0;
            let j = 0;
            while(arr1[i] && arr2[j]) {
                if(arr1[i].number < arr2[j].number) {
                    finalArr.push(arr1[i]);
                    i++;
                } else {
                    finalArr.push(arr2[j]);
                    j++;
                }
            }
            while(arr1[i]) {
                finalArr.push(arr1[i]);
                i++;
            }
            while(arr2[j]) {
                finalArr.push(arr2[j]);
                j++;
            }
            return finalArr;
        }
        function mergeS (numberArray, level, tree) {

            if(numberArray.length == 1) {
                return numberArray;
            } else {
                if(!tree[level]) {
                    tree[level] = [];
                }
                let length = numberArray.length;
                let middle = Math.floor( length / 2);
                let firstHalf = mergeS(numberArray.slice(0, middle), level+1, tree);
                let secondHalf = mergeS(numberArray.slice(middle, length), level+1, tree)
                tree[level].push(firstHalf);
                tree[level].push(secondHalf);
                return merge(firstHalf, secondHalf);
            }
        }
        let numberTree = {};
        numbers = mergeS(numbers, 0 , numberTree);
        let sortedKeys = Object.keys(numberTree).sort();
        for(let i = sortedKeys.length-1; i>=0; i--) {
            let jointNumbers = [];
            for(let j = 0; j< numberTree[sortedKeys[i]].length;j++) {
                let nNumbers = numberTree[sortedKeys[i]][j].map(x=>x.number);
                jointNumbers = (([jointNumbers, nNumbers ].join()).split(',')).filter(x=> x!="").map(x=> Number(x));
            }
            if(this.isRunning)
            {
                await Main.drawBars(jointNumbers);
                await Main.canvas.redrawGroupWait(Main.numbers);
            }
        }
        numbers = numbers.map(x=>x.number);
        if(this.isRunning) {
            await Main.drawBars(numbers);
            await Main.canvas.highlightFinalGroup(Main.numbers);
        }
    }
    static quickSort = async (numbers) => {

    }
    static insertionSort = async (numbers) => {
        for(let i=0; i<numbers.length;i++) {
            if(this.isRunning){
                await numbers[i].highlightIndex();
            }
            let j = i;
            while(numbers[j-1] && numbers[j-1].number > numbers[j].number) {
                if(this.isRunning){
                    await Main.canvas.swapNumbers(j-1, j, numbers[j-1], numbers[j]);
                }
                j--;
            }
        }
        if(this.isRunning) {
            await Main.canvas.highlightFinalGroup(numbers);
        }
    }
    static bubbleSort = async (numbers) => {
        function isSorted(numbers) {
            for(let i=0; i<numbers.length-1;i++) {
                if(numbers[i].number>numbers[i+1].number){
                    return false;
                }
            }
            return true;
        }
        for(let i=0; i<numbers.length-1;i++) {
            if(this.isRunning){
                await numbers[i].highlightIndex();
            }
            if(numbers[i+1].number<numbers[i].number && this.isRunning) {
                await Main.canvas.swapNumbers(i, i+1, numbers[i], numbers[i+1]);
            }
        }
        if(!isSorted(numbers) && this.isRunning) {
            return this.bubbleSort(numbers);
        } else if(this.isRunning){
            await Main.canvas.highlightFinalGroup(numbers);
        }
    }
    static selectionSortMin = async (numbers) => {
        for(let i =0; i<numbers.length; i++) {
            let min = i;
            if(this.isRunning) {
                await numbers[i].highlightSelect();
            }
            for(let j=i+1; j<numbers.length; j++) {
                
                if(numbers[j].number<numbers[min].number && this.isRunning) {
                    await numbers[min].deselect();
                    min = j;
                    await numbers[j].highlightSelect();
                } else if(this.isRunning) {
                    await numbers[j].highlightIndex();
                }
            }
            if(i !== min && this.isRunning) {
                await Main.canvas.swapNumbers(i, min, numbers[i], numbers[min]);
                await numbers[i].highlightFinal();
            } else if(this.isRunning) {
                await numbers[i].highlightFinal();
            }
        }
    }
} 