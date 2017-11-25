var bomberman = bomberman || {};

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
        
        this.hasToPlay = true;
    },
    
    create:function(){
        this.ProvMenu = this.game.add.image(0, 0, 'ProvMenu'); 
        
        //this.ProvButton = this.game.add.button(this.world.centerX, this.world.centerY, 'ProvButton', this.gameStart, this);
        //this.ProvButton.anchor.setTo(.5);
        //this.ProvButton.scale.setTo(.5);
        this.startGameButton = new bomberman.MenuButton_prefab(this.game,287,437,'Button',this.gameStart);
        this.game.add.existing(this.startGameButton);
        
        this.battleModeButton = new bomberman.MenuButton_prefab(this.game,287,487,'Button',this.battleMode);
        this.game.add.existing(this.battleModeButton);
        
        this.passwordButton = new bomberman.MenuButton_prefab(this.game,287,537,'Button',this.passordsMode);
        this.game.add.existing(this.passwordButton);
        
        this.music = this.add.audio('Menu_music');
        this.music.play();
        this.music.loopFull(0.1);
    },
    
    update:function(){
        if(this.hasToPlay == false){
            this.music.pause();
        }
    },   
    gameStart:function(){
        bomberman.loadScene('main');
        this.hasToPlay = false;
    },
    battleMode:function(){
        //cosas
        bomberman.loadScene('comsoon');
        this.hasToPlay = false;
    },
    passordsMode:function(){
        //radev rules
        bomberman.loadScene('comsoon');
        this.hasToPlay = false;
    }
    
}