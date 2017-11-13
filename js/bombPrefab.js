var bomberman = bomberman || {};

bomberman.bombPrefab = function (game, x, y, range, timing){
    Phaser.Sprite.call(this,game,x,y,'bomb');
    //this.anchor.setTo(.5);
    this.range = range;
    this.timing;
    game.physics.arcade.enable(this);
};

bomberman.bombPrefab.prototype.timer = function (){
    if(this.timing != 0){
        this.timing--;
    } else 
      bomberman.bombPrefab.prototype.exploid();  
};

bomberman.bombPrefab.prototype.explosion = function(){
    //crido exploidPrefab
    bomberman.bombPrefab.kill();
};

bomberman.bombPrefab.prototype.update = function (){
    if(bombPrefab){
        bomberman.bombPrefab.prototype.explode();
        this.game.physics.arcade.overlap(this,this.level.exploidPrefab, bomberman.bombPrefab.explosion(), null,this);//si isItrigger = true amb lexploid prefab la bomba tambe explota
    }
    
};

bomberman.bombPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bombPrefab.prototype.constructor = bomberman.bombPrefab;