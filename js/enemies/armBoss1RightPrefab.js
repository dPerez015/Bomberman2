var bomberman = bomberman || {};

bomberman.armBoss1RightPrefab = function(game, x, y, level){
    Phaser.Sprite.call(this,game,x,y,'armBossRight');
    this.anchor.setTo(.5);
    
    this.punchRight1 = this.animations.add('punchRight1', [0,1,2,3,4], 10, true);
    this.punchRight2 = this.animations.add('punchRight2', [5,6,7,8,9], 10, true);
    this.punchRight3 = this.animations.add('punchRight3 ', [10,11,12,13,14], 10, true);
    this.punchRight4 = this.animations.add('punchRight4', [15,16,17,18,19], 10, true);
    this.level = level;
    
     this.game.physics.arcade.enable(this);

};

bomberman.armBoss1RightPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.armBoss1RightPrefab.prototype.constructor = bomberman.armBoss1RightPrefab;

bomberman.bodyBoss1Prefab.prototype.update = function(){
    this.game.physics.arcade.collide(this,this.level.walls);
    this.game.physics.arcade.overlap(this,this.level.player, this.level.player.bombermanHit,null,this);
    this.game.physics.arcade.overlap(this, this.level.explosions,this.isHit,null,this);
    
}