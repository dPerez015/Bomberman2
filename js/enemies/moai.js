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
    this.hitAnim = this.animations.add('killMoai', [8,9], 3, true);
    
    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.hp = 2;
    this.score = gameValues.moaiScore;
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = this.speed;
    this.body.velocity.y = this.speed;    
    this.body.setSize(16, 16, 0, 16);
    this.invu = false;
    
    this.isHit = function(){
    this.invu = true;
    this.animations.play('killMoai', null, false);
    this.hp --;

    this.body.velocity.x = 0;
    this.body.velocity.y = 0;
    
    if(this.hp == 0){
        this.showScore();
        this.hitAnim.onComplete.add(this.kill.bind(this), this.level);
    }    
    //console.log(this.hp);

    };
    
    this.changeInvu = function(){
        this.invu = false;
    };

//this.hitAnim.onStart.add(this.changeInvu.bind(this), level);
this.hitAnim.onComplete.add(this.changeDirection.bind(this), this.level);
this.hitAnim.onComplete.add(this.changeInvu.bind(this), this.level);
};

bomberman.moai.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.moai.prototype.constructor = bomberman.moai;


bomberman.moai.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.collide(this,this.level.destruibles);
    this.game.physics.arcade.collide(this,this.level.bombas);
    this.game.physics.arcade.collide(this,this.level.imanes);
    this.game.physics.arcade.collide(this,this.level.enemys);
    this.game.physics.arcade.collide(this,this.level.dynamites);
    this.game.physics.arcade.collide(this,this.level.door);
    
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

    if(this.game.physics.arcade.overlap(this, this.level.explosions) && this.invu==false){
        this.isHit();
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
            
        default:
            this.body.velocity.x += this.speed;
            this.body.velocity.y = 0;
            this.animations.play('walkRight');
            break;
        
    }
    return this.direction;
};


bomberman.moai.prototype.showScore = function(){
    var textMoaiScore = this.level.add.text(this.x, this.y, "+ " + gameValues.moaiScore, this.level.style);
    this.level.renderScore(gameValues.moaiScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(textMoaiScore).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);   this.level.add.tween(textMoaiScore).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}