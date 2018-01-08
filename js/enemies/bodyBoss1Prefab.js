var bomberman = bomberman || {};

bomberman.bodyBoss1Prefab = function(game,x,y,level){
    Phaser.Sprite.call(this, game, x, y, 'bodyBoss1');
    this.anchor.setTo(.5)
    
    this.hitAnim1 = this.animations.add('hit1', [0,1], 10, true);
    this.hitAnim2 = this.animations.add('hit2', [1,2], 10, true);
    this.hitAnim3 = this.animations.add('hit3 ', [2,3], 10, true);
    this.hitAnim4 = this.animations.add('hit4', [3,4], 10, true);
    
    this.game = game;
    this.level = level;
    
    this.game.physics.arcade.enable(this);
    
};

bomberman.bodyBoss1Prefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bodyBoss1Prefab.prototype.constructor = bomberman.bodyBoss1Prefab;

bomberman.bodyBoss1Prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.overlap(this,this.level.player, this.level.player.bombermanHit,null,this);
    this.game.physics.arcade.overlap(this,this.level.bombas, this.level.bombas.kill,null,this);
    this.game.physics.arcade.overlap(this, this.level.explosions,this.isHit,null,this);
    
}

