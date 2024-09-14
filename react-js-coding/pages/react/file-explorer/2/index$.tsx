import { useState } from "react";
import { DATA } from "./data";
import useFilesOperation from "./useFilesOperation";

// {
//   "name": "index.html",
//   "isFile": true
// },
export type FileType = {
  id: string;
  name: string;
  isFile: boolean;
  files?: FileType[];
};

const FileExplorer = ({
  data,
  addContent,
  removeContent,
}: {
  data: FileType;
  addContent: (id: string, name: string, type: "file" | "folder") => void;
  removeContent: (id: string) => void;
}) => {
  const [isExpand, setIsExpand] = useState(true);
  const [inputVal, setInputVal] = useState("");
  const [isInputExpand, setInputExpand] = useState(false);
  const [isAddFile, setIsAddFile] = useState(false);

  const handleClickFolder = () => {
    if (data.files?.length) {
      setIsExpand(!isExpand);
    }
  };

  const handleClickAdd = (isFolder) => {
    if (isFolder) {
      setIsAddFile(false);
    } else {
      setIsAddFile(true);
    }
    setInputExpand(true);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      // submit
      console.log(e.target.value);
      addContent(data.id, inputVal, isAddFile ? "file" : "folder");
      setInputExpand(false);
      setInputVal("");
    }
  };

  return (
    <div>
      {data.isFile ? (
        <div>
          🗂️{data.name}
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeContent(data.id);
            }}
          >
            x
          </button>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <div onClick={handleClickFolder}>
            📁{data.name}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeContent(data.id);
              }}
            >
              x
            </button>
          </div>
          <button
            onClick={() => {
              handleClickAdd(true);
            }}
          >
            {" "}
            add folder
          </button>
          <button
            onClick={() => {
              handleClickAdd(false);
            }}
          >
            add file
          </button>
        </div>
      )}
      <div
        style={{
          paddingLeft: "20px",
        }}
      >
        {isInputExpand && (
          <input
            value={inputVal}
            onBlur={() => {
              setInputExpand(false);
              setInputVal("");
            }}
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            autoFocus
            onKeyDown={(e) => handleKeyDown(e)}
          />
        )}
        {isExpand &&
          data.files?.map((file, index) => (
            <FileExplorer
              data={file}
              key={index}
              addContent={addContent}
              removeContent={removeContent}
            />
          ))}
      </div>
    </div>
  );
};

const App = () => {
  const { data, addContent, removeContent } = useFilesOperation(DATA);
  return data.map((d, index) => (
    <FileExplorer
      key={index}
      data={d}
      addContent={addContent}
      removeContent={removeContent}
    />
  ));
};

export default App;
