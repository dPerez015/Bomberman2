var bomberman = bomberman || {};

bomberman.ScoreScene = {  
    init:function(){
        this.scale.scaleMode=Phaser.ScaleManager.SHOW_ALL;
        this.scale.setGameSize(gameValues.MenuWidth,gameValues.MenuHeight);
        this.scale.pageAlignHorizontally = true;  
        this.scale.pageAlignVertically = true;
    },
    preload:function(){
        
    },
    create:function(){
        //Go back
        this.esc = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        
        //Style
        this.style = {
            font: "60px Arial",
            fill: "#fff",
            align: "center",
        };
        
        this.style2 = {
            font: "40px Arial",
            fill: "#fff",
            align: "center",
        };
        
        this.titleText = this.game.add.text(this.game.world.centerX, 80, "Highscore ranking:", this.style);
        this.titleText.anchor.setTo(.5);
        
        this.getSavedValues();
        
        for(var it = 0; it < 10; it++){
            this.game.add.text(this.world.centerX, 100+(it*50), (it+1).toString()+"-"+this.highScores[it].name+": "+this.highScores[it].score, this.style2);
        }
    },
    update:function(){
        
        if(this.esc.isDown){
            bomberman.loadScene('menu');
        }
    },
        getSavedValues:function(){
            
            this.highScores = [];
            console.log(this.highScores);
            for(var it = 0; it< 10; it++){
                var item = {};

                item.name = localStorage.getItem("name"+it.toString());
                
                item.score = parseInt(localStorage.getItem("score"+it.toString()));

                this.highScores.push(item);
                 
            }

    }
} 