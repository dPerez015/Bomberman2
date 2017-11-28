var bomberman=bomberman || {};

bomberman.imanPrefab=function(game,x,y,rot){
    Phaser.Sprite.call(this,game,x,y,'iman');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    this.trigger=new Phaser.Physics.Arcade.Body(this);
    console.log(this.trigger);
    this.trigger.setSize(32,32,0,0);
}

bomberman.imanPrefab.prototype=Object.create(Phaser.Sprite.prototype);
bomberman.imanPrefab.prototype.contructor=bomberman.imanPrefab;

bomberman.imanPrefab.prototype.atract=function(iman,bomba){
    var x=bomba.position.x-this.position.x;
    var y= bomba.position.y-this.position.y;
    var distance = Math.sqrt(Math.pow(x,2)+Math.pow(y,2));
    
    bomba.body.velocity.x=x/distance;
    bomba.body.velocity.y=y/distace;
    
}
bomberman.imanPrefab.prototype.rotate=function(rotation){
    switch (rotation){
        case 0:
            this.animations.frame=0;
            break;
        case 1:
            this.animation.frame=1;
            break;
        case 2:
            this.animation.frame=2;
            break;
        case 3:
            this.animation.frame=3;
            break;
        default:
            break
    }
}
bomberman.imanPrefab.prototype.update=function(){
    this.game.debug.body(this);
    this.game.debug.body(this.trigger);
    
    
}