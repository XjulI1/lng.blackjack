import Deck from "./Deck";
import Game, { STAGES } from "./Game";
import Player from "./Player";
import Bank from "./Bank";

describe("Game", () => {
  describe("Create new Game", () => {
    const expectedGame = new Game();
    it("should init a Game with a Deck", () => {
      expect(expectedGame.Deck).toBeInstanceOf(Deck);
    });

    it("should init a Game with a Player", () => {
      expect(expectedGame.Player).toBeInstanceOf(Player);
    });

    it("should init a Game with a Bank", () => {
      expect(expectedGame.Bank).toBeInstanceOf(Bank);
    });

    it("should init a Game with stage 'firstDraw'", () => {
      expect(expectedGame.stage).toEqual(STAGES.firstDraw);
    })
  });

  describe('drawCard(player)', () => {
    const game = new Game()

    it('should add the first card of the deck in the Player cardList', () => {
      const firstDeckCard = game.Deck.cardList[0]
      const deckLength = game.Deck.cardList.length

      game.drawCard(game.Player)

      expect(game.Player.cardList[0]).toEqual(firstDeckCard)
      expect(game.Deck.cardList.length).toEqual(deckLength - 1)
    })
  })

  describe('nextStage()', () => {
    describe('when stage is firstDraw', () => {
      it('should set playerDraw', () => {
        const game = new Game()

        expect(game.stage).toEqual(STAGES.firstDraw)
        game.nextStage()
        expect(game.stage).toEqual(STAGES.playerDraw)
      })
    })

    describe('when stage is playerDraw', () => {
      it('should set bankDraw', () => {
        const game = new Game()
        game.nextStage()
        expect(game.stage).toEqual(STAGES.playerDraw)
        game.nextStage()
        expect(game.stage).toEqual(STAGES.bankDraw)
      })
    })
  })
});
