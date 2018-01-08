var bomberman = bomberman || {};

//com de moment nomes implementem un enemic li dic enemy, ja en el futur cquan implementem mes dun ho canviem
bomberman.gurorin = function(game,x,y,speed,direction,level){
    Phaser.Sprite.call(this,game,x,y,'gurorin');
    this.game.add.existing(this);//renderitza wey
    this.anchor.setTo(.5);
    this.animations.add('walk',[0,1,2],10,true);
    this.anim = this.animations.add('stop',[3,4,5,7], 10, true);
    this.animations.add('killGurorin', [6], 1, true);

    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.hp = 1;
    this.score = gameValues.gurorinScore;
    this.isHit = false;
    this.change = false;
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = this.speed;
    this.body.velocity.y = this.speed;
    this.body.setSize(16, 16, 0, 0);
    
//this.anim.onComplete.add(this.changeDirection.bind(this), this.level);

};

bomberman.gurorin.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.gurorin.prototype.constructor = bomberman.gurorin;


bomberman.gurorin.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.collide(this,this.level.destruibles);
    this.game.physics.arcade.collide(this,this.level.bombas);
    this.game.physics.arcade.collide(this,this.level.enemys);
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

    if(this.game.physics.arcade.overlap(this, this.level.explosions)){
       this.hit(this.hp);
       }
};

bomberman.gurorin.prototype.changeDirection = function(){
    var arrayDir = ['up', 'down', 'left', 'right'];
    this.animations.play('walk');
    this.direction = arrayDir[Math.floor(Math.random() * arrayDir.length)];
        switch(this.direction){
        case 'up':
            this.body.velocity.y -= this.speed;
            this.body.velocity.x = 0;
            break;
        
        case 'down':
            this.body.velocity.y += this.speed; 
            this.body.velocity.x = 0;
            break;
       
        case 'right':
            this.body.velocity.x += this.speed;
            this.body.velocity.y = 0;
            break;
        
        case 'left':
            this.body.velocity.x -= this.speed; 
            this.body.velocity.y = 0;
            break;
                
        default:
            this.body.velocity.x += this.speed;
            this.body.velocity.y = 0;
            break;
            
        
    }
    return this.direction;
};

bomberman.gurorin.prototype.hit = function(){
    this.hp --;
    this.animations.play('killGurorin', null, false, true);
    if(this.hp == 0){
        this.showScore();
    }
};

bomberman.gurorin.prototype.showScore = function(){
    var textGurorinScore = this.level.add.text(this.x, this.y, "+ " + gameValues.gurorinScore, this.level.style);
    this.level.renderScore(gameValues.gurorinScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(textGurorinScore).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);   this.level.add.tween(textGurorinScore).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}