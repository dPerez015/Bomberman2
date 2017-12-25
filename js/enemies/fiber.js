var bomberman = bomberman || {};

bomberman.fiber = function(game,x,y,speed,direction,level){
    Phaser.Sprite.call(this,game,x,y,'ramosu');
    this.game.add.existing(this);//renderitza wey
    this.anchor.setTo(.5);
    this.animations.add('walkDown',[0,1,2,3,4,5,6,7],10,true);
    this.animations.add('walkLeft',[14,15,16,17,18], 10, true);
    this.animations.add('walkUp', [8,9,10,11,12,13], 10, true);
    //this.animations.add('walkRight',[10,11,12], 10, true); mateix sprite que esquerra pero *-x
    this.animations.add('killRamosu', [19], 1, true);

    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.hp = 2;
    this.score = gameValues.puffScore;
    this.isHit = false;
    this.isInvulnerable = false;
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = this.speed;
    this.body.velocity.y = this.speed;
    this.CD = 15;

};

bomberman.fiber.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.fiber.prototype.constructor = bomberman.fiber;


bomberman.fiber.prototype.update = function(){
    //comprovar que el phaser.Sconds del lvl afecta als prefavs que hi son creats dintre
    this.CD--;
    if(this.CD = 0){
        this.isInvulnerable = true;
        this.atack();
        this.CD = 15;
    }
    //this.game.physics.arcade.collide(this,this.level.walls);
    //this.game.physics.arcade.collide(this,this.level.destruibles);
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

bomberman.fiber.prototype.changeDirection = function(){
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

bomberman.fiber.prototype.hit = function(Number){
    if(this.isInvulnerable == false){
    this.hp --;
    //console.log("la vida es" + this.hp);
    if(this.hp == 0){
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
        this.animations.play('killRamosu', null, false, true);
        this.showScore();
    }
    return this.hp;
    }
};

bomberman.fiber.prototype.atack = function(){
    //cridar lanimcacio
    this.isInvulnerable = false;
    var arrayDir = ['up', 'down', 'left', 'right'];
    var dirAtk = arrayDir[Math.floor(Math.random() * arrayDir.length)];
    switch(dirAtk){
        case 'up':
            //this.animations.play('walkUp');
            break;
        
        case 'down':
            break;
       
        case 'right':
            break;
        
        case 'left':
            break;
            
        
    }
    return this.isInvulnerable;
}

bomberman.fiber.prototype.showScore = function(){
    var textFiberScore = this.level.add.text(this.x, this.y, "+ " + gameValues.fiberScore, this.level.style);
    this.level.renderScore(gameValues.ramosuScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(textFiberScore).to({y: 0}, 1500, Phaser.Easing.Linear.None, true); this.level.add.tween(textFiberScore).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}