/* CORE */
import { STAGES } from "../core/Game";

export default () => {
  switch(window.Game.stage) {
    case STAGES.findWinner:
      window.Game.newTurn()
      break
  }
}
