var bomberman = bomberman || {};

bomberman.Boss_AttackPrefab = function(game, x, y, level){
    Phaser.Sprite.call(this,game,x,y,'boss2Attack');
    this.anchor.setTo(.5);
    
    this.animations.add('pointAttack',[0,1],10, false);
    
    this.level = level;
    this.range = 9;
    this.game.physics.arcade.enable(this);
    this.isExploding = false;
    
    this.animations.play('pointAttack');
    
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
}

bomberman.Boss_AttackPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.Boss_AttackPrefab.prototype.constructor = bomberman.Boss_AttackPrefab;