import Bank from "./Bank";

describe('Bank', () => {
  it("should have a cardList", () => {
    expect((new Bank().cardList)).toEqual([])
  })
})
