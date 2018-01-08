var bomberman = bomberman || {};

bomberman.armBoss1LefttPrefab = function(game, x, y, level){
    Phaser.Sprite.call(this,game,x,y,'armBossLeftt');
    this.anchor.setTo(.5);
    
    this.punchLeft1 = this.animations.add('punchLeft1', [0,1,2,3,4], 10, true);
    this.punchLeft2 = this.animations.add('punchLeft2', [5,6,7,8,9], 10, true);
    this.punchLeft3 = this.animations.add('punchLeft3 ', [10,11,12,13,14], 10, true);
    this.punchLeft4 = this.animations.add('punchLeft4', [15,16,17,18,19], 10, true);
    
    this.level = level;
    
     this.game.physics.arcade.enable(this);

};

bomberman.armBoss1LefttPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.armBoss1LefttPrefab.prototype.constructor = bomberman.armBoss1LefttPrefab;

bomberman.armBoss1LefttPrefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.overlap(this,this.level.player, this.level.player.bombermanHit,null,this);
    this.game.physics.arcade.overlap(this, this.level.explosions,this.isHit,null,this);
    
}