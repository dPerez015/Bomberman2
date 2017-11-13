var bomberman = bomberman || {};

var gameValues={
    gameWidth: 1360,
    gameHeight: 681,
    currentLevel:1,
    currentWorld:1,
    bombermanSpeed:5,
    bombermanLife:1,
    bombsQuantity:1,
    bombRange:1,
    bombTimer:0,
    powerUp:0
}

bomberman.game = new Phaser.Game(gameValues.gameWidth,gameValues.gameHeight,Phaser.AUTO,null,this,false,false);

bomberman.game.state.add('main',bomberman.level);
bomberman.game.state.add('menu',bomberman.menu);
bomberman.game.state.start('menu');
