var bomberman=bomberman || {};

bomberman.imanPrefab=function(game,x,y,rot,level){
    Phaser.Sprite.call(this,game,x,y,'iman');
    this.anchor.setTo(.5);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    this.currentRotation=0;
    this.level=level;
    this.explosion=null;
    
    this.checkDistanceBomb=function(bomb,vx,vy){
        var currentX=vx+this.level.bg.getTileX(this.body.x);
        var currentY=vy+this.level.bg.getTileY(this.body.y);
        var bombX=this.level.bg.getTileX(bomb.body.x);
        var bombY=this.level.bg.getTileY(bomb.body.y);
        var canAtract=false;
        var i=1
        while(i<6 && !canAtract){
            if(currentX>=0 && currentX<this.level.gridSolidObjects.length && currentY>=0 && currentY<this.level.gridSolidObjects[currentX].length){
                if(this.level.gridSolidObjects[currentX][currentY]!=1){
                    if(currentX==bombX && currentY==bombY)
                        canAtract=true;
                    else{
                        currentX+=vx;
                        currentY+=vy;
                    }
                }
            }
            i++;
        }
        return canAtract;
    }
    this.checkBombs=function(){
        this.level.bombas.forEach(function(bomb){
            if(this.level.bg.getTileX(bomb.body.position.x) == this.level.bg.getTileX(this.body.position.x)){
                if(this.currentRotation==0){
                    if(this.checkDistanceBomb(bomb,0,-1))
                        this.atract(bomb,0,1);
                }
                else if(this.currentRotation==2){
                    if(this.checkDistanceBomb(bomb,0,1))
                        this.atract(bomb,0,-1);
                }
            }
            if(this.level.bg.getTileY(bomb.body.position.y) == this.level.bg.getTileY(this.body.position.Y)){
                if(this.currentRotation==1){
                    if(this.checkDistanceBomb(bomb,1,0))
                        atract(bomb,-1,0);
                }
                else if(this.currentRotation==3)
                    if(this.checkDistanceBomb(bomb,-1,0))
                        atract(bomb,1,0);
            }
                
        },this);
    }
    this.checkBomb=function(bomb){
        
        if(this.level.bg.getTileX(bomb.body.position.x) == this.level.bg.getTileX(this.body.position.x)){
                if(this.currentRotation==0){
                    if(this.checkDistanceBomb(bomb,0,-1))
                        this.atract(bomb,0,1);
                }
                else if(this.currentRotation==2){
                    if(this.checkDistanceBomb(bomb,0,1))
                        this.atract(bomb,0,-1);
                }
            }
        else if(this.level.bg.getTileY(bomb.body.position.y) == this.level.bg.getTileY(this.body.position.y)){
                if(this.currentRotation==1){
                    if(this.checkDistanceBomb(bomb,1,0))
                        atract(bomb,-1,0);
                }
                else if(this.currentRotation==3)
                    if(this.checkDistanceBomb(bomb,-1,0))
                        atract(bomb,1,0);
            }
                
        
    }
    this.atract=function(bomba,vx,vy){
        bomba.body.immovable=false;
        bomba.body.velocity.x=vx*70;
        bomba.body.velocity.y=vy*70;
    }
    this.rotate=function(iman,explo){
        if(this.explosion==null){
            this.explosion=explo;
            this.currentRotation=(this.currentRotation+1)%4;
            this.animations.frame=this.currentRotation;
            //this.checkBombs();
        }
    };
    this.stopBomb=function(bomb){
        bomb.body.velocity.x=0;
        bomb.body.velocity.y=0;
    };
}
    

bomberman.imanPrefab.prototype=Object.create(Phaser.Sprite.prototype);
bomberman.imanPrefab.prototype.contructor=bomberman.imanPrefab;


bomberman.imanPrefab.prototype.update=function(){
    //this.game.debug.body(this);
    
   // this.game.physics.arcade.overlap(this,this.level.bombas,this.stopBomb);
    
    this.checkBombs();
    
    if(this.explosion==null){   
     //   console.log(this);
        this.game.physics.arcade.overlap(this,this.level.explosions,this.rotate,null,this);
                             
    }
    else if(!this.explosion.alive){     
        this.explosion=null;
    }
    
    
}