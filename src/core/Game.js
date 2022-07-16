import Deck from "./Deck";
import Player from "./Player";
import Bank from "./Bank";

export const STAGES = {
  firstDraw: 'firstDraw',
  playerDraw: 'playerDraw',
  bankDraw: 'bankDraw',
  playerWin: 'playerWin',
  bankWin: 'bankWin'
}

class Game {
  constructor() {
    this.Deck = new Deck ()
    this.Player = new Player()
    this.Bank = new Bank()

    this.stage = STAGES.firstDraw
  }

  drawCard(playerOrBank) {
    if (this.stage === STAGES.bankDraw) {
      playerOrBank.autoDraw(this.Deck)
    }

    playerOrBank.addACard(this.Deck.drawCard())
  }

  nextStage() {
    switch(this.stage) {
      case STAGES.firstDraw:
        this.stage = STAGES.playerDraw;
        break
      case STAGES.playerDraw:
        this.stage = STAGES.bankDraw
        break
    }
  }
}

export default Game;
