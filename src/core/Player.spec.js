import Card, { AS, COLORS, NUMBERS } from "./Card";
import Player from "./Player";

describe('Player', () => {
  it("should have a cardList", () => {
    expect((new Player().cardList)).toEqual([])
  })

  describe('addACard()', () => {
    it('should add a card to the cardList', () => {
      let expectedPlayer = new Player()
      let expectedCard = new Card(COLORS[0], NUMBERS[0])

      expectedPlayer.addACard(expectedCard)

      expect(expectedPlayer.cardList[0]).toEqual(expectedCard)
      expect(expectedPlayer.cardList.length).toEqual(1)
    })
  })

  describe('whatsMyHandValue()', () => {
    test.each([
      [[NUMBERS[0], NUMBERS[3]], 7],
      [[NUMBERS[1], NUMBERS[4]], 9],
      [[NUMBERS[2], NUMBERS[5]], 11]
    ])('should return the value of the sum of cardList %s', (values, expected) => {
      const expectedPlayer = new Player()

      expectedPlayer.addACard(new Card(COLORS[0], values[0]))
      expectedPlayer.addACard(new Card(COLORS[0], values[1]))

      expect(expectedPlayer.whatsMyHandValue()).toEqual(expected)
    })

    describe('when an As is present in the cardList', () => {
      describe('when the second card has the value 10 or figure', () => {
        it('should return 21', () => {
          const expectedPlayer = new Player()

          expectedPlayer.addACard(new Card(COLORS[0], NUMBERS[11]))
          expectedPlayer.addACard(new Card(COLORS[0], NUMBERS[12]))

          expect(expectedPlayer.whatsMyHandValue()).toEqual(21)
        })
      })
    })
  })

  describe('isBlackJack()', () => {
    it('should return false', () => {
      expect((new Player()).isBlackJack()).toBeFalsy()
    })

    describe('when the player have two cards, one As and one 10 or figure', () => {
      it('should be a blackjack', () => {
        const expectedPlayer = new Player()

        expectedPlayer.addACard(new Card(COLORS[0], NUMBERS[11]))
        expectedPlayer.addACard(new Card(COLORS[0], AS))

        expect(expectedPlayer.isBlackJack()).toBeTruthy()
      })
    })

    describe('when the player have two cards, one As and one other', () => {
      it('should not be a blackjack', () => {
        const expectedPlayer = new Player()

        expectedPlayer.addACard(new Card(COLORS[0], NUMBERS[3]))
        expectedPlayer.addACard(new Card(COLORS[0], AS))

        expect(expectedPlayer.isBlackJack()).toBeFalsy()
      })
    })

    describe('when the player have three cards, one As and one 10 or figure and other', () => {
      it('should not be a blackjack', () => {
        const expectedPlayer = new Player()

        expectedPlayer.addACard(new Card(COLORS[0], NUMBERS[2]))
        expectedPlayer.addACard(new Card(COLORS[0], NUMBERS[11]))
        expectedPlayer.addACard(new Card(COLORS[0], AS))

        expect(expectedPlayer.isBlackJack()).toBeFalsy()
      })
    })
  })

  describe('_hasAS', () => {
    it('should return false', () => {
      expect((new Player())._hasAS()).toBeFalsy()
    })

    describe('when an AS is present in the cardList', () => {
      it('should return true', () => {
        const expectedPlayer = new Player()

        expectedPlayer.addACard(new Card(COLORS[0], NUMBERS[2]))
        expectedPlayer.addACard(new Card(COLORS[0], AS))
        expectedPlayer.addACard(new Card(COLORS[0], NUMBERS[11]))

        expect(expectedPlayer._hasAS()).toBeTruthy()
      })
    })
  })
})
