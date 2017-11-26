var bomberman = bomberman || {}

bomberman.musicPlayer_prefab = function(songName, hasToPlay){
    
    this.music = this.game.add.audio(songName);
    
    if(hasToPlay == false){
        this.music.play();
        this.music.loop = true;
    }else{
        this.music.stop();
    }
}