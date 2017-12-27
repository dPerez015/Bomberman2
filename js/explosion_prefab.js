var bomberman = bomberman || {};

bomberman.explosion_prefab = function(game,x,y, type){
    Phaser.Sprite.call(this, game, x, y, 'explosions');
    
    this.animations.add('Center_explosion', [6,14,22,30,38], 10, true);
    this.animations.add('Upper_explosion', [0,8,16,24,32], 10, true);
    this.animations.add('Down_explosion', [1,9,17,25,33], 10, true);
    this.animations.add('Right_explosion', [2,10,18,26,34], 10, true);
    this.animations.add('Left_explosion', [3,11,19,27,35], 10, true);
    this.animations.add('Vertical_explosion', [4,12,20,28,36], 10, true);
    this.animations.add('Horizontal_explosion', [5,13,21,29,37], 10, true);
    this.animations.add('PowerUp_explosion', [7,15,23,31,39], 10, true);
    this.game.physics.arcade.enable(this);
    
    
    this.resetExplosion = function(x, y, type){ 
        this.reset(x,y);
        this.animations.stop();
        switch (type){
        case 0:
           this.animations.play('Center_explosion',10,false,true);
            break; 
        case 1:
                this.animations.play('Upper_explosion',10,false,true);
                break;
        case 2:
                this.animations.play('Down_explosion',10,false,true);
                break;
        case 3:
                this.animations.play('Right_explosion',10,false,true);
                break;
        case 4:
                this.animations.play('Left_explosion',10,false,true);
                break;
        case 5:
             this.animations.play('Vertical_explosion',10,false,true);
                break;
        case 6:
                this.animations.play('Horizontal_explosion',10,false,true);
                break;
        case 7:
                this.animations.play('PowerUp_explosion',10,false,true);
                break;
        default:
            break;
                };
    
};
    
    switch (type){
        case 0:
            this.animations.play('Center_explosion',10,false,true);
            break;
        case 1:
            this.animations.play('Upper_explosion',10,false,true);
            break;
        case 2:
            this.animations.play('Down_explosion',10,false,true);
            break;
        case 3:
            this.animations.play('Right_explosion',10,false,true);
            break;
        case 4:
            this.animations.play('Left_explosion',10,false,true);
            break;
        case 5:
            this.animations.play('Vertical_explosion',10,false,true);
            break;
        case 6: 
            this.animations.play('Horizontal_explosion',10,false,true);
            break;
        case 7: 
            this.animations.play('PowerUp_explosion',10,false,true);
            break;
        default:
            break;
                };

};

bomberman.explosion_prefab.prototype.update = function(){
  
};


bomberman.explosion_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.explosion_prefab.prototype.constructor = bomberman.explosion_prefab;