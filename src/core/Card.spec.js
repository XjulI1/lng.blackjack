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
      it("should return 10", () => {
        expect((new Card(COLORS[0], NUMBERS[9])).whatsMyValue()).toEqual(10)
      })
    })

    describe('when is a queen', () => {
      it("should return 10", () => {
        expect((new Card(COLORS[0], NUMBERS[10])).whatsMyValue()).toEqual(10)
      })
    })

    describe('when is a king', () => {
      it("should return 10", () => {
        expect((new Card(COLORS[0], NUMBERS[11])).whatsMyValue()).toEqual(10)
      })
    })

    describe('when is an As', () => {
      it("should return 1", () => {
        expect((new Card(COLORS[0], NUMBERS[12])).whatsMyValue()).toEqual(1)
      })
    })
  })
})
