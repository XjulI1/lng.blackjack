export const COLORS = ['spade', 'heart', 'diamond', 'club']
export const VALUES = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'as']

class Card {
  constructor({color, value}) {
    this.color = color
    this.value = value
  }
}

export default Card
