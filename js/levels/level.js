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
        this.load.spritesheet('puff', 'img/puff.png', 16, 24);
        this.load.spritesheet('bomb', 'img/bomb.png', 16, 16);
        this.load.spritesheet('explosions', 'img/explosion.png', 16, 16);
        this.load.spritesheet('destruible','img/wall_destroyable'+gameValues.currentWorld.toString()+'.png',16,16);
        this.load.spritesheet('iman','img/iman.png',16,16);
        this.load.spritesheet('upgrade','img/Upgrades_Bomberman.png', 16, 16);
        this.load.spritesheet('win_button', 'img/Victory_Button'+ gameValues.currentWorld.toString() +'.png', 16, 16);
        this.load.spritesheet('door', 'img/Bomberman_Gate'+ gameValues.currentWorld.toString() +'.png', 32, 32);
        
        //mapa
        
        
        this.load.tilemap('level','maps/lvl'+ gameValues.currentWorld.toString() +'-'+ 
        gameValues.currentLevel.toString()+'.json', null, Phaser.Tilemap.TILED_JSON);
        this.load.image('world','img/world'+ gameValues.currentWorld.toString() +'.png');
        
        //HUD
        this.load.image('hud', 'img/hud1.png');
    
        
        this.hasWon = false;
        this.powerUp = 0;
        
        this.load.audio('Lvl1_music', 'sound/Lvl1_soundtrack.mp3');
        
    },
    
    create:function(){
        
        //mapa
        this.map=this.game.add.tilemap('level');
        this.map.addTilesetImage('world');
        
        this.walls=this.map.createLayer('ObjetosSolidos');
        this.bg=this.map.createLayer('BackgroundStatic');
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
        this.numBtnToActivate;
         this.createBotones(this);
        
        //COLLISIONS
        this.map.setCollisionBetween(1,300,true, 'ObjetosSolidos');

        //Bombas
        this.bombas=this.game.add.group();
        
        //explosiones
        this.explosions=this.game.add.group();
        
        //Upgrades
        this.upgrades=this.game.add.group();
        //console.log(this.gridSolidObjects);
        
        //Door
  
        
        //INPUTS
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        //CHARACTERS & Enemies
        
        this.createCharacters(this);
        
        //CAMERA
        //console.log(this.map.widthInPixels);
        this.game.world.setBounds(0,0,this.map.widthInPixels,this.map.heightInPixels);
        this.game.camera.follow(this.player);
        if(this.map.widthInPixels<gameValues.gameWidth && this.map.heightInPixels<gameValues.gameHeight){
            this.scale.setGameSize(this.map.widthInPixels,this.map.heightInPixels);
        }
        else if(this.map.widthInPixels<gameValues.gameWidth){
            this.scale.setGameSize(this.map.widthInPixels,gameValues.gameHeight);
        }
        else if(this.map.heightInPixels<gameValues.gameHeight){
            this.scale.setGameSize(gameValues.gameWidth,this.map.heightInPixels);
        }
        
        this.game.camera.deadzone=new Phaser.Rectangle(5*this.map.tileWidth,6*this.map.tileHeight,this.game.width-10*this.map.tileWidth,this.game.height-10*this.map.tileHeight);
        
        //HUD
        this.hud = this.game.add.image(0,0, 'hud');
        this.style = {
            font: "16px Arial",
            fill: "#fff",
            align: "center",
        };
        this.hud.fixedToCamera=true;
            //---score----//
        this.textScore = this.game.add.text(50, 3, gameValues.score, this.style);
        this.textScore.fixedToCamera=true;
            //---timer----//
        this.textTimer = this.game.add.text(160, 3, "2:00", this.style);
        this.textTimer.fixedToCamera=true;
        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTimer, this);
        this.seconds = 0;
        this.minuts = 4;
            //--lives----//
        this.textLives = this.game.add.text(235, 3, this.player.lives, this.style);
        this.textLives.fixedToCamera=true;
            //---numbBombs----//
        this.textNumBombs = this.game.add.text(270,3, gameValues.bombsQuantity, this.style);
        this.textNumBombs.fixedToCamera=true;
            //---range----//
        this.textRange = this.game.add.text(300, 3, gameValues.bombRange, this.style);
        this.textRange.fixedToCamera=true;
        
        //MUSIC
        lvlMusic = this.add.audio('Lvl1_music');
        lvlMusic.play();
        lvlMusic.loop = true;
        
        
    },
    /*render:function(){
        var zone=this.game.camera.deadzone;
        //console.log(this.game.camera);
        
        this.game.context.fillStyle = 'rgba(255,0,0,0.6)';
        this.game.context.fillRect(zone.x, zone.y, zone.width, zone.height);
    },*/
    update:function(){
        this.game.debug.body(this.player);
        this.physics.arcade.overlap(this.destruibles,this.explosions,this.choquemuro,null,this);
        this.physics.arcade.collide(this.imanes,this.player);
        this.physics.arcade.overlap(this.botones,this.explosions,this.activarBoton,null,this);
        
        this.physics.arcade.overlap(this.upgrades,this.player,this.cogerUpgrade,null,this);
        
        
        this.physics.arcade.collide(this.destruibles,this.bombas);
        this.physics.arcade.collide(this.imanes,this.bombas);
        this.physics.arcade.collide(this.walls,this.bombas);
        //this.game.physics.arcade.overlap(this.door,this.player,this.goToNextLevel);
        
        
        
        
       // this.walls.
        /*
        for(var i=0;i<this.gridSolidObjects.length;i++){
            for(var j=0;j<this.gridSolidObjects[i].length;j++){
                if(this.gridSolidObjects[i][j]==1)
                   this.game.debug.pixel(i*16+8,j*16+8, 'rgba(255,0,0,1)');
            }
        }
        
        this.destruibles.forEach(function(member){
            this.game.debug.pixel(this.bg.getTileX(member.body.x)*16+8,this.bg.getTileY(member.body.y)*16+8,'rgba(255,255,0,1)');
        },this)*/

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
           item=new bomberman.imanPrefab(state.game,element.x,element.y,0,_this);
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
        this.numBtnToActivate=0;
        
        objArray.forEach(function(element){
            item = new bomberman.win_buttons_prefab(state.game,element.x, element.y,_this);
            state.botones.add(item);
            _this.numBtnToActivate++;
        });
    },
    createCharacters:function(state){
        var _this=this;
        this.enemys=this.game.add.group();
        var objArray=this.findObjectsByIdRange(131,134,this.map,'Characters');
        var item;
        
        objArray.forEach(function(element){
                switch(element.gid){
            case 132:
                item=new bomberman.puffPuff(state.game,element.x,element.y,20,'down',_this);
                state.enemys.add(item);
                break;
            case 131:
                item = new bomberman.bomberman_prefab(state.game, element.x,element.y, _this);
                state.player=item;
                state.game.add.existing(state.player);
                break;
            case 133:
                state.door = new bomberman.door_prefab(state.game,element.x+8, element.y-9, _this);
                state.game.add.existing(state.door);
                break;
            default:
                break;
                }
        });
        
    },
    findObjectsById:function(id,map,layer){
        var result=new Array();
        map.objects[layer].forEach(function(element){
           if(element.gid==id){
               element.y-=(map.tileHeight/2);
               element.x+=map.tileWidth/2;
               result.push(element);
           } 
        });
        return result;
    },
    findObjectsByIdRange:function(id1,id2,map,layer){
        var result=new Array();
        //console.log(map);
        map.objects[layer].forEach(function(element){
           // console.log(element);
           if(element.gid>=id1 && element.gid<=id2){
               element.y-=(map.tileHeight/2);
               element.x+=map.tileWidth/2;
               result.push(element);
           } 
        });
        return result;
    },
    checkVictory:function(){
        var won=true;
        for(var i=0;i<this.enemys.children.length;i++){
       // console.log(this.enemys.children[i].alive);
            if(this.enemys.children[i].alive)
                won=false;
        }
        //console.log(this.numBtnToActivate);
        if(this.numBtnToActivate==0 && won){
            this.door.activate();
        }
    },
    choquemuro:function(muro,explosion){
        //console.log(muro);
        muro.breakBlock();
        explosion.kill();
        //console.log(this.destruibles);
    },
    activarBoton:function(boton){
        if(!boton.isActivated){
        boton.activate();  
        this.checkVictory();
        }
    },
    cogerUpgrade:function(player,upgrade){
        //console.log(player);
        player.upgradeBomb(upgrade.upType);
        upgrade.destroy();
    },
    goToNextLevel:function(){
        gameValues.currentLevel++;
        
        bomberman.loadScene('transScene');
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
    
    renderNumBobs:function(){
        this.textNumBombs.setText(gameValues.bombsQuantity);
    },

}