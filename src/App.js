import { Lightning, Utils } from "@lightningjs/sdk";
import { totalWidth, totalHeight } from "./helpers/sizes";

import Plateau from './components/Plateau'

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
      Plateau: {
        type: Plateau
      }
    };
  }

  _init() {}
}
