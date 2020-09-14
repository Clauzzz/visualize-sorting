class Numbers
{
    static selectionSortMin = async () =>
    {
        for(let i=0; i<Main.bars.length; i++)
        {
            let min = i;
            Main.canvas.deleteArea(Main.bars[i].pointBottomLeft,Main.bars[i].pointTopRight);
            Main.bars[i].highlight(Main.selectedColor);
            for(let j=i+1; j<Main.bars.length; j++)
            {
                Main.canvas.deleteArea(Main.bars[j].pointBottomLeft,Main.bars[j].pointTopRight);
                Main.bars[j].highlight(Main.indexColor);
                if(Main.bars[j].number<Main.bars[min].number)
                {
                    Main.canvas.deleteArea(Main.bars[j].pointBottomLeft,Main.bars[j].pointTopRight);
                    Main.bars[min].highlight(Main.defaultColor);
                    min = j;
                    Main.canvas.deleteArea(Main.bars[j].pointBottomLeft,Main.bars[j].pointTopRight);
                    Main.bars[min].highlight(Main.selectedColor);
                    await Main.sleep(250);
                }
                await Main.sleep(250);
                if(j !== min)
                {
                    Main.canvas.deleteArea(Main.bars[j].pointBottomLeft,Main.bars[j].pointTopRight);
                    Main.bars[j].draw();
                }
            }
            if(i!==min)
            {
                let barIndex = Main.bars[i];
                let barMin = Main.bars[min];

                Main.canvas.deleteArea(barIndex.pointBottomLeft,barIndex.pointTopRight);
                barIndex.highlight(Main.switchColors);
                Main.canvas.deleteArea(barMin.pointBottomLeft,barMin.pointTopRight);
                barMin.highlight(Main.switchColors);
                await Main.sleep(250);
                
                Main.bars.splice(i,1,barMin);
                Main.bars.splice(min,1,barIndex);
                Main.canvas.deleteArea(barIndex.pointBottomLeft,barIndex.pointTopRight);
                Main.canvas.deleteArea(barMin.pointBottomLeft,barMin.pointTopRight);

                let aux = JSON.parse(JSON.stringify(barIndex));
                barIndex.pointBottomLeft.x = barMin.pointBottomLeft.x;
                barIndex.pointTopRight.x = barMin.pointTopRight.x;
                barMin.pointBottomLeft.x = aux.pointBottomLeft.x;
                barMin.pointTopRight.x = aux.pointTopRight.x;

                await Main.sleep(250);
                barMin.highlight(Main.finalColor);
                barIndex.highlight(Main.defaultColor);
                await Main.sleep(250);
            }
            else
            {
                Main.canvas.deleteArea(Main.bars[i].pointBottomLeft,Main.bars[i].pointTopRight);
                Main.bars[i].highlight(Main.finalColor);
                await Main.sleep(250);
            }

        }
    }
    static selectionSortMax = () =>
    {

    }
} 