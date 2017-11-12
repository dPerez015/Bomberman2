var bomberman=bomberman || {};

bomberman.MenuButton_prefab=function(game,x,y,img,func){
    Phaser.Button.call(this,game,x,y,img,func);
    //this.anchor.setTo(.5);
    this.alpha=0;
    this.onInputOver.add(function(){this.alpha=1;},this);
    this.onInputOut.add(function(){this.alpha=0;},this);
    
}

bomberman.MenuButton_prefab.prototype=Object.create(Phaser.Button.prototype);
bomberman.MenuButton_prefab.prototype.constructor=bomberman.MenuButton_prefab;

