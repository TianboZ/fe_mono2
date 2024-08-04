const endorsements = [
  { skill: "css", user: "Bill" },
  { skill: "javascript", user: "Chad" },
  { skill: "javascript", user: "Bill" },
  { skill: "css", user: "Sue" },
  { skill: "javascript", user: "Sue" },
  { skill: "html", user: "Sue" },
];
// output skills
// [
// { skill: 'javascript', users: ['Chad', 'Bill', 'Sue'], count: 3 },

/*
assumption: no duplicate entry in endorsements array
*/
// const obj = {};

// for (const entry of endorsements) {
//   const skill = entry.skill;
//   const user = entry.user;
//   if (skill in obj) {
//     obj[skill].push(user);
//   } else {
//     obj[skill] = [user];
//   }
// }

// const skills = Object.entries(obj).map(([k, v]) => ({
//   skill: k,
//   users: v,
//   count: v.length,
// }));

// console.log(skills);

// one pass
const obj2 = {}; // <skill: { skill: string; users: []string, count: number }>
for (const entry of endorsements) {
  const skill = entry.skill;
  const user = entry.user;
  if (skill in obj2) {
    const info = obj2[skill];
    info.users.push(user);
    info.count += 1;
  } else {
    obj2[skill] = {
      skill,
      users: [user],
      count: 1,
    };
  }
}

// console.log(obj2);
const skills2 = Object.values(obj2);
skills2.sort((a, b) => a.count - b.count); // increasing order
console.log(skills2);
