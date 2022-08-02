import { Lightning } from "@lightningjs/sdk";

class Result extends Lightning.Component {
  static _template() {
    return {
      text: {
        fontSize: 25,
        textAlign: 'center',
        maxLines: 1,
        text: '',
        textColor: 0xffffffff,
      }
    }
  }
}

export default Result
