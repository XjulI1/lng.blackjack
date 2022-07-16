import Deck from '../../src/core/Deck'
import Game, { PHASES } from '../../src/core/Game'
import Player from '../../src/core/Player'
import Bank from '../../src/core/Bank'

describe('Simulate a game', () => {
  let game

  it("Init a game", () => {
    game = new Game()

    expect(game.Deck).toBeInstanceOf(Deck)
    expect(game.Player).toBeInstanceOf(Player)
    expect(game.Bank).toBeInstanceOf(Bank)

    expect(game.phase).toBe(PHASES.firstDraw)
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
})
