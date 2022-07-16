import Deck from "./Deck";
import DeepSet from '../utils/DeepSet'

jest.mock('../utils/array.js')

describe('Deck', () => {
  describe('new Deck()', () => {
    const expectedDeck = new Deck()

    it('should create an array of card', () => {
      expect(expectedDeck.cardList).toBeInstanceOf(Array)
    })

    it('should return a list of cards generate with by default 5 packs', () => {
      expect(expectedDeck.cardList.length).toBe(52 * 5)
    })

    it('should return a list of 52 uniq cards', () => {
      expect(new DeepSet(expectedDeck.cardList).size).toBe(52)
    })
  })
})
