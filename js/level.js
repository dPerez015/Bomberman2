var bomberman = bomberman || {};

bomberman.level = {
    
    init:function(){
        
    },
    
    preload:function(){
        
    },
    
    create:function(){
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    
    update:function(){
        
    },   
    
}