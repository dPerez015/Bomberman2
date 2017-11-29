var bomberman = bomberman || {};

bomberman.bombPrefab = function (game, x, y, range, level){
    Phaser.Sprite.call(this, game,x,y,'bomb');
    game.add.existing(this);
    
    this.anchor.setTo(.5);
    this.anim=this.animations.add('stand', [0,1,2,3], 1, false);
    this.anim.onComplete.add(this.explosion.bind(this),level);
    this.player=level.player;
    this.level=level;
    this.range = range;
    this.game = game;
   // this.timing = timing;

    this.game.physics.arcade.enable(this);
    this.isExploding = false;
    
    this.animations.play('stand');
};

bomberman.bombPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.bombPrefab.prototype.constructor = bomberman.bombPrefab;


bomberman.bombPrefab.prototype.generateExplosion = function(x,y,type){
     var explosion=this.level.explosions.getFirstExists(false);
    if(!explosion){
       explosion = new bomberman.explosion_prefab(this.game,x,y,type);
        //explosion=new bomberman.explosion_prefab(this.game,16,16,0);
        this.level.explosions.add(explosion);
    }
    else{
        explosion.resetExplosion(x,y,type);
    }
}

bomberman.bombPrefab.prototype.explosion = function(){
    this.isExploding = false;
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
            console.log("caca");
            if(this.level.map.getTile(this.body.position.x/16,(this.body.position.y/16)-i,this.level.walls)==null){
                this.generateExplosion(this.body.position.x,this.body.position.y-(16*i),5);
            } 
            else{
                canGoUp=false;
            }
        }
    //Derecha
        if(canGoRight){
             if(this.level.map.getTile((this.body.position.x/16)+i,(this.body.position.y/16),this.level.walls)==null){
                this.generateExplosion(this.body.position.x+(16*i),this.body.position.y,6);
            }
            else{
                canGoRight=false;
            }
        }
    //Izquierda
        if(canGoLeft){
             if(this.level.map.getTile((this.body.position.x/16)-i,(this.body.position.y/16),this.level.walls)==null){
                this.generateExplosion(this.body.position.x-(16*i),this.body.position.y,6);
            }
            else{
                canGoLeft=false;
            }
        }
    //abajo
        if(canGoDown){
             if(this.level.map.getTile((this.body.position.x/16),(this.body.position.y/16)+i,this.level.walls)==null){
                this.generateExplosion(this.body.position.x,this.body.position.y+(16*i),5);
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

bomberman.bombPrefab.prototype.update = function (){
        //this.game.physics.arcade.overlap(this,this.explosionPrefab, bomberman.bombPrefab.explosion(), null,this);//si isItrigger = true amb lexploid prefab la bomba tambe explota
    
  
    
    
};

