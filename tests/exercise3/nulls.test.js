const nullValue = null;
const undefinedValue = undefined;
const definedValue = 10;

test("Testing with nulls", () => {
  expect(nullValue).toBeNull();
  expect(undefinedValue).toBeUndefined();
  expect(definedValue).toBeDefined();
});
