import { useCallback, useEffect, useState } from "react";
import "./App.css";
import AutoComplete from "./components/AutoComplete";
import debounce from "lodash/debounce";

const useSearchData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async (query: string) => {
    if (!query) {
      return;
    }
    try {
      setIsLoading(true);
      let res = await fetch(`https://dummyjson.com/recipes/search?q=${query}`);
      res = await res.json();
      console.log(res.recipes);
      setData(res.recipes);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 300), []);

  return { fetchData: debouncedFetchData, data, isLoading, error };
};

function App() {
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(); // data type
  const { data, isLoading, error, fetchData } = useSearchData();

  useEffect(() => {
    fetchData(inputValue);
  }, [inputValue]);

  return (
    <>
      <AutoComplete
        inputValue={inputValue}
        placeholder="search...."
        onInputChange={(input) => {
          setInputValue(input);
        }}
        onChange={(v) => {
          setValue(v);
        }}
        options={data}
        isLoading={isLoading}
        customStyles={{ width: 400 }}
      />
    </>
  );
}

export default App;
