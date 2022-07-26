import { Lightning, Utils } from "@lightningjs/sdk";

/* COMPONENTS */
import Board from './components/Board'
import Resume from './components/Resume'
import Debug, { DEBUG_WIDTH } from './components/Debug'

/* CORE */
import Game from "./core/Game";

/* HELPERS */
import sizes, { totalWidth, totalHeight } from "./helpers/sizes";

/* HANDLES */
import _handleDrawcard from "./handles/drawcard";
import _handlePassturn from "./handles/passturn"

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
    window.Game.firstDraw()
  }
}

App.prototype._handleDrawcard = _handleDrawcard
App.prototype._handlePassturn = _handlePassturn

export default App
