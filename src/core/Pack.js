import Card, { COLORS, NUMBERS } from './Card'

class Pack {
  get cardList() {
     return COLORS.reduce((accC, color) => NUMBERS.reduce((accV, number) => [...accV, new Card(color, number)], accC), [])
  }
}

export default Pack
