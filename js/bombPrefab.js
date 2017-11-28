var bomberman = bomberman || {};

bomberman.bombPrefab = function (game, x, y, range, level){
    Phaser.Sprite.call(this, game,x,y,'bomb');
    game.add.existing(this);
    
    this.anchor.setTo(.5);
    this.anim=this.animations.add('stand', [0,1,2,3], 1, false);
    this.anim.onComplete.add(this.explosion.bind(this),level);
    this.player=level.player;
    this.level=level;
    this.range = range;
    this.gm = game;
   // this.timing = timing;

    this.game.physics.arcade.enable(this);
    this.isExploding = false;
    
    this.animations.play('stand');
};

bomberman.bombPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bombPrefab.prototype.constructor = bomberman.bombPrefab;



bomberman.bombPrefab.prototype.explosion = function(){
    //var explosion = new bomberman.explosion_prefab(this.gm, this.posX, this.posY, this.isExploding, 100);
    
    this.isExploding = false;
    //console.log(_this);
      console.log(this.level.map.getTile(this.body.x/16,this.body.y/16));
    this.kill();
    
};

bomberman.bombPrefab.prototype.update = function (){
        //this.game.physics.arcade.overlap(this,this.explosionPrefab, bomberman.bombPrefab.explosion(), null,this);//si isItrigger = true amb lexploid prefab la bomba tambe explota
    
  
    
    
};

