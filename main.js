import { Capy } from './capy.js';
import { InputHandler } from './input.js';
import { Background } from './background.js';

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
            this.groundMargin = 50;
            this.speed = 3;
            this.background = new Background(this);
            this.capy = new Capy(this);
            this.input = new InputHandler();
        
    
        }
        // Run forever animation frame
        update(delta){
            this.background.update()
            this.capy.update(this.input.keys, delta);
        }
        // Draw images, score, and so on
        draw(context){
            this.background.draw(context)
            this.capy.draw(context);
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
