var bomberman = bomberman || {};

bomberman.game = new Phaser.Game(gameOptions.gameWidth,gameOptions.gameHeight,Phaser.AUTO,null,this,false,false);

bomberman.game.state.add('menu',bomberman.menu);
bomberman.game.state.start('menu');
