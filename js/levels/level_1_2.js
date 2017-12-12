 var bomberman = bomberman || {};
 bomberman.level = {
     init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        //this.scale.setGameSize(gameValues.gameWidth,gameValues.gameHeight);
        this.scale.pageAlignHorizontally = true;  
        this.scale.pageAlignVertically = true;
        
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
    },
    
    preload:function(){
    
    }
    
    
 }