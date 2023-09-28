import { Sitting, Walking, Jumping, Falling, Charging } from './capyStates.js'

export class Capy {
    constructor(game){
        this.game = game;
        this.width = 64;
        this.height = 42.5;
        this.x = 0;
        this.image = document.getElementById('capy')
        this.maxFrame;
        this.fps = 20
        this.frameInterval = 1000/this.fps; 
        this.frameTimer = 0;
        // Canvas.height - this.height
        this.y = 400
        this.speed = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.maxSpeed = 10;
        this.speedY = 0;
        this.gravity = 1;
        this.states = [new Sitting(this), new Walking(this), new Jumping(this), new Falling(this), new Charging(this)];
        this.currentState = this.states[0]; // points to index within this.states
        this.currentState.enter(); // activate initial default state
    }

    update(input, delta){
        this.checkCollision();
        this.currentState.handleInput(input)
        // Horizontal movement
        this.x += this.speed;
        // .includes() - method determines whether an array includes a certain
        // value among its entries, returning true or false as appropriate
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        // If player is not pressing anything, Capy stops moving
        if (this.x < 0) this.x = 0;
        // Player can't move off screen
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;
        
        // Vertical movement
        this.y += this.speedY
        if (!this.onGround()) this.speedY += this.gravity;
        else this.speedY = 0;
        // Player animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
        else this.frameX = 0
        } else {
            this.frameTimer += delta;
        }

    }
    draw(context){
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }
    onGround(){
        // Check if the player is off the ground or not
        return this.y >= this.game.height - this.height - this.game.groundMargin;
    }
    // Allows us to switch Capy between states
    setState(state, speed){
        this.currentState = this.states[state];
        this.game.speed = this.game.maxSpeed * speed;
        this.currentState.enter();
    }
    checkCollision(){
        this.game.mobs.forEach(mob => {
            if (
                // collision detected
                mob.x < this.x + this.width && 
                mob.x + mob.width > this.x && 
                mob.y < this.y + this.height && 
                mob.y + mob.height > this.y
            ){ mob.markedForDeletion = true;
                this.game.score++;
            } else {
                // no collision
            }
        })
    }
}



