// https://www.greatfrontend.com/questions/quiz/what-is-a-closure-and-how-why-would-you-use-one?list=linkedin

function outter() {
  let cnt = 0;

  // closure is a function that captures the lexical scope in which it was declared, allowing it to access and manipulate variables from an outer scope even after that scope has been closed.
  function inner() {
    cnt++;
    return cnt; // can access to outter `cnt`
  }
  return inner;
}

const inner = outter();
console.log(inner());
console.log(inner());
console.log(inner()); //  3,  closure allows function to remember the environment in which it was created, even if the environment was no longer present

const outter2 = () => {
  let cnt = 0;

  const inner2 = () => {
    cnt++;
    return cnt; // can access to outter `cnt`
  };

  return inner2;
};

console.log("------");

const inner2 = outter2();
console.log(inner2());
console.log(inner2());
console.log(inner2());

/*
2 points to remember:
1. closure occur when inner function can access to outer scope variables
2. closure allows function to remember the envirnoment in which it was created, even though the environment was no longer present

*/
