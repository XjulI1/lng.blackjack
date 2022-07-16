import Card, { COLORS, NUMBERS } from "./Card";
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
})
