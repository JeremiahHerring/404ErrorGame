import { images } from './main.js';

export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Dela Gothic One';
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

    // draw health
    const healthXOffset = 40;
    context.fillText('Health: ' + this.game.health, healthXOffset, 35);

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

