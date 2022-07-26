import { Lightning } from "@lightningjs/sdk";
import { List } from '@lightningjs/ui'

/* COMPONENTS */
import { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH } from './Card'

const SPACING_BETWEEN_CARD = 10

class Area extends Lightning.Component {
  static _template() {
    return {
      Area: {
        type: List,
        rect: true,
        color: 0xaa666666,
        mountX: 0.5,
        mountY: 0.5,
        w: DEFAULT_CARD_WIDTH * 5 + SPACING_BETWEEN_CARD * 4,
        h: DEFAULT_CARD_HEIGHT,
        spacing: SPACING_BETWEEN_CARD,
      }
    }
  }
}

export default Area
