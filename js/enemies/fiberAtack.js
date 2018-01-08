var bomberman = bomberman || {};

bomberman.fiberAtack = function(game, x, y, type){
    Phaser.Sprite.call(this,game,x,y,'fiberAtack');
    this.game.add.existing(this);//renderitza wey
    this.anchor.setTo(.5);
    this.animations.add('UpAtk', [8,4,0,9,5,1], 10, true);
    this.animations.add('DownAtk', [2,6,10,3,7,11], 10, true);
    this.animations.add('RightAtk', [14,13,12,18,17,16], 10, true);
    this.animations.add('LeftAtk', [20,21,22,24,25,26], 10, true);
    
    switch(type){
        case 'Up':
            this.animations.play('UpAtk');
            break;
        case 'Down':
            this.animations.play('DownAtk');
            break;
        case 'Right':
            this.animations.play('RightAtk');
            break;
        case 'Left':
            this.animations.play('LeftAtk');
            break;
         default:
            break;
    };
    
}