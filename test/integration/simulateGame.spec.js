import Game from '../../src/core/Game'

describe('Simulate a game', () => {
  let game

  it("Init a game", () => {
    game = new Game()
  })

  it("draw a visible card for the Player", () => {
    game.drawCard(game.Player)
  })

  it("draw a visible card for the Bank", () => {
    game.drawCard(game.Bank)
  })

  it("draw a second visible card for the Player", () => {
    game.drawCard(game.Player)
  })

  it("draw a mask card for the Bank", () => {
    game.drawCard(game.Bank)
  })

  it('show two cards Player hand', () => {
    console.log('Player hand value :', game.Player.whatsMyHandValue(), game.Player.cardList)
  })

  it('show one card Bank hand', () => {
    console.log('Bank hand value :', game.Bank.whatsMyHandValue(game.stage), game.Bank.cardList)
  })

  it('begin the stage "playerDraw"', () => {
    game.nextStage()
  })

  describe('when player hand is a blackjack', () => {
    it('Player Win', () => {
      if (game.Player.isBlackJack()) {
        console.log('Player BLACKJACK')
      }
    })
  })

  describe('when player hand is equals or more than 17', () => {
    it("don't take other card and go to the next stage", () => {
      if (game.Player.whatsMyHandValue() >= 17) {

        game.nextStage()

        console.log('Player hand value :', game.Player.whatsMyHandValue(), game.Player.cardList)
      }
    })
  })

  describe('when player hand is less than 17', () => {
    it('take a new card', () => {
      if (game.Player.whatsMyHandValue() < 17) {
        game.drawCard(game.Player)

        console.log('Player hand value :', game.Player.whatsMyHandValue(), game.Player.cardList)
      }
    })
  })

  it('begin the bankDraw stage', () => {
    game.nextStage()
  })

  it('bank take cards to have 17 or more', () => {
    game.drawCard(game.Bank)
  })
})
