var bomberman = bomberman || {};

var gameValues={
    gameWidth: 320,
    gameHeight: 224,
    MenuWidth:1360,
    MenuHeight:681,
    currentLevel:1,
    currentWorld:1,
    bombermanSpeed:50,
    bombermanLife:1,
    bombsQuantity:1,
    bombRange:1,
    bombTimer:0,
    powerUp:0
}


bomberman.game = new Phaser.Game(gameValues.gameWidth,gameValues.gameHeight,Phaser.AUTO,null,this,false,false);

bomberman.game.state.add('main',bomberman.level);
bomberman.game.state.add('menu',bomberman.menu);
bomberman.game.state.start('main');
