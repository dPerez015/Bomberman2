var bomberman = bomberman || {};

bomberman.oilTank = function(game, x, y, _level){
    Phaser.Sprite.call(this, game, x, y, 'oilTank');
    
    this.anchor.setTo(.5);
    //this.animations.add('Expl_Collided', [0, 1], 10, false);
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    this.isActivated = false
    this.level = _level;
    
    this.checkBomb = function(bomb,x,y){
        var currentX=vx+this.level.bg.getTileX(this.body.x);
        var currentY=vy+this.level.bg.getTileY(this.body.y);
        var bombX=this.level.bg.getTileX(bomb.body.x);
        var bombY=this.level.bg.getTileY(bomb.body.y);
        var canAtract=false;
        var i=1
        while(i<2 && !canAtract && !this.isActivated){
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
        this.isActivated = true;
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
        
        },this);
    };
    this.atract=function(bomba,vx,vy){
        bomba.body.immovable=false;
        bomba.body.velocity.x=vx*70;
        bomba.body.velocity.y=vy*70;
    };
        
        this.stopBomb=function(bomb){
        bomb.body.velocity.x=0;
        bomb.body.velocity.y=0;
    };
    
    this.activeOil = function(x,y,type){
        explosion = new bomberman.oilExplosion(this.game,x,y,type);

    };
    
}

bomberman.oilTank.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.oilTank.prototype.constructor = bomberman.objecteMobil;
bomberman.imanPrefab.prototype.update=function(){
    if(this.isActivated == true){
        
    }
}