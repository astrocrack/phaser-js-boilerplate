var preloader = {};

preloader.preload = function () {
   this.game.load.tilemap('map', 'assets/room.json', null, Phaser.Tilemap.TILED_JSON);
    
    this.game.load.image('wall_1', 'assets/sprites/wall_1.png');
    this.game.load.image('floor_0', 'assets/sprites/floor_0.png');
     this.game.load.image('bed_0', 'assets/sprites/bed.png');
    this.game.load.atlasJSONHash('player', 'assets/spr.png', 'assets/spr.json');
    
    
    this.game.load.audio('blaster', 'assets/audio/SoundEffects/p-ping.mp3');
};

preloader.create = function () {
  this.game.state.start('game');
};

module.exports = preloader;
