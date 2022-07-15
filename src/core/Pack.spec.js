import Pack from "./Pack";
import DeepSet from '../utils/DeepSet'

describe('Pack', () => {
  describe('new Pack()', () => {
    const expectedPack = new Pack()

    it('should initiate an cardList array', () => {
      expect(expectedPack.cardList).toBeInstanceOf(Array)
    })

    it('should return a list of 52 cards', () => {
      expect(expectedPack.cardList.length).toBe(52)
    })

    it('should return a list of 52 uniq cards', () => {
      expect(new DeepSet(expectedPack.cardList).size).toBe(52)
    })
  })
})
