const Person = function (name, dob) {
  this.name = name;
  this.dob = dob;
  this.getNameShownAsFunc = function () {
    return this.name;
  };
};

Person.prototype.getName = function () {
  return this.name;
};
const p1 = new Person("tb", 1);
const p2 = new Person("yyl", 2);
console.log(p1, p2);
console.log("getNameShownAsFunc", p1.getNameShownAsFunc());
console.log("getName", p1.getName());

class Person2 {
  constructor(name, dob) {
    this.name = name;
    this.dob = dob;
  }

  getName() {
    return this.name;
  }

  getNameArrow = () => {
    return this.name;
  };
}

const p3 = new Person2("tianbo", 3);
console.log(p3);
console.log(p3.getName());
