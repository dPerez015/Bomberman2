var bomberman = bomberman || {};

var gameValues={
    currentLevel:1,
    currentWorld:1
}

bomberman.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

bomberman.game.state.add('menu',bomberman.menu);
bomberman.game.state.start('menu');
