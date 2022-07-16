import Bank from "./Bank";
import Card, { COLORS, NUMBERS } from "./Card";
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
      expect(expectedBank.whatsMyHandValue()).toEqual(4)
    })

    describe('when is the stage "bankDraw"', () => {
      it('should return the value of all cards', () => {
        expect(expectedBank.whatsMyHandValue(STAGES.bankDraw)).toEqual(14)
      })
    })
  })

  describe('autoDraw(Deck)', () => {

  })
})
