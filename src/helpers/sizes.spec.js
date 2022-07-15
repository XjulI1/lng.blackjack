/**
 * @jest-environment jsdom
 */

import sizes, { totalWidth, totalHeight } from "./sizes";

describe('sizes', () => {
  it('should return totalWidth with window visual viewport value', () => {
    expect(sizes.totalWidth).toEqual(window.innerWidth)
    expect(totalWidth).toEqual(window.innerWidth)
  })

  it('should return totalHeight with window visual viewport value', () => {
    expect(sizes.totalHeight).toEqual(window.innerHeight)
    expect(totalHeight).toEqual(window.innerHeight)
  })
})
