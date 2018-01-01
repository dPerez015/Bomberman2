var bomberman = bomberman || {};

bomberman.boss1 = function(game, x, y, speed, level){
    Phaser.Sprite.call(this,game,x,y,'boss1');
    this.game.add.existing(this);
    this.anchor.setTo(.5);
    this.animations.add('standStill',[0,6],10,true);
    this.animations.add('punchLeft',[1,2,3,4,5],10,true);
    this.amimations.add('punchRight',[7,8,9,10,11],10,true);
    this.animations.add('standStillWeak',[12,18],10,true);
    this.animations.add('punchLeftWeak',[13,14,15,16,17],10,true);
    this.animations.add('punchRightWeak',[19,20,21,22,23],10,true);
    this.animations.add('standStillWeaker',[24,30],10,true);
    this.animations.add('punchLeftWeaker',[25,26,27,28,29],10,true);
    this.animations.add('punchRightWeaker',[31,32,33,34,35],10,true);
    this.animations.add('standStillAlmostDead',[36,42],10,true);
    this.animations.add('punchLeftAlmostDead',[37,38,39,40,41],10,true);
    this.animations.add('punchRightAlmostDead',[43,44,45,46,47],10,true);
    
    this.events.onKilled.add(level.checkVictory.bind(level));
    
    this.speed = speed;
    this.level = level;
    this.hp = 12;
    this.score = gameValues.boss1Score;
    this.isHit = false;
    this.isHitting = false;
    this.game.physics.arcade.enable(this);
    this.body.velocity.x = this.speed;
    this.body.velocity.y = this.speed;
};

bomberman.boss1.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.boss1.prototype.constructor = bomberman.boss1;

bomberman.boss1.prototype.update = function(){
    
    
}