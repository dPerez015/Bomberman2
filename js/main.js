var bomberman = bomberman || {};

var gameValues={
    gameWidth: 1360,
    gaemHeight: 681,
    currentLevel:1,
    currentWorld:1
}

bomberman.game = new Phaser.Game(gameValues.gameWidth,gameValues.gameHeight,Phaser.AUTO,null,this,false,false);

bomberman.game.state.add('main',bomberman.level);
bomberman.game.state.add('menu',bomberman.menu);
bomberman.game.state.start('menu');
