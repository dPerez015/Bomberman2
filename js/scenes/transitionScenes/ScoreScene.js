var bomberman = bomberman || {};

bomberman.ScoreScene = {
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameValues.MenuWidth,gameValues.MenuHeight);
        this.scale.pageAlignHorizontally = true;  
        this.scale.pageAlignVertically = true;
    },
    preload:function(){
        
        
        //Name player
        this.namePlayer="";
        this.inputLetter="";
    },
    create:function(){
        
        //INPUTS
        this.q = this.game.input.keyboard.addKey(Phaser.Keyboard.Q);
        this.w = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.e = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
        this.r = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        this.t = this.game.input.keyboard.addKey(Phaser.Keyboard.T);
        this.y = this.game.input.keyboard.addKey(Phaser.Keyboard.Y);
        this.u = this.game.input.keyboard.addKey(Phaser.Keyboard.U);
        this.i = this.game.input.keyboard.addKey(Phaser.Keyboard.I);
        this.o = this.game.input.keyboard.addKey(Phaser.Keyboard.O);
        this.p = this.game.input.keyboard.addKey(Phaser.Keyboard.P);
        this.a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.s = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.d = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        this.f = this.game.input.keyboard.addKey(Phaser.Keyboard.F);
        this.g = this.game.input.keyboard.addKey(Phaser.Keyboard.G);
        this.h = this.game.input.keyboard.addKey(Phaser.Keyboard.H);
        this.j = this.game.input.keyboard.addKey(Phaser.Keyboard.J);
        this.k = this.game.input.keyboard.addKey(Phaser.Keyboard.K);
        this.l = this.game.input.keyboard.addKey(Phaser.Keyboard.L);
        this.ñ = this.game.input.keyboard.addKey(Phaser.Keyboard.Ñ);
        this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.x = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.c = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.v = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
        this.b = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.n = this.game.input.keyboard.addKey(Phaser.Keyboard.N);
        this.m = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        
        //Style
        this.style = {
            font: "16px Arial",
            fill: "#fff",
            align: "center",
        };
        
        //Title
        this.textTitle = this.game.add.text(this.game.world.centerX, 80, "Insert your ID:", this.style);
    },
    update:function(){

    },
    saveScore:function(){
        if(!this.supportsLocalStorage()){return false;}
        
        var storedHScore = parseInt(localStorage["score"]);
        if(storedHScore===NaN){
            localStorage["score"]=0;
            storedHScore=0;}
        if(storedHScore< gameValues.score){
            localStorage["score"] = gameValues.score;
        }
    },
    supportsLocalStorage:function(){
        return ('localStorage' in window) && window['localStorage'] !== null;
    }
}