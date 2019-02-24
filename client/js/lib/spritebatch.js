class SpriteBatch{

    

    drawRect(x,y,width,height){
        let ctx = engine["ctx"]
        ctx.fillRect(x,y,width,height)
    }
    drawString(str,x,y){
        let ctx = engine["ctx"]
        ctx.font = "20px Impact";
        ctx.fillText(str,x,y)
    }
    drawImage(img,dx,dy,dw,dh,sx,sy,sw,sh){
        let ctx = engine["ctx"]
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(img,dx,dy,dw,dh,sx,sy,sw,sh)
    }
    drawStrokeRect(x,y,width,height){
        let ctx = engine["ctx"]
        ctx.strokeRect(x,y,width,height)
    }
    setColor(color){
        let ctx = engine["ctx"]
        ctx.fillStyle = color
    }

}