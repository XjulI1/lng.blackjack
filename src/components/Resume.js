import { Lightning } from "@lightningjs/sdk"

class Resume extends Lightning.Component {
  static _template() {
    return {
      text: {
        fontSize: 25,
        textAlign: 'left',
        maxLines: 4,
        text: 'C : draw card   D : double card   P : pass turn      N : new turn',
        wordWrapWidth: 185,
        textColor: 0xffffffff,
      }
    }
  }
}

export default Resume
