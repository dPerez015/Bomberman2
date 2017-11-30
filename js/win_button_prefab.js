var bomberman = bomberman || {};

bomberman.win_buttons_prefab = function(game, x, y, _level){
    Phaser.Sprite.call(this, game, x, y, 'win_button');
    
    this.anchor.setTo(.5);
    //this.animations.add('Expl_Collided', [0, 1], 10, false);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    this.animations.frame = 1;
    this.isActivated = false
    this.level = _level;
    
    this.activate = function(){
        this.animations.frame = 0;
        this.isActivated=true;
        //this.level.hasWon = false;
        /*this.level.botones.forEach(function(element){
            if(!element.isActivated){
                this.level.hasWon = true;
            }
        }*/;
    }
}

bomberman.win_buttons_prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.win_buttons_prefab.prototype.constructor = bomberman.win_buttons_prefab;

