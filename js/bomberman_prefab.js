var bomberman = bomberman || {};

bomberman.bomberman_prefab = function(game, x, y, currLevel, _speed, currMove){
  Phaser.Sprite.call(this, game, x, y, 'Bomberman');
  game.add.existing(this);
  this.anchor.setTo(.5);
  //Hauriem de mirar si hi ha alguna manera de fer una funció que retorni l'animació
  this.animations.add('walk_up',[0,1,2],10,true);
  this.animations.add('walk_left',[3,4,5],10,true);
  this.animations.add('walk_down',[6,7,8],10,true);
  this.animations.add('walk_right',[9,10,11],10,true);
  this.animations.add('ready_fight',[12],1,true);
  this.animations.add('placing_bomb_up',[13,14,15,16],10,true);
  this.animations.add('placing_bomb_right',[17,18,19,20],10,true);
  this.animations.add('placing_bomb_down',[21,22,23],10,true);
  this.animations.add('placing_bomb_left',[24,25,26,27],10,true);
  this.animations.add('throw_bomb_up',[28,29],10,true);
  this.animations.add('throw_bomb_left',[30,31],10,true);
  this.animations.add('throw_bomb_down',[32,33],10,true);
  this.animations.add('throw_bomb_right',[34,35],10,true);
  this.animations.add('damage_before_dead',[36,37,38,39],10,true);
  this.animations.add('dead',[40,41,42,43,44],10,true);
  this.animations.add('win',[129,120,131],10,true);
  game.physics.arcade.enable(this);
  this.level = currLevel;
  this.speed = _speed;
  this.isLeft = false;
  this.isRight = false;
  this.isUp = false;
  this.isDown = false;    
    
}

bomberman.bomberman_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bomberman_prefab.prototype.constructor = bomberman.bomberman_prefab;

bomberman.bomberman_prefab.prototype.create = function(){
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

bomberman.bomberman_prefab.prototype.update = function(){
    
    if(this.cursors.left.isDown){
        this.body.velocity.x = -this.speed;
        this.animations.play('walk_left');
        this.isLeft = true;
    }else if(this.cursors.right.isDown){
        this.body.velocity.x = +this.speed;
        this.animations.play('walk_right');
        this.isRight = true;
    }else if(this.cursors.up.isDown){
        this.body.velocity.y = -this.speed;
        this.animations.play('walk_up');
        this.isUp = true;
    }else if(this.cursors.down.isDown){
        this.body.velocity.y = +this.speed;
        this.animations.play('walk_down');
        this.isDown = true;
    }
    
    if(this.cursors.space.isDown && this.isUp == true){
        this.animations.play('placing_bomb_up');
    }else if(this.cursors.space.isDown && this.isDown == true){
        this.animations.play('placing_bomb_down');
    }else if(this.cursors.space.isDown && this.isLeft == true){
        this.animations.play('placing_bomb_left');
    }else if(this.cursors.space.isDown && this.isRight == true){
        this.animations.play('placing_bomb_right');
    }
    //falten coses per afegir però necesito que el nivell estigui fet i tampoc és prioritari
}
