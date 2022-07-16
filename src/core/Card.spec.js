import Card, { COLORS, NUMBERS } from "./Card";

describe('Card', () => {

  describe('whatsMyValue()', () => {
    test.each([
      [NUMBERS[0], 2],
      [NUMBERS[1], 3],
      [NUMBERS[2], 4],
      [NUMBERS[3], 5],
      [NUMBERS[4], 6],
      [NUMBERS[5], 7],
      [NUMBERS[6], 8],
      [NUMBERS[7], 9],
      [NUMBERS[8], 10]
    ])("should return the value of the card for %s", (value, expected) => {
      expect((new Card(COLORS[0], value)).whatsMyValue()).toEqual(expected)
    })

    describe('when is jack', () => {
      it("should return 1", () => {
        expect((new Card(COLORS[0], 'jack')).whatsMyValue()).toEqual(11)
      })
    })

    describe('when is an As', () => {
      it("should return 1", () => {
        expect((new Card(COLORS[0], 'queen')).whatsMyValue()).toEqual(12)
      })
    })

    describe('when is an As', () => {
      it("should return 1", () => {
        expect((new Card(COLORS[0], 'king')).whatsMyValue()).toEqual(13)
      })
    })

    describe('when is an As', () => {
      it("should return 1", () => {
        expect((new Card(COLORS[0], 'as')).whatsMyValue()).toEqual(1)
      })
    })
  })
})
