var bomberman = bomberman || {};

bomberman.boss2 = function(game, x, y, speed, direction, level){
  
    Phaser.Sprite.call(this,game,x,y,'boss2');
    this.anchor.setTo(.5);
    
    this.hitAnim1 = this.animations.add('hit1', [0,1], 10, true);
    this.hitAnim2 = this.animations.add('hit2', [1,2], 10, true);
    this.hitAnim3 = this.animations.add('hit3 ', [1,2], 10, true);
    this.hitAnim4 = this.animations.add('hit4', [1,2], 10, true);
    this.hitAnim5 = this.animations.add('hit5', [1,2], 10, true);
    
    this.events.onKilled.add(level.checkVictory.bind(level));
    
    this.speed = speed;
    this.direction.direction;
    this.hp = 15;
    this.score = gameValues.bossScore;
    this.isShotting = false;
    this.invu = false;
    
    this.game.physics.arcade.enable(this);
    
    this.isHit = function(){
        
        if(this.invu = false){
            this.hp --;
            this.invu = true;
        }
        
        if(this.hp >= 13){
            this.animations.frame = 0;
            this.animations.play('hit1');
        }else if(this.hp >= 10 && this.hp <= 12){
            this.animations.frame = 1;
            this.animations.play('hit2');
        }else if(this.hp >= 7 && this.hp <=9){
            this.animations.frame = 2;
            this.animations.play('hit3');
        }else if(this.hp >= 4 && this.hp <=6){
            this.animations.frame = 3;
            this.animations.play('hit4');
        }else if(this.hp >=1 && this.hp <= 3){
            this.animations.frame = 4;           
            this.animations.play('hit5');
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
    };
    
    this.hitAnim1.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim1.onComplete.add(this.changeInvu.bind(this), this.level);
    this.hitAnim2.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim2.onComplete.add(this.changeInvu.bind(this), this.level);
    this.hitAnim3.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim3.onComplete.add(this.changeInvu.bind(this), this.level);
    this.hitAnim4.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim4.onComplete.add(this.changeInvu.bind(this), this.level);
    this.hitAnim5.onComplete.add(this.changeDirection.bind(this), this.level);
    this.hitAnim5.onComplete.add(this.changeInvu.bind(this), this.level);
    
    this.attackBoss = function(){
        
    };
};

bomberman.boss2.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.boss2.prototype.constructor = bomberman.boss2;

bomberman.boss2.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.overlap(this,this.level.player, this.level.player.bombermanHit,null,this);
    this.game.physics.arcade.overlap(this,this.level.bombas, this.level.bombas.kill,null,this);
    
    if((this.body.blocked.up || this.body.touching.up) && (this.body.blocked.left || this.body.touching.left) && this.direction == 'leftUp'){
        this.changeDirection();
    } else if((this.body.blocked.down || this.body.touching.down) && (this.body.blocked.left || this.body.touching.left) && this.direction == 'leftDown'){
        this.changeDirection();
    } else if((this.body.blocked.up || this.body.touching.up) && (this.body.blocked.right || this.body.touching.right) && this.direction == 'rightUp'){
        this.changeDirection();
    } else if((this.body.blocked.down || this.body.touching.down) && (this.body.blocked.right || this.body.touching.right) && this.direction == 'rightDown'){
        this.changeDirection();
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
            this.body.velocity.y += this.speed; 
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