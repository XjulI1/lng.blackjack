import Deck from "./Deck";
import Game from "./index";

jest.mock('./Deck.js')

describe("Game", () => {
  describe("Create new Game", () => {
    it("should init a Game with a Deck", () => {
      const tmpGame = new Game();

      expect(tmpGame.Deck).toBeInstanceOf(Deck);
    });
  });
});
