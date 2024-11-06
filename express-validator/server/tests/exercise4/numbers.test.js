test("toBeGreaterThan", () => {
    expect(100).toBeGreaterThan(1)
    expect(2).toBeLessThan(3)
    expect(3).toBeGreaterThanOrEqual(3)
    expect(3).toBeGreaterThanOrEqual(2)

    expect(10).toBeLessThanOrEqual(10)
    expect(10).toBeLessThanOrEqual(20)
})

