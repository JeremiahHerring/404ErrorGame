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
    context.fillText('Points: ' + this.game.score, 20, 35) // .fillText() - draws filled text on the canvas
}
}
