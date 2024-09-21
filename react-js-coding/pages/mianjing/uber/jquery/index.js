// TODO implement $(), .addClass(), ...
// const $ =

// const $ = (className: string) => {

// }

// const eles = document.querySelectorAll('.foo')
// eles.forEach(ele => {
//     ele.classList.add('bar', 'baz')
// })

// todo: add js/ts doc
class JQuery {
  constructor(className) {
    if (typeof className !== "string") {
      // not valid input
      console.error("invalid input");
      return;
    }

    // todo: handle edge case
    const eles = document.querySelectorAll(className) || [];
    this.eles = eles;

    // throw error if classname not exist?
  }

  // todo: add js/ts doc
  addClass(className) {
    if (typeof className !== "string") {
      // not valid input
      console.error("invalid input");
      return;
    }

    this.eles.forEach((ele) => {
      ele.classList.add(className);
    });

    return this;
  }

  removeClass(className) {
    if (typeof className !== "string") {
      // not valid input
      console.error("invalid input");
      return;
    }

    this.eles.forEach((ele) => {
      ele.classList.remove(className);
    });

    return this;
  }
}

const $ = (className) => {
  const jquery = new JQuery(className);

  return {
    addClass: (c) => jquery.addClass(c),
    removeClass: (c) => jquery.removeClass(c),
  };
};

// const $ = new AddClass('.foo');

$(".foo").delay(1000).addClass("bar").delay(1000).addClass("baz");

// test case
// test('simple test case', () => {

// const foo = $('.foo')
// foo.addClass('bar')
// $('.bar').addClass('baz')

//})
