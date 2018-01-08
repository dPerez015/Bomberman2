var bomberman = bomberman || {};

bomberman.armBoss1LefttPrefab = function(game, x, y, level){
    Phaser.Sprite.call(this,game,x,y,'armBossLeftt');
    this.anchor.setTo(.5);
    
    this.hitAnim1 = this.animations.add('hit1', [0,1,2,3,4], 10, true);
    this.hitAnim2 = this.animations.add('hit2', [5,6,7,8,9], 10, true);
    this.hitAnim3 = this.animations.add('hit3 ', [10,11,12,13,14], 10, true);
    this.hitAnim4 = this.animations.add('hit4', [15,16,17,17,19], 10, true);
    
    this.invu = false;
    this.level = level;
    
     this.game.physics.arcade.enable(this);
    
    this.isHit = function(){
        
        if(this.invu = false){
            gameValues.boss1Life --;
            this.invu = true;
        }
        //treure frames
       /* if(gameValues.boss1Life >= 13){
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

bomberman.armBoss1LefttPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.armBoss1LefttPrefab.prototype.constructor = bomberman.armBoss1LefttPrefab;

bomberman.armBoss1LefttPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.overlap(this,this.level.player, this.level.player.bombermanHit,null,this);
    this.game.physics.arcade.overlap(this, this.level.explosions,this.isHit,null,this);
    
}