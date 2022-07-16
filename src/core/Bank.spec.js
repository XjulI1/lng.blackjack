import Bank from "./Bank";
import Card, { COLORS, NUMBERS } from "./Card";
import Deck from "./Deck";
import { STAGES } from "./Game";

describe('Bank', () => {
  let expectedBank

  beforeAll(() => {
    expectedBank = new Bank()

    expectedBank.addACard(new Card(COLORS[0], NUMBERS[2]))
    expectedBank.addACard(new Card(COLORS[0], NUMBERS[10]))
  })

  it("should have a cardList", () => {
    expect((new Bank().cardList)).toEqual([])
  })

  describe('cardList', () => {
    it('should return by default only the first card', () => {
      expect(expectedBank.cardList).toEqual([new Card(COLORS[0], NUMBERS[2])])
    })

    describe('when is the stage "bankDraw"', () => {
      it('should return all cards', () => {
        expectedBank.stage = STAGES.bankDraw

        expect(expectedBank.cardList.length).toEqual(2)
      })
    })
  })

  describe('whatsMyHandValue()', () => {
    it('should return by default only the value of the first card', () => {
      expect(expectedBank.whatsMyHandValue(STAGES.firstDraw)).toEqual(4)
    })

    describe('when is the stage "bankDraw"', () => {
      it('should return the value of all cards', () => {
        expect(expectedBank.whatsMyHandValue(STAGES.bankDraw)).toEqual(14)
      })
    })

    describe('when params stage is undefined', () => {
      it('should not change the current stage setup for Bank', () => {
        expectedBank.stage = STAGES.firstDraw
        expect(expectedBank.stage).toEqual(STAGES.firstDraw)
        expectedBank.whatsMyHandValue()
        expect(expectedBank.stage).toEqual(STAGES.firstDraw)
      })
    })
  })

  describe('autoDraw(Deck)', () => {
    describe('when hand value is 17 or more', () => {
      it('should do nothing', () => {
        expectedBank = new Bank()

        expectedBank.addACard(new Card(COLORS[0], NUMBERS[5]))
        expectedBank.addACard(new Card(COLORS[0], NUMBERS[8]))

        expect(expectedBank.whatsMyHandValue(STAGES.bankDraw)).toEqual(17)

        expectedBank.autoDraw(new Deck())

        expect(expectedBank.cardList.length).toEqual(2)
      })
    })

    describe('when stage is not bankDraw', () => {
      it('should do nothing', () => {
        expectedBank = new Bank()

        expectedBank.addACard(new Card(COLORS[0], NUMBERS[0]))
        expectedBank.addACard(new Card(COLORS[0], NUMBERS[1]))

        expectedBank.autoDraw(new Deck())

        expect(expectedBank._cardList.length).toEqual(2)
      })
    })

    describe('when hand value is less than 17', () => {
      it('should draw to 17 or more', () => {
        expectedBank = new Bank()
        const expectedDeck = new Deck()

        expectedBank.addACard(new Card(COLORS[0], NUMBERS[0]))
        expectedBank.addACard(new Card(COLORS[0], NUMBERS[1]))
        expectedBank.stage = STAGES.bankDraw

        expectedDeck.drawCard = jest.fn().mockReturnValue(new Card(COLORS[0], NUMBERS[5]))

        expectedBank.autoDraw(expectedDeck)

        expect(expectedBank.cardList).toEqual([
          new Card(COLORS[0], NUMBERS[0]),
          new Card(COLORS[0], NUMBERS[1]),
          new Card(COLORS[0], NUMBERS[5]),
          new Card(COLORS[0], NUMBERS[5])
        ])
      })
    })
  })
})
