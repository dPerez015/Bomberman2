var bomberman = bomberman || {};

bomberman.level = {
    
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameValues.gameWidth,gameValues.gameHeight);
        this.scale.pageAlignHorizontally = true;  
        this.scale.pageAlignVertically = true;
    },
    
    preload:function(){
       
        this.load.spritesheet('Bomberman', 'img/Bomberman.png', 16, 31);
        this.load.spritesheet('puff', 'img/puff.png', 160, 24);
       // this.load.spritesheet('bomb', 'img/...png', someSixeX, someSizeY);
        
        //mapa
        this.load.tilemap('level1-1','maps/lvl1-1.JSON', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('world1','img/world1.png');
        
        this.hasWon = false;
        this.powerUp = 0;        
        
    },
    
    create:function(){
        //mapa
        this.map=this.game.add.tilemap('level1-1');
        this.map.addTilesetImage('world1');
        this.walls=this.map.createLayer('ObjetosSolidos');
        this.bg=this.map.createLayer('BackgroundStatic');
        this.inter=this.map.createLayer('Interactuables');
        this.destroy=this.map.createLayer('ObjetosDestruibles');
        this.anim=this.map.createLayer('BackgroundAnimated');
        
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        this.puff = new bomberman.puffPuff(this.game,0,0,3,'down',this, 1, 100);//constructor enemy puffpuff
        this.game.add.existing(this.puff);
        
        this.player = new bomberman.bomberman_prefab(this.game, this.game.world.centerX, this.game.world.centerY, this, gameValues.bombermanSpeed, gameValues.bombermanLife, gameValues.hasWon, gameValues.bombsQuantity, gameValues.bombRange, gameValues.powerUp);
        this.game.add.existing(this.player);
       // this.bomb = new.bomberman.bombPrefab(this.game, 10, 10, player.range, player.timer ) //constructor bombPrefab
        //this.game.level.existing(this.bomb);?
    },
    
    update:function(){
        this.player.update();
    },   
    
}