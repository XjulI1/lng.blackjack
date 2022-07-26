import { Lightning, Utils } from "@lightningjs/sdk";

/* COMPONENTS */
import Board from './components/Board'

/* CORE */
import Game, { STAGES } from "./core/Game";

/* HELPERS */
import { totalWidth, totalHeight } from "./helpers/sizes";

export default class App extends Lightning.Component {
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
        x: 20,
        y: 20,
        text: {
          fontSize: 25,
          textAlign: 'left',
          maxLines: 4,
          text: 'C : draw card   D : double card   P : pass turn      N : new turn',
          wordWrapWidth: 185,
          textColor: 0xffffffff,
      }
      }
    };
  }

  _construct() {
    window.Game = new Game()
  }

  _init() {
    window.Game.firstDraw()
  }

  _handleDrawcard() {
    switch(window.Game.stage) {
      case STAGES.playerDraw:
        window.Game.drawCard(window.Game.Player)
    }
  }
}
