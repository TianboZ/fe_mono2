import { useEffect, useState } from "react";

const LIMIT = 20;
const API = "https://pokeapi.co/api/v2/item";

const useDataAPI = () => {
  const [page, setPage] = useState(100);
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [hasNext, setHasNext] = useState(true);

  const fetchMore = async () => {
    if (isLoading || !hasNext) {
      return;
    }
    try {
      setIsLoading(true);
      const resp = await fetch(`${API}?limit=${LIMIT}&offset=${page * LIMIT}`);
      const res = await resp.json();
      // if (!res.isok) {
      //   throw new Error();
      // }
      setData([...(data || []), ...(res.results || [])]);
      setPage((prev) => prev + 1);
      if (!res.next) {
        setHasNext(false);
      }
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // initial loading
    fetchMore();
  }, []);

  return { data, isLoading, fetchMore };
};

export default useDataAPI;
