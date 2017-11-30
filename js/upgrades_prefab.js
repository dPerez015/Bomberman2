var bomberman = bomberman || {};

bomberman.upgrades_prefab = function(game, x, y, _type){
    Phaser.Sprite.call(this, game, x, y, 'upgrade');
    
    this.animations.add('Bomb_Upgrade',[0,1], 10, true);
    this.animations.add('Range_Upgrade', [2,3], 10, true);
    this.animations.add('Speed_Upgrade', [4,5], 10, true);
    
    this.upType = _type;
}

bomberman.upgrades_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.upgrades_prefab.prototype.constructor = bomberman.upgrades_prefab; 

bomberman.upgrades_prefab.prototype.update = function(){
    
    switch(this.upType){
        case 1:
            this.animations.play('Speed_Upgrade');
            break;
        case 2:
            this.animations.play('Bomb_Upgrade');
            break;
        case 3:
            this.animations.play('Range_Upgrade');
            break;
        default:
            break;
    };
    
     
}