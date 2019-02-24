class Player{

    constructor(x,y,width,height,hp){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.hp=hp;
        this.row=0;
        this.col=0;
        
        // this.rectx = 0
        // this.recty = 0
        // this.rectw = 100
        // this.recth = 100
        // this.attackx = 0
        // this.attacky = this.recty
        // this.attackw = this.rectw
        // this.attackh = this.recth
    }
    draw(img,batch){
        // batch.drawStrokeRect(this.attackx,this.attacky,this.attackw,this.attackh)
        // batch.drawStrokeRect(this.rectx,this.recty,this.rectw,this.recth)
        batch.drawStrokeRect(this.x+(this.width/2)-48,this.y+30,100,10)
        if(this.hp>=75){
        batch.setColor('lightgreen')
        }else if(this.hp>=35){
            batch.setColor('orange')
        }
        else{
            batch.setColor('red')
        }
        batch.drawRect(this.x+(this.width/2)-48,this.y+30,1*this.hp,10)
        batch.setColor('black')
        batch.drawImage(img,this.col*96,this.row*48,96,48,this.x,this.y,this.width,this.height)
    }
   

}