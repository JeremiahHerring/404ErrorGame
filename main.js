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
    canvas.height = 500;

    // All logic will go through class Game
    class Game {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.groundMargin = 30;
            this.speed = 0;
            this.maxSpeed = 3;
            this.background = new Background(this);
            this.capy = new Capy(this);
            this.input = new InputHandler(this);
            this.UI = new UI(this)
            this.mobs = [];
            this.mobTimer = 0;
            this.mobInterval = 1000;
            this.debug = true;
            this.score = 0;
            this.fontColor = 'purple'
            
        }
        // Run forever animation frame
        update(delta){
 
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

        }
        // Draw images, score, and so on
        draw(context){
            this.background.draw(context)
            this.capy.draw(context);
            this.mobs.forEach(mob => {
                mob.draw(context);
            })
            this.UI.draw(context);
        }
        addMob(){
            if (this.speed > 0 && Math.random() < 0.5) this.mobs.push(new GroundMob(this), new Hedgehog(this));
            if (this.speed > 0 && Math.random() < 0.3) this.mobs.push(new Wizard(this))
            this.mobs.push(new FlyingMob(this))
            console.log(this.mobs)
        }
    }

    const game = new Game(canvas.width, canvas.height);
    console.log(game);

    let lastTime = 0;

    function animate(time){
        const delta = time - lastTime; // deltaTime = how many milliseconds it takes to serve next frame (dependent on PC/Monitor)
        lastTime = time;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        game.update(delta)
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});
