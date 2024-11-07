const persons = ["nacho", "fede", "tizo", "joaco", "santi"];

const existNacho = persons.some((person) => {
  return person === "nacho";
});

const existsMirtha = persons.some((person) => {
  return person === "mirtha";
});

const subtract = 5 - 5;
const subtract2 = 6 - 5;

test("Test boolean values", () => {
  expect(existNacho).toBeTruthy();
  expect(existsMirtha).toBeFalsy();
  expect(subtract).toBeFalsy();
  expect(subtract2).toBeTruthy();
});

