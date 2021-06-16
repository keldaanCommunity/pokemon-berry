import {Scene, GameObjects} from 'phaser';
import PlayerManager from '../manager/player-manager';
import {ORIENTATION, KEY_STATUS, ZONES} from '../../../shared/enum';
import AnimationManager from '../manager/animation-manager';

export default class GameScene extends Scene {
  constructor() {
    super({
      key: 'game-scene'
    });
  }

  preload() {
    this.load.multiatlas('hero', 'asset/atlas/hero.json', 'asset/atlas/');
    this.load.image('tileset-building', `asset/tileset/tileset-building.png`);
    this.load.image('tileset-world', `asset/tileset/tileset-world.png`);
    this.load.tilemapTiledJSON(this.zone, `asset/tilemap/${this.zone}.json`);
  }

  create() {
    this.map = this.make.tilemap({key: this.zone});
    console.log(this.zone);
    this.tilesetWorld = this.map.addTilesetImage('tileset-world', 'tileset-world', 16, 16, 1, 1);
    this.tilesetBuilding = this.map.addTilesetImage('tileset-building', 'tileset-building', 16, 16, 1, 1);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.world = this.map.createLayer('world', this.tilesetWorld, 0, 0);
    this.building = this.map.createLayer('buildings', this.tilesetBuilding, 0, 0);

    this.animationManager = new AnimationManager(this);
    this.playerManager = new PlayerManager(this);
    this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
    this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    
    this.initialize();
  }

  initialize(){
    this.players.forEach(player => {
      this.playerManager.addPlayer(player);
    });
  }

  init(room){
    //console.log(room.state.zone);
    this.zone = room.state.zone;
    this.players = room.state.players;
    this.sessionId = room.sessionId;
  }

  update(){
    if (Phaser.Input.Keyboard.JustDown(this.leftKey)){
      document.getElementById('game').dispatchEvent(new CustomEvent("cursor", {detail: {key: ORIENTATION.LEFT, input: KEY_STATUS.DOWN}}));
    }
    if (Phaser.Input.Keyboard.JustDown(this.rightKey)){
      document.getElementById('game').dispatchEvent(new CustomEvent("cursor", {detail: {key: ORIENTATION.RIGHT, input: KEY_STATUS.DOWN}}));
    }
    if (Phaser.Input.Keyboard.JustDown(this.upKey)){
      document.getElementById('game').dispatchEvent(new CustomEvent("cursor", {detail: {key: ORIENTATION.UP, input: KEY_STATUS.DOWN}}));
    }
    if (Phaser.Input.Keyboard.JustDown(this.downKey)){
      document.getElementById('game').dispatchEvent(new CustomEvent("cursor", {detail: {key: ORIENTATION.DOWN, input: KEY_STATUS.DOWN}}));
    }
    if (Phaser.Input.Keyboard.JustUp(this.leftKey)){
      document.getElementById('game').dispatchEvent(new CustomEvent("cursor", {detail: {key: ORIENTATION.LEFT, input: KEY_STATUS.UP}}));
    }
    if (Phaser.Input.Keyboard.JustUp(this.rightKey)){
      document.getElementById('game').dispatchEvent(new CustomEvent("cursor", {detail: {key: ORIENTATION.RIGHT, input: KEY_STATUS.UP}}));
    }
    if (Phaser.Input.Keyboard.JustUp(this.upKey)){
      document.getElementById('game').dispatchEvent(new CustomEvent("cursor", {detail: {key: ORIENTATION.UP, input: KEY_STATUS.UP}}));
    }
    if (Phaser.Input.Keyboard.JustUp(this.downKey)){
      document.getElementById('game').dispatchEvent(new CustomEvent("cursor", {detail: {key: ORIENTATION.DOWN, input: KEY_STATUS.UP}}));
    }
  }
}
