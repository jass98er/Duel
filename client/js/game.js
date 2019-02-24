var socket = io();

var display = new Display(window.innerWidth,window.innerHeight)
display.create()
var spritebatch = new SpriteBatch()
var manager = new Manager()



var players = {}
var objects = {}
var knightspritesheet;
var boss = null;


manager.enqueue("res/images/knightspritesheet.png")
manager.enqueue("res/images/nvshen.png")
manager.enqueue("res/images/specialeffects.png")

manager.loadQueue(init)

function init(){
    knightspritesheet = "res/images/knightspritesheet.png";
    objects[0] = new BgObject("被封印的女神像",(window.innerWidth/2)-120,350,240,250,53,55,"res/images/nvshen.png")
    requestAnimationFrame(render);
}

socket.on('playerleave',function(data){
    if(players[data.id]!=null){
    delete players[data.id]
    }
})

socket.on('boss', function(data){
    for(let i in data){
        var bo = data[i]
        if(boss == null){
            boss = new Boss(bo.x,bo.y,bo.width,bo.height,bo.hp)
        }else{
            boss.x = bo.x
            boss.y = bo.y
            boss.width = bo.width
            boss.height = bo.height
            boss.hp = bo.hp
            boss.col = bo.col
            boss.row = bo.row
            boss.death = bo.death
        }
        
    }
})


socket.on('newplayer', function(data){
    if(players[data.id]==null){
    players[data.id] = new Player(data.x,data.y,data.width,data.height,data.hp)
    }
})

socket.on('movement', function(data){
   for(let i in data){
       var p = data[i]
       if(players[p.id] != null){
       players[p.id].x = p.x
       players[p.id].y = p.y
       players[p.id].width = p.width
       players[p.id].height = p.height
       players[p.id].hp = p.hp
       players[p.id].row = p.row
       players[p.id].col = p.col
      
    //    players[p.id].rectx = p.rx
    //    players[p.id].recty = p.ry
    //    players[p.id].rectw = p.rw
    //    players[p.id].recth = p.rh
    //    players[p.id].attackx = p.ax
    //    players[p.id].attacky = p.ay
    //    players[p.id].attackw = p.aw
    //    players[p.id].attackh = p.ah
       }
       else{
           players[p.id] = new Player(p.x,p.y,p.width,p.height,p.hp)
       }

   }
})




function render(){
    display.clear()
    spritebatch.drawString("试玩本款游戏，代表您已同意GDPR条款，一切法律责任不将由制作方承担，本游戏为ShadowFallen原创作品，禁止抄袭",0,20)
    spritebatch.drawString("版本:开发阶段, 操作:AD左右移动，W条约，S防御，J攻击，开局会有小BOSS存在，被击杀则不存在，支持玩家PVP",0,40)
    drawAllObjects(spritebatch)
    drawAllPlayers(manager.get(knightspritesheet),spritebatch)
    if(boss!=null){
    boss.draw(manager.get(knightspritesheet),spritebatch)
    }
    requestAnimationFrame(render)
}



function drawAllPlayers(img,batch){
    for(let i in players){
        var player = players[i]
        player.draw(img,batch)
    }
}
function drawAllObjects(batch){
    for(let i in objects){
        var obj = objects[i]
        obj.draw(manager.get(obj.path),batch)
    }
}

document.addEventListener('keydown',handleKeyEvents,false)
document.addEventListener('keyup',handleKeyEvents,false)
window.addEventListener('resize',function(){
    display.resize(window.innerWidth,window.innerHeight)
})

function handleKeyEvents(event){
    var check = (event.type == 'keydown') ? true:false
    switch(event.keyCode){
        case 87:
            socket.emit('keyboard',{keycode:87,state:check})
        break;
        case 83:
            socket.emit('keyboard',{keycode:83,state:check})
        break;
        case 68:
            socket.emit('keyboard',{keycode:68,state:check})
        break;
        case 65:
            socket.emit('keyboard',{keycode:65,state:check})
        break;
        case 74:
            socket.emit('keyboard',{keycode:74,state:check})
            break;
    }
}
