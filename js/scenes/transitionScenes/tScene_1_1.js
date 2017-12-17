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
        this.load.image('lvl1-1', 'img/scene1-1.png');
        this.load.audio('Stage_change_music', 'sound/Stage-Start_soundtrack.mp3');
        
    },
    create:function(){
        this.mainImage = this.add.image(this.game.world.centerX, this.game.world.centerY, 'lvl1-1');
        this.mainImage.scale.setTo(0.5);
        this.mainImage.anchor.setTo(0.5);

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