class Player{

    constructor(id,x,y,width,height){
        this.id=id;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
        this.hp=100;
        this.speed=5;
        this.up=false;
        this.shield=false;
        this.left=false;
        this.right=false;
        this.gravity = 0;
        this.ground = 600-this.height;
        this.inair = false;
        this.direction=false;
        this.finishshield = false;
        this.shielded = false;
        this.attack=false;
        this.jump = 15;
        this.row = 0;
        this.col = 0;
        this.tick = 0;
        this.finishattack = false;
        this.rectx = this.x+(this.width/2)-36;
        this.recty = this.y+56;
        this.rectw = 18*4;
        this.recth = 34*4;
        this.attackx = 0
        this.attacky = this.recty
        this.attackw = this.rectw
        this.attackh = this.recth
        this.damage = 5
        this.death=false;
    }
    combat(){
        if(this.hp<=0){
            this.hp=0
            this.death=true
        }
        if(this.death){
            this.y=0
            this.x=0
            this.hp=100
            this.death=false
        }
        this.rectx = this.x+(this.width/2)-36;
        this.recty = this.y+56;
        if(this.attack){
            this.attacky = this.recty
            if(this.left){
                this.attackx = this.x+(this.width/2)-108;
                
            }else if(this.right){
                this.attackx = this.x+(this.width/2)+36;
            }else{
                if(this.direction){
                    this.attackx = this.x+(this.width/2)-108;
                }else{
                    this.attackx = this.x+(this.width/2)+36;
                }
            }
        }
    }
    animate(){
        if(this.tick>=10000){
            this.tick=0
        }
        this.tick+=1
        if(this.tick%6==0){
            if(this.inair){
                this.attack = false
                if(this.left){
                    this.row = 4
                }else if(this.right){
                    this.row = 1
                }
                else{
                    if(this.direction){
                        this.row=4
                    }else{
                        this.row=1
                    }
                }
                if(this.col >=5){
                    this.col=0
                    this.speed = 5
                }
            }else if(!this.up&&!this.left&&!this.right){
                
                if(this.direction){
                    this.row = 3
                }else{
                    this.row = 0
                }
                if(this.attack){
                    
                    this.speed = this.speed / 1.3
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
                        this.attack = false
                        this.speed = 5
                        this.finishattack = false
                    }
                }
                if(this.col>=7){
                    this.col = 0
                }
                if(this.shield){
                    this.speed = 5
                    this.attack = false
                   if(!this.shielded){
                       this.col=0
                       this.shielded = true
                   }
                    if(this.direction){
                        this.row = 9
                    }else{
                        this.row = 8
                    }
                    if(this.col>=3){
                        this.col = 3
                        this.finishshield = true
                    }
                }else if(!this.shield){
                    this.shielded = false
                    
                    if(this.finishshield){
                        this.col = 0
                        this.finishshield = false;
                    }
                }

                
            }else if(this.attack){
                
                this.speed = this.speed / 1.3
                if(this.left){
                    this.row = 7
                    
                }else if(this.right){
                    this.row = 6
                    
                }
                if(this.col>=5){
                    if(this.left){
                        this.row = 3
                    }else if(this.right){
                        this.row = 0
                    }
                    this.col = 0
                        
                    this.attack = false
                    this.speed = 5
                    this.finishattack=false
                }

            }
            else if(this.left||this.right){
                
                if(this.left){
                    this.row = 5
                }else if(this.right){
                    this.row = 2
                }
                if(this.col>=7){
                    this.col = 0
                }
            }
        this.col+=1
    
}

    }
    move(gravityForce = 0.4){
        if(this.y< this.ground){
            this.gravity += gravityForce
        }
        else{
            this.gravity = 0
        }
        this.y+=this.gravity
        if(this.up){
            this.inair = true
            this.gravity = 0
            this.y-=this.jump
            this.jump-=1
            if(this.jump <=0){
                this.jump = 15
                this.up = false
            }
            
        }
        else if(this.y>=this.ground){
            this.inair=false
        }
        if(this.left){
            this.x-=this.speed
        }else if(this.right){
            this.x+=this.speed
        }
    }
    
    
}

module.exports = Player;