import { useState } from "react";
import { FileType } from "./index$";

const useFilesOperation = (initData: FileType[]) => {
  const [data, setData] = useState(initData);

  // id is parent folder id
  const addContent = (id: string, name: string, type: "file" | "folder") => {
    const dfs = (files: FileType[] | undefined): FileType[] => {
      // baes case
      if (!files) {
        return [];
      }

      // recursive rule
      const targetFile = files.find((f) => f.id === id);
      if (targetFile) {
        const _files = [...(targetFile.files || [])];
        if (type === "file") {
          _files.push({ name, isFile: true, id: Date.now() });
        }
        if (type === "folder") {
          _files.push({ name, isFile: false, id: Date.now(), files: [] });
        }
        _files.sort((a, b) => (a.name < b.name ? -1 : 1));
        targetFile.files = _files;
        return files;
      } else {
        return files.map((f) => ({
          ...f,
          files: [...dfs(f.files)],
        }));
      }
    };

    setData(dfs(data));
  };

  const removeContent = (id: string) => {
    const dfs = (files: FileType[] | undefined): FileType[] => {
      if (!files) {
        return [];
      }
      const hasId = files.some((f) => f.id === id);
      if (hasId) {
        return files.filter((f) => f.id !== id);
      } else {
        return files.map((f) => ({
          ...f,
          files: dfs(f.files),
        }));
      }
    };

    setData(dfs(data));
  };

  return { data, addContent, removeContent };
};

export default useFilesOperation;
