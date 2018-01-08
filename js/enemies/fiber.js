var bomberman = bomberman || {};

bomberman.fiber = function(game,x,y,speed,direction,level){
    Phaser.Sprite.call(this,game,x,y,'fiber');
    this.game.add.existing(this);//renderitza wey
    this.anchor.setTo(.5);
    this.animations.add('walk',[0,1,2,3,4],5,true);
    this.anim = this.animations.add('positionToAtk',[5,6,7,8,9],5,true);
    this.animations.add('atk', [10,11],10, true);
    this.animations.add('hit', [12,13],10, true);


    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.hp = 1;
    this.score = gameValues.fiberScore;
    this.isHit = false;
    this.isInvulnerable = false;
    this.game.physics.arcade.enable(this);
    this.body.setSize(16,16, 4, 4);
    this.body.velocity.x = this.speed;
    this.body.velocity.y = this.speed;
    this.CD = 50;
    


};

bomberman.fiber.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.fiber.prototype.constructor = bomberman.fiber;


bomberman.fiber.prototype.update = function(){
    //comprovar que el phaser.Sconds del lvl afecta als prefavs que hi son creats dintre
    
//this.CD--;
//    console.log(this.CD);
//        if(this.CD == 0){
//        this.anim.onComplete.add(this.atack.bind(this), this);
//        this.isInvulnerable = true;
//        this.CD = 10;
//    }
    
 //this.game.time.events.add(Phaser.Timer.SECOND * 5, this.coolDown, this.level);
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
    

    if(this.game.physics.arcade.overlap(this, this.level.explosions)){
       this.hit();
       }
        
    }
    
    this.game.debug.body(this);
};

bomberman.fiber.prototype.changeDirection = function(){
    var arrayDir = ['up', 'down', 'left', 'right'];
    this.direction = arrayDir[Math.floor(Math.random() * arrayDir.length)];
        switch(this.direction){
        case 'up':
            this.body.velocity.y -= this.speed;
            this.body.velocity.x = 0;
            this.animations.play('walk');
            break;
        
        case 'down':
            this.body.velocity.y += this.speed; 
            this.body.velocity.x = 0;
            this.animations.play('walk');
            break;
       
        case 'right':
            this.body.velocity.x += this.speed;
            this.body.velocity.y = 0;
            this.animations.play('walk');
            break;
        
        case 'left':
            this.body.velocity.x -= this.speed; 
            this.body.velocity.y = 0;
            this.animations.play('walk');
            break;
            
        
    }
    return this.direction;
};

bomberman.fiber.prototype.hit = function(){
    if(this.isInvulnerable == false){
    this.hp --;
    //console.log("la vida es" + this.hp);
    if(this.hp == 0){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.play('hit', null, false, true);
        this.showScore();
    }
    }
};

bomberman.fiber.prototype.atack = function(){
    var atk;
    this.animations.play('atk');
    var arrayDir = ['up', 'down', 'left', 'right'];
    var dirAtk = arrayDir[Math.floor(Math.random() * arrayDir.length)];
//    switch(dirAtk){
//        case 'up':
//            atk = new bomberman.fiberAtack(this, this.level.bg.getTileX(this.body.position.x), this.level.bg.getTileY(this.body.position.y)-1, 'Up');
//            break;
//        
//        case 'down':
//            atk = new bomberman.fiberAtack(this, this.level.bg.getTileX(this.body.position.x), this.level.bg.getTileY(this.body.position.y)+1, 'Down');
//            break;
//       
//        case 'right':
//            atk = new bomberman.fiberAtack(this, this.level.bg.getTileX(this.body.position.x)+1, this.level.bg.getTileY(this.body.position.y), 'Right');
//            break;
//        
//        case 'left':
//            atk = new bomberman.fiberAtack(this, this.level.bg.getTileX(this.body.position.x)+1, this.level.bg.getTileY(this.body.position.y), 'Right');
//            break;
//            
//        default:
//            break;           
//        
//    };
}

bomberman.fiber.prototype.showScore = function(){
    var textFiberScore = this.level.add.text(this.x, this.y, "+ " + gameValues.fiberScore, this.level.style);
    this.level.renderScore(gameValues.ramosuScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(textFiberScore).to({y: 0}, 1500, Phaser.Easing.Linear.None, true); this.level.add.tween(textFiberScore).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}