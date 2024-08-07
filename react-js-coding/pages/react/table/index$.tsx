/*

https://www.youtube.com/watch?v=EaxC_kOG03E
https://ant.design/components/table

*/
import React, { useState } from "react";

// follow antd design input
const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "1 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
  {
    key: "3",
    name: "John44",
    age: 42,
    address: "101 Street",
    link: "https://www.google.com",
  },
  {
    key: "4",
    name: "Johnsdf",
    age: 423,
    address: "20 Downing Street",
    tags: ["tag1", "tag2"],
  },
];

const columns = [
  {
    title: "ID",
    dataIndex: "key",
    key: "ID",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tag",
    render: (tags) => {
      return (
        <div>
          {tags.map((tag, i) => (
            <div key={i}>{tag}</div>
          ))}
        </div>
      );
    },
  },
  {
    title: "Link",
    dataIndex: "link",
    key: "link",
    render: (link) => <a href={link}>{link}</a>,
  },
];

// type Table = typeof data
type TableProps = {
  dataSource: typeof dataSource;
  columns: typeof columns;
};

const Table = ({ columns, dataSource }: TableProps) => {
  const [data, setData] = useState(dataSource);
  const [sortKey, setSortKey] = useState();

  const handleSortData = (key: string, isInc: boolean) => {
    if (isInc) {
      console.log("inc", key);
      setData([...data.sort((a, b) => (a[key] >= b[key] ? 1 : -1))]);
    } else {
      console.log("dec", key);
      setData([...data.sort((a, b) => (a[key] > b[key] ? -1 : 1))]);
    }
  };

  return (
    <div>
      <div>sorting key: {sortKey}</div>
      <table border={1} cellPadding={10} cellSpacing={0}>
        <thead>
          <tr>
            {columns.map((col, i) => (
              <td key={col.key}>
                {col.title}
                <div>
                  <button
                    onClick={() => {
                      setSortKey(col.dataIndex);
                      handleSortData(col.dataIndex, true);
                    }}
                  >
                    sort in inc
                  </button>
                  <button
                    onClick={() => {
                      setSortKey(col.dataIndex);
                      handleSortData(col.dataIndex, false);
                    }}
                  >
                    sort in dec
                  </button>
                </div>
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {columns.map((col, i) => {
                if (col.render && row[col.dataIndex]) {
                  return col.render(row[col.dataIndex]);
                }
                return <td key={i}>{row[col.dataIndex]}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // const columns = Array(4)
  //   .fill(1)
  //   .map((_, i) => ({
  //     title: `column ${i}`,
  //     dataIndex: `col${i}`,
  //     key: `col${i}`,
  //   }));

  // // Generate rows
  // const dataSource = Array.from({ length: 100 }, (_, index) => {
  //   const rowData = { key: (index + 1).toString() };
  //   columns.forEach((col) => {
  //     rowData[col.dataIndex] = `${col.title} - Row ${index + 1}`;
  //   });
  //   return rowData;
  // });
  return (
    <div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default App;
