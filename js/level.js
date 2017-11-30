 var bomberman = bomberman || {};

var lvlMusic;

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
        this.load.spritesheet('iman','img/iman.png',16,16);
        this.load.spritesheet('upgrade','img/Upgrades_Bomberman.png', 16, 16);
        this.load.spritesheet('win_button', 'img/Victory_Button.png', 13, 14);
        this.load.spritesheet('door', 'img/Bomberman_Gate.png', 23, 25);
        
        //mapa
        this.load.tilemap('level1-1','maps/lvl1-1.JSON', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('world1','img/world1.png');
        
        //HUD
        this.load.image('hud', 'img/hud1.png');
    
        
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
        //this.inter=this.map.createLayer('Interactuables');
        //this.destroy=this.map.createLayer('ObjetosDestruibles');
        this.anim=this.map.createLayer('BackgroundAnimated');
        
        //grid explosiones
        this.gridSolidObjects=[];
        for(var i=0; i<this.map.width;i++){
            var arry=[];
            for(var j=0;j<this.map.height;j++){
                arry.push(0);
            }
            this.gridSolidObjects.push(arry);
        }
        
        //bloques
        this.createDestruibles(this); 

        //imanes
        this.createImanes(this);
        
        //botones
         this.createBotones(this);
        
        //COLLISIONS
        this.map.setCollisionBetween(1,129,true, 'ObjetosSolidos');

        //Bombas
        this.bombas=this.game.add.group();
        
        //explosiones
        this.explosions=this.game.add.group();
        
        //Upgrades
        this.upgrades=this.game.add.group();
        //console.log(this.gridSolidObjects);
        
        //Door
        this.door = new bomberman.door_prefab(this.game,(12*16)+8, 5*16, this.hasWon, this);
        this.game.add.existing(this.door);
        
        //INPUTS
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        //CHARACTERS
            //---First enemy: puffpuff---//
        this.puff = new bomberman.puffPuff(this.game,(this.bg.getTileX(55)*16)+8,
        5*16, 20,'right',this);//constructor enemy puffpuff
        
        this.puff2 = new bomberman.puffPuff(this.game,61,167, 20, 'down', this);
        this.puff3 = new bomberman.puffPuff(this.game,200,166, 20, 'down', this);

            //---player----//
        this.player = new bomberman.bomberman_prefab(this.game, (9*16)-8,(9*16)+8, this);
        this.game.add.existing(this.player);
        
        
        //HUD
        this.hud = this.game.add.image(0,0, 'hud');
        this.style = {
            font: "16px Arial",
            fill: "#fff",
            align: "center",
        };
        
            //---score----//
        this.textScore = this.game.add.text(50, 3, gameValues.score, this.style);       
            //---timer----//
        this.textTimer = this.game.add.text(160, 3, "2:00", this.style);
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
        this.seconds = 0;
        this.minuts = 4;
            //--lives----//
        this.textLives = this.game.add.text(235, 3, this.player.lives, this.style);
            //---numbBombs----//
        this.textNumBombs = this.game.add.text(270,3, gameValues.bombsQuantity, this.style);
            //---range----//
        this.textRange = this.game.add.text(300, 3, gameValues.bombRange, this.style);
        
        //MUSIC
        lvlMusic = this.add.audio('Lvl1_music');
        lvlMusic.play();
        lvlMusic.loop = true;
    },
    
    update:function(){
        //this.game.debug.body(this.puff2);
        this.physics.arcade.collide(this.destruibles,this.explosions,this.choquemuro,null,this);
        this.physics.arcade.collide(this.imanes,this.player);
        this.physics.arcade.overlap(this.botones,this.explosions,this.activarBoton,null,this);
        //this.game.debug.body(this.player);
        this.physics.arcade.overlap(this.upgrades,this.player,this.cogerUpgrade,null,this);

    },   

    createDestruibles:function(state){
        var _this=this;
        this.destruibles = this.game.add.group();
        var objArray=this.findObjectsById(4,this.map,'ObjetosDestruibles');
        var item;
        objArray.forEach(function(elem){
        
            item=new bomberman.muroDestruiblePrefab(state.game,elem.x, elem.y,_this);
            //this.game.physics.arcade.enable(item);
            _this.gridSolidObjects[_this.bg.getTileX(elem.x)][_this.bg.getTileY(elem.y)]=1;
            state.destruibles.add(item);
        });
        
    },
    createImanes:function(state){
        var _this=this;
        this.imanes=this.game.add.group();
        this.imanesTrigger=this.game.add.group();
        var objArray=this.findObjectsById(92,this.map,'Interactuables');
        var item
        //arriba
        objArray.forEach(function(element){
           item=new bomberman.imanPrefab(state.game,element.x,element.y,0);
            state.imanes.add(item);
            _this.gridSolidObjects[_this.bg.getTileX(element.x)][_this.bg.getTileY(element.y)]=1;
        });
        //derecha
        /*objArray=this.findObjectsById(93,this.map,'Interactuables');
        objArray.forEach(function(element){
           item=new bomberman.imanPrefab(state.game,elem.x,elem.y,-90); 
        });*/
        
    },
    createBotones:function(state){
        var _this = this;
        this.botones = this.game.add.group();
        var objArray = this.findObjectsById(99,this.map,'Interactuables')
        var item;
        
        objArray.forEach(function(element){
            item = new bomberman.win_buttons_prefab(state.game,element.x, element.y,_this);
            state.botones.add(item);
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
    choquemuro:function(muro,explosion){
        //console.log(muro);
        muro.breakBlock();
        explosion.kill();
    },
    activarBoton:function(boton){
        boton.activate();  
    },
    cogerUpgrade:function(player,upgrade){
        console.log(player);
        player.upgradeBomb(upgrade.upType);
        upgrade.destroy();
    },
    updateTimer:function(){
        this.seconds --;

        if(this.seconds < 10){
            this.textTimer.setText(this.minuts + ":" + "0" + this.seconds);
            if(this.seconds < 0){
            this.minuts--;
            this.seconds = 59;
            this.textTimer.setText(this.minuts + ":" + this.seconds);  
            }
        }
        else {
        this.textTimer.setText(this.minuts + ":" + this.seconds);   
        }
    },
    
    renderTextLives:function(){
        this.textLives.setText(this.player.lives);
    },
    
    renderScore:function(Number){
        var nScore = Number;
        gameValues.score += nScore;
        this.textScore.setText(gameValues.score);
    },
    
    renderRange:function(){
        this.textRange.setText(gameValues.bombRange);
    },

}