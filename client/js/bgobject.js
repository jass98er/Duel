class BgObject{
    constructor(name,x,y,width,height,img_width,img_height,path){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.iwidth = img_width;
        this.iheight = img_height
        this.name=name
        this.path=path
    }
    draw(img,batch){
        if(this.name!=null){
            batch.drawString(this.name,(this.x+this.width/2)-60,this.y-10)
        }
        batch.drawImage(img,0,0,this.iwidth,this.iheight,this.x,this.y,this.height,this.width)
    }
    src(){
        return this.path
    }
}