class Display{

    constructor(width,height){
        this.canvas = document.createElement("canvas")
        this.canvas.width = width;
        this.canvas.height = height
    }
    create(id="canvas"){
        this.canvas.id = id
        document.body.appendChild(this.canvas)
        this.ctx = this.canvas.getContext('2d')
        engine["ctx"] = this.ctx
        
    }
    resize(width,height){
        this.canvas.width = width
        this.canvas.height = height
    }
    clear(){
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)
    }
}