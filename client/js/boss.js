class Boss{

    constructor(x,y,width,height,hp){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.col = 0;
        this.row = 0;
        this.hp= hp
        this.death = false;
    }
    draw(img,batch){
        if(!this.death){
        batch.drawImage(img,this.col*96,this.row*48,96,48,this.x,this.y,this.width,this.height)
        
        batch.drawStrokeRect(this.x+this.width/2-200,this.y+108,300,10)
        if(this.hp>=300){
            batch.setColor('lightgreen')
            }else if(this.hp>=100){
                batch.setColor('orange')
            }
            else{
                batch.setColor('red')
            }
            batch.drawRect(this.x+this.width/2-200,this.y+108,this.hp*3/12,10)
            batch.setColor('black')
        }
    }
}