var bomberman = bomberman || {};

bomberman.muroDestruiblePrefab=function (game,x,y,level){
    Phaser.Sprite.call(this, game,x,y,'destruible');
    //game.add.existing(this);
    
    this.anchor.setTo(.5);
    this.level=level;
   var anim = this.animations.add('die',[1,2,3,4,5],10,false);
    
    this.game.physics.arcade.enable(this);
    this.body.immovable=true;
    
    
    this.breakBlock=function(){
        this.animations.play('die',null,false);
        //this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)]=0;
        //this.generateUpgrade();
    };
    this.destroyBlock=function(){
        this.generateUpgrade();
        this.level.gridSolidObjects[this.level.bg.getTileX(this.body.x)][this.level.bg.getTileY(this.body.y)]=0;
       // console.log(this.level.gridSolidObjects);
        this.destroy();
                                
    };
    anim.onComplete.add(this.destroyBlock.bind(this),this.level);
    
    
    this.generateUpgrade=function(){
        var rand=Math.floor(Math.random()*90);
        if(rand<9){
            if(rand<3){
                var item = new bomberman.upgrades_prefab(this.game,this.body.x,this.body.y,1);
                this.level.upgrades.add(item);
            }
            else if(rand<6){
                var item = new bomberman.upgrades_prefab(this.game,this.body.x,this.body.y,2);
                this.level.upgrades.add(item);
            }
            else {
                var item = new bomberman.upgrades_prefab(this.game,this.body.x,this.body.y,1);
                this.level.upgrades.add(item);
            }
           // console.log(this.level.upgrades);
        }
        
    }
    
}

bomberman.muroDestruiblePrefab.prototype=Object.create(Phaser.Sprite.prototype);
bomberman.muroDestruiblePrefab.prototype.constructor=bomberman.muroDestruiblePrefab;

//bomberman.muroDestruiblePrefab.prototype.


