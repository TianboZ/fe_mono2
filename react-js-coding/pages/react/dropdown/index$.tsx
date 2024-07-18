/**
 * example https://www.radix-ui.com/primitives/docs/components/dropdown-menu
 * https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
 *
 *
 * useClickOutside:
 * https://www.30secondsofcode.org/react/s/use-click-outside/
 *
 */

import React, { ElementRef, useRef, useState } from "react";
import "./index.css";
import useClickOutside from "./useClickOutside";

type Item = {
  id: number;
  title: string;
  url: string;
  submenu?: Item[];
  onClick?: (...ary: any[]) => void;
};

const data: Item[] = [
  {
    id: 0,
    title: "level1 option0",
    url: "/services",
  },
  {
    id: 1,
    title: "level1 option1",
    url: "/services",
    submenu: [
      {
        id: 2,
        title: "level2 option1",
        url: "web-design",
      },
      {
        id: 22,
        title: "level2 option11",
        url: "web-design",
      },
    ],
  },
  {
    id: 3,
    title: "level1 option2",
    url: "/services",
    submenu: [
      {
        id: 4,
        title: "level2 option1",
        url: "web-design",
      },
      {
        id: 5,
        title: "level2 option2",
        url: "web-dev",
        submenu: [
          {
            id: 6,
            title: "level3 option1",
            url: "web-design",
          },
          {
            id: 7,
            title: "level3 option2",
            url: "web-design",
          },
          {
            id: 8,
            title: "level3 option3",
            url: "web-design",
          },
        ],
      },
      {
        id: 9,
        title: "level2 option3",
        url: "seo",
      },
    ],
  },
];

const DropdownItem = ({ data, level }: { data: Item; level: number }) => {
  const [activeItem, setActiveItem] = useState();
  const hasSubItems = data.submenu;

  return (
    <div
      className="item"
      onMouseEnter={() => {
        setActiveItem(data.title);
      }}
      onMouseLeave={() => {
        setActiveItem(null);
      }}
    >
      {data.title} {hasSubItems && ">"}
      {hasSubItems && activeItem === data.title && (
        <div
          className="items"
          style={{
            left: "98%",
            top: 0,
          }}
          onClick={() => {
            data.onClick?.(data);
          }}
        >
          {data.submenu?.map((item, i) => {
            return <DropdownItem key={i} data={item} level={level + 1} />;
          })}
        </div>
      )}
    </div>
  );
};

const Dropdown = ({ label, data }: { label: string; data: Item[] }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLElement>();
  useClickOutside(buttonRef, () => {
    setIsOpen(false);
  });

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        {label}
      </button>
      {isOpen && (
        <div className="items">
          {data.map((item, i) => (
            <DropdownItem key={i} data={item} level={0} />
          ))}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return <Dropdown label="dropdown1" data={data} />;
};
export default App;

// 18
