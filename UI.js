export class UI {
    constructor(game){
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Dela Gothic One';
    }

draw(context){
    context.font = this.fontSize + 'px ' + this.fontFamily;
    context.textAlign = 'left';
    context.fillStyle = this.game.fontColor;
    // score
    context.fillText('Points: ' + this.game.score, 800, 35) // .fillText() - draws filled text on the canvas
    context.fillText('Hedgehog: ' + this.game.hedgehogScore, 550, 35);
    context.fillText('Bee: ' + this.game.beeScore, 405, 35);
    context.fillText('Health: ' + this.game.health, 210, 35);
}
}
