var bomberman = bomberman || {};

bomberman.objecteMobil = function(game, x, y, _level){
    Phaser.Sprite.call(this, game, x, y, 'objecteMobil');
    
    this.anchor.setTo(.5);
    //this.animations.add('Expl_Collided', [0, 1], 10, false);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
  //  this.setBody(a,b,c,d);
    this.isActivated = false
    this.level = _level;
    
    this.checkexplosion = function(){
        //if collide{}right
        this.body.position.x -= 1;
        //element del tile comparacio posicio
        //play anim
        //anim.onCOmplete -> kill
        
        // aixi pels 4 costats
    

    }
}

bomberman.objecteMobil.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.objecteMobil.prototype.constructor = bomberman.objecteMobil;
