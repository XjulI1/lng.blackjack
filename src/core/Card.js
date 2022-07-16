export const COLORS = ['spade', 'heart', 'diamond', 'club']
export const NUMBERS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'as']
export const AS = NUMBERS[12]

class Card {
  constructor(color, number) {
    this.color = color
    this.number = number
  }

  whatsMyValue() {
    switch(this.number) {
      case NUMBERS[9]:
      case NUMBERS[10]:
      case NUMBERS[11]:
        return 10
      case AS:
        return 1
      default:
        return parseInt(this.number, 10)
    }
  }
}

export default Card
