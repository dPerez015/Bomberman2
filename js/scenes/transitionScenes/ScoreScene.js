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