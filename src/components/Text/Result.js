import { Lightning } from "@lightningjs/sdk";

class Result extends Lightning.Component {
  static _template() {
    return {
      text: {
        fontSize: 25,
        textAlign: 'center',
        maxLines: 1,
        text: '-1',
        wordWrapWidth: 25,
        textColor: 0xffffffff,
      }
    }
  }
}

export default Result
