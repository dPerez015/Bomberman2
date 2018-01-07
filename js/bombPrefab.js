var bomberman = bomberman || {};

bomberman.bombPrefab = function (game, x, y, range, level){
    Phaser.Sprite.call(this, game,x,y,'bomb');
    game.add.existing(this);
    
    
    this.anchor.setTo(.5);
    this.anim=this.animations.add('stand', [0,1,2,3], 1, false);
    
    this.player=level.player;
    this.level=level;
    this.range = range;
   // console.log(range);
    this.game = game;
   // this.timing = timing;

    this.game.physics.arcade.enable(this);
    this.isExploding = false;
    
    this.animations.play('stand');
    this.bombReset=function(x,y,range){
        this.range=range;
         //checkear los imanes
        this.reset(x,y);
        this.level.imanes.forEach(function(iman){
            iman.checkBomb(this);
        },this);
        this.animations.stop();
        
    }
    this.generateExplosion = function(x,y,type){
         var explosion=this.level.explosions.getFirstExists(false);
        if(!explosion){
           explosion = new bomberman.explosion_prefab(this.game,x,y,type);
            //explosion=new bomberman.explosion_prefab(this.game,16,16,0);
            this.level.explosions.add(explosion);
        }
        else{
            explosion.resetExplosion(x,y,type);
        }
    };
    this.explosion= function(){
       // console.log(this.body.immovable);
        this.isExploding = false;
        //le devolvemos la bomba al jugador
        this.player.numBombas++;
        
        //colocamos esta bomba en el centro de un cuadrado
        this.body.position.x=this.level.bg.getTileX(this.body.position.x)*this.level.map.tileWidth;
        this.body.position.y=this.level.bg.getTileY(this.body.position.y)*this.level.map.tileHeight;
        //explosion centro
        this.generateExplosion(this.body.position.x,this.body.position.y,0)
        //explosiones del medio
        var canGoRight=true;
        var canGoLeft=true;
        var canGoUp=true;
        var canGoDown=true;
        var i=1;
        while(i<this.range){
         //arriba
            if(canGoUp){
             //   console.log(this.level);
                if(this.level.map.getTile(this.body.position.x/16,(this.body.position.y/16)-i,this.level.walls)==null ){
                    if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)-i]!=1)
                        this.generateExplosion(this.body.position.x,this.body.position.y-(16*i),5);
                    else{
                        this.generateExplosion(this.body.position.x,this.body.position.y-(16*i),5);
                        canGoUp=false;
                    }
                } 
                else{
                    canGoUp=false;
                }
            }
        //Derecha
            if(canGoRight){
                 if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16),this.level.walls)==null){
                     if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+i][this.level.bg.getTileY(this.body.y)]!=1)
                        this.generateExplosion(this.body.position.x+(16*i),this.body.position.y,6);
                     else{
                         this.generateExplosion(this.body.position.x+(16*i),this.body.position.y,6);
                        canGoRight=false;
                     }
                }
                else{
                    canGoRight=false;
                }
            }
        //Izquierda
            if(canGoLeft){
                 if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16),this.level.walls)==null){
                     if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-i][this.level.bg.getTileY(this.body.y)]!=1)
                         this.generateExplosion(this.body.position.x-(16*i),this.body.position.y,6);
                      else{
                        this.generateExplosion(this.body.position.x-(16*i),this.body.position.y,6);
                        canGoLeft=false;
                     }
                }
                else{
                    canGoLeft=false;
                }
            }
        //abajo
            if(canGoDown){
                 if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)+i,this.level.walls)==null){ 
                     if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)+i]!=1)
                         this.generateExplosion(this.body.position.x,this.body.position.y+(16*i),5);
                     else{
                         this.generateExplosion(this.body.position.x,this.body.position.y+(16*i),5);
                         canGoDown=false;
                     }
                }
                else{
                    canGoDown=false;
                }
            }
            i++;
        }

        //explosiones final
        //arriba
            if(canGoUp){
                if(this.level.map.getTile(this.body.position.x/16,(this.body.position.y/16)-i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x,this.body.position.y-(16*i),1);
                } 
            }
        //Derecha
            if(canGoRight){
                 if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16),this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*i),this.body.position.y,4);
                }
            }
        //Izquierda
            if(canGoLeft){
                 if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16),this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*i),this.body.position.y,3);
                }
            }
        //abajo
            if(canGoDown){
                 if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)+i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x,this.body.position.y+(16*i),2);
                }
            }


        this.kill();
    };

    this.anim.onComplete.add(this.explosion.bind(this),level)
    
    //checkear los imanes
    this.level.imanes.forEach(function(iman){
        iman.checkBomb(this);
    },this);
    
    //check potenciador
    this.potenciador=function(){
        var bomb = this;
        this.level.potenciadores.forEach(function(potenciador){
            if(bomb.body.x == potenciador.body.x && bomb.body.y == potenciador.body.y){
            var tmp = bomb.range;
            bomb.range = 10;
            }
            
        });


   };

};

bomberman.bombPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bombPrefab.prototype.constructor = bomberman.bombPrefab;



bomberman.bombPrefab.prototype.update = function (){
   // this.game.physics.arcade.overlap(this,this.level.explosions, this.explosion, null,this);
    this.potenciador();
};

