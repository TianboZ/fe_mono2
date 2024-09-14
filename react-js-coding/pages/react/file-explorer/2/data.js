export const DATA = [
  { name: "config.js", id: 100, isFile: true },
  {
    name: "src",
    id: 1,
    files: [
      {
        name: "index.ts",
        isFile: true,
        id: 2,
      },
      {
        name: "index.html",
        isFile: true,
        id: 3,
      },
      {
        id: 4,
        name: "components",
        isFile: false,
        files: [
          {
            id: 5,
            name: "home",
            files: [
              {
                id: 6,
                name: "Home.tsx",
                isFile: true,
              },
            ],
          },
          {
            id: 7,
            name: "about",
            files: [],
          },
          {
            id: 8,
            name: "index.ts",
            isFile: true,
          },
        ],
      },
    ],
  },
];
