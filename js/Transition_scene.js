var bomberman = bomberman || {};

bomberman.Transicion_scene = {
    
    preload:function(){
        this.load.image('lvl1-1', 'img/scene1-1.png');
        
    },
    create:function(){
        this.mainImage = this.add.image(this.game.world.centerX, this.game.world.centerY, 'lvl1-1');
        this.mainImage.scale.setTo(0.5);
        this.mainImage.anchor.setTo(0.5);
        this.timer = 100;
    },
    update:function(){
        if(this.timer != 0){
            this.timer--;
            if(this.timer == 0){
                bomberman.loadScene("main");
            }
        }
    }
}