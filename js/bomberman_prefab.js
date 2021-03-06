var bomberman = bomberman || {};

bomberman.bomberman_prefab = function(game, x, y, _currLevel){
  Phaser.Sprite.call(this, game, x, y, 'Bomberman');
  this.anchor.setTo(.5);
  this.level = _currLevel;
  //this.scale.setTo(2);
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
  this.animations.add('dead',[140,141,142,143,144],1,true);
  anim=this.animations.add('win',[270,271,272],10,true);
    this.completedWinLoop=function(){this.loopWinAnimation++;this.animations.play("win",null, false);};
    anim.onComplete.add(this.completedWinLoop.bind(this),this.level);
    
    this.loopWinAnimation=0;
    
    this.game.physics.arcade.enable(this);
  this.body.setSize(10,8,3,21);
  
    
    
  
  this.isLeft = false;
  this.isRight = false; 
  this.isUp = false;
  this.DownDir = false;    
  this.hasWon = false;

  //vidas
    this.lives= gameValues.bombermanLife;
  //bomb generator 
    this.canGenerateBomb = true;
    this.recentlyPlacedBomb=false;
    this.numBombas=gameValues.bombsQuantity;
    this.range=gameValues.bombRange;
    
    this.upgradeBomb = function(type){
        switch(type){
            case 3:
                gameValues.bombermanSpeed += 10;
                break;
            case 1:
                gameValues.bombsQuantity += 1;
                this.numBombas++;
                this.level.renderNumBobs();
                break;
            case 2:
                gameValues.bombRange +=1;
                this.level.renderRange();
                break;
            default:
                break;
        }
    };
    this.winLevel=function(){
        //console.log(this);
        if(!this.hasWon){
            this.animations.play("win",null, false);
            this.hasWon=true;
        }
    };
    
    this.preUpdate=function(){
        var result=Phaser.Sprite.prototype.preUpdate.call(this,arguments);
                this.game.physics.arcade.collide(this,this.level.walls);
                this.game.physics.arcade.collide(this,this.level.destruibles);
            
                if(this.recentlyPlacedBomb==false){
                    this.game.physics.arcade.collide(this,this.level.bombas,function(player,bomba){
                        if(bomba.body.immovable==false){
                        bomba.position.x-=player.game.time.physicsElapsed*bomba.body.velocity.x;
                        bomba.position.y-=player.game.time.physicsElapsed*bomba.body.velocity.y;
                        bomba.body.velocity.setTo(0);
                        player.position.x-=player.game.time.physicsElapsed*player.body.velocity.x;
                        player.position.y-=player.game.time.physicsElapsed*player.body.velocity.y;
                        }
                    });
                }
                else{
                    this.game.physics.arcade.collide(this,this.level.bombas);
                }
                this.canGenerateBomb=true;


                this.game.physics.arcade.overlap(this,this.recentlyPlacedBomb,this.onBomb);

                //collisions enemics i explosions
                if(this.game.physics.arcade.overlap(this,this.level.explosions))
                   {    
                       this.bombermanHit();
                   }
            if(!this.hasWon){
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
                        if(this.recentlyPlacedBomb.body.velocity.x==0 && this.recentlyPlacedBomb.body.velocity.y==0){
                            this.recentlyPlacedBomb.body.immovable=true;
                        }
                        this.level.bombas.add(this.recentlyPlacedBomb);
                        this.recentlyPlacedBomb=false;
                    }
                }
               // console.log(this.numBombas)
                if(this.level.space.isDown && this.canGenerateBomb && this.numBombas>0){
                   //  console.log(this.numBombas);
                    this.createBomb();
                }


                if(this.level.minuts < 0){
                    this.bombermanHit();
                }
            }
            else{
                if(this.loopWinAnimation>5){
                    this.level.goToNextLevel();
                }
            }
        return result;
    }
}

    

bomberman.bomberman_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bomberman_prefab.prototype.constructor = bomberman.bomberman_prefab;



bomberman.bomberman_prefab.prototype.createBomb = function(){

    this.canGenerateBomb = false; 
    this.recentlyPlacedBomb=this.level.bombas.getFirstExists(false);
    if(!this.recentlyPlacedBomb){
        this.recentlyPlacedBomb= new bomberman.bombPrefab(this.game,(this.level.bg.getTileX(this.body.position.x+4)*16)+8,(this.level.bg.getTileY(this.body.position.y+3)*16)+8,gameValues.bombRange,this.level);
    }
    else{
       this.recentlyPlacedBomb.bombReset((this.level.bg.getTileX(this.body.position.x+4)*16)+8,(this.level.bg.getTileY(this.body.position.y+3)*16)+8,gameValues.bombRange);
        this.recentlyPlacedBomb.animations.play('stand');
    }
     this.numBombas--;
}

bomberman.bomberman_prefab.prototype.onBomb=function(player,bomb){
    
    player.canGenerateBomb=false;
   // console.log(this.canGenerateBomb);
}

bomberman.bomberman_prefab.prototype.bombermanHit = function(){
    gameValues.bombermanLife = gameValues.bombermanLife - 1;
    /*this.body.position.x = this.initPosX;
    this.body.position.y = this.initPosY;*/
    this.animations.play('dead', null, false, true);
    this.level.renderTextLives;

    if(gameValues.bombermanLife < 0){
        lvlMusic.stop()
        bomberman.loadScene('addName');
    }else{
        lvlMusic.stop();
        bomberman.loadScene('transScene');
    }
}