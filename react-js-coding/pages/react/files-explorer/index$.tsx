// https://blog.logrocket.com/recursive-components-react-real-world-example/

import React, { useState } from "react";

type File = {
  isFolder: boolean;
  name: string;
  children?: File[];
};

export const data: File[] = [
  {
    isFolder: true,
    name: "public",
    children: [
      {
        isFolder: false,
        name: "index.html",
      },
    ],
  },
  {
    isFolder: true,
    name: "src",
    children: [
      {
        isFolder: true,
        name: "components",
        children: [
          {
            isFolder: true,
            name: "home",
            children: [
              {
                isFolder: false,
                name: "Home.js",
              },
            ],
          },
        ],
      },
      {
        isFolder: false,
        name: "App.js",
      },
    ],
  },
];

const FilesTree = ({ data }: { data: File[] }) => {
  const [openStatus, setOpenStatus] = useState(() => {
    // initial state
    const tmp = {};
    data.forEach((d) => {
      if (d.isFolder) {
        tmp[d.name] = false;
      }
    });
    return tmp;
  });

  const toggle = (name) => {
    setOpenStatus({ ...openStatus, [name]: !openStatus[name] });
  };

  return (
    <div style={{ paddingLeft: 30 }}>
      {data.map((d, i) => {
        if (!d.isFolder) {
          return <div key={i}>{d.name}</div>;
        } else {
          // folder
          const isOpen = openStatus[d.name];
          return (
            <div key={i}>
              <button
                onClick={() => {
                  toggle(d.name);
                }}
              >
                {d.name}
              </button>
              {d.children && (
                <div style={{ display: isOpen ? "block" : "none" }}>
                  <FilesTree data={d.children} />
                </div>
              )}
            </div>
          );
        }
      })}
    </div>
  );
};

const App = () => {
  return <FilesTree data={data} />;
};

export default App;
