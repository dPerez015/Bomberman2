var bomberman = bomberman || {};

bomberman.boss1 = function(game,x,y,speed,level){
    
    Phaser.Group.call(this, game, x, y);
    this.anchor.setTo(.5);
        
    this.game = game;
    this.x = x;
    this.y = y;
    this.speed = speed:
    this.goesRight = false;
    this.hasHitRight = false;
    this.hp = 15
    this.invu = false;
    this.score = gameValues.bossScore;
    this.isAttacking = false;
    this.timeStartAtck = 0;
    this.durAtck = 3;
    this.level = level;
    
    
    this.game.physics.arcade.enable(this);
    this.mainBody = new bomberman.bodyBoss1Prefab(this.game, this.x, this.y, this.level);
    this.armRight = new bomberman.armBoss1RightPrefab(this.game, this.x + 14, this.y + 43, this.level);
    this.armLeft = new bomberman.armBoss1LefttPrefab(this.game, this.x + 74, this.y + 43, this.level);
        
    this.isHit = function(){
        
        if(this.invu = false){
            this.hp --;
            this.invu = true;
        }
        //treure frames
        if(this.hp >= 13){
            this.animations.play('hit1');
        }else if(this.hp >= 10 && this.hp <= 12){
            this.animations.play('hit2');
        }else if(this.hp >= 7 && this.hp <=9){
            this.animations.play('hit3');
        }else if(this.hp >= 4 && this.hp <=6){
            this.animations.play('hit4');
        }else if(this.hp >=1 && this.hp <= 3){
            this.animations.play('hit4');
        }
        
        this.body.velocity.x = 0;
        this.body.velocity.y = 0;
            
        if(this.hp == 0){
            this.showScore();
            this.mainBody.hitAnim5.onComplete.add(this.kill.bind(this),this.level);
        }
    };
    
    this.changeInvu = function(){
        this.invu = false;
        //afegir els ifs dels frames
        if(this.hp >= 13){
            this.mainBody.animations.frame = 0;
        }else if(this.hp >= 10 && this.hp <= 12){
            this.mainBody.animations.frame = 1;
        }else if(this.hp >= 7 && this.hp <=9){
            this.mainBody.animations.frame = 2;
        }else if(this.hp >= 4 && this.hp <=6){
            this.mainBody.animations.frame = 3;
        }else if(this.hp >=1 && this.hp <= 3){
            this.mainBody.animations.frame = 4;           
        }
    };
    
    this.mainBody.hitAnim1.onComplete.add(this.changeDirection.bind(this), this.level);
    this.mainBody.hitAnim1.onComplete.add(this.changeInvu.bind(this), this.level);
    this.mainBody.hitAnim2.onComplete.add(this.changeDirection.bind(this), this.level);
    this.mainBody.hitAnim2.onComplete.add(this.changeInvu.bind(this), this.level);
    this.mainBody.hitAnim3.onComplete.add(this.changeDirection.bind(this), this.level);
    this.mainBody.hitAnim3.onComplete.add(this.changeInvu.bind(this), this.level);
    this.mainBody.hitAnim4.onComplete.add(this.changeDirection.bind(this), this.level);
    this.mainBody.hitAnim4.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight1.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight1.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight2.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight2.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight3.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight3.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight3.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight3.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight4.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchRight4.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft1.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft1.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft2.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft2.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft3.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft3.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft3.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft3.onComplete.add(this.changeInvu.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft4.onComplete.add(this.changeDirection.bind(this), this.level);
    this.armBoss1RightPrefab.punchLeft4.onComplete.add(this.changeInvu.bind(this), this.level);
    
    
     this.checkPlayer=function(){
        var posX=this.level.bg.getTileX(this.body.x);
        
        var playerPosX=this.level.bg.getTileX(this.level.player.body.position.x);
        if(playerPosX==posX ){
            var canPass=true;
            var difX=playerPosX-posX;
            difX/=Math.abs(difX);

            for(var i=0; i<=dif ;i++){
                posX+=difX;
        
                if(this.level.gridSolidObjects[posX][posY]==1){
                    canPass=false;
                }
                if(this.level.map.getTile(posX,posY,this.level.walls)!=null){
                    canPass=false;
                }
                
            }
            return canPass;
        }
        else
            return false;
    }
    
};

bomberman.boss1.prototype = Object.create(Phaser.Group.prototype);
bomberman.boss1.prototype.constructor = bomberman.boss1;


bomberman.boss1.prototype.update = function(){
        
    if((this.body.blocked.left || this.body.touching.left) && this.goesRight){
        this.changeDirection();
    } else if((this.body.blocked.right || this.body.touching.right) && !this.goesRight){
        this.changeDirection();
    }
    
        if(!this.isAttacking){
        this.timeSinceLastAtract+=this.level.player.game.time.physicsElapsed;
        //movimiento
        if(this.checkMovement()){
            
            this.changeDirection();
        }
        //comprovar si ha de atraer
        if(Math.floor(this.body.position.x)%16==0 && Math.floor(this.body.position.y)%16==0 && this.timeSinceLastAtract>this.waitTime){
            if(this.checkPlayer()){
                this.isAttacking=true;
                if(this.hp >= 13)
                    if(this.hasHitRight){
                        this.animations.play('punchRight1');
                        this.hasHitRight = true;
                    }else{
                        this.animations.play('punchLeft1');
                        this.hasHitRight = false;
                    }
                }else if(this.hp >= 10 && this.hp <= 12){
                    if(this.hasHitRight){
                        this.animations.play('punchRight2');
                        this.hasHitRight = true;
                    }else{
                        this.animations.play('punchLeft2');
                        this.hasHitRight = false;
                    }
                }else if(this.hp >= 7 && this.hp <=9){
                    if(this.hasHitRight){
                        this.animations.play('punchRight3');
                        this.hasHitRight = true;
                    }else{
                        this.animations.play('punchLeft3');
                        this.hasHitRight = false;
                    }
                }else if(this.hp >= 4 && this.hp <=6){
                    if(this.hasHitRight){
                        this.animations.play('punchRight4');
                        this.hasHitRight = true;
                    }else{
                        this.animations.play('punchLeft4');
                        this.hasHitRight = false;
                    }
                }else if(this.hp >=1 && this.hp <= 3){
                    if(this.hasHitRight){
                        this.animations.play('punchRight4');
                        this.hasHitRight = true;
                    }else{
                        this.animations.play('punchLeft4');
                        this.hasHitRight = false;
                    }
                }       
                this.body.velocity.setTo(0,0);
                this.timeAtracting=0;
            }
        }
        
    }
    else{ //atraccion
        if(this.checkPlayer()){
            var posX=this.level.bg.getTileX(this.body.x);
        
            var playerPosX=this.level.bg.getTileX(this.level.player.body.position.x);
            
            var vX=posX-playerPosX;
            
            if(vX!=0)
                vX=vX/Math.abs(vX);

            
            
            this.level.player.body.velocity.x+=(vX*this.playerAtractingVel);
            
        }
        this.timeAtracting+=this.level.player.game.time.physicsElapsed;
            
        if(this.timeAtracting>this.timeToAtract){
                this.isAttacking=false;
                this.changeSpeed();
                this.timeSinceLastAtract=0;
            }
        
    }
    
}

bomberman.boss1.prototype.changeDirection = function(){

        switch(this.goesRight){
        case false:
            this.body.velocity.y -= this.speed;
            this.body.velocity.x = 0;
            this.goesRight = true;
            break;
        
        case true:
            this.body.velocity.y += this.speed; 
            this.body.velocity.x = 0;
            this.goesRight = true;
            break;

        default:
            this.body.velocity.x += this.speed;
            this.body.velocity.y -= this.speed;
            break;
        
    }
}

bomberman.boss1.prototype.showScore = function(){
    var texboss1Score = this.level.add.text(this.x, this.y, "+ " + gameValues.bossScore, this.level.style);
    this.level.renderScore(gameValues.bossScore);
    this.level.time.events.add(2000, function() {  this.level.add.tween(textboss1Score).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);   this.level.add.tween(textboss1Score).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);}, this);
}