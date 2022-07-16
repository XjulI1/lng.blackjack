export const COLORS = ['spade', 'heart', 'diamond', 'club']
export const NUMBERS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'as']

class Card {
  constructor(color, number) {
    this.color = color
    this.number = number
  }

  whatsMyValue() {
    switch(this.number) {
      case NUMBERS[9]:
        return 11
      case NUMBERS[10]:
        return 12
      case NUMBERS[11]:
        return 13
      case NUMBERS[12]:
        return 1
      default:
        return parseInt(this.number, 10)
    }
  }
}

export default Card
