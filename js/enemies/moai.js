var bomberman = bomberman || {};

//com de moment nomes implementem un enemic li dic enemy, ja en el futur cquan implementem mes dun ho canviem
bomberman.moai = function(game,x,y,speed,direction,level){
    Phaser.Sprite.call(this,game,x,y,'moai');
    this.game.add.existing(this);//renderitza wey
    this.anchor.setTo(.5);
    this.animations.add('walkDown',[0,1],7,true);
    this.animations.add('walkLeft',[2,3], 7, true);
    this.animations.add('walkUp', [6,7], 7, true);
    this.animations.add('walkRight',[4,5], 7, true);
    this.animations.add('killMoai', [8], 1, true);

    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.hp = 2;
    this.score = gameValues.moaiScore;
    this.isHit = false;
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = this.speed;
    this.body.velocity.y = this.speed;    
    this.body.setSize(16, 16, 0, 16);
   
};

bomberman.moai.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.moai.prototype.constructor = bomberman.moai;


bomberman.moai.prototype.update = function(){
    this.game.debug.body(this);
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.collide(this,this.level.destruibles);
    this.game.physics.arcade.collide(this,this.level.bombas);
    
    if(this.game.physics.arcade.overlap(this,this.level.player)){
        this.level.player.bombermanHit();
    }
    
    if((this.body.blocked.up || this.body.touching.up) && this.direction == 'up'){
        this.changeDirection();
    } else if((this.body.blocked.down || this.body.touching.down) && this.direction == 'down'){
        this.changeDirection();
    } else if((this.body.blocked.right || this.body.touching.right) && this.direction == 'right'){
        this.changeDirection();
    } else if((this.body.blocked.left || this.body.touching.left) && this.direction == 'left'){
        this.changeDirection();
    } 

    if(this.game.physics.arcade.overlap(this, this.level.explosions)){
       this.hit(this.hp);
       }

};

bomberman.moai.prototype.changeDirection = function(){
    var arrayDir = ['up', 'down', 'left', 'right'];
    this.direction = arrayDir[Math.floor(Math.random() * arrayDir.length)];
        switch(this.direction){
        case 'up':
            this.body.velocity.y -= this.speed;
            this.body.velocity.x = 0;
            this.animations.play('walkUp');
            break;
        
        case 'down':
            this.body.velocity.y += this.speed; 
            this.body.velocity.x = 0;
            this.animations.play('walkDown');
            break;
       
        case 'right':
            this.body.velocity.x += this.speed;
            this.body.velocity.y = 0;
            this.animations.play('walkRight');
            break;
        
        case 'left':
            this.body.velocity.x -= this.speed; 
            this.body.velocity.y = 0;
            this.animations.play('walkLeft');
            break;
            
        
    }
    return this.direction;
};

bomberman.moai.prototype.hit = function(Number){
     console.log(this.hp);
    this.hp -= 1;
//    this.body.velocity.x = 0;
//    this.body.velocity.y = 0;
    this.animations.play('killMoai', null, false, true);
    if(this.hp == 0){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.showScore();
    }
     console.log("despres del hit" + this.hp);
    return this.hp;
};

bomberman.moai.prototype.showScore = function(){
    var textMoaiScore = this.level.add.text(this.x, this.y, "+ " + gameValues.moaiScore, this.level.style);
    this.level.renderScore(gameValues.moaiScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(textMoaiScore).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);   this.level.add.tween(textMoaiScore).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}