import { Lightning } from "@lightningjs/sdk";

class Winner extends Lightning.Component {
  static _template() {
    return {
      text: {
        fontSize: 25,
        textAlign: 'center',
        maxLines: 1,
        text: '',
        wordWrapWidth: 100,
        textColor: 0xffffffff,
      }
    }
  }
}

export default Winner
