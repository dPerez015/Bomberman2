var bomberman = bomberman || {};

bomberman.door_prefab = function(game, x, y, _allButtons, _allEnemies){
    Phaser.Sprite.call(this, game, x, y, 'door');
    
    this.anchor.setTo(.5);
    this.animations.add('Open_Door', [0, 1, 2], 10, true);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    //Booleana que es tornarà true quan tots els enemics i els botons hagin sigut premuts
    this.allButtons = _allButtons;
    this.allEnemies = _allEnemies;
}

bomberman.door_prefab.prototype = Object.call(Phaser.Sprite.prototype);
bomberman.door_prefab.prototype.constructor = bomberman.door_prefab;

bomberman.door_prefab.prototype.update = function(){
    if(this.allButtons == true && this.allEnemies == true){
        this.animations.play('Open_Door', null, false, true);
    }
};