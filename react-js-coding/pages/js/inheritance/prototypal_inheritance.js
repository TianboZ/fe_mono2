const person = {
  name: "default",
  hello: function () {
    return this.name;
  },
};

// establish a prototype linkage between TB and Person
// Any properties or methods not found in TB will be looked up in Person
const tb = Object.create(person);
tb.name = "tb";
tb.code = function () {
  return "code";
};

const yyl = Object.create(tb);
yyl.sing = function () {
  return "sing";
};

console.log(yyl, yyl.code());

yyl;
