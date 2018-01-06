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
    },
    update:function(){
        
        //Names
        this.name1 = localStorage.getItem("name1");
        this.name2 = localStorage.getItem("name2");
        this.name3 = localStorage.getItem("name3");
        this.name4 = localStorage.getItem("name4");
        this.name5 = localStorage.getItem("name5");
        this.name6 = localStorage.getItem("name6");
        this.name7 = localStorage.getItem("name7");
        this.name8 = localStorage.getItem("name8");
        this.name9 = localStorage.getItem("name9");
        this.name10 = localStorage.getItem("name10");
        
        //Score
        this.score1 = parseInt(localStorage.getItem("score1"));
        this.score2 = parseInt(localStorage.getItem("score2"));
        this.score3 = parseInt(localStorage.getItem("score3"));
        this.score4 = parseInt(localStorage.getItem("score4"));
        this.score5 = parseInt(localStorage.getItem("score5"));
        this.score6 = parseInt(localStorage.getItem("score6"));
        this.score7 = parseInt(localStorage.getItem("score7"));
        this.score8 = parseInt(localStorage.getItem("score8"));
        this.score9 = parseInt(localStorage.getItem("score9"));
        this.score10 = parseInt(localStorage.getItem("score10"));
        
        //Set text
        this.firstText = this.game.add.text(this.game.world.centerX, 100, "1-"+this.name1+": "+this.score1, this.style2);
        this.secondText = this.game.add.text(this.game.world.centerX, 150, "2-"+this.name2+": "+this.score2, this.style2);
        this.thirdText = this.game.add.text(this.game.world.centerX, 200, "3-"+this.name3+": "+this.score3, this.style2);
        this.fourthText = this.game.add.text(this.game.world.centerX, 250, "4-"+this.name4+": "+this.score4, this.style2);
        this.fifthText = this.game.add.text(this.game.world.centerX, 300, "5-"+this.name5+": "+this.score5, this.style2);
        this.sixthText = this.game.add.text(this.game.world.centerX, 350, "6-"+this.name6+": "+this.score6, this.style2);
        this.seventhText = this.game.add.text(this.game.world.centerX, 400, "7-"+this.name7+": "+this.score7, this.style2);
        this.eightText = this.game.add.text(this.game.world.centerX, 450, "8-"+this.name8+": "+this.score8, this.style2);
        this.ninthText = this.game.add.text(this.game.world.centerX, 500, "9-"+this.name9+": "+this.score9, this.style2);
        this.tenthText = this.game.add.text(this.game.world.centerX, 550, "10-"+this.name10+": "+this.score10, this.style2);
        
        if(this.esc.isDown){
            bomberman.loadScene('menu');
        }
    }
} 