class DeepSet extends Set {
  add (o) {
    for (let i of this)
      if (this.deepCompare(o, i))
        return this;
    super.add.call(this, o);
    return this;
  }

  deepCompare(o, i) {
    return JSON.stringify(o) === JSON.stringify(i)
  }
}

export default DeepSet
