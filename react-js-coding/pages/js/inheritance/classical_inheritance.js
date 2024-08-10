// use ES6 class
class Person {
  constructor(a) {
    this.a = a;
  }
  foo() {
    return this.a;
  }
}

const p1 = new Person("tb");

class Person2 extends Person {
  bar() {
    return this.a;
  }
}

const p2 = new Person2("yl");

console.log(p2.a, p2.bar(), p2.foo());

class Person3 extends Person2 {
  constructor(a, b) {
    // call the super() method within the subclass's constructor to invoke the parent class's constructor.
    // This allows you to inherit properties and methods from the parent class while adding your own custom behavior.
    super(a);
    this.b = b;
  }

  biz() {
    return this.a;
  }
}

const p3 = new Person3("a", "b");

console.log(p3.a, p3.b, p3.biz());

// Before ES6
// constructor function
const Person4 = function (a) {
  this.a = a;
  this.foo = function () {
    return this.a;
  };
};

const person4 = new Person4("person4");
console.log("person4", person4.foo());

const Person5 = function (a) {
  Person4.call(this, a);
};
Person5.prototype = Object.create(Person4.prototype);
Person5.prototype.constructor = Person4;

const person5 = new Person5("person5");
console.log("person5", person5.foo());
