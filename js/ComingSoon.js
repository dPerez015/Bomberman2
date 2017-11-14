var bomberman = bomberman || {};

bomberman.comingSoon = {
    
    preload:function(){
        this.load.image('ComingSoon', 'img/ComingSoon.png');
    },
    create:function(){
        this.comSoon = this.add.image(this.game.world.centerX, this.game.world.centerY, 'ComingSoon');
        
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    },
    update:function(){
        if(this.esc.isDown){
            bomberman.loadScene('menu');
        }
    }
}