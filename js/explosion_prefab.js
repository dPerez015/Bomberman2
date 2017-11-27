var bomberman = bomberman || {};

bomberman.explosion_prefab = function(game,x,y, _hasExploted, _timer){
    Phaser.Sprite.call(this, game, x, y, 'explosions');
    game.add.existing(this);
    this.animations.add('Upper_explosion', [0,8,16,24,32], 10, true);
    this.animations.add('Down_explosion', [1,9,17,25,33], 10, true);
    this.animations.add('Right_explosion', [2,10,18,26,34], 10, true);
    this.animations.add('Left_explosion', [3,11,19,27,35], 10, true);
    this.animations.add('Vertical_explosion', [4,12,20,28,36], 10, true);
    this.animations.add('Horizontal_explosion', [5,13,21,29,37], 10, true);
    this.animations.add('Center_explosion', [6,14,22,30,38], 10, true);
    this.animations.add('PowerUp_explosion', [7,15,23,31,39], 10, true);
    this.isExploding = _hasExploted;
    this.posX = x;
    this.posY = y;
    this.rightExplodes = x;
    this.leftExplodes = x;
    this.upExplodes = y;
    this.downExplodes = y;
    this.timer = _timer;
};

bomberman.explosion_prefab.prototype.update = function(){
  while(this.isExploding == true){
    
    this.rightExplodes = + gameValues.bombRange;
    this.leftExplodes = - gameValues.bombRange;
    this.upExplodes = - gameValues.bombRange;
    this.downExplodes = + gameValues.bombRange;
      
      
    if(this.rightExplodes != 0){
        this.animations.play('Right_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;

    }else if(this.rightExplodes > 1){
        this.animations.play('Vertical_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;
        
    }else if(this.leftExplodes != 0){
        this.animations.play('Left_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;
        
    }else if(this.leftExplodes < -1){
        this.animations.play('Vertical_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;
        
    }else if(this.upExplodes != 0){
        this.animations.play('Upper_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;
        
    }else if(this.upExplodes < -1){
        this.animations.play('Horizontal_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;
        
    }else if(this.downExplodes != 0){
        this.animations.play('Down_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;
        
    }else if(this.downExplodes > 1){
        this.animations.play('Horizontal_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;
        
    }else{
        this.animations.play('Center_explosion');
        gameValues.bombermanLife = -1;
        gameValues.puffLife = -1;
    }
      
    if(this.timer != 0){
        timer--;
    }else{
        this.isExploding = false;
    }
  }  
};

bomberman.explosion_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.explosion_prefab.prototype.constructor = bomberman.explosion_prefab;