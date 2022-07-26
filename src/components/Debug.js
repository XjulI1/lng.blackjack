import { Lightning } from "@lightningjs/sdk"
import eventBus, { EVENTS } from "../helpers/eventBus"

export const DEBUG_WIDTH = 180

class Debug extends Lightning.Component {
  static _template() {
    return {
      Stage: {
        w: DEBUG_WIDTH,
        text: {
          fontSize: 25,
          textAlign: 'right',
          maxLines: 1,
          text: 'NoStage',
          wordWrapWidth: DEBUG_WIDTH,
          textColor: 0xffffffff,
        }
      }
    }
  }

  _init() {
    this._initEvent()
  }

  _initEvent() {
    eventBus.on(EVENTS.newStage, () => {
      this.patch({
        Stage: {
          text: {
            text: window.Game.stage
          }
        }
      })
    })
  }
}

export default Debug
