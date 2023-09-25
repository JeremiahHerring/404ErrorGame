const states = {
    // ENUM OBJECT - pair values and names of each state, helps with code readability
        SITTING: 0,
        RUNNING: 1,
        JUMPING: 2,
        FALLING: 3,
}

class State {  // SUPER Class
    constructor(state){
        this.state = state;
    }
}

export class Sitting extends State {  // Child Class (sub class)
    constructor(capy){
        super('SITTING')        
        this.capy = capy
    }
    enter(){
        this.frameX = 0;
        this.capy.maxFrame = 4;
        this.capy.frameY = 5;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.capy.setState(states.RUNNING);
        } 
    }
}

export class Running extends State {  // Child Class (sub class)
    constructor(capy){
        super('RUNNING')        
        this.capy = capy
    }
    enter(){
        this.frameX = 0;
        this.capy.maxFrame = 8;
        this.capy.frameY = 3;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (input.includes('ArrowDown')){
            this.capy.setState(states.SITTING);
        } else if ((input.includes('ArrowUp')) || (input.includes(" ")))
        this.capy.setState(states.JUMPING);
    }
}

export class Jumping extends State {  // Child Class (sub class)
    constructor(capy){
        super('JUMPING')        
        this.capy = capy
    }
    enter(){
        if (this.capy.onGround()) this.capy.speedY -= 25;
        this.frameX = 0;
        this.capy.maxFrame = 6;
        this.capy.frameY = 1;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (this.capy.speedY > this.capy.gravity){
            this.capy.setState(states.FALLING);
        }
    }
}

export class Falling extends State {  // Child Class (sub class)
    constructor(capy){
        super('Falling')        
        this.capy = capy
    }
    enter(){
        this.frameX = 0;
        this.capy.maxFrame = 6;
        this.capy.frameY = 2;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (this.capy.onGround()){
            this.capy.setState(states.RUNNING);
        }
    }
}