var bomberman = bomberman || {};

var gameValues={
    gameWidth: 320,
    gameHeight: 224,
    MenuWidth:1360,
    MenuHeight:681,
    currentLevel:1,
    currentWorld:1,
    bombermanSpeed:50,
    bombermanLife:0,
    bombsQuantity:0,
    bombRange:0,
    bombTimer:0,
    powerUp:0,
    puffScore:100,
    moaiScore:200,
    helmScore:200,
    ramosuScore:100,
    fiberScore:200,
    gurorinScore:100,
    bossScore:30000,
    score:0,
    boss1Life:15,
    boss1Attack:false,
}


bomberman.game = new Phaser.Game(gameValues.gameWidth,gameValues.gameHeight,Phaser.AUTO,null,this,false,false);

bomberman.game.state.add('main',bomberman.level);
bomberman.game.state.add('menu',bomberman.menu);
bomberman.game.state.add('comsoon',bomberman.comingSoon);
bomberman.game.state.add('transScene', bomberman.tScene_1_1);
bomberman.game.state.add('addName', bomberman.addNameScene);
bomberman.game.state.add('scoreScene', bomberman.ScoreScene)
bomberman.game.state.start('menu');