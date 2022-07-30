import { Lightning } from "@lightningjs/sdk";
import { List } from '@lightningjs/ui'

/* COMPONENTS */
import { DEFAULT_CARD_HEIGHT, DEFAULT_CARD_WIDTH } from './Card'

const DEFAULT_SPACING_BETWEEN_CARD = 10

class Area extends Lightning.Component {
  static _template() {
    return {
      Area: {
        type: List,
        rect: true,
        color: 0xaa666666,
        mountX: 0.5,
        mountY: 0.5,
        w: DEFAULT_CARD_WIDTH * 5 + DEFAULT_SPACING_BETWEEN_CARD * 4,
        h: DEFAULT_CARD_HEIGHT,
        spacing: DEFAULT_SPACING_BETWEEN_CARD,
      }
    }
  }

  set spacingBetweenCard(value) {
    this.tag('Area').spacing = value || DEFAULT_SPACING_BETWEEN_CARD
  }

  set hasBackground(value) {
    value === false && this.tag('Area').patch({color: 0x00ffffff})
  }
}

export default Area
