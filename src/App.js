import { Lightning, Utils } from "@lightningjs/sdk";

/* COMPONENTS */
import Board from './components/Board'
import Resume from './components/Resume'
import Debug, { DEBUG_WIDTH } from './components/Debug'
import { STAGES } from './core/Game'

/* CORE */
import Game from "./core/Game";

/* HELPERS */
import sizes, { totalWidth, totalHeight } from "./helpers/sizes";
import eventBus, { EVENTS } from './helpers/eventBus'

/* HANDLES */
import _handleDrawcard from "./handles/drawcard";
import _handlePassturn from "./handles/passturn"
import _handleNewturn from './handles/newturn'

class App extends Lightning.Component {
  static getFonts() {
    return [
      { family: "Regular", url: Utils.asset("fonts/Roboto-Regular.ttf") },
    ];
  }

  static _template() {
    return {
      Background: {
        w: totalWidth,
        h: totalHeight,
        color: 0xfffbb03b,
        src: Utils.asset("images/background.png"),
      },
      Board: {
        type: Board
      },
      Resume: {
        type: Resume,
        x: 20,
        y: 20,
      },
      Debug: {
        type: Debug,
        x: sizes.totalWidth - (DEBUG_WIDTH + 20),
        y: 0,
      },
    };
  }

  _construct() {
    window.Game = new Game()
  }

  _init() {
    this._initEvents()

    window.Game.newTurn()
  }

  _initEvents() {
    eventBus.on(EVENTS.newStage, (newStage) => {
      switch(newStage) {
        case STAGES.firstDraw:
          window.Game.firstDraw()
          break

        case STAGES.bankDraw:
          window.Game.Bank.stage = window.Game.stage

          window.Game.drawCard(window.Game.Bank)

          window.Game.nextStage()
          break
      }
    })
  }
}

App.prototype._handleDrawcard = _handleDrawcard
App.prototype._handlePassturn = _handlePassturn
App.prototype._handleNewturn = _handleNewturn

export default App
