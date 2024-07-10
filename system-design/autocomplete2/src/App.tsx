import { useCallback, useEffect, useState } from "react";
import "./App.css";
import AutoComplete from "./AutoComlete";
import debounce from "lodash/debounce";

const CACHE: Record<string, { data: any; expire: number }> = {};
const RETRY_COUNT = 3;

const wait = () => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};

// with retry, with cache
const request = async (...arg) => {
  const key = JSON.stringify(...arg);
  const entry = CACHE[key];
  let cnt = RETRY_COUNT;
  console.log("CACHE", CACHE);

  if (!entry || Date.now() > entry.expire) {
    // make a fresh call
    while (cnt > 0) {
      try {
        let res = await fetch(...arg);
        res = await res.json();
        // success
        CACHE[key] = { data: res, expire: Date.now() + 1000 * 10 };
        console.log(CACHE);
        return res;
      } catch (error) {
        console.log(error);
        wait();
        cnt -= 1;
      }
    }
    // logging, e.g. Sentry
    throw new Error("API fail");
  } else {
    return entry.data;
  }
};

const useSearchApi = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async (query: string) => {
    try {
      setIsLoading(true);
      let res = await request(
        `https://dummyjson.com/recipes/search?q=${query}&delay=100`
      );
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
