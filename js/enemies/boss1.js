var bomberman = bomberman || {};

bomberman.boss1 = function(game, x, y, speed, direction, level){
    Phaser.Sprite.call(this,game,x,y,'boss1');
    this.anchor.setTo(.5);
    
    this.events.onKilled.add(level.checkVictory.bind(level));
    
    this.speed = speed;
    this.level = level;
    this.hp = 12;
    this.score = gameValues.bossScore;
    this.isHitting = false;
    this.isRight = false;
    
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = this.speed;
    
    

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