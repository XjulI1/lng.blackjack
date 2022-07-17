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

    describe('when stage is "bankDraw"', () => {
      it('should call autoDraw() and not call addCard()', () => {
        game.stage = STAGES.bankDraw

        game.Bank.addACard = jest.fn()
        game.Bank.autoDraw = jest.fn()

        game.drawCard(game.Bank)

        expect(game.Bank.addACard).not.toHaveBeenCalled()
        expect(game.Bank.autoDraw).toHaveBeenCalled()

      })
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

    describe('when stage is bankDraw', () => {
      it('should set bankDraw', () => {
        const game = new Game()
        game.nextStage()
        game.nextStage()
        expect(game.stage).toEqual(STAGES.bankDraw)
        game.nextStage()
        expect(game.stage).toEqual(STAGES.findWinner)
      })
    })
  })

  describe('whosTheWinner()', () => {
    describe('when stage is other name', () => {
      it('should return Falsy', () => {
        const game = new Game()

        expect(game.whosTheWinner()).toBeFalsy()
      })
    })

    describe('when stage is findWinner', () => {
      let game

      beforeAll(() => {
        game = new Game()
        game.stage = STAGES.findWinner
      })

      describe('when player as more than bank', () => {
        it('should return Player', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(4)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(2)

          expect(game.whosTheWinner()).toEqual(game.Player)
        })
      })

      describe('when player as less than bank', () => {
        it('should return Bank', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(2)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(4)

          expect(game.whosTheWinner()).toEqual(game.Bank)
        })
      })

      describe('when player and bank are equals', () => {
        it('should return null', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(2)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(2)

          expect(game.whosTheWinner()).toEqual(null)
        })
      })

      describe('when player have more than 21', () => {
        it('should return Bank', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(23)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(2)

          expect(game.whosTheWinner()).toEqual(game.Bank)
        })
      })

      describe('when bank have more than 21', () => {
        it('should return Bank', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(18)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(22)

          expect(game.whosTheWinner()).toEqual(game.Player)
        })
      })

      describe('when bank AND player have more than 21', () => {
        it('should return Bank', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(23)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(22)

          expect(game.whosTheWinner()).toEqual(game.Bank)
        })
      })

      describe('when player have BlackJack', () => {
        it('should return Player', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(21)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(20)
          game.Player.isBlackJack = jest.fn().mockReturnValue(true)

          expect(game.whosTheWinner()).toEqual(game.Player)
        })
      })

      describe('when player AND bank have BlackJack', () => {
        it('should return equals', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(21)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(21)
          game.Player.isBlackJack = jest.fn().mockReturnValue(true)
          game.Bank.isBlackJack = jest.fn().mockReturnValue(true)

          expect(game.whosTheWinner()).toEqual(null)
        })
      })

      describe('when player have 21 AND bank have BlackJack', () => {
        it('should return equals', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(21)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(21)
          game.Player.isBlackJack = jest.fn().mockReturnValue(false)
          game.Bank.isBlackJack = jest.fn().mockReturnValue(true)

          expect(game.whosTheWinner()).toEqual(null)
        })
      })

      describe('when player have BlackJack AND bank have 21', () => {
        it('should return equals', () => {
          game.Player.whatsMyHandValue = jest.fn().mockReturnValue(21)
          game.Bank.whatsMyHandValue = jest.fn().mockReturnValue(21)
          game.Player.isBlackJack = jest.fn().mockReturnValue(true)
          game.Bank.isBlackJack = jest.fn().mockReturnValue(false)

          expect(game.whosTheWinner()).toEqual(game.Player)
        })
      })
    })
  })
});
