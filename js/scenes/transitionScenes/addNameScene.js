var bomberman = bomberman || {};

bomberman.addNameScene = {
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
        this.z = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        this.x = this.game.input.keyboard.addKey(Phaser.Keyboard.X);
        this.c = this.game.input.keyboard.addKey(Phaser.Keyboard.C);
        this.v = this.game.input.keyboard.addKey(Phaser.Keyboard.V);
        this.b = this.game.input.keyboard.addKey(Phaser.Keyboard.B);
        this.n = this.game.input.keyboard.addKey(Phaser.Keyboard.N);
        this.m = this.game.input.keyboard.addKey(Phaser.Keyboard.M);
        
        this.enter = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
        
        //Style
        this.style = {
            font: "60px Arial",
            fill: "#fff",
            align: "center",
        };
        
        //Title
        this.textTitle = this.game.add.text(this.game.world.centerX, 80, "Insert your ID:", this.style);
        this.textTitle.anchor.setTo(.5);
        
        this.getSavedValues();
        
    },
    update:function(){
        if(this.q.isDown && this.q.downDuration(1)){
            this.inputLetter = "Q";
            this.namePlayer += this.inputLetter;
        }else if(this.w.isDown && this.w.downDuration(1)){
            this.inputLetter = "W";
            this.namePlayer += this.inputLetter;
        }else if(this.e.isDown && this.e.downDuration(1)){
            this.inputLetter = "E";
            this.namePlayer += this.inputLetter;
        }else if(this.r.isDown && this.r.downDuration(1)){
            this.inputLetter = "R";
            this.namePlayer += this.inputLetter;
        }else if(this.t.isDown && this.t.downDuration(1)){
            this.inputLetter = "T";
            this.namePlayer += this.inputLetter;
        }else if(this.y.isDown && this.y.downDuration(1)){
            this.inputLetter = "Y";
            this.namePlayer += this.inputLetter;
        }else if(this.u.isDown && this.u.downDuration(1)){
            this.inputLetter = "U";
            this.namePlayer += this.inputLetter;
        }else if(this.i.isDown && this.i.downDuration(1)){
            this.inputLetter = "I";
            this.namePlayer += this.inputLetter;
        }else if(this.o.isDown && this.o.downDuration(1)){
            this.inputLetter = "O";
            this.namePlayer += this.inputLetter;
        }else if(this.p.isDown && this.p.downDuration(1)){
            this.inputLetter = "P";
            this.namePlayer += this.inputLetter;
        }else if(this.a.isDown && this.a.downDuration(1)){
            this.inputLetter = "A";
            this.namePlayer += this.inputLetter;
        }else if(this.s.isDown && this.s.downDuration(1)){
            this.inputLetter = "S";
            this.namePlayer += this.inputLetter;
        }else if(this.d.isDown && this.d.downDuration(1)){
            this.inputLetter = "D";
            this.namePlayer += this.inputLetter;
        }else if(this.f.isDown && this.f.downDuration(1)){
            this.inputLetter = "F";
            this.namePlayer += this.inputLetter;
        }else if(this.g.isDown && this.g.downDuration(1)){
            this.inputLetter = "G";
            this.namePlayer += this.inputLetter;
        }else if(this.h.isDown && this.h.downDuration(1)){
            this.inputLetter = "H";
            this.namePlayer += this.inputLetter;
        }else if(this.j.isDown && this.j.downDuration(1)){
            this.inputLetter = "J";
            this.namePlayer += this.inputLetter;
        }else if(this.k.isDown && this.k.downDuration(1)){
            this.inputLetter = "K";
            this.namePlayer += this.inputLetter;
        }else if(this.l.isDown && this.l.downDuration(1)){
            this.inputLetter = "L";
            this.namePlayer += this.inputLetter;
        }else if(this.z.isDown && this.z.downDuration(1)){
            this.inputLetter = "Z";
            this.namePlayer += this.inputLetter;
        }else if(this.x.isDown && this.x.downDuration(1)){
            this.inputLetter = "X";
            this.namePlayer += this.inputLetter;
        }else if(this.c.isDown && this.c.downDuration(1)){
            this.inputLetter = "C";
            this.namePlayer += this.inputLetter;
        }else if(this.v.isDown && this.v.downDuration(1)){
            this.inputLetter = "V";
            this.namePlayer += this.inputLetter;
        }else if(this.b.isDown && this.b.downDuration(1)){
            this.inputLetter = "B";
            this.namePlayer += this.inputLetter;
        }else if(this.n.isDown && this.n.downDuration(1)){
            this.inputLetter = "N";
            this.namePlayer += this.inputLetter;
        }else if(this.m.isDown && this.m.downDuration(1)){
            this.inputLetter = "M";
            this.namePlayer += this.inputLetter;
        }
        
        this.playerOnText = this.game.add.text(this.game.world.centerX, 200, this.namePlayer, this.style);
        
        this.enterText = this.game.add.text(this.game.world.centerX, 400, "Press enter to save the ID", this.style);
        this.enterText.anchor.setTo(.5);
        
        
        //Sort and add score and names
        if(this.enter.isDown && this.enter.downDuration(1)){
            
            this.doneText = this.game.add.text(this.game.world.centerX, 600, "DONE!", this.style);
            this.doneText.anchor.setTo(.5);
            
            this.addNewValue();
            
            bomberman.loadScene("menu");
        }
    },
    getSavedValues:function(){
            
            this.highScores = [];
            for(var it = 0; it< 10; it++){
                var item = {};

                item.name = localStorage.getItem("name"+it.toString());
                
                item.score = parseInt(localStorage.getItem("score"+it.toString()));

                this.highScores.push(item);
                 
            }

    },
    addNewValue:function(){
        var isPlaced = false;
        var newPlayer={name:this.namePlayer, score:gameValues.score};
        var it = 9;
        
        while(!isPlaced && it > -1){
            if(gameValues.score <= this.highScores[it].score){
                console.log(it);
                this.highScores.splice(it+1, 0, newPlayer);
                isPlaced = true;
                
            }else{
                it--;
            }

        }
        
        if(it == 0){
            this.highScores.splice(1, 0, newPlayer);
        }
            
        this.highScores.pop();

        for(var it = 0;it<this.highScores.length;it++){
            var playerIdKey = "name"+it.toString();
            var playerScoreKey = "score"+it.toPrecision();
                
            localStorage.setItem(playerIdKey, this.highScores[it].name);
            localStorage.setItem(playerScoreKey, this.highScores[it].score);
        }
    }
}