var bomberman = bomberman || {};

//com de moment nomes implementem un enemic li dic enemy, ja en el futur cquan implementem mes dun ho canviem
bomberman.enemy = function(game,x,y,speed,direction,level,patrolA,patrolB){
    Phaser.Sprite.call(this,game,x,y,'slime');
   // this.anchor.setTo(.5);
    //this.animations.add('walk',[0,1,2,3],10,true);
    //this.animations.play('walk');
    this.speed = speed;
    this.direction = direction;
    this.level = level;
    this.patrolA = patrolA;
    this.patrolB = patrolB;
    this.game.physics.arcade.enable(this);
};

bomberman.enemy.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.enemy.prototype.constructor = platformer.enemy;

platformer.enemy.prototype.update = function(){
    //this.game.physics.arcade.collide(this,this.level.walls);   
    
    if((this.body.position.x >= this.patrolB)||(this.body.position.x <= this.patrolA)){
       this.direction *=-1;
       this.scale.x = this.direction;
       }
    
    this.body.velocity.x = this.speed*this.direction;
    
    this.game.physics.arcade.collide(this,this.level.hero,
    function(enemy,hero){
        if(enemy.body.touching.up && hero.body.touching.down){
            hero.body.velocity.y = - gameOptions.heroJump;
            enemy.kill();
        } else{
            //enemy.level.camera.shake(0.05,500);
            //hero.reset(65,100);
            enemy.level.hit();
        }
    });

    
};