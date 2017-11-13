var bomberman = bomberman || {};

bomberman.level = {
    
    init:function(){
        
    },
    
    preload:function(){
       
        this.load.spritesheet('Bomberman', 'img/Bomberman.png', 46, 33);
        this.load.spritesheet('puff', 'img/puff.png', 160, 24);
       // this.load.spritesheet('bomb', 'img/...png', someSixeX, someSizeY);
        
        this.hasWon = false;
        this.powerUp = 0;        
        
    },
    
    create:function(){
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        this.puff = new bomberman.puffPuff(this.game,0,0,3,'down',this, 1, 100);//constructor enemy puffpuff
        this.game.add.existing(this.puff);
        
        this.player = new bomberman.bomberman_prefab(this.game.level, this.game.world.centerX, this.game.world.centerY, this, gameValues.bombermanSpeed, gameValues.bombermanLife, gameValues.hasWon, gameValues.bombsQuantity, gameValues.bombRange, );
       // this.bomb = new.bomberman.bombPrefab(this.game, 10, 10, player.range, player.timer ) //constructor bombPrefab
        //this.game.level.existing(this.bomb);?
    },
    
    update:function(){
        
    },   
    
}