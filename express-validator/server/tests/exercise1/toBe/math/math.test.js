const math = require("./math.js")

test("The sum between 2 and 3 should be 5", () => {
    expect(math.add(2,3)).toBe(5)
})

test("The subtract between 10 and 4 should be 4", () => {
    expect(math.subtract(10,6)).toBe(4)
})