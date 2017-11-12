var bomberman = bomberman || {};

bomberman.menu = {
    
    init:function(){
        
    },
    
    preload:function(){
        this.load.image('ProvMenu', 'img/Menu_Image.png');    
        
        this.load.image('ProvButton', 'img/btn.png');
    },
    
    create:function(){
        this.ProvMenu = this.game.add.image(0, 0, 'ProvMenu');
        
        this.ProvButton = this.game.add.button(this.world.centerX, this.world.centerY, 'ProvButton', this.gameStart, this);
        this.ProvButton.anchor.setTo(.5);
        this.ProvButton.scale.setTo(.5);
    },
    
    update:function(){
        
    },   
    gameStart:function(){
        bomberman.loadScene('main');
    }
}