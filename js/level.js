var bomberman = bomberman || {};

bomberman.level = {
    
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameValues.gameWidth,gameValues.gameHeight);
        this.scale.pageAlignHorizontally = true;  
        this.scale.pageAlignVertically = true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    
    preload:function(){
       

        this.load.spritesheet('Bomberman', 'img/Bomberman.png', 16, 32);
        this.load.spritesheet('puff', 'img/puff.png', 17, 24);

        this.load.spritesheet('bomb', 'img/bomb.png', 16, 16);
        this.load.spritesheet('explosions', 'img/explosion.png', 16, 16);
        this.load.spritesheet('destruible','img/wall_destroyable.png',16,16);
        
        //mapa
        this.load.tilemap('level1-1','maps/lvl1-1.JSON', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('world1','img/world1.png');
        
        
        
        this.hasWon = false;
        this.powerUp = 0;
        
        this.load.audio('Lvl1_music', 'sound/Lvl1_soundtrack.mp3');
        
    },
    
    create:function(){
        
        //mapa
        this.map=this.game.add.tilemap('level1-1');
        this.map.addTilesetImage('world1');
        
        this.walls=this.map.createLayer('ObjetosSolidos');
        this.bg=this.map.createLayer('BackgroundStatic');
        this.inter=this.map.createLayer('Interactuables');
        //this.destroy=this.map.createLayer('ObjetosDestruibles');
        this.anim=this.map.createLayer('BackgroundAnimated');
        
       this.createDestruibles(this); 
       //this.map.createFromObjects('ObjetosDestruibles',4,'destruible',0,true,false,this.destruibles,bomberman.muroDestruiblePrefab);
        //this.walls.forEach()
        
        
        
        //colisiones
        this.map.setCollisionBetween(1,129,true, 'ObjetosSolidos');
     //   this.map.setCollisionBetween(1,129,true, 'ObjetosDestruibles');
        
        
        //this.walls.
        /*this.map.setCollision(34,true, 'ObjetosSolidos');
        this.map.setCollision(87,true, 'ObjetosSolidos');
        this.map.setCollision(1,true, 'ObjetosSolidos');
        this.map.setCollision(129,true, 'ObjetosSolidos');
        this.map.setCollision(38,true,'ObjetosSolidos');
        this.map.setCollision(39,true, 'ObjetosSolidos');
        this.map.setCollision(70,true, 'ObjetosSolidos');
        this.map.setCollision(46,true, 'ObjetosSolidos');
        this.map.setCollision(33,true, 'ObjetosSolidos');*/
        
        
        
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
       // this.puff = new bomberman.puffPuff(this.game,0,0,1,'right',this, 1, 100);//constructor enemy puffpuff

        this.player = new bomberman.bomberman_prefab(this.game, 9*16,9*16, this, gameValues.hasWon);
        this.game.add.existing(this.player);
        
        this.lvlMusic = this.add.audio('Lvl1_music');
        this.lvlMusic.play();
        this.lvlMusic.loopFull(0.1);
    },
    
    update:function(){
        this.physics.arcade.collide(this.destruibles,this.player,this.choquemuro,null,this);
        this.game.debug.body(this.player);
    },   
    
    createDestruibles:function(state){
        
        this.destruibles = this.game.add.group();
        var objArray=this.findObjectsById(4,this.map,'ObjetosDestruibles');
        var item;
        objArray.forEach(function(elem){
            
            item=new bomberman.muroDestruiblePrefab(state.game,elem.x, elem.y);
            state.destruibles.add(item);
        });
        
        
    },
    findObjectsById:function(id,map,layer){
        var result=new Array();
        map.objects[layer].forEach(function(element){
           if(element.gid==id){
               element.y-=map.tileHeight/2;
               element.x+=map.tileWidth/2;
               result.push(element);
           } 
        });
        return result;
    },
    choquemuro:function(player,muro){
        //console.log(muro);
        muro.breakBlock();
    },
    
}