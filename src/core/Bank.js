import { STAGES } from "./Game";
import Player from "./Player";

class Bank extends Player {
  constructor(params) {
    super(params)

    this.stage = undefined
  }

  get cardList() {
    if(this.stage === STAGES.bankDraw) return super.cardList

    return [super.cardList[0]]
  }

  whatsMyHandValue(stage) {
    this.stage = stage

    return super.whatsMyHandValue()
  }

  autoDraw(Deck) {

  }
}

export default Bank;
