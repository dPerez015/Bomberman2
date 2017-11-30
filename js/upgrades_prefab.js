var bomberman = bomberman || {};

bomberman.upgrades_prefab = function(game, x, y){
    Phaser.Sprite.call(this, game, x, y, 'upgrade');
    
    this.animations.add('Bomb_Upgrade',[0,1], 10, true);
    this.animations.add('Range_Upgrade', [2,3], 10, true);
    this.animations.add('Speed_Upgrade', [4,5], 10, true);
    
    
}

bomberman.upgrades_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.upgrades_prefab.prototype.constructor = bomberman.upgrades_prefab; 

