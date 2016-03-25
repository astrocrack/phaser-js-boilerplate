
var width= Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
var Phaser = require('Phaser')
  , _ = require('lodash')
  , properties = require('./properties')
  , states =
    { boot: require('./states/boot.js')
    , preloader: require('./states/preloader.js')
    , game: require('./states/game.js')
    }
  , game = new Phaser.Game(width, height, Phaser.AUTO, 'game');

// Automatically register each state.
_.each(states, function(state, key) {
  game.state.add(key, state);
});

game.state.start('boot');
