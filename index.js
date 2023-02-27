Number.prototype.add = function (argument) {
  return parseInt(this.toString()) + argument
}
console.log((1).add(2).add(3))
