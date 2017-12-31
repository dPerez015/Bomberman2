var bomberman = bomberman || {};
//WORLD 2
bomberman.flamaPrefab = function(game, x, y, level){}
    Phaser.Sprite.call(this, game,x,y,'flameGround');
    this.animations.add('turnOff', [], 1, false);
    //this.anim = this.animations.add('turnOn', [], 3, false);
    game.add.existing(this);

    this.player = level.player;
    this.game = game;
    this.level = level;
    this.anchor.setTo(.5);
    
    this.flameOn = true;

    this.resetFlame = function(){
        this.game.time.events.loop(Phaser.Timer.SECOND, this.counter, this);
    };
    
    this.counter = function(){
        var coolDown = 20;
        while(coolDown >= 0){
            coolDown--;
            if(coolDown == 0){
                this.flameOn = true;
            }
        }
    };
}

bomberman.flamaPrefab.prototype = Object.create(Phaser.Sprite.prototype);
bomberman.flamaPrefab.prototype.constructor = bomberman.flamaPrefab;

bomberman.flamaPrefab.prototype.update = function(){
    
    if(this.flameOn == true){
       // this.animations.play()
        this.game.physics.arcade.enable(this);  
        if(this.game.physics.arcade.collide(this,this.player)){
            //this.bomberman.bombermanHit();
        }
    }
    if(this.flameOn == false){
       // this.animations.stop()
    }
    if(this.game.physics.arcade.overlap(this, this.level.explosions, FUNCION, null, this) && this.flameOn = true){
        this.flameOn = false;
        this.resetFlame();
    }
}