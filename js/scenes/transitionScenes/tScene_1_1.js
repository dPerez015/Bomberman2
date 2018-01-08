var bomberman = bomberman || {};

var music;

bomberman.tScene_1_1 = {
        
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameValues.MenuWidth,gameValues.MenuHeight);
        this.scale.pageAlignHorizontally = true;  
        this.scale.pageAlignVertically = true;
    },
    preload:function(){

        this.load.audio('Stage_change_music', 'sound/Stage-Start_soundtrack.mp3');
        
    },
    create:function(){
        /*this.mainImage = this.add.image(this.game.world.centerX, this.game.world.centerY, 'lvl1-1');
        this.mainImage.scale.setTo(0.5);
        this.mainImage.anchor.setTo(0.5);*/
        
        //MUSIC
        music = this.add.audio('Stage_change_music');
        music.play();
        music.loop = true;
        
        this.timer = 200;
        
        this.style = {
            font: "60px Arial",
            fill: "#fff",
            align: "center",
        };
        
        if(gameValues.currentLevel!=4){
            this.lvlAndWorld = this.game.add.text(this.game.world.centerX, this.game.world.centerY, gameValues.currentWorld + "-" + gameValues.currentLevel, this.style);
        }
        else{
            this.lvlAndWorld=this.game.add.text(this.game.world.centerX,this.game.world.centerY, "BOSS",this.style);
        }
        
        this.lvlAndWorld.anchor.setTo(.5);
        
        this.startText = this.game.add.text(this.game.world.centerX, 400, "START!", this.style);
        this.startText.anchor.setTo(.5);
        
        music = this.game.add.audio('Stage_change_music');
        music.play();
    },
    update:function(){
        if(this.timer != 0){
            this.timer--;
            if(this.timer == 0){
                music.stop();
                bomberman.loadScene("main");
            }
        }
    }
}