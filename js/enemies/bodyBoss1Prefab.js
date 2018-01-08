var bomberman = bomberman || {}:

bomberman.bodyBoss1Prefab = function(game,x,y,speed,direction,level){
    Phaser.Sprite.call(this, game, x, y, 'bodyBoss1');
    this.anchor.setTo(.5)
    
    this.hitAnim1 = this.animations.add('hit1', [0,1], 10, true);
    this.hitAnim2 = this.animations.add('hit2', [1,2], 10, true);
    this.hitAnim3 = this.animations.add('hit3 ', [2,3], 10, true);
    this.hitAnim4 = this.animations.add('hit4', [3,4], 10, true);
    
    this.events.onKilled.add(level.checkVictory.bind(level));
    
    this.game = game;
    this.speed = speed;
    this.direction = direction;
    this.score = gameValues.bossScore;
    this.invu = false;
    this.goesRight = false;
    this.level = level;
    
    this.game.physics.arcade.enable(this);
    
    this.isHit = function(){
        
        if(this.invu = false){
            gameValues.boss1Life --;
            this.invu = true;
        }
        //treure frames
        /*if(gameValues.boss1Life >= 13){
            this.animations.play('hit1');
        }else if(gameValues.boss1Life >= 10 && gameValues.boss1Life <= 12){
            this.animations.play('hit2');
        }else if(gameValues.boss1Life >= 7 && gameValues.boss1Life <=9){
            this.animations.play('hit3');
        }else if(gameValues.boss1Life >= 4 && gameValues.boss1Life <=6){
            this.animations.play('hit4');
        }else if(gameValues.boss1Life >=1 && gameValues.boss1Life <= 3){
            this.animations.play('hit4');
        }*/
        
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
            
        if(gameValues.boss1Life == 0){
            this.showScore();
            this.hitAnim4.onComplete.add(this.kill.bind(this),this.level);
        }
    };
    
    this.changeInvu = function(){
        this.invu = false;
        //afegir els ifs dels frames
        if(gameValues.boss1Life >= 13){
            this.animations.frame = 0;
        }else if(gameValues.boss1Life >= 10 && gameValues.boss1Life <= 12){
            this.animations.frame = 1;
        }else if(gameValues.boss1Life >= 7 && gameValues.boss1Life <=9){
            this.animations.frame = 2;
        }else if(gameValues.boss1Life >= 4 && gameValues.boss1Life <=6){
            this.animations.frame = 3;
        }else if(gameValues.boss1Life >=1 && gameValues.boss1Life <= 3){
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
    
};

bomberman.bodyBoss1Prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bodyBoss1Prefab.prototype.constructor = bomberman.bodyBoss1Prefab;

bomberman.bodyBoss1Prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.overlap(this,this.level.player, this.level.player.bombermanHit,null,this);
    this.game.physics.arcade.overlap(this,this.level.bombas, this.level.bombas.kill,null,this);
    
    if((this.body.blocked.left || this.body.touching.left) && this.goesRight){
        this.changeDirection();
        this.goesRight = true;
    }else if( (this.body.blocked.right || this.body.touching.right) && !this.goesRight){
        this.changeDirection();
        this.goesRight = false;
    }
    this.game.physics.arcade.overlap(this, this.level.explosions,this.isHit,null,this);
    
}

bomberman.bodyBoss1Prefab.prototype.changeDirection = function(){

        switch(this.goesRight){
        case false:
            this.body.velocity.y -= this.speed;
            this.body.velocity.x = 0;
            break;

        case true:
            this.body.velocity.x += this.speed; 
            this.body.velocity.y = 0;
            break;
            
        default:
            this.body.velocity.x += this.speed;
            this.body.velocity.y = 0;
            break;
        
    }
}

bomberman.bodyBoss1Prefab.prototype.showScore = function(){
    var texboss1Score = this.level.add.text(this.x, this.y, "+ " + gameValues.bossScore, this.level.style);
    this.level.renderScore(gameValues.bossScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(texboss1Score).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);   this.level.add.tween(texboss1Score).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}