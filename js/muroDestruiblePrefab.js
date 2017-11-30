var bomberman = bomberman || {};

bomberman.muroDestruiblePrefab=function (game,x,y,level){
    Phaser.Sprite.call(this, game,x,y,'destruible');
    //game.add.existing(this);
    
    this.anchor.setTo(.5);
   var anim = this.animations.add('die',[1,2,3,4,5],10,true);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    this.level=level;
    
    this.breakBlock=function(){
        this.animations.play('die',null,false,true);
        console.log(this.level);
        this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)]=false;
    };
    
}

bomberman.muroDestruiblePrefab.prototype=Object.create(Phaser.Sprite.prototype);
bomberman.muroDestruiblePrefab.prototype.constructor=bomberman.muroDestruiblePrefab;


