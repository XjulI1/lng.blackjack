import Deck from "./Deck";
import Player from "./Player";
import Bank from "./Bank";

export const PHASES = {
  firstDraw: 'firstDraw',
  bankDraw: 'bankDraw'
}

class Game {
  constructor() {
    this.Deck = new Deck ()
    this.Player = new Player()
    this.Bank = new Bank()

    this.phase = PHASES.firstDraw
  }

  drawCard(player) {
    player.addACard(this.Deck.drawCard())
  }
}

export default Game;
