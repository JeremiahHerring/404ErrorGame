export class InputHandler {
    constructor(){
        this.keys = [];
        window.addEventListener('keydown', e => {
            console.log(e.key, this.keys)
            // If key is arrowdown and the key that was pressed is not
            // included in the this.keys array, push arrowdown into this.keys array
            if ((e.key === "ArrowDown" || 
                e.key === "ArrowUp" ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === " "
             ) && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', e => {
            // If key that was released is arrowdown, Use splice method to 
            // remove it from this.keys array 
            if (e.key === 'ArrowDown' || 
                e.key ==='ArrowUp' ||
                e.key === "ArrowLeft" ||
                e.key === "ArrowRight" ||
                e.key === " "){
                this.keys.splice(this.keys.indexOf(e.key), 1)
            }
            console.log(e.key, this.keys)
        });
    }
}