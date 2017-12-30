var bomberman = bomberman || {};

bomberman.magnetHelm = function(game,x,y,speed,direction,level){
    Phaser.Sprite.call(this,game,x,y,'magnetHelm');
    this.game.add.existing(this);
    this.anchor.setTo(.5);
    this.animations.add('walkDown',[0,1,2,3],10,true);
    this.animations.add('walkLeft',[8,9,10,11], 10, true);
    this.animations.add('walkUp', [4,5,6,7], 10, true);
    this.animations.add('walkRight',[8,9,10,11], 10, true);
    var anim=this.animations.add('atract',[12,13],10,true);
    this.animations.add('kill', [14,15], 1, true);
    
    //necesario para que se pase de nivel
    this.events.onKilled.add(level.checkVictory.bind(level));
    
    this.speed = speed;
    this.direction = direction; //0-> Up    1-> right   2-> down    3-> left
    this.level = level;
    this.hp = 1;
    this.score = gameValues.helmScore;
    this.isHit = false;
    this.game.physics.arcade.enable(this);
    
    this.isAtracting=false;
    this.timeToAtract=1.5;
    this.timeAtracting=0;
    this.waitTime=1;
    this.timeSinceLastAtract=0;
    this.playerAtractingVel=40;
    //this.body.velocity.x = this.speed;
    //this.body.velocity.y = this.speed;
    this.body.setSize(16, 16, 8, 8);
    
    
    
    this.changeSpeed=function(){
        switch(this.direction){
            case 0:
                this.body.velocity.setTo(0,-this.speed);
                this.animations.play("walkUp");
                this.scale.setTo(1,1);
                break;
            case 1:
                this.body.velocity.setTo(this.speed,0);
                this.animations.play("walkLeft");
                this.scale.setTo(-1,1);
                break;
            case 2:
                this.body.velocity.setTo(0,this.speed);
                this.scale.setTo(1,1);
                this.animations.play("walkDown");
                break;
            case 3:
                this.body.velocity.setTo(-this.speed,0);
                this.scale.setTo(1,1);
                this.animations.play("walkLeft");
                break;
        }
    }
    
    this.changeSpeed();
    
    this.checkMovement=function(){
        var ret=false;
        if(this.direction==0 && (this.body.blocked.up || this.body.touching.up)){
            //console.log("up");
            ret=true;
    }
        if(this.direction==1 && (this.body.blocked.right || this.body.touching.right)){
            ret=true;
            //console.log("right");
    }
        if(this.direction==2 && (this.body.blocked.down  || this.body.touching.down)){
            ret=true;
           // console.log("down");
    }
        if(this.direction==3 && (this.body.blocked.left || this.body.touching.left)){
            ret=true;
        //console.log("left");
    }
        return ret;
    };
    
    this.checkDirection=function(dir){
        var posX=this.level.bg.getTileX(this.body.x);
        var posY=this.level.bg.getTileY(this.body.y);
        
        switch(dir){
            case 0:
                if(this.level.gridSolidObjects[posX][posY-1]==0){
                    return true;
                } 
                return false;
                break;
            case 1:
                if(this.level.gridSolidObjects[posX+1][posY]==0){
                    return true;
                } 
                return false;
                break;
            case 2: 
                if(this.level.gridSolidObjects[posX][posY+1]==0){
                    return true;
                } 
                return false;
                break;
            case 3: 
                if(this.level.gridSolidObjects[posX-1][posY]==0){
                    return true;
                } 
                return false;
                break;
            default:
                return false;
                break;
        }
        
        return ret;
    };
    
    this.changeDirection=function(){
        var validDirectionFound=false;
        var invalidDirections=new Set();
        invalidDirections.add(this.direction);
        
        while(!validDirectionFound){
            var newDirection=Math.floor(Math.random()*4);
            while(invalidDirections.has(newDirection)){
                 newDirection=(newDirection+1)%4;
            }
            if(this.checkDirection(newDirection)){
                validDirectionFound=true;
                this.direction=newDirection;
                //activar animacion de la direccion que toca
            }
            else{
                invalidDirections.add(newDirection);
            }
        }
           this.changeSpeed();
            
    };

    this.checkPlayer=function(){
        var posX=this.level.bg.getTileX(this.body.x);
        var posY=this.level.bg.getTileY(this.body.y);
        
        var playerPosX=this.level.bg.getTileX(this.level.player.body.position.x);
        var playerPosY=this.level.bg.getTileY(this.level.player.body.position.y);
        if(playerPosX==posX ||  playerPosY==posY ){
            var canPass=true;
            var difX=playerPosX-posX;
            var difY=playerPosY-posY;
            var dif=difX;
            if(dif==0){
                dif=difY;
                difY/=Math.abs(difY);
            }
            else{
                difX/=Math.abs(difX);
                //console.log(difX);
            }
            
            for(var i=0; i<=dif ;i++){
                posX+=difX;
                posY+=difY;
        
                if(this.level.gridSolidObjects[posX][posY]==1){
                    canPass=false;
                }
                if(this.level.map.getTile(posX,posY,this.level.walls)!=null){
                    canPass=false;
                }
                
            }
            return canPass;
        }
        else
            return false;
    }
    
    this.hit=function(){
        this.animations.play('kill', null, false, true);
         this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.showScore();
    }
};

bomberman.magnetHelm.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.magnetHelm.prototype.constructor = bomberman.magnetHelm;

bomberman.magnetHelm.prototype.showScore = function(){
    var textScore = this.level.add.text(this.x, this.y, "+ " + gameValues.helmScore, this.level.style);
    this.level.renderScore(gameValues.helmScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(textScore).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);   this.level.add.tween(textScore).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}

bomberman.magnetHelm.prototype.update = function(){
    //colisiones
    this.game.debug.body(this);
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.collide(this,this.level.destruibles);
    this.game.physics.arcade.collide(this,this.level.bombas);
    this.game.physics.arcade.collide(this,this.level.imanes);
    this.game.physics.arcade.overlap(this,this.level.explosions,this.hit);
    
    //dañar al pj
    if(this.game.physics.arcade.overlap(this,this.level.player)){
        this.level.player.bombermanHit();
    }
    
    
    if(!this.isAtracting){
        this.timeSinceLastAtract+=this.level.player.game.time.physicsElapsed;
        //movimiento
        if(this.checkMovement()){
            
            this.changeDirection();
        }
        //comprovar si ha de atraer
        if(Math.floor(this.body.position.x)%16==0 && Math.floor(this.body.position.y)%16==0 && this.timeSinceLastAtract>this.waitTime){
            if(this.checkPlayer()){
                this.isAtracting=true;
                this.animations.play('atract');
                this.body.velocity.setTo(0,0);
                this.timeAtracting=0;
            }
        }
        
    }
    else{ //atraccion
        if(this.checkPlayer()){
            var posX=this.level.bg.getTileX(this.body.x);
            var posY=this.level.bg.getTileY(this.body.y);
        
            var playerPosX=this.level.bg.getTileX(this.level.player.body.position.x);
            var playerPosY=this.level.bg.getTileY(this.level.player.body.position.y);
            
            var vX=posX-playerPosX;
            var vY=posY-playerPosY;
            
            if(vX!=0)
                vX=vX/Math.abs(vX);
            if(vY!=0)
                vY=vY/Math.abs(vY);
            
            
            this.level.player.body.velocity.x+=(vX*this.playerAtractingVel);
            this.level.player.body.velocity.y+=(vY*this.playerAtractingVel);
            
        }
        this.timeAtracting+=this.level.player.game.time.physicsElapsed;
            
        if(this.timeAtracting>this.timeToAtract){
                this.isAtracting=false;
                this.changeSpeed();
                this.timeSinceLastAtract=0;
            }
        
    }
    
    
    
}