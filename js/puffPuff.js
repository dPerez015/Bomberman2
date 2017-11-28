var bomberman = bomberman || {};

//com de moment nomes implementem un enemic li dic enemy, ja en el futur cquan implementem mes dun ho canviem
bomberman.puffPuff = function(game,x,y,speed,direction,level, hp, score){
    Phaser.Sprite.call(this,game,x,y,'puff');
    this.game.add.existing(this);
    this.anchor.setTo(.5);
    this.animations.add('walkDown',[0,1,2],10,true);
    this.animations.add('walkLeft',[3,4,5], 10, true);
    this.animations.add('walkUp', [6,7,8], 10, true);
    this.animations.add('walkRight',[10,11,12], 10, true);
    this.animations.add('kill', [9], 1, true);

    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.hp = hp;
    this.score = score;
    this.game.physics.arcade.enable(this);

};

bomberman.puffPuff.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.puffPuff.prototype.constructor = bomberman.puffPuff;


bomberman.puffPuff.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.collide(this,this.level.destroy);
    this.game.physics.arcade.collide(this,this.level.bombas);

    switch(this.direction){
        case 'up':
            this.body.position.y -= this.speed;
            this.animations.play('walkUp');
            break;
        
        case 'down':
            this.body.position.y += this.speed; 
            this.animations.play('walkDown');
            break;
       
        case 'right':
            this.body.position.x += this.speed;
            this.animations.play('walkRight');
            break;
        
        case 'left':
            this.body.position.x -= this.speed; 
            this.animations.play('walkLeft');
            break;
            
        
    }
    
    if(this.body.blocked.up && this.direction == 'up'){
            this.changeDirection();
    } else if(this.body.blocked.down && this.direction == 'down'){
        this.changeDirection();
    } else if(this.body.blocked.right && this.direction == 'right'){
        console.log("block righ");
        this.changeDirection();
    } else if(this.body.blocked.left && this.direction == 'left'){
        this.changeDirection();
    }

   // this.game.physics.arcade.overlap(this, this.game.level.exploid_Prefab, this.hit(), null,this);

    console.log(this.direction);
    
};

bomberman.puffPuff.prototype.changeDirection = function(){
        var arrayDir = ['up', 'down', 'left', 'right'];
        for(var i = 0; i < arrayDir.length; i++){
            if(arrayDir[i] == this.direction) {arrayDir.pop();}
        }
        this.direction = arrayDir[Math.floor(Math.random() * arrayDir.length)];
        return this.direction;
}

bomberman.puffPuff.prototype.hit = function(){
    this.hp --;
    if(this.hp == 0){
        this.animations.play('kill');
        this.puffPuff.kill();
    }
};