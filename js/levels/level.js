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
        this.load.spritesheet('moai', 'img/moai.png', 16, 34);
        this.load.spritesheet('magnetHelm', 'img/magnetic_helm.png', 32, 32);
        this.load.spritesheet('bomb', 'img/bomb.png', 16, 16);
        this.load.spritesheet('ramosu', 'img/ramosu.png', 16, 32);
        this.load.spritesheet('gurorin', 'img/gurorin.png', 16,16);
        this.load.spritesheet('explosions', 'img/explosion.png', 16, 16);
        this.load.spritesheet('destruible','img/wall_destroyable'+gameValues.currentWorld.toString()+'.png',16,16);
        this.load.spritesheet('iman','img/iman.png',16,16);
        this.load.spritesheet('dynamite',  'img/dynamite.png', 16, 16);
        this.load.spritesheet('potenciador', 'img/potenciador.png', 16, 16);
        this.load.spritesheet('upgrade','img/Upgrades_Bomberman.png', 16, 16);
        this.load.spritesheet('win_button', 'img/Victory_Button'+ gameValues.currentWorld.toString() +'.png', 16, 16);
        this.load.spritesheet('door', 'img/Bomberman_Gate'+ gameValues.currentWorld.toString() +'.png', 32, 32);
        this.load.spritesheet('fiber', 'img/fiber.png', 24, 24);
        this.load.spritesheet('bodyBoss1', 'img/bodyBoss.png', 89, 96);
        this.load.spritesheet('armBossRight', 'img/armRight.png', 28, 138);
        this.load.spritesheet('armBossLeft', 'img/armLeft.png', 28, 138);
        this.load.spritesheet('boss2', 'img/boss2.png', 93, 86);
        this.load.spritesheet('boss2Attack', 'img/Marca_Boss2.png',16,16);
        
        
        //mapa
        this.load.tilemap('level','maps/lvl'+ gameValues.currentWorld.toString() +'-'+ 
        gameValues.currentLevel.toString()+'.json', null, Phaser.Tilemap.TILED_JSON);
        if(gameValues.currentLevel == 4){
            this.load.image('world','img/Bossmap1.png');   
        }
        else{
            this.load.image('world','img/world'+ gameValues.currentWorld.toString() +'.png');
        }
        
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
        
        //dinamitas
        this.createDinamitas(this);
        
        //botones
        this.numBtnToActivate;
         this.createBotones(this);
        
        //potenciador
        this.createPotenciador(this);
        
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
        this.enemys=this.game.add.group();
        this.createEnemies(this);        
        
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
        this.physics.arcade.overlap(this.destruibles,this.explosions,this.choquemuro,null,this);
        this.physics.arcade.collide(this.imanes,this.player);
         this.physics.arcade.collide(this.dynamites,this.player);
        this.physics.arcade.overlap(this.botones,this.explosions,this.activarBoton,null,this);
        this.physics.arcade.overlap(this.door,this.explosions,this.reCreateEnemies.bind(this));
        
        this.physics.arcade.overlap(this.upgrades,this.player,this.cogerUpgrade,null,this);
        
        this.physics.arcade.collide(this.destruibles,this.bombas);
        this.physics.arcade.collide(this.imanes,this.bombas);
        this.physics.arcade.collide(this.dynamites, this.bombas);//DINAMITA
        
        this.physics.arcade.collide(this.walls,this.bombas);
        this.physics.arcade.collide(this.bombas);
        this.game.physics.arcade.overlap(this.bombas,this.explosions, this.explodeBomb, null,this);
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
        var objArray=this.findObjectsByIdRange(92,95,this.map,'Interactuables');
        var item
        //arriba
        objArray.forEach(function(element){
            switch(element.gid){
                case 92:
                    item=new bomberman.imanPrefab(state.game,element.x,element.y,0,_this);
                    state.imanes.add(item);
                    _this.gridSolidObjects[_this.bg.getTileX(element.x)][_this.bg.getTileY(element.y)]=1;
                    break;
                case 93: 
                     item=new bomberman.imanPrefab(state.game,element.x,element.y,1,_this);
                    state.imanes.add(item);
                    _this.gridSolidObjects[_this.bg.getTileX(element.x)][_this.bg.getTileY(element.y)]=1;
                    break;
                case 94: 
                     item=new bomberman.imanPrefab(state.game,element.x,element.y,2,_this);
                    state.imanes.add(item);
                    _this.gridSolidObjects[_this.bg.getTileX(element.x)][_this.bg.getTileY(element.y)]=1;
                case 95:
                     item=new bomberman.imanPrefab(state.game,element.x,element.y,3,_this);
                    state.imanes.add(item);
                    _this.gridSolidObjects[_this.bg.getTileX(element.x)][_this.bg.getTileY(element.y)]=1;
            }
           
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
        var objArray = this.findObjectsById(99,this.map,'Interactuables');
        var item;
        this.numBtnToActivate=0;
        
        objArray.forEach(function(element){
            item = new bomberman.win_buttons_prefab(state.game,element.x, element.y,_this);
            state.botones.add(item);
            _this.numBtnToActivate++;
        });
    },
    
    createDinamitas:function(state){
        var _this = this;
        this.dynamites = this.game.add.group();
        var objArray = this.findObjectsById(96, this.map, 'Interactuables');
        var item;
        
        objArray.forEach(function(element){
            item = new bomberman.dynamite(state.game, element.x, element.y,_this);
            state.dynamites.add(item);
           // _this.gridSolidObjects[_this.bg.getTileX(element.x)][_this.bg.getTileY(element.y)]=1;
            
        });
    },
    
    createPotenciador:function(state){
        var _this = this;
        this.potenciadores = this.game.add.group();
        var objectArray = this.findObjectsById(97, this.map, 'Interactuables');
        var item;
        
        objectArray.forEach(function(element){
           item = new bomberman.potenciador(state.game, element.x, element.y,_this);
           state.potenciadores.add(item);    
        });
    },
    
    createCharacters:function(state){
        var _this=this;
        //this.enemys=this.game.add.group();
        var objArray=this.findObjectsByIdRange(131,142,this.map,'Characters');
        var item;
        
        objArray.forEach(function(element){
                switch(element.gid){
            case 131:
                item = new bomberman.bomberman_prefab(state.game, element.x,element.y, _this);
                state.player=item;
                state.game.add.existing(state.player);
                break;
            case 133:
                state.door = new bomberman.door_prefab(state.game,element.x+8, element.y-9, _this);
                state.game.add.existing(state.door);
                break;
            case 141:
                state.door = new bomberman.door_prefab2(state.game,element.x+8, element.y-3, _this);
                state.game.add.existing(state.door);
                break;
 
            default:
                break;
                }
        });
        
    },
    reCreateEnemies:function(door,explosion){
        explosion.kill();
        this.createEnemies(this);
    },
    createEnemies:function(state){
        var _this=state;
        var objArray=state.findObjectsByIdRange(132,145,state.map,'Characters');
        var item;
         objArray.forEach(function(element){
                switch(element.gid){
            case 132:
                item = new bomberman.puffPuff(state.game, element.x, element.y,15, 'right', _this);
                state.enemys.add(item);
                break;
            case 134:
                item = new bomberman.moai(state.game, element.x, element.y, 15, 'right', _this);
                state.enemys.add(item);
                break;
            case 135:
                item= new bomberman.magnetHelm(state.game, element.x, element.y,15,0,_this);
                state.enemys.add(item);
                break;
            case 138:
                item= new bomberman.ramosu(state.game, element.x, element.y, 15, 'right', _this);
                state.enemys.add(item);
                break;
            case 139:
                item = new bomberman.gurorin(state.game, element.x, element.y, 20,'right',_this);
                state.enemys.add(item);
                break;
            case 140:
                item = new bomberman.fiber(state.game, element.x, element.y, 15, 'right', _this);
                state.enemys.add(item);
                break;
            case 144:
                item = new bomberman.boss1(state.game, element.x, element.y, 30, 'right', _this);
                state.enemys.add(item);
                break;
            case 145:
                item = new bomberman.boss2(state.game, element.x, element.y, 30, 'leftDown', _this);
                state.enemys.add(item);
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
               var res={x:0,y:0,gid:0};
               res.gid=element.gid;
               res.y=element.y-(map.tileHeight/2);
               res.x=element.x+map.tileWidth/2;
               result.push(res);
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
               var res={x:0,y:0,gid:0};
               res.gid=element.gid;
                res.y=element.y-(map.tileHeight/2);
               res.x=element.x+map.tileWidth/2;
               result.push(res);
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
        
        if(gameValues.currentLevel!=4){
            if(this.numBtnToActivate==0 && won){
                this.door.activate();
            }
        }
        else{
            if(won)
                this.player.winLevel();
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
    explodeBomb:function(bomba,explosion){
        explosion.kill();
        bomba.explosion();
    },
    cogerUpgrade:function(player,upgrade){
        //console.log(player);
        player.upgradeBomb(upgrade.upType);
        upgrade.destroy();
    },
    goToNextLevel:function(){
        gameValues.currentLevel++;
        lvlMusic.stop();
        
        if(gameValues.currentLevel>4){
            gameValues.currentLevel=1;
            gameValues.currentWorld++;
            lvlMusic.stop();
        }
           
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