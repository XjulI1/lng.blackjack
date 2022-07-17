import Deck from "./Deck";
import Player from "./Player";
import Bank from "./Bank";

export const STAGES = {
  firstDraw: 'firstDraw',
  playerDraw: 'playerDraw',
  bankDraw: 'bankDraw',
  findWinner: 'findWinner',
}

class Game {
  constructor() {
    this.Deck = new Deck ()
    this.Player = new Player()
    this.Bank = new Bank()

    this.stage = STAGES.firstDraw
  }

  firstDraw() {
    this.drawCard(this.Player)
    this.drawCard(this.Bank)
    this.drawCard(this.Player)
    this.drawCard(this.Bank)
  }

  drawCard(playerOrBank) {
    if (this.stage === STAGES.bankDraw) {
      playerOrBank.autoDraw(this.Deck)
    } else {
      playerOrBank.addACard(this.Deck.drawCard())
    }
  }

  nextStage() {
    switch(this.stage) {
      case STAGES.firstDraw:
        this.stage = STAGES.playerDraw;
        break
      case STAGES.playerDraw:
        this.stage = STAGES.bankDraw
        break
      case STAGES.bankDraw:
        this.stage = STAGES.findWinner
        break
    }
  }

  whosTheWinner() {
    if (this.stage !== STAGES.findWinner) return undefined

    if (this.Player.isBlackJack() && this.Bank.isBlackJack()) return null
    if (this.Player.isBlackJack()) return this.Player

    if (this.Player.whatsMyHandValue() > 21) return this.Bank
    if (this.Bank.whatsMyHandValue() > 21) return this.Player

    if (this.Player.whatsMyHandValue() < this.Bank.whatsMyHandValue()) return this.Bank
    if (this.Player.whatsMyHandValue() === this.Bank.whatsMyHandValue()) return null
    if (this.Player.whatsMyHandValue() > this.Bank.whatsMyHandValue()) return this.Player

    throw new Error('Winner can not be determine')
  }
}

export default Game;
