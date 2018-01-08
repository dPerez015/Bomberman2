var bomberman = bomberman || {};

bomberman.explosion_prefab = function(game,x,y, type){
    Phaser.Sprite.call(this, game, x, y, 'OilExplosions');
    
    this.animations.add('|-', [6,7,8,9,10,11], 10, true);
    this.animations.add('-|', [18,19,20,21,22,23], 10, true);
    this.animations.add('|_', [30,31,32,33.34.35], 10, true);
    this.animations.add('_|', [24,25,26,27,28,29], 10, true);
    this.animations.add('Vertical', [12,13,14,15,16,17], 10, true);
    this.animations.add('Horizontal', [0,1,2,3,4,5], 10, true);
    this.game.physics.arcade.enable(this);
    
    this.resetExplosion = function(x, y, type){ 
    this.reset(x,y);
    this.animations.stop();
    switch(type){
        case 0:
            this.animations.play('Horizontal',10,false,true);
            break;
        case 1:
            this.animations.play('Vertical',10,false,true);
            break;
        case 2:
            this.animations.play('|-',10,false,true);
            break;
        case 3:
            this.animations.play('-|',10,false,true);
            break;
        case 4:
            this.animations.play('|_',10,false,true);
            break;
        case 5:
            this.animations.play('_|',10, false, true);
            break;
        default:
            break;
    };
};
        switch(type){
        case 0:
            this.animations.play('Horizontal',10,false,true);
            break;
        case 1:
            this.animations.play('Vertical',10,false,true);
            break;
        case 2:
            this.animations.play('|-',10,false,true);
            break;
        case 3:
            this.animations.play('-|',10,false,true);
            break;
        case 4:
            this.animations.play('|_',10,false,true);
            break;
        case 5:
            this.animations.play('_|',10, false, true);
            break;
        default:
            break;
    };
    
};

bomberman.oilExplosion.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.oilExplosion.prototype.constructor = bomberman.oilExplosion;


