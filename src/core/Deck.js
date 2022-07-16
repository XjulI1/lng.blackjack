import Pack from './Pack'
import { shuffleArray } from '../utils/array'

class Deck {
  constructor(numberOfPack = 5) {
    this.numberOfPack = numberOfPack
  }

  get cardList() {
    let tmpList = []

    for (let i = 0; i < this.numberOfPack; i++) {
      tmpList = tmpList.concat((new Pack()).cardList)
    }

    return shuffleArray(tmpList);
  }
}

export default Deck
