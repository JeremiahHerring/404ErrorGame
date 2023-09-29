import { Dust } from './Particles.js'

const states = {
    // ENUM OBJECT - pair values and names of each state, helps with code readability
        SITTING: 0,
        RUNNING: 1,
        JUMPING: 2,
        FALLING: 3,
        CHARGING: 4,
        GIGACHAD: 5,
        HIT: 6,
}

class State {  // SUPER Class
    constructor(state, game){
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {  // Child Class (sub class)
    constructor(game){
        super('SITTING', game)        
        
    }
    enter(){
        this.frameX = 0;
        this.game.capy.maxFrame = 7;
        this.game.capy.frameY = 5;
    }
    // Switch the game.capy into different states
    handleInput(input){
        // While a game.capy is in a certain state, it will only react to a certain amount of inputs
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.game.capy.setState(states.RUNNING, 1);
        } else if (input.includes(' ')) {
            this.game.capy.setState(states.CHARGING, 2)
        }
    }
}
// each row is 1.5 so if you want to a specific row then do h
export class Walking extends State {  // Child Class (sub class)
    constructor(game){
        super('RUNNING', game)        
    
    }
    enter(){
        this.game.capy.frameX = 0;
        this.game.capy.maxFrame = 7;
        this.game.capy.frameY = 12.5;
    }
    // Switch the game.capy into different states
    handleInput(input){
        this.game.particles.push(new Dust(this.game, this.game.x, this.game.y));
        // While a game.capy is in a certain state, it will only react to a certain amount of inputs
        if (input.includes('ArrowDown')){
            this.game.capy.setState(states.SITTING, 0);
        } else if ((input.includes('ArrowUp')))
        this.game.capy.setState(states.JUMPING, 1);
        else if (input.includes(' ')) {
            this.game.capy.setState(states.CHARGING, 2)

        }
    }
}

export class Jumping extends State {  // Child Class (sub class)
    constructor(game){
        super('JUMPING', game)        
        
    }
    enter(){
        if (this.game.capy.onGround()) this.game.capy.speedY -= 29;
        this.frameX = 0;
        this.game.capy.maxFrame = 2;
        this.game.capy.frameY = 5;
    }
    // Switch the game.capy into different states
    handleInput(input){
        // While a game.capy is in a certain state, it will only react to a certain amount of inputs
        if (this.game.capy.speedY > this.game.capy.gravity){
            this.game.capy.setState(states.FALLING, 1);
        } else if (input.includes(' ')) {
            this.game.capy.setState(states.CHARGING, 2)
        }
    }
}

export class Falling extends State {  // Child Class (sub class)
    constructor(game){
        super('FALLING', game)        
       
    }
    enter(){
        this.game.capy.frameX = 0;
        this.game.capy.maxFrame = 3.0;
        this.game.capy.frameY = 9.5;
    }
    // Switch the game.capy into different states
    handleInput(input){
        // While a game.capy is in a certain state, it will only react to a certain amount of inputs
        if (this.game.capy.onGround()){
            this.game.capy.setState(states.RUNNING, 1);
        }
    }
}

export class Charging extends State {  // Child Class (sub class)
    constructor(game){
        super('CHARGING', game)        

    }
    enter(){
        this.game.capy.frameX = 0;
        this.game.capy.maxFrame = 3.0;
        this.game.capy.frameY = 7.8;
    }
    // Switch the game.capy into different states
    handleInput(input){
        // While a game.capy is in a certain state, it will only react to a certain amount of inputs
        if (!input.includes(' ') && this.game.capy.onGround()){
            this.game.capy.setState(states.RUNNING, 1);
            this.game.capy.y = 427.5;
        } else if (!input.includes(' ') && !this.game.capy.onGround()){
            this.game.capy.setState(states.FALLING, 1);
        } else if (input.includes(' ') && input.includes('ArrowUp') && this.game.capy.onGround()) {
            this.game.capy.speedY -= 27
        }
}
}