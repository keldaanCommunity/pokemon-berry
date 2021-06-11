const colyseus = require("colyseus");
const command = require("@colyseus/command");
const tiledData = require('../shared/PALLET_TOWN');
const {TILESET_PIXEL, ZONES, ORIENTATION} = require('../shared/enum');
const GameState = require('./state/game-state');
const {OnJoinCommand, OnLeaveCommand, OnMoveCommand} = require("./command/game-command");

class GameRoom extends colyseus.Room {

  onCreate() {
    this.dispatcher = new command.Dispatcher(this);
    this.data = tiledData;
    this.spawnPoint = this.data.layers[2].objects.find(obj=>{return obj.properties[0].value == "SPAWN_POINT"});
    this.setState(new GameState(ZONES.PALLET_TOWN));

    this.onMessage("move",(client, message) =>{
      this.dispatcher.dispatch(new OnMoveCommand(), {
        client,
        message
      });
    });
  }

  onJoin(client, options) {
    this.dispatcher.dispatch(new OnJoinCommand(), {
        id: client.sessionId,
        x: this.spawnPoint.x/TILESET_PIXEL,
        y: this.spawnPoint.y/TILESET_PIXEL,
        orientation: ORIENTATION.DOWN
    });
  }

  onLeave(client, consented) {
    this.dispatcher.dispatch(new OnLeaveCommand(), {
      client,
       consented
    });
  }

  onDispose() {
    this.dispatcher.stop();
  }
}
module.exports = GameRoom;
