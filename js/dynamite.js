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
        var i = 1;
        while(i < this.range){
            //Derecha
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
        var RightExpansionCanGoUp=true;
        var RightExpansionCanGoRight=true;
        var RightExpansionCanGoDown=true;
                        this.generateExplosion(this.body.position.x+(16*i),this.body.position.y, 0);
                         var j = 1;
                         while(j < 2){
                             //dreta expansio
                            if(RightExpansionCanGoRight){
                            if(this.level.map.getTile((this.body.position.x/16)+i+j,(this.body.position.y/16),this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+i+j][this.level.bg.getTileY(this.body.y)]!=1)
                            this.generateExplosion(this.body.position.x+(16*(i+j)),this.body.position.y,6);
                        else{
                            this.generateExplosion(this.body.position.x+(16*(i+j)),this.body.position.y,6);
                        RightExpansionCanGoRight=false;
                                            }
                                 }else {RightExpansionCanGoRight = false;}                      
                             }
                             //amunt expansio
                             if(RightExpansionCanGoUp){
                            if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16)-j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+i][this.level.bg.getTileY(this.body.y)-j]!=1)
                            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y-(16*j),5);
                        else{
                            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y-(16*j),5);
                        RightExpansionCanGoUp=false;
                                            }
                                 }else {RightExpansionCanGoUp = false;}                      
                             }
                             //down expansio
                             if(RightExpansionCanGoDown){
                            if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16)+j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+i][this.level.bg.getTileY(this.body.y)+j]!=1)
                            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y+(16*j),5);
                        else{
                            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y+(16*j),5);
                        RightExpansionCanGoDown=false;
                                            }
                                 }else {RightExpansionCanGoDown = false;}                      
                             }
                             j++;
                         
                     }//tanca el segon while
                    if(RightExpansionCanGoRight){
                    if(this.level.map.getTile((this.body.position.x/16)+(i+j),(this.body.position.y/16),this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*(i+j)),this.body.position.y,4);}
                    }
                    if(RightExpansionCanGoUp){
                    if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16)-j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*i),this.body.position.y-(16*j),1);}
                    }
                    if(RightExpansionCanGoDown){
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
        var LeftExpansionCanGoUp=true;
        var LeftExpansionCanGoLeft=true;
        var LeftExpansionCanGoDown=true;
                        this.generateExplosion(this.body.position.x-(16*i),this.body.position.y, 0);
                         var j = 1;
                         while(j < 2){
                             //esqerra expansio
                            if(LeftExpansionCanGoLeft){
                            if(this.level.map.getTile((this.body.position.x/16)-i-j,(this.body.position.y/16),this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-i-j][this.level.bg.getTileY(this.body.y)]!=1)
                            this.generateExplosion(this.body.position.x-(16*(i+j)),this.body.position.y,6);
                        else{
                            this.generateExplosion(this.body.position.x-(16*(i+j)),this.body.position.y,6);
                        LeftExpansionCanGoLeft=false;
                                            }
                                 }else {LeftExpansionCanGoLeft = false;}                      
                             }
                             //amunt expansio
                             if(LeftExpansionCanGoUp){
                            if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16)-j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-i][this.level.bg.getTileY(this.body.y)-j]!=1)
                            this.generateExplosion(this.body.position.x-(16*i),this.body.position.y-(16*j),5);
                        else{
                            this.generateExplosion(this.body.position.x-(16*i),this.body.position.y-(16*j),5);
                        LeftExpansionCanGoUp=false;
                                            }
                                 }else {LeftExpansionCanGoUp = false;}                      
                             }
                             //down expansio
                             if(LeftExpansionCanGoDown){
                            if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16)+j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-i][this.level.bg.getTileY(this.body.y)+j]!=1)
                            this.generateExplosion(this.body.position.x-(16*i),this.body.position.y+(16*j),5);
                        else{
                            this.generateExplosion(this.body.position.x-(16*i),this.body.position.y+(16*j),5);
                        LeftExpansionCanGoDown=false;
                                            }
                                 }else {LeftExpansionCanGoDown = false;}                      
                             }
                             j++;
                         
                     }//tanca el segon while
                    if(LeftExpansionCanGoLeft){
                    if(this.level.map.getTile((this.body.position.x/16)-(i+j),(this.body.position.y/16),this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*(i+j)),this.body.position.y,3);}
                    }
                    if(LeftExpansionCanGoUp){
                    if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16)-j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*i),this.body.position.y-(16*j),1);}
                    }
                    if(LeftExpansionCanGoDown){
                    if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16)+j,this.level.walls)==null){
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
            var UpExpansionCanGoUp = true;
            var UpExpansionCanGoLeft = true;
            var UpExpansionCanGoRight = true;
                        this.generateExplosion(this.body.position.x,this.body.position.y-(16*i), 0);
                         var j = 1;
                         while(j < 2){
                             //dreta expansio
                            if(UpExpansionCanGoUp){
                            if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)-i-j,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)-i-j]!=1)
                            this.generateExplosion(this.body.position.x,this.body.position.y-(16*(i+j)),5);
                        else{
                            this.generateExplosion(this.body.position.x,this.body.position.y-(16*(i+j)),5);
                        UpExpansionCanGoUp=false;
                                            }
                                 }else {UpExpansionCanGoUp = false;}                      
                             }
                             //rigt expansio
                             if(UpExpansionCanGoRight){
                            if(this.level.map.getTile((this.body.position.x/16)+j,(this.body.position.y/16)-i,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+j][this.level.bg.getTileY(this.body.y)-i]!=1)
                            this.generateExplosion(this.body.position.x+(16*j),this.body.position.y-(16*i),6);
                        else{
                            this.generateExplosion(this.body.position.x+(16*j),this.body.position.y-(16*i),6);
                        UpExpansionCanGoRight=false;
                                            }
                                 }else {UpExpansionCanGoRight = false;}                      
                             }
                             //left expansio
                             if(UpExpansionCanGoLeft){
                            if(this.level.map.getTile((this.body.position.x/16)-j,(this.body.position.y/16)-i,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-j][this.level.bg.getTileY(this.body.y)-i]!=1)
                            this.generateExplosion(this.body.position.x-(16*j),this.body.position.y-(16*i),6);
                        else{
                            this.generateExplosion(this.body.position.x-(16*j),this.body.position.y-(16*i),6);
                        UpExpansionCanGoLeft=false;
                                            }
                                 }else {UpExpansionCanGoLeft = false;}                      
                             }
                             j++;
                         
                     }//tanca el segon while
                    if(UpExpansionCanGoRight){
                    if(this.level.map.getTile((this.body.position.x/16)+j,(this.body.position.y/16)-i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*j),this.body.position.y-(16*i),4);}
                    }
                    if(UpExpansionCanGoUp){
                    if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)-i-j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x,this.body.position.y-(16*(i+j)),1);}
                    }
                    if(UpExpansionCanGoLeft){
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
        var DownExpansionCanGoRight=true;
        var DownExpansionCanGoLeft=true;
        var DownExpansionCanGoDown=true;
                        this.generateExplosion(this.body.position.x,this.body.position.y+(16*i), 0);
                         var j = 1;
                         while(j < 2){
                             //dreta expansio
                            if(DownExpansionCanGoDown){
                            if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)+i+j,this.level.walls)==null){
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)+i+j]!=1)
                            this.generateExplosion(this.body.position.x,this.body.position.y+(16*(i+j)),5);
                        else{
                            this.generateExplosion(this.body.position.x,this.body.position.y+(16*(i+j)),5);
                        DownExpansionCanGoDown=false;
                                            }
                                 }else {DownExpansionCanGoDown = false;}                      
                             }
                             //amunt expansio
                             if(DownExpansionCanGoRight){
                            if(this.level.map.getTile((this.body.position.x/16)+j,(this.body.position.y/16)+i,this.level.walls)==null){
                            
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+j][this.level.bg.getTileY(this.body.y)+i]!=1)
                            this.generateExplosion(this.body.position.x+(16*j),this.body.position.y+(16*i),6);
                        else{
                            this.generateExplosion(this.body.position.x+(16*j),this.body.position.y+(16*i),6);
                        DownExpansionCanGoRight=false;
                                            }
                                 }else {DownExpansionCanGoRight = false;}                      
                             }
                             //left expansio
                             if(DownExpansionCanGoLeft){
                            if(this.level.map.getTile((this.body.position.x/16)-j,(this.body.position.y/16)+i,this.level.walls)==null){
                            if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)-j][this.level.bg.getTileY(this.body.y)+i]!=1)
                            this.generateExplosion(this.body.position.x-(16*j),this.body.position.y+(16*i),6);
                        else{
                            this.generateExplosion(this.body.position.x-(16*j),this.body.position.y+(16*i),6);
                        DownExpansionCanGoLeft=false;
                                            }
                                 }else {DownExpansionCanGoLeft = false;}                      
                             }
                             j++;
                         
                     }//tanca el segon while
                    if(DownExpansionCanGoRight){
                    if(this.level.map.getTile((this.body.position.x/16)+j,(this.body.position.y/16)+i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x+(16*j),this.body.position.y+(16*i),4);}
                    }
                    if(DownExpansionCanGoDown){
                    if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)+i+j,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x,this.body.position.y+(16*(i+j)),2);}
                    }
                    if(DownExpansionCanGoLeft){
                    if(this.level.map.getTile((this.body.position.x/16)-j,(this.body.position.y/16)+i,this.level.walls)==null){
                    this.generateExplosion(this.body.position.x-(16*j),this.body.position.y+(16*i),3);}
                    }
                    }//tanca la expansio de la dinamita if(rang = 2)
                 }
                else{
                    canGoDown=false;
                }
        
            }
        i++;
        }//tanca el while < range        
    };
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
