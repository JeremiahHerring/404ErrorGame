import { images } from './main.js';

export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Luckiest Guy';
    }

draw(context){
    context.save()
    context.shadowOffsetX = 2;
    context.shadowOffsetY = 2;
    context.shadowColor = 'white';
    context.ShadowBlur = 0;
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;

    // score
    const scoreXOffset = 785;
    context.fillText('Points: ' + this.game.score, scoreXOffset, 35) // .fillText() - draws filled text on the canvas

    // draw hedgehog count
    const hedgehogCountXOffset = 650;
    context.drawImage(images.hedgehogImage, 0, 0, 22, 21, hedgehogCountXOffset, 15, 24, 27);
    context.fillText('x ' + this.game.hedgehogScore, 35 + hedgehogCountXOffset, 35);

    // draw bee count
    const beeCountXOffset = 535;
    context.drawImage(images.beeImage, 26, 0, 50 - 26, 27 - 0, beeCountXOffset, 10, 50 - 26, 27 - 0);
    context.fillText('x ' + this.game.beeScore, 32 + beeCountXOffset, 35);

    // draw the health and energy bars
    const drawBar = (type) => {
        let yDist;
        let barX;
        if (type === "health") {
            yDist = 0;
            barX = 30;
        }
        else if (type === "energy") {
            yDist = 32;
            barX = 120;
        }
        else {
            yDist = 0;
            barX = 0;
        }
        const barWidth = 32;
        let frameNum = Math.max(0, 6 - this.game[type]);
        let frame = frameNum * barWidth;
        if (this.game[type] < 6) frame-= barWidth;
        context.drawImage(images.bars, 64 + frame, yDist, 31, 18, barX, -14, 96, 60);  
        if (this.game[type] === 6) context.drawImage(images.bars, 51, yDist, 6, 18, 65 + barX, -14, 18, 60);
    }
    drawBar("health");
    drawBar("energy");    

    // game over
    if (this.game.gameOver){
        context.textAlign = 'center';
        context.font = this.fontSize * 2 + 'px ' + this.fontFamily;
        context.fillText(`You ran out of health!`, this.game.width * 0.5, this.game.height * 0.5 - 20);
        context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
        context.fillText(`Your final score is: ${this.game.score}`, this.game.width * 0.5, this.game.height * 0.5 + 20);
        }
        context.restore();
    }
}