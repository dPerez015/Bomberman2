var bomberman = bomberman || {};

bomberman.win_buttons_prefab = function(game, x, y){
    Phaser.Sprite.call(game, x, y, 'win_button');
    
    this.anchor.setTo(.5);
    this.animations.add('Expl_Collided', [0, 1], 10, false);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    
}

bomberman.win_buttons_prefab.prototype = Object.call(Phaser.Sprite.prototype);
bomberman.win_buttons_prefab.prototype.constructor = bomberman.win_buttons_prefab;

bomberman.win_buttons_prefab.prototype.update = function(){
    thus.animations.play('Expl_Collided', null, false, true);
};