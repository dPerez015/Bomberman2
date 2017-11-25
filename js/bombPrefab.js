var bomberman = bomberman || {};

bomberman.bombPrefab = function (game, x, y, range, timing){
    Phaser.Sprite.call(this, game,x,y,'bomb');
    game.add.existing(this);
    console.log('bombConstructor');
    this.anchor.setTo(.5);
    this.animations.add('stand', [0,1,2,3], 1, true);
    this.posX = x;
    this.posY = y;
    this.range = range;
    this.gm = game;
    this.timing = timing;
    console.log(this.timing);
    this.game.physics.arcade.enable(this);
    this.isExploding = false;
};

bomberman.bombPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bombPrefab.prototype.constructor = bomberman.bombPrefab;

bomberman.bombPrefab.prototype.timer = function (){
    if(this.timing != 0){
        this.timing--;
      
    } else {
        this.explosion();
        this.isExploding = true;
    }
};

bomberman.bombPrefab.prototype.explosion = function(){
    var explosion = new bomberman.explosion_prefab(this.gm, this.posX, this.posY, this.isExploding, 100);
    this.isExploding = false;
    console.log('explosion');
    this.destroy();
    
};

bomberman.bombPrefab.prototype.update = function (){
    
        this.animations.play('stand');
        this.timer();
        //this.game.physics.arcade.overlap(this,this.explosionPrefab, bomberman.bombPrefab.explosion(), null,this);//si isItrigger = true amb lexploid prefab la bomba tambe explota
    
    
};

