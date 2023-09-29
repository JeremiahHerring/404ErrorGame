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
    context.fillText('Points: ' + this.game.score, 800, 35) // .fillText() - draws filled text on the canvas
    context.fillText('Hedgehog: ' + this.game.hedgehogScore, 550, 35);
    context.fillText('Bee: ' + this.game.beeScore, 405, 35);
    context.fillText('Health: ' + this.game.health, 210, 35);
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

