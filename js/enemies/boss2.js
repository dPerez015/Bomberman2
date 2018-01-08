var bomberman = bomberman || {};

bomberman.boss2 = function(game, x, y, speed, direction, level){
  
    Phaser.Sprite.call(this,game,x,y,'boss2');
    this.anchor.setTo(.5);
    
    this.hitAnim1 = this.animations.add('hit1', [0,1], 10, true);
    this.hitAnim2 = this.animations.add('hit2', [1,2], 10, true);
    this.hitAnim3 = this.animations.add('hit3 ', [2,3], 10, true);
    this.hitAnim4 = this.animations.add('hit4', [3,4], 10, true);
    
    this.events.onKilled.add(level.checkVictory.bind(level));
    
    this.game = game;
    this.speed = speed;
    this.direction = direction;
    this.hp = 15;
    this.score = gameValues.bossScore;
    this.invu = false;
    this.isAttacking = false;
    this.timeStartAtck = 0;
    this.durAtck = 3;
    this.level = level;
    
    this.game.physics.arcade.enable(this);
    
    //rightDown 
    this.direction = "rightDown";
    this.body.velocity.x += this.speed; 
    this.body.velocity.y += this.speed;
    
    
    this.isHit = function(){
        
        if(this.invu = false){
            this.hp --;
            this.invu = true;
        }
        //treure frames
        if(this.hp >= 13){
            this.animations.play('hit1');
        }else if(this.hp >= 10 && this.hp <= 12){
            this.animations.play('hit2');
        }else if(this.hp >= 7 && this.hp <=9){
            this.animations.play('hit3');
        }else if(this.hp >= 4 && this.hp <=6){
            this.animations.play('hit4');
        }else if(this.hp >=1 && this.hp <= 3){
            this.animations.play('hit4');
        }
        
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
            
        if(this.hp == 0){
            this.showScore();
            this.hitAnim5.onComplete.add(this.kill.bind(this),this.level);
        }
    };
    
    this.changeInvu = function(){
        this.invu = false;
        //afegir els ifs dels frames
        if(this.hp >= 13){
            this.animations.frame = 0;
        }else if(this.hp >= 10 && this.hp <= 12){
            this.animations.frame = 1;
        }else if(this.hp >= 7 && this.hp <=9){
            this.animations.frame = 2;
        }else if(this.hp >= 4 && this.hp <=6){
            this.animations.frame = 3;
        }else if(this.hp >=1 && this.hp <= 3){
            this.animations.frame = 4;           
        }
    };
    
    this.hitAnim1.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim1.onComplete.add(this.changeInvu.bind(this), this.level);
    this.hitAnim2.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim2.onComplete.add(this.changeInvu.bind(this), this.level);
    this.hitAnim3.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim3.onComplete.add(this.changeInvu.bind(this), this.level);
    this.hitAnim4.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim4.onComplete.add(this.changeInvu.bind(this), this.level);
    
    this.attackBoss = function(){
        
        //fer un prefab nou exactament igual que la bomba, i contar les vegades que fa l'animació i aleshores explota
        for(var it = 0; it < 4; it++){
            this.attackExplosion = new bomberman.Boss_AttackPrefab(this.game,this.level.bg.getTileX((Math.random()* this.level.map.widthInPixels)*16)+8,this.level.bg.getTileY((Math.random()* this.level.map.heightInPixels)*16)+8,this.level);
        }
        this.isAttacking = true;
        this.timeStartAtck = 0;
    };
};

bomberman.boss2.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.boss2.prototype.constructor = bomberman.boss2;

bomberman.boss2.prototype.update = function(){
    this.game.physics.arcade.overlap(this,this.level.player, this.level.player.bombermanHit,null,this);
    this.game.physics.arcade.overlap(this,this.level.bombas, this.level.bombas.kill,null,this);
    
    if(this.body.position.x < 32+47 || this.body.position.x > 240-47 || this.body.position.y < 16+43 || this.body.position.y > 192-43){
        if(!this.isAttacking){
            if(this.body.position.y < 16+43 && this.body.position.x > 240-47 && this.direction == 'leftUp'){
                this.attackBoss();
            } else if(this.body.position.y > 192-43 && this.body.position.x > 240-47 && this.direction == 'leftDown'){
                this.attackBoss();
            } else if(this.body.position.y < 16+43 && this.body.position.x < 32+47 && this.direction == 'rightUp'){
                this.attackBoss();
            } else if(this.body.position.y > 192-43 && this.body.position.x < 32+47 && this.direction == 'rightDown'){
                this.attackBoss();
            } 
        }else{
            this.timeStartAtck += this.level.game.time.physicsElapsed;
            if(this.timeStartAtck > this.durAtck){
                this.changeDirection();
                this.isAttacking = false;
            }
        }
    }
    this.game.physics.arcade.overlap(this, this.level.explosions,this.isHit,null,this);
    
}

bomberman.boss2.prototype.changeDirection = function(){ 
        var arrayDir = ['leftUp', 'leftDown', 'rightUp', 'rightDown'];//up,down,left,right
        this.direction = arrayDir[Math.floor(Math.random() * arrayDir.length)];
        switch(this.direction){
        case 'leftUp':
            this.body.velocity.y -= this.speed;
            this.body.velocity.x -= this.speed;
            break;
        
        case 'leftDown':
            this.body.velocity.y -= this.speed; 
            this.body.velocity.x -= this.speed;
            break;
       
        case 'rightUp':
            this.body.velocity.x += this.speed;
            this.body.velocity.y -= this.speed;
            break;
        
        case 'rightDown':
            this.body.velocity.x += this.speed; 
            this.body.velocity.y += this.speed;
            break;
            
        default:
            this.body.velocity.x += this.speed;
            this.body.velocity.y -= this.speed;
            break;
        
    }
    return this.direction;
}

bomberman.boss2.prototype.showScore = function(){
    var texboss2Score = this.level.add.text(this.x, this.y, "+ " + gameValues.bossScore, this.level.style);
    this.level.renderScore(gameValues.bossScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(textboss2Score).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);   this.level.add.tween(textboss2Score).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}