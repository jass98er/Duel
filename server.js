var player = require('./player');
var boss1 = require("./bigknight")
var http = require('http')
var express = require('express')
var socketio = require('socket.io')
var ip = require('ip')
var app = express()
var server = http.Server(app)
var io = socketio(server,{})
var port = 2019


server.listen(port, function(){
    console.log("Server start running on: { " + ip.address() + ":" + port + " }");
})

app.get('/',function(req,res){
    res.sendFile(__dirname + "/client/index.html")
})
app.use(express.static(__dirname + "/client"))


var id = 0
var bigknight = new boss1(300,0,1152,576);
var players = {}
var sockets = {}


io.sockets.on('connection',function(socket){
    
    id++;
    var newPlayer = new player(id,0,0,384,192)
    io.sockets.emit('newplayer',{id:id,x:newPlayer.x,y:newPlayer.y,width:newPlayer.width,height:newPlayer.height,hp:newPlayer.hp})
    players[id] = newPlayer
    socket.id = id
    sockets[id] = socket

    handleKeyEvent(socket,newPlayer)

    socket.on('disconnect',function(){
        delete players[newPlayer.id]
        delete sockets[newPlayer.id]
        io.sockets.emit('playerleave',{id:newPlayer.id})
    })


});

setInterval(() => {
    var bosspack = []
    var pack = []
    for(let i in players){
        var player = players[i]
        player.move()
        player.animate()
        player.combat()
        pack.push({
            id:player.id,
            x:player.x,
            y:player.y,
            width:player.width,
            height:player.height,
            hp:player.hp,
            row:player.row,
            col:player.col,
            
            // rx:player.rectx,
            // ry:player.recty,
            // rw:player.rectw,
            // rh:player.recth,
            // ax:player.attackx,
            // ay:player.attacky,
            // aw:player.attackw,
            // ah:player.attackh
        })
    
       
    }
    bigknight.combat()
    
    bigknight.animate()
   
    
    bigknight.move(players);
    
    bosspack.push({
        x:bigknight.x,
        y:bigknight.y,
        width:bigknight.width,
        height:bigknight.height,
        row:bigknight.row,
        col:bigknight.col,
        hp:bigknight.hp,
        death:bigknight.death
    })

    for(let i in sockets){
        var socket = sockets[i]
        socket.emit('movement', pack)
        
        socket.emit('boss', bosspack)
        
    }
}, 1000/60);

function handleKeyEvent(socket,newPlayer){
    
    socket.on('keyboard', function(data){
        
        if(data.keycode == 87){
            if(!newPlayer.inair){
            newPlayer.up = true
            newPlayer.finishattack=false
        }
    }
        if(data.keycode == 83){
            newPlayer.shield = data.state
        }
        if(data.keycode == 74){
            if(!newPlayer.inair&&!newPlayer.shield){
                newPlayer.attack = true
                if(overlaps(newPlayer.attackx,newPlayer.attacky,newPlayer.attackw,newPlayer.attackh,bigknight.x+(bigknight.width/2)-70,bigknight.y+bigknight.height/2,bigknight.width/8,bigknight.height/2)){
                    bigknight.hp-=newPlayer.damage;
                }
                for(let i in players){
                    var damaged = players[i]
                    if(damaged != newPlayer){
                    if(overlaps(newPlayer.attackx,newPlayer.attacky,newPlayer.attackw,newPlayer.attackh,damaged.rectx,damaged.recty,damaged.rectw,damaged.recth)){
                        if((newPlayer.direction!=damaged.direction)&&damaged.shield){
                            damaged.speed = (damaged.speed+1) / 1.5
                            if(damaged.direction){
                                damaged.x+=damaged.speed
                                newPlayer.damage = newPlayer.damage/10
                            }else{
                                damaged.x-=damaged.speed
                                newPlayer.damage = newPlayer.damage/10
                            }
                        }
                       
                        damaged.hp -= newPlayer.damage
                        
                        newPlayer.damage = 5
                        
                    }
                
                }
            }
                if(!newPlayer.finishattack){
                    newPlayer.col=0
                    newPlayer.finishattack = true
                }
            }
        }
        if(data.keycode == 68){
            newPlayer.right = data.state
            newPlayer.direction = false;
        }else if(data.keycode == 65){
            newPlayer.left = data.state
            newPlayer.direction = true;
        }
    })
}

function overlaps(x,y,width,height,rectx,recty,rectwidth,rectheight){
    return (x < rectx + rectwidth &&
        x + width > rectx &&
        y < recty + rectheight &&
        y + height > recty);
           
}
