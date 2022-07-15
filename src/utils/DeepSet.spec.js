import Card, { COLORS } from "../Game/Card";
import DeepSet from "./DeepSet";

describe('DeepSet', () => {
  it('should not add two same Object in a Set', () => {
    const tmpArray = [{toto: 'toto'}, {toto: 'toto'}]

    expect((new DeepSet(tmpArray).size)).toBe(1);
  })

  it('should not add two same Class in a Set', () => {
    const tmpArray = [new Card(COLORS[0], COLORS[0]), new Card(COLORS[0], COLORS[0])]

    expect((new DeepSet(tmpArray).size)).toBe(1);
  })
})
