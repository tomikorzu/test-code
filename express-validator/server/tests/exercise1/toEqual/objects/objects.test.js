const object = {
  name: "Tomas",
  lastName: "Korzusehec",
  role: "Student",
};

const object2 = {
  name: "Tomas",
  lastName: "Korzusehec",
  role: "Student",
};

test("When we use toEqual methods in objects", () => {
  expect(object).toEqual(object2);
});
