var game = {};
var map;
var layer;
var sprite;
var cursors;
var capguy;
var score; 
var track;

game.create = function () {

    var clientId = '8f13f7347b1d5679140bf42a7260c8b5';
    var trackId = '120912535';
  SC.initialize({
    client_id: clientId
});SC.get("/users/astrocrack/favorites", function(tracks){
  console.log(tracks);
  for(var i = 0; i

// Getting SC track infos
 < tracks.length; i++)
   console.log(tracks[i].title);
  track = tracks[Math.floor(Math.random() * tracks.length) ];
console.log("TRACK",track);
   audioPlayer = new Audio(track.uri + '/stream?client_id=' + clientId); // Create audio object with stream url...
      audioPlayer.play(); // ...and play
      createScore();
});


    score = 0;
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.setScreenSize( true );
    blaster = game.add.audio('blaster');
    //capguy = game.add.sprite(100, 180, 'player', '1');
    map = game.add.tilemap('map');
    
    map.addTilesetImage('wall_1');
    map.addTilesetImage('floor_0');
     map.addTilesetImage('bed_0');
    
    map.setCollisionBetween(1, 1);
    //map.setCollisionBetween(1,6);

    //  This will set Tile ID 26 (the coin) to call the hitCoin function when collided with
   
    //  This will set the map location 2, 0 to call the function
    map.setTileLocationCallback(2, 0, 1, 1, hitCoin, this);

    // game.device.canvasBitBltShift = false;

    layer = map.createLayer('Tile Layer 1');

    layer.resizeWorld();
    
    sprite = game.add.sprite(360, 300, 'player','1');
    bed = game.add.sprite(450, 448, 'bed_0');
    sprite.anchor.set(0.5);
    sprite.animations.add('walk',    [
        '3',
        '1',
        '2',
    ], 10, true, false);
    
    sprite.scale.setTo(0.15, 0.15);
    game.physics.enable(sprite);
    game.physics.enable(bed);

    sprite.body.setSize(500,500, 0, 0);

    //  We'll set a lower max angular velocity here to keep it from going totally nuts
    sprite.body.maxAngular = 500;
    bed.body.immovable = true;
    //  Apply a drag otherwise the sprite will just spin and never slow down
    sprite.body.angularDrag = 50;

    game.camera.follow(sprite);
    this.shadowTexture = game.add.bitmapData(game.world.width, game.world.height);

    this.lightSprite = game.add.image(game.camera.x, game.camera.y, this.shadowTexture);
    
    this.lightSprite.blendMode = Phaser.blendModes.MULTIPLY;
    cursors = game.input.keyboard.createCursorKeys();
    
};  
function hitCoin(sprite, tile) {
        if (tile.alpha!=0.2) {
            blaster.play();
            score = score + 1;
            scoreLabel.text = 'score: ' + score;
        }
    
    tile.alpha = 0.2;

    layer.dirty = true;

    return false;

}
function createScore(){
 
    var me = this;
    var scoreFont = "30px Arial";
 
    //Create the score label
    me.scoreLabel = game.add.text(16, 64, "score: 0", {font: scoreFont, fill: "#ffffff", stroke: "#535353", strokeThickness: 10}); 
    
    me.scoreLabel.fixedToCamera = true;
    //Create the score label
    me.scoreLabel2 = game.add.text(16, 16, track.title, {font: scoreFont, fill: "purple", stroke: "white", strokeThickness: 3}); 
    
    me.scoreLabel2.fixedToCamera = true;
    
    //me.scoreLabel.anchor.setTo(0.5, 0);
    //me.scoreLabel.align = 'center';
 
    //Create a tween to grow / shrink the score label
   // me.scoreLabelTween = me.add.tween(me.scoreLabel.scale).to({ x: 1.5, y: 1.5}, 200, Phaser.Easing.Linear.In).to({ x: 1, y: 1}, 200, Phaser.Easing.Linear.In);
 
};
game.update = function () {

    game.physics.arcade.collide(sprite, layer);
    game.physics.arcade.collide(sprite, bed);
    game.physics.arcade.collide(bed, layer);
    sprite.body.velocity.x = 0;
    sprite.body.velocity.y = 0;
    sprite.body.angularVelocity = 0;
    bed.body.velocity.x = 0;
    bed.body.velocity.y = 0;
    bed.body.angularVelocity = 0;
    this.lightSprite.reset(this.game.camera.x, this.game.camera.y);
     this.updateShadowTexture();
    if (cursors.left.isDown)
    {
        sprite.body.angularVelocity = -200;
    }
    else if (cursors.right.isDown)
    {
        sprite.body.angularVelocity = 200;
    }

    if (cursors.up.isDown)
    {
           sprite.animations.play('walk');
    
        game.physics.arcade.velocityFromAngle(sprite.angle-90, 200, sprite.body.velocity);
    }
    else {
       sprite.animations.stop();
       
    }

}
game.updateShadowTexture =  function(){
    
    this.shadowTexture.context.fillStyle = 'rgb(7,7, 7)';
    this.shadowTexture.context.fillRect(0, 0, this.game.width, this.game.height);

    var radius = 200 + this.game.rnd.integerInRange(1,20),
        heroX = sprite.body.position.x - game.camera.x,
        heroY = sprite.body.position.y - game.camera.y;
    
    var gradient = this.shadowTexture.context.createRadialGradient(
            heroX, heroY, 200 * 0.75,
            heroX, heroY, radius);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1.0)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.0)');

    this.shadowTexture.context.beginPath();
    this.shadowTexture.context.fillStyle = gradient;
    this.shadowTexture.context.arc(heroX, heroY, radius, 0, Math.PI*2, false);
    this.shadowTexture.context.fill();

    this.shadowTexture.dirty = true;
  }

module.exports = game;
