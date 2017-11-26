var bomberman = bomberman || {};

bomberman.muroDestruiblePrefab=function (game,x,y){
    Phaser.Sprite.call(this, game,x,y,'destruible');
    //game.add.existing(this);
    console.log("construido");
    this.anchor.setTo(.5);
    this.animations.add('die',[0,1,2,3,4],10,true);
    this.posX=x;
    this.posY=y;
    this.game.physics.arcade.enable(this);
}

bomberman.muroDestruiblePrefab.prototype=Object.create(Phaser.Sprite.prototype);
bomberman.muroDestruiblePrefab.prototype.constructor=bomberman.muroDestruiblePrefab;

