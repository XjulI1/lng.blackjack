import { PHASES } from "./Game";
import Player from "./Player";

class Bank extends Player {
  constructor(params) {
    super(params)

    this.phase = undefined
  }

  get cardList() {
    if(this.phase === PHASES.bankDraw) return super.cardList

    return [super.cardList[0]]
  }

  whatsMyHandValue(phase) {
    this.phase = phase

    return super.whatsMyHandValue()
  }
}

export default Bank;
