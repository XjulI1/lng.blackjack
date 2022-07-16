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

  describe('drawCard', () => {
    it('should get the first items of the cardList', () => {
      const expectedDeck = new Deck();
      const firstCard = expectedDeck.cardList[0]

      expect(expectedDeck.drawCard()).toEqual(firstCard)
    })

    it('should delete the first items of the cardList', () => {
      const expectedDeck = new Deck();
      const firstCard = expectedDeck.cardList[0]

      expectedDeck.drawCard()

      expect(expectedDeck.cardList[0]).not.toEqual(firstCard)
    })

    it('should have one minus card in the deck', () => {
      const expectedDeck = new Deck();
      const expectedDeckLenght = expectedDeck.cardList.length

      expectedDeck.drawCard()

      expect(expectedDeck.cardList.length).toEqual(expectedDeckLenght - 1)
    })
  })
})
