const student = {
  name: "toto",
  lastName: "Korzu",
  address: {
    city: "Barracas",
    street: "Ruy diaz",
    number: "185",
  },
  friends: ["nacho", "fede", "tizo", "joaco", "santi"],
};

test("When we compare values and properties of an object", () => {
  expect(student).toEqual({
    name: "toto",
    lastName: "Korzu",
    address: {
      city: "Barracas",
      street: "Ruy diaz",
      number: "185",
    },
    friends: ["nacho", "fede", "tizo", "joaco", "santi"],
  });
});
