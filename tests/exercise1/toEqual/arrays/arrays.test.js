const array1 = ["tomi", "messi", "zaragueta"];

const array2 = [...array1];

test("When we use toBe method in arrays", () => {
    expect(array1).toEqual(array2)
})