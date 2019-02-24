class BigKnight{


    constructor(x,y,width,height){
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.hp=1200
        this.row = 0;
        this.col = 0;
        this.ground = 600-this.height;
        this.gravity = 0;
        this.direction = false;
        this.tick=0;
        this.speed = 3
        this.chasing = false;
        this.attack = false;
        this.damage = 10;
        this.finishattack = false;
        this.death = false;
    }
    combat(){
        
        if(this.hp<=0){
            this.hp = 0
            this.death = true;
            this.attack = false;
        }
    }
    animate(){
        this.tick+=1
        if(this.tick>=10000){
            this.tick = 0
            this.hp = 1200
            this.death = false
            this.y = 0
            this.x = 300
        }
        if(this.tick%6==0){
        if(this.attack){
            this.speed = 0.5
            if(this.direction){
                this.row = 7
            }else{
                this.row = 6
            }
            if(this.col>=5){

                
                    if(this.direction){
                        this.row = 3
                    }else{
                        this.row = 0
                    }
                this.col = 0
                
                this.finishattack=false;
            }
            
        }
        else if(!this.chasing){
        if(this.direction){
            this.row = 3
        }else{
            this.row = 0
        }
        if(this.col>=7){
            this.col = 0
        }
    }else if(this.chasing){
        if(this.direction){
            this.row = 5
        }else{
            this.row = 2
        }
        if(this.col >= 7){
            this.col = 0
        }
    }
        this.col+=1
    }
    }
    move(players,gravityForce = 0.4){
        if(this.y< this.ground){
            this.gravity += gravityForce
        }
        else{
            this.gravity = 0
        }
        this.y+=this.gravity
        let cloest = null
        let range = 400
        for(let i in players){
            var player = players[i]
            if(Math.abs((this.x + (this.width/2))-70-player.rectx+player.rectw/2)< range){
                cloest = player
                range = Math.abs((this.x + (this.width/2)-70)-player.rectx+player.rectw/2)
                this.chasing = true;
            }
        }
        if(range>=400){
            this.attack = false;
            this.chasing = false;
            
        }
        else if(range<=80){
            this.chasing = false;
            this.attack = true;
        }
        else if(range > 80){
            this.attack = false
            this.speed = 3
        }
        
        if(cloest!=null){
            if(this.attack&&!this.finishattack){
                this.finishattack = true;
                if(cloest.shield){
                    cloest.hp -= this.damage/2
                }else{
                    cloest.hp -= this.damage
                }
                this.speed = 3
                }
                
            
            if((cloest.rectx+cloest.rectw/2) > (this.x+ (this.width/2))){
                this.direction = false
            }else{
                this.direction = true
            }
            if(this.chasing){
                if(this.direction){
                    this.x -= this.speed
                }else{
                    this.x+=this.speed
                }
            }
            
            
        }
        
    }

}

module.exports = BigKnight