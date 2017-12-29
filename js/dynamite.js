var bomberman = bomberman || {};

bomberman.dynamite = function (game, x, y, level){
    Phaser.Sprite.call(this, game,x,y,'dynamite');
    game.add.existing(this);
    this.game.physics.arcade.enable(this);
    this.anchor.setTo(.5);
    this.level=level;
    this.range = 3;
    this.game = game;
    this.isExploding = false;
    this.isExpanded = false;
    
    
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
    
    this.explosion = function(){
        this.isExploding = false;
        this.isExpanded = false;
        this.generateExplosion(this.body.position.x,this.body.position.y,0)
        var canGoRight=true;
        var canGoLeft=true;
        var canGoUp=true;
        var canGoDown=true;
        var canGoExpansionUp=true;
        var canGoExpansionDown=true;
        var canGoExpansionLeft=true;
        var canGoExpansionRight=true;
        var i = 1;
        while(i < this.range){
            //Derecha
            console.log(i);
            if(canGoRight){
                 if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16),this.level.walls)==null){
                     if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+i][this.level.bg.getTileY(this.body.y)]!=1)
                        this.generateExplosion(this.body.position.x+(16*i),this.body.position.y,6);
                     else{
                         this.generateExplosion(this.body.position.x+(16*i),this.body.position.y,6);
                        canGoRight=false;
                     }
                     //expansio dinamita 
                     if(i == 2){
                        this.generateExplosion(this.body.position.x+(16*i),this.body.position.y, 0);
                         var j = 1;
                         while(j < 2){
                             //dreta expansio
                            if(canGoRight){
                            if(this.level.map.getTile((this.body.position.x/16)+i+j,(this.body.position.y/16),this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+i+j][this.level.bg.getTileY(this.body.y)]!=1)
                            this.generateExplosion(this.body.position.x+(16*(i+j)),this.body.position.y,6);
                        else{
                            this.generateExplosion(this.body.position.x+(16*(i+j)),this.body.position.y,6);
                        canGoExpansionRight=false;
                                            }
                                 }else {canGoRight = false;}                      
                             }
                             //amunt expansio
                             if(canGoUp){
                            if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16)-j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+i][this.level.bg.getTileY(this.body.y)-j]!=1)
                            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y-(16*j),5);
                        else{
                            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y-(16*j),5);
                        canGoUp=false;
                                            }
                                 }else {canGoUp = false;}                      
                             }
                             //down expansio
                             if(canGoDown){
                            if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16)+j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+i][this.level.bg.getTileY(this.body.y)+j]!=1)
                            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y+(16*j),5);
                        else{
                            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y+(16*j),5);
                        canGoDown=false;
                                            }
                                 }else {canGoDown = false;}                      
                             }
                             j++;
                         
                     }//tanca el segon while
                    if(canGoRight){
                    if(this.level.map.getTile((this.body.position.x/16)+(i+j),(this.body.position.y/16),this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*(i+j)),this.body.position.y,4);}
                    }
                    if(canGoUp){
                    if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16)-j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*i),this.body.position.y-(16*j),1);}
                    }
                    if(canGoDown){
                    if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16)+j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*i),this.body.position.y+(16*j),2);}
                    }
                    }//tanca la expansio de la dinamita if(rang = 2)
                 }
                else{
                    canGoRight=false;
                }
        
            }//tanca el cangoRight
            //ESQUERRA
            if(canGoLeft){
                 if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16),this.level.walls)==null){
                     if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-i][this.level.bg.getTileY(this.body.y)]!=1)
                        this.generateExplosion(this.body.position.x-(16*i),this.body.position.y,6);
                     else{
                         this.generateExplosion(this.body.position.x-(16*i),this.body.position.y,6);
                        canGoLeft=false;
                     }
                     //expansio dinamita 
                     if(i == 2){
                        this.generateExplosion(this.body.position.x-(16*i),this.body.position.y, 0);
                         var j = 1;
                         while(j < 2){
                             //esqerra expansio
                            if(canGoLeft){
                            if(this.level.map.getTile((this.body.position.x/16)-i-j,(this.body.position.y/16),this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-i-j][this.level.bg.getTileY(this.body.y)]!=1)
                            this.generateExplosion(this.body.position.x-(16*(i+j)),this.body.position.y,6);
                        else{
                            this.generateExplosion(this.body.position.x-(16*(i+j)),this.body.position.y,6);
                        canGoLeft=false;
                                            }
                                 }else {canGoLeft = false;}                      
                             }
                             //amunt expansio
                             if(canGoUp){
                            if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16)-j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-i][this.level.bg.getTileY(this.body.y)-j]!=1)
                            this.generateExplosion(this.body.position.x-(16*i),this.body.position.y-(16*j),5);
                        else{
                            this.generateExplosion(this.body.position.x-(16*i),this.body.position.y-(16*j),5);
                        canGoUp=false;
                                            }
                                 }else {canGoUp = false;}                      
                             }
                             //down expansio
                             if(canGoDown){
                            if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16)+j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-i][this.level.bg.getTileY(this.body.y)+j]!=1)
                            this.generateExplosion(this.body.position.x-(16*i),this.body.position.y+(16*j),5);
                        else{
                            this.generateExplosion(this.body.position.x-(16*i),this.body.position.y+(16*j),5);
                        canGoDown=false;
                                            }
                                 }else {canGoDown = false;}                      
                             }
                             j++;
                         
                     }//tanca el segon while
                    if(canGoLeft){
                    if(this.level.map.getTile((this.body.position.x/16)-(i+j),(this.body.position.y/16),this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*(i+j)),this.body.position.y,3);}
                    }
                    if(canGoUp){
                    if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16)-j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*i),this.body.position.y-(16*j),1);}
                    }
                    if(canGoDown){
                    if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16)+j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*i),this.body.position.y+(16*j),2);}
                    }
                    }//tanca la expansio de la dinamita if(rang = 2)
                 }
                else{
                    canGoLeft=false;
                }
        
            }//tanco can go Right
            //UP
            if(canGoUp){
                 if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)-i,this.level.walls)==null){
                     if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)-i]!=1)
                        this.generateExplosion(this.body.position.x,this.body.position.y-(16*i),5);
                     else{
                         this.generateExplosion(this.body.position.x,this.body.position.y-(16*i),5);
                        canGoUp=false;
                     }
                     //expansio dinamita 
                     if(i == 2){
                        this.generateExplosion(this.body.position.x,this.body.position.y-(16*i), 0);
                         var j = 1;
                         while(j < 2){
                             //dreta expansio
                            if(canGoUp){
                            if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)-i-j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)-i-j]!=1)
                            this.generateExplosion(this.body.position.x,this.body.position.y-(16*(i+j)),5);
                        else{
                            this.generateExplosion(this.body.position.x,this.body.position.y-(16*(i+j)),5);
                        canGoUp=false;
                                            }
                                 }else {canGoUp = false;}                      
                             }
                             //amunt expansio
                             if(canGoRight){
                            if(this.level.map.getTile((this.body.position.x/16)+j,(this.body.position.y/16)-i,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+j][this.level.bg.getTileY(this.body.y)-i]!=1)
                            this.generateExplosion(this.body.position.x+(16*j),this.body.position.y-(16*i),6);
                        else{
                            this.generateExplosion(this.body.position.x+(16*j),this.body.position.y-(16*i),6);
                        canGoRight=false;
                                            }
                                 }else {canGoRight = false;}                      
                             }
                             //down expansio
                             if(canGoLeft){
                            if(this.level.map.getTile((this.body.position.x/16)-j,(this.body.position.y/16)-i,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-j][this.level.bg.getTileY(this.body.y)-i]!=1)
                            this.generateExplosion(this.body.position.x-(16*j),this.body.position.y-(16*i),6);
                        else{
                            this.generateExplosion(this.body.position.x-(16*j),this.body.position.y-(16*i),6);
                        canGoLeft=false;
                                            }
                                 }else {canGoLeft = false;}                      
                             }
                             j++;
                         
                     }//tanca el segon while
                    if(canGoRight){
                    if(this.level.map.getTile((this.body.position.x/16)+j,(this.body.position.y/16)-i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*j),this.body.position.y-(16*i),4);}
                    }
                    if(canGoUp){
                    if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)-i-j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x,this.body.position.y-(16*(i+j)),1);}
                    }
                    if(canGoLeft){
                    if(this.level.map.getTile((this.body.position.x/16)-j,(this.body.position.y/16)-i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*j),this.body.position.y-(16*i),3);}
                    }
                    }//tanca la expansio de la dinamita if(rang = 2)
                 }
                else{
                    canGoUp=false;
                }
        
            }
            //DOWN
            if(canGoDown){
                 if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)+i,this.level.walls)==null){
                     if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)+i]!=1)
                        this.generateExplosion(this.body.position.x,this.body.position.y+(16*i),5);
                     else{
                         this.generateExplosion(this.body.position.x,this.body.position.y+(16*i),5);
                        canGoDown=false;
                     }
                     //expansio dinamita 
                     if(i == 2){
                        this.generateExplosion(this.body.position.x,this.body.position.y+(16*i), 0);
                         var j = 1;
                         while(j < 2){
                             //dreta expansio
                            if(canGoDown){
                            if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)+i+j,this.level.walls)==null){
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)+i+j]!=1)
                            this.generateExplosion(this.body.position.x,this.body.position.y+(16*(i+j)),5);
                        else{
                            this.generateExplosion(this.body.position.x,this.body.position.y+(16*(i+j)),5);
                        canGoDown=false;
                                            }
                                 }else {canGoDown = false;}                      
                             }
                             //amunt expansio
                             if(canGoRight){
                            if(this.level.map.getTile((this.body.position.x/16)+j,(this.body.position.y/16)+i,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+j][this.level.bg.getTileY(this.body.y)+i]!=1)
                            this.generateExplosion(this.body.position.x+(16*j),this.body.position.y+(16*i),6);
                        else{
                            this.generateExplosion(this.body.position.x+(16*j),this.body.position.y+(16*i),6);
                        canGoRight=false;
                                            }
                                 }else {canGoRight = false;}                      
                             }
                             //down expansio
                             if(canGoLeft){
                            if(this.level.map.getTile((this.body.position.x/16)-j,(this.body.position.y/16)+i,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-j][this.level.bg.getTileY(this.body.y)+i]!=1)
                            this.generateExplosion(this.body.position.x-(16*j),this.body.position.y+(16*i),6);
                        else{
                            this.generateExplosion(this.body.position.x-(16*j),this.body.position.y+(16*i),6);
                        canGoLeft=false;
                                            }
                                 }else {canGoLeft = false;}                      
                             }
                             j++;
                         
                     }//tanca el segon while
                    if(canGoRight){
                    if(this.level.map.getTile((this.body.position.x/16)+j,(this.body.position.y/16)+i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*j),this.body.position.y+(16*i),4);}
                    }
                    if(canGoDown){
                    if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)+i+j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x,this.body.position.y+(16*(i+j)),2);}
                    }
                    if(canGoLeft){
                    if(this.level.map.getTile((this.body.position.x/16)-j,(this.body.position.y/16)+i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*j),this.body.position.y+(16*i),3);}
                    }
                    }//tanca la expansio de la dinamita if(rang = 2)
                 }
                else{
                    canGoUp=false;
                }
        
            }
        i++;
        }//tanca el while < range        
    };
    console.log("hey");

};

bomberman.dynamite.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.dynamite.prototype.constructor = bomberman.dynamite;



bomberman.dynamite.prototype.update = function (){
    //this.game.physics.arcade.overlap(this,this.level.explosions, this.explosion, null,this);
        if(this.game.physics.arcade.overlap(this,this.level.explosions)){
        this.explosion();
        this.kill();
    }
};
