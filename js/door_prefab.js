var bomberman = bomberman || {};

bomberman.door_prefab = function(game, x, y, _level){
    Phaser.Sprite.call(this, game, x, y, 'door');
    
    this.anchor.setTo(.5);
    this.animations.add('Open_Door', [0, 1, 2], 5, false);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    this.level=_level;
    //Booleana que es tornarà true quan tots els enemics i els botons hagin sigut premuts
    this.isActive=false;
    this.activate = function(){
        this.isActive=true;
        //this.body.immovable=false;
        this.animations.play('Open_Door',null,false); 
    }
}

bomberman.door_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.door_prefab.prototype.constructor = bomberman.door_prefab;

bomberman.door_prefab.prototype.update=function(){
    //console.log("cca");
    if(this.isActive)
        this.game.physics.arcade.overlap(this,this.level.player,this.level.player.winLevel.bind(this.level.player));
    else
        this.game.physics.arcade.collide(this,this.level.player);
}