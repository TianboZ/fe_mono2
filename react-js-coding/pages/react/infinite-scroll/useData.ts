import { useEffect, useState } from "react";

const API = "https://pokeapi.co/api/v2/item";
const LIMIT = 10;

export type Item = {
  name: string;
  url: string;
};
const useData = () => {
  const [page, setPage] = useState(0);
  const [data, setData] = useState<Item[] | undefined>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const fetchData = async () => {
    // debugger
    try {
      setIsLoading(true);
      const res = await fetch(`${API}?limit=${LIMIT}&offset=${LIMIT * page}`);
      const _data = await res.json();
      // console.log(_data)
      setPage((prev) => prev + 1);
      setData((prev) => [...(prev || []), ...(_data.results || [])]);
      // console.log(data)
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
};

export default useData;
