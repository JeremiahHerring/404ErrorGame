class Mob {
    constructor(){
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.markedForDeletion = false;
    }
    update(delta){
        // movement
        this.x -= this.speedX + this.game.speed;
        this.y += this.speedY;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += delta;
        }
        // Check if Mob is off screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height)
    }
}

export class FlyingMob extends Mob {
    constructor(game){
        super(); // runs code from parent class
        this.game = game;
        this.width = 25;
        this.height = 26;
        this.x = this.game.width
        this.y = Math.random() * this.game.height * 0.5
        this.speedX = Math.random() + 1;
        this.speedY = 0;
        this.maxFrame = 2.5;
        this.image = document.getElementById('bee')
        // Move the flying enemies up and down as they move
        this.angle = 0;
        this.angleValue = Math.random() * 0.1 + 0.1;

    }
    update(delta){
        super.update(delta);
        this.angle += this.angleValue
        this.y += Math.sin(this.angle) // Maps positions of flying mobs along sin waves
    }

}
// ANOTHER FLYING MOB

// export class Wizard extends FlyingMob {
//     constructor(game){
//         super();
//         this.game = game;
//         this.width = 73;
//         this.height = 56;
//         this.y = Math.random() * this.game.height * 0.5
//         this.speedX = Math.random() + 1;
//         this.speedY = 0;
//         this.maxFrame = 5;
//         this.image = document.getElementById('wizard')

//     }
// }

// STILL TRYING TO IMPLEMENT A GROUND MOB HERE (CAN BE STATIONARY OR NOT STATIONARY)

export class GroundMob extends Mob {
    constructor(game){
        super();
        this.game = game;
        this.width = 24;
        this.height = 25;
        this.x = this.game.width;
        this.y = this.game.height - this.height - this.game.groundMargin;
        this.image = document.getElementById('hedgehog');
        this.speedX = 2;
        this.speedY = 0;
        this.maxFrame = 1;
    }



    
}

