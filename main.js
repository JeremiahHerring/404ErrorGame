import { Capy } from './capy.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';
import { GroundMob, FlyingMob, Hedgehog, Wizard } from './mobs.js';
import { UI } from './UI.js';

// LOAD event: Javascript waits for all dependent resources such as stylsheets 
// and images to be fully loaded and available before it runs
window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1')
    const ctx = canvas.getContext('2d');
    canvas.width = 1000;
    canvas.height = 550;

    // All logic will go through class Game
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 30;
            this.speed = 0;
            this.maxSpeed = 3;
            this.maxParticles = 50;
            this.background = new Background(this);
            this.capy = new Capy(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this)
            this.mobs = [];
            this.particles = [];
            this.collisions = [];
            this.mobTimer = 0;
            this.mobInterval = 1000;
            this.debug = false;
            this.gameOver = false;
            this.health = 6;
            this.score = 0;
            this.hedgehogScore = 0;
            this.beeScore = 0;
            this.fontColor = 'black';
            this.hudHeight = 50;
            this.capy.currentState = this.capy.states[0]; // points to index within this.states
            this.capy.currentState.enter(); // activate initial default state
        }
        // Run forever animation frame
        update(delta){
            if (this.score > 5) this.gameOver = true;
            this.background.update();
            this.capy.update(this.input.keys, delta);
            // Handle Mobs
            if (this.mobTimer > this.mobInterval){
                this.addMob();
                this.mobTimer = 0;
            } else {
                this.mobTimer += delta;
            }
            // .forEach() method executres a provided function once for each array element
            this.mobs.forEach(mob => {
                mob.update(delta);
                if (mob.markedForDeletion) this.mobs.splice(this.mobs.indexOf(mob), 1);
            })
            // Handle particles
            this.particles.forEach((particle, index) => {
                particle.update();
                if (particle.markedForDeletion) this.particles.splice(index, 1)
            })
        if (this.particles.length > this.maxParticles) {
            // Slice returns a portion of an array where start and end 
            // represent the index of items in that array. 
            this.particles.length = this.maxParticles;
        }
        // Handle collision boom
        this.collisions.forEach((collision, index) => {
            collision.update(delta);
         if (collision.markedForDeletion) this.collisions.splice(index, 1);
        })
        }
        // Draw images, score, and so on
        draw(context){
            this.background.draw(context)
            this.capy.draw(context);
            this.mobs.forEach(mob => {
                mob.draw(context);
            })
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.collisions.forEach(collision => {
                collision.draw(context);
        this.UI.draw(context);
    })
}
        addMob(){
            if (this.speed > 0 && Math.random() < 0.5) this.mobs.push(new GroundMob(this), new Hedgehog(this));
            if (this.speed > 0 && Math.random() < 0.3) this.mobs.push(new Wizard(this))
            this.mobs.push(new FlyingMob(this))
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let lastTime = 0;

    function animate(time){
        const delta = time - lastTime; // deltaTime = how many milliseconds it takes to serve next frame (dependent on PC/Monitor)
        lastTime = time;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(delta)
        game.draw(ctx);
        if (!game.gameOver) requestAnimationFrame(animate);
    }
    animate(0);
});
