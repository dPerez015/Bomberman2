var bomberman = bomberman || {};

bomberman.door_prefab = function(game, x, y, _hasWon, _level){
    Phaser.Sprite.call(this, game, x, y, 'door');
    
    this.anchor.setTo(.5);
    this.animations.add('Open_Door', [0, 1, 2], 10, false);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    //Booleana que es tornarà true quan tots els enemics i els botons hagin sigut premuts
    this.hasWon = _hasWon
    
    this.activate = function(hasWon){
        if(hasWon == true)
            this.animations.play('Open_Door');
    }
}

bomberman.door_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.door_prefab.prototype.constructor = bomberman.door_prefab;
