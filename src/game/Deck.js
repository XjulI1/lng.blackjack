import Pack from './Pack'

class Deck {
  constructor(numberOfPack = 5) {
    this.numberOfPack = numberOfPack
  }

  get cardList() {
    let tmpList = []

    for (let i = 0; i < this.numberOfPack; i++) {
      tmpList = tmpList.concat((new Pack()).cardList)
    }

    return tmpList
  }
}

export default Deck
