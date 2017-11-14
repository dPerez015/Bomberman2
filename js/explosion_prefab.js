var bomberman = bomberman || {};

bomberman.explosion_prefab = function(game,x,y){
    Phaser.Sprite.call(this, game, x, y, 'explosion');
    this.animations.add('Upper_explosion', [0,8,16,24,32], 10, true);
    this.animations.add('Down_explosion', [1,9,17,25,33], 10, true);
    this.animations.add('Right_explosion', [2,10,18,26,34], 10, true);
    this.animations.add('Left_explosion', [3,11,19,27,35], 10, true);
    this.animations.add('Vertical_explosion', [4,12,20,28,36], 10, true);
    this.animations.add('Horizontal_explosion', [5,13,21,29,37], 10, true);
    this.animations.add('Center_explosion', [6,14,22,30,38], 10, true);
    this.animations.add('Upper_explosion', [7,15,23,31,39], 10, true);

}