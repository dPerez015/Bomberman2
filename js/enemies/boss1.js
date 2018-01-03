var bomberman = bomberman || {};

bomberman.boss1 = function(game, x, y, speed, level, direction){
    Phaser.Sprite.call(this,game,x,y,'boss1');
    this.game.add.existing(this);
    this.anchor.setTo(.5);
    this.animations.add('standStill',[0,6],10,true);
    this.animations.add('punchLeft',[1,2,3,4,5],10,true);
    this.amimations.add('punchRight',[7,8,9,10,11],10,true);
    this.animations.add('standStillWeak',[12,18],10,true);
    this.animations.add('punchLeftWeak',[13,14,15,16,17],10,true);
    this.animations.add('punchRightWeak',[19,20,21,22,23],10,true);
    this.animations.add('standStillWeaker',[24,30],10,true);
    this.animations.add('punchLeftWeaker',[25,26,27,28,29],10,true);
    this.animations.add('punchRightWeaker',[31,32,33,34,35],10,true);
    this.animations.add('standStillAlmostDead',[36,42],10,true);
    this.animations.add('punchLeftAlmostDead',[37,38,39,40,41],10,true);
    this.animations.add('punchRightAlmostDead',[43,44,45,46,47],10,true);
    
    this.events.onKilled.add(level.checkVictory.bind(level));
    
    this.speed = speed;
    this.level = level;
    this.hp = 12;
    this.score = gameValues.boss1Score;
    this.isHitting = false;
    this.isRight = false;
    
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = this.speed;
    
    this.checkPlayer=function(){
    var posX=this.level.bg.getTileX(this.body.x);
        
    var playerPosX=this.level.bg.getTileX(this.level.player.body.position.x);
    if(playerPosX==posX){
        var canPass=true;
        var difX=playerPosX-posX;
        var dif=difX;
        if(dif!=0){
            difX/=Math.abs(difX);
        }
        
        for(var i=0; i<=dif ;i++){
            posX+=difX;
        }
        return canPass;
    }
        else
            return false;
    }
};

bomberman.boss1.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.boss1.prototype.constructor = bomberman.boss1;

bomberman.boss1.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);

    this.game.physics.arcade.overlap(this, this.level.bombas,this.level.player.bombas.kill,null,this);
    
    this.game.physics.arcade.collide(this,this.level.player,this.level.player.bombermanHit,null,this);
    
    this.game.physics.arcade.overlap(this,this.level.explosions,this.hit,null,this);
    
    if(tthis.body.touching.right && this.isRight == true){
        this.isRight = false;
        this.changeDirection();
    }else if(this.body.touching.left && this.isRight == false){
        this.isRight = true;
        this.changeDirection();
    }
    
    //Per comprobar pos del player mirar magnethelm
    if(!this.isHitting){
    this.timeSinceLastAtract+=this.level.player.game.time.physicsElapsed;
    //movimiento
    if(this.checkMovement()){
            
        this.changeDirection();
    }
    //comprovar si ha de atraer
    if(Math.floor(this.body.position.x)%16==0 && Math.floor(this.body.position.y)%16==0 && this.timeSinceLastAtract>this.waitTime){
        if(this.checkPlayer()){
            this.isHitting=true;
            this.animations.play('punchLeft');
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
                this.isHitting=false;
                this.changeSpeed();
                this.timeSinceLastAtract=0;
            }
        
    }
    
};

bomberman.boss1.prototype.changeDirection = function(){
    if(this.hp >= 10 && this.hp <= 12){
        this.animations.play('standStill');
    }
    if(this.hp >= 7 && this.hp <= 9){
        this.animations.play('standStillWeak');
    }
    if(this.hp >= 4 && this.hp <= 6){
        this.animations.play('standStillWeaker');
    }
    if(this.hp >= 1 && this.hp <= 3){
        this.animations.play('standStillAlmostDead');
    }
    switch(this.isRight){
        case true:
            this.body.velocity.x += this.speed;
            this.body.velocity.y = 0;
            break;
        case false:
            this.body.velocity.x -= this.speed;
            this.body.velocity.y = 0;
            break;
    }
    
};

bomberman.boss1.prototype.hit = function(){
    this.hp --;
    
    if(this.hp == 0){
        
    }
}