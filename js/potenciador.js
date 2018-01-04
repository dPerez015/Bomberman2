var bomberman = bomberman || {};

bomberman.potenciador = function(game,x,y,_level){
    Phaser.Sprite.call(this, game, x, y, 'potenciador');
    //game.add.exsisting(this); 
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.body.immovable = true;
    this.level = _level;
    
    this.increaseExplosion:function(){
        
    };
    
}

bomberman.potenciador.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.potenciador.prototype.constructor = bomberman.potenciador;