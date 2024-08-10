const h1 = document.getElementById("h1");

const handleClickH1 = (e) => {
  console.log("click h1");
  console.log(e.target);
  console.log(e);
};

h1.addEventListener("click", handleClickH1);

const li1 = document.getElementById("li1");
li1.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("click li1");
});

const li2 = document.getElementById("li2");
li2.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("click li2");
});

const li3 = document.getElementById("li3");
li3.addEventListener("click", (e) => {
  e.stopPropagation();
  console.log("click li3");
});

// event delegation, let LCA element handle event
const ul = document.getElementById("ul");
ul.addEventListener("click", (e) => {
  console.log("click li", e.target.id);
});
