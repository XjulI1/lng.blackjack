import Card, { COLORS, VALUES } from './Card'

class Pack {
  get cardList() {
     return COLORS.reduce((accC, color) => VALUES.reduce((accV, value) => [...accV, new Card({color, value})], accC), [])
  }
}

export default Pack
