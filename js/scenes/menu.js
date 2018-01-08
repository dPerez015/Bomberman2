var bomberman = bomberman || {};

var music;

bomberman.menu = {
    
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameValues.MenuWidth,gameValues.MenuHeight);
        this.scale.pageAlignHorizontally = true;  
        this.scale.pageAlignVertically = true;
    },
    
    preload:function(){
        this.load.image('ProvMenu', 'img/Menu_Image.png');    
        
        this.load.image('Button', 'img/MenuButton.png');
        
        this.load.audio('Menu_music', 'sound/Menu_soundtrack.mp3');
        
        this.isDown = false;
    },
    
    create:function(){
        this.ProvMenu = this.game.add.image(0, 0, 'ProvMenu'); 
    
        //bomberman.musicPlayer_prefab('Menu_music', false);
        
        music = this.game.add.audio('Menu_music');
        music.play();
        music.loop = true;
        
        this.startGameButton = new bomberman.MenuButton_prefab(this.game,287,437,'Button',this.gameStart);
        this.game.add.existing(this.startGameButton);
        
        this.battleModeButton = new bomberman.MenuButton_prefab(this.game,287,487,'Button',this.battleMode);
        this.game.add.existing(this.battleModeButton);
        
        this.passwordButton = new bomberman.MenuButton_prefab(this.game,287,537,'Button',this.passordsMode);
        this.game.add.existing(this.passwordButton);
        
        //default names
        if(localStorage.getItem("name1") === null){
            for(var it = 0; it<10; it++){
                localStorage.setItem("name"+it.toString(), "---------");
                localStorage.setItem("score"+it.toString(), 0);
            }
        }
        
    },
    
    update:function(){
        
    },
    gameStart:function(){
        gameValues.bombermanLife = 3;
        gameValues.bombRange = 9;
        gameValues.bombsQuantity = 9;
        gameValues.currentLevel=1;
        gameValues.currentWorld=1;
        gameValues.score = 0;
        music.stop();
        bomberman.loadScene('transScene');
    },
    battleMode:function(){
        //cosas
        music.stop();
        bomberman.loadScene('comsoon');
    },
    passordsMode:function(){
        //radev rules
       music.stop();
       bomberman.loadScene('scoreScene');
    }
    
}