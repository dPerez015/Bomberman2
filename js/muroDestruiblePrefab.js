var bomberman = bomberman || {};

bomberman.muroDestruiblePrefab=function (game,x,y){
    Phaser.Sprite.call(this, game,x,y,'destruible');
    //game.add.existing(this);
    console.log("construido");
    this.anchor.setTo(.5);
   var anim = this.animations.add('die',[1,2,3,4,5],10,true);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    
    
}

bomberman.muroDestruiblePrefab.prototype=Object.create(Phaser.Sprite.prototype);
bomberman.muroDestruiblePrefab.prototype.constructor=bomberman.muroDestruiblePrefab;

bomberman.muroDestruiblePrefab.prototype.breakBlock=function(){
        this.animations.play('die',null,false,true);
    };
