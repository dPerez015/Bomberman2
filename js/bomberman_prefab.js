var bomberman = bomberman || {};

bomberman.bomberman_prefab = function(game, x, y, _currLevel, _win){
  Phaser.Sprite.call(this, game, x, y, 'Bomberman');
  //this.game.add.existing(this);
  this.anchor.setTo(.5);
  //this.scale.setTo(2);
  //Hauriem de mirar si hi ha alguna manera de fer una funció que retorni l'animació
 this.animations.add('walk_up',[0,1,2],10,true);
  this.animations.add('walk_left',[10,11,12],10,true);
  this.animations.add('walk_down',[20,21,22],10,true);
  this.animations.add('walk_right',[30,31,32],10,true);
  this.animations.add('ready_fight',[40],1,true);
  
  
  var anim=this.animations.add('placing_bomb_up',[50,51,52,53],10,false);
  anim.onComplete.add(this.createBomb,this.level);
    
  anim=this.animations.add('placing_bomb_right',[60,61,62,63],10,false);
  anim.onComplete.add(this.createBomb,this.level);
    
  anim=this.animations.add('placing_bomb_down',[70,71,72],10,false);
  anim.onComplete.add(this.createBomb,this.level);
    
  anim=this.animations.add('placing_bomb_left',[80,81,82,83],10,false);
  anim.onComplete.add(this.createBomb,this);
  /*this.animations.add('throw_bomb_up',[28,29],10,true);
  this.animations.add('throw_bomb_left',[30,31],10,true);
  this.animations.add('throw_bomb_down',[32,33],10,true);
  this.animations.add('throw_bomb_right',[34,35],10,true);*/
  this.animations.add('damage_before_dead',[130,131,132,133],10,true);
  this.animations.add('dead',[140,141,142,143,144],10,true);
  this.animations.add('win',[270,271,272],10,true);
  this.game.physics.arcade.enable(this);
  this.body.setSize(10,8,3,21);
  this.body.position.x = x;
  this.posY = y;
  this.level = _currLevel;
    //console.log(_speed);
  this.isLeft = false;
  this.isRight = false; 
  this.isUp = false;
  this.DownDir = false;    
  this.hasWon = _win;

  //vidas
    this.lives=2;
  //bomb generator 
    this.canGenerateBomb = true;
    this.recentlyPlacedBomb=false;
    
}


bomberman.bomberman_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bomberman_prefab.prototype.constructor = bomberman.bomberman_prefab;

bomberman.bomberman_prefab.prototype.upgradeBomb = function(){
    if(gameValues.powerUp == 1){//Power Up patins
        gameValues.bombermanSpeed = +1;
    }else if(gameValues.powerUp == 2){//More bombs
        gameValues.bombsQuantity = +1;
    }else if(gameValues.powerUp == 3){//Range
        gameValues.bombRange = +1;
    }
    
}

bomberman.bomberman_prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.collide(this,this.level.destroy);
    this.game.physics.arcade.collide(this,this.level.bombas);
    this.canGenerateBomb=true;
    
    this.game.physics.arcade.overlap(this,this.recentlyPlacedBomb,this.onBomb);
    //console.log(this.canGenerateBomb);
        //console.log('h');
        if(this.level.cursors.left.isDown){
            this.body.velocity.y=0;
            this.body.velocity.x = -gameValues.bombermanSpeed;
            this.animations.play('walk_right');
            this.isDown=false;
            this.isRight=false;
            this.isUp=false;
            this.isLeft = true;
        }else if(this.level.cursors.right.isDown){
            this.body.velocity.y=0;
            this.body.velocity.x = +gameValues.bombermanSpeed;
            this.animations.play('walk_left');
            this.isDown=false;
            this.isRight=true;
            this.isUp=false;
            this.isLeft = false;
        }else if(this.level.cursors.up.isDown){
            this.body.velocity.x=0;
            this.body.velocity.y = -gameValues.bombermanSpeed;
            this.animations.play('walk_up');
            this.isUp = true;
            this.isDown=false;
            this.isRight=false;
            this.isLeft = false;
        }else if(this.level.cursors.down.isDown){
            this.body.velocity.x=0;
            this.body.velocity.y = +gameValues.bombermanSpeed;
             this.animations.play('walk_down');
            this.isUp = false;
            this.isDown=true;
            this.isRight=false;
            this.isLeft = false;
        }
        else{
            //console.log('h');
            this.body.velocity.setTo(0);
            if(this.isUp){
               this.animations.frame=0;
               }
            else if(this.isDown){
                this.animations.frame=20;
            }
            else if(this.isLeft){
                this.animations.frame=30;
            }
            else if(this.isRight){
                this.animations.frame=10; 
            }
        }
     if(this.canGenerateBomb){
        if(this.recentlyPlacedBomb!=false){
            this.recentlyPlacedBomb.body.immovable=true;
            this.level.bombas.add(this.recentlyPlacedBomb);
            this.recentlyPlacedBomb=false;
        }
    }
    if(this.level.space.isDown && this.canGenerateBomb){
        this.createBomb();
    }
   
         

}

bomberman.bomberman_prefab.prototype.createBomb = function(){

    this.canGenerateBomb = false;
   
    this.recentlyPlacedBomb=this.level.bombas.getFirstExists(false);
    if(!this.recentlyPlacedBomb){
        
        this.recentlyPlacedBomb= new bomberman.bombPrefab(this.game,(this.level.bg.getTileX(this.body.position.x)*16)+8,(this.level.bg.getTileY(this.body.position.y)*16)+8,gameValues.bombRange,this);
    }
    else{
       this.recentlyPlacedBomb.reset((this.level.bg.getTileX(this.body.position.x)*16)+8,(this.level.bg.getTileY(this.body.position.y)*16)+8);
    }
}

bomberman.bomberman_prefab.prototype.onBomb=function(player,bomb){
    
    player.canGenerateBomb=false;
   // console.log(this.canGenerateBomb);
}
