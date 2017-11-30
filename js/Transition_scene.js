var bomberman = bomberman || {};

var music;

bomberman.Transicion_scene = {
        
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameValues.MenuWidth,gameValues.MenuHeight);
        this.scale.pageAlignHorizontally = true;  
        this.scale.pageAlignVertically = true;
    },
    preload:function(){
        this.load.image('lvl1-1', 'img/scene1-1.png');
        this.load.audio('Stage_change_music', 'sound/Stage-Start_soundtrack.mp3');
        
    },
    create:function(){
        this.mainImage = this.add.image(this.game.world.centerX, this.game.world.centerY, 'lvl1-1');
        this.mainImage.scale.setTo(0.5);
        this.mainImage.anchor.setTo(0.5);
        
        
        /*this.textMen = this.game.add.text(this.game.world.centerX -1, this.game.world.centerY, gameValues.currentLevel, {
        font: "fonts/ARCADECLASSIC.ttf",
        fill: "white",
        align: "center"
    });
        this.textMen.scale.setTo(15);
        this.textMen.anchor.setTo(0.5);
        
        */
        this.timer = 200;
        
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