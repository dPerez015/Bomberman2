var bomberman = bomberman || {};

bomberman.dynamite = function (game, x, y, level){
    Phaser.Sprite.call(this, game,x,y,'dynamite');
    game.add.existing(this);
    this.anchor.setTo(.5);
    this.level=level;
    this.range = 2;
   // console.log(range);
    this.game = game;
    this.game.physics.arcade.enable(this);
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
        this.generateExplosion(this.body.position.x,this.body.position.y,0)
        var canGoRight=true;
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
                     if(i == 2 && this.isExpanded == false){
                        /* if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16), this.level.walls)==null)
                             if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)+2][this.level.bg.getTileY(this.body.y)]!=1)*/
                        this.generateExplosion(this.body.position.x(16*i),this.body.position.y, 0);
                         this.isExpanded = true;
                         //copiar el codi
                         var j = 1;
                         while(j < this.range){
                             if(canGoRight){
                               if(this.level.map.getTile((this.body.position.x/16)+i+j, (this.body.position.y/16), this.level.walls)==null){
                                   //if(this.level.gridSolidObjects[this.level.bg.getTileX(this.body)])
                               }  
                             }
                         }
                     }
                }
                else{
                    canGoRight=false;
                }

            }
            //izquierda
        i++;
        }
        //explosiones final
        if(canGoRight){
            if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16),this.level.walls)==null){
            this.generateExplosion(this.body.position.x+(16*i),this.body.position.y,4);
                }
            }
    }
    
    this.kill();
};

bomberman.dynamite.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.dynamite.prototype.constructor = bomberman.dynamite;



bomberman.dynamite.prototype.update = function (){
    this.game.physics.arcade.overlap(this,this.level.explosions, this.explosion, null,this);
};
