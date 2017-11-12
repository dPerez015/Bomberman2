var bomberman = bomberman || {};

bomberman.menu = {
    
    init:function(){
        
    },
    
    preload:function(){
        this.load.image('ProvMenu', 'img/Menu_Image.png');    
        
        this.load.image('Button', 'img/MenuButton.png');
    },
    
    create:function(){
        this.ProvMenu = this.game.add.image(0, 0, 'ProvMenu'); 
        
        //this.ProvButton = this.game.add.button(this.world.centerX, this.world.centerY, 'ProvButton', this.gameStart, this);
        //this.ProvButton.anchor.setTo(.5);
        //this.ProvButton.scale.setTo(.5);
        this.startGameButton=new bomberman.MenuButton_prefab(this.game,287,437,'Button',this.gameStart);
        this.game.add.existing(this.startGameButton);
        
        this.battleModeButton=new bomberman.MenuButton_prefab(this.game,287,487,'Button',this.battleMode);
        this.game.add.existing(this.battleModeButton);
        
        this.passwordButton=new bomberman.MenuButton_prefab(this.game,287,537,'Button',this.passordsMode);
        this.game.add.existing(this.passwordButton);
    },
    
    update:function(){
        
    },   
    gameStart:function(){
        bomberman.loadScene('main');
    },
    battleMode:function(){
        //cosas
    },
    passordsMode:function(){
        //radev rules
    }
    
}