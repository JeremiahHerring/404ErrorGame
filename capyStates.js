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
        this.capy.maxFrame = 7;
        this.capy.frameY = 5;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')){
            this.capy.setState(states.RUNNING, 1);
        } else if (input.includes('Enter')) {
            this.capy.setState(states.CHARGING, 2)
        }
    }
}
// each row is 1.5 so if you want to a specific row then do h
export class Walking extends State {  // Child Class (sub class)
    constructor(capy){
        super('RUNNING')        
        this.capy = capy
    }
    enter(){
        this.frameX = 0;
        this.capy.maxFrame = 7;
        this.capy.frameY = 12.5;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (input.includes('ArrowDown')){
            this.capy.setState(states.SITTING, 0);
        } else if ((input.includes('ArrowUp')) || (input.includes(" ")))
        this.capy.setState(states.JUMPING, 1);
        else if (input.includes('Enter')) {
            this.capy.setState(states.CHARGING, 2)
        }
    }
}

export class Jumping extends State {  // Child Class (sub class)
    constructor(capy){
        super('JUMPING')        
        this.capy = capy
    }
    enter(){
        if (this.capy.onGround()) this.capy.speedY -= 29;
        this.frameX = 0;
        this.capy.maxFrame = 2;
        this.capy.frameY = 5;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (this.capy.speedY > this.capy.gravity){
            this.capy.setState(states.FALLING, 1);
        } else if (input.includes('Enter')) {
            this.capy.setState(states.CHARGING, 2)
        }
    }
}

export class Falling extends State {  // Child Class (sub class)
    constructor(capy){
        super('FALLING')        
        this.capy = capy
    }
    enter(){
        this.frameX = 0;
        this.capy.maxFrame = 3.0;
        this.capy.frameY = 9.5;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (this.capy.onGround()){
            this.capy.setState(states.RUNNING, 1);
        }
    }
}

export class Charging extends State {  // Child Class (sub class)
    constructor(capy){
        super('CHARGING')        
        this.capy = capy
    }
    enter(){
        this.frameX = 0;
        this.capy.maxFrame = 3.0;
        this.capy.frameY = 9.5;
    }
    // Switch the capy into different states
    handleInput(input){
        // While a capy is in a certain state, it will only react to a certain amount of inputs
        if (!input.includes('Enter') && this.player.onGround()){
            this.capy.setState(states.RUNNING, 1);
        } else if (!input.includes('Enter') && !this.player.onGround()){
            this.capy.setState(states.FALLING, 1);
    }
}
}