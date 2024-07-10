import { useCallback, useEffect, useState } from "react";
import "./App.css";
import AutoComplete from "./AutoComlete";
import debounce from "lodash/debounce";

const useSearchApi = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async (query: string) => {
    try {
      setIsLoading(true);
      let res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      res = await res.json();
      setData(res.recipes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 300), []);

  return {
    data,
    error,
    isLoading,
    fetchData: debouncedFetchData,
  };
};

function App() {
  const [value, setValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const { data, isLoading, fetchData, error } = useSearchApi();

  useEffect(() => {
    if (inputValue) {
      fetchData(inputValue);
    }
  }, [inputValue]);

  return (
    <>
      <AutoComplete
        options={data}
        inputValue={inputValue}
        isLoading={isLoading}
        placeholder="search..."
        onInputChange={(input) => {
          setInputValue(input);
        }}
        onChange={(v) => {
          setValue(v);
        }}
        customInputStyles={{ width: 500, height: 60 }}
        renderOption={(v) => {
          return (
            <div>
              {v.name}, id: {v.id}{" "}
            </div>
          );
        }}
      />
    </>
  );
}

export default App;
