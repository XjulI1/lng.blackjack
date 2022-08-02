/* CORE */
import { STAGES } from "../core/Game";

export default () => {
  switch(window.Game.stage) {
    case STAGES.playerDraw:
      window.Game.nextStage()
      break
  }
}
