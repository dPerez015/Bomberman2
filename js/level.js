var bomberman = bomberman || {};

bomberman.level = {
    
    init:function(){
        
    },
    
    preload:function(){
       
        this.load.spritesheet('Bomberman', 'img/Bomberman.png', 46, 33);
        this.load.spritesheet('puff', 'img/puff.png', 160, 24);
        
        
        
    },
    
    create:function(){
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        this.puff = new platformer.puffPuff(game,0,0,3,'down',this, 1, 100);
        this.game.add.existing(this.puff);
    },
    
    update:function(){
        
    },   
    
}