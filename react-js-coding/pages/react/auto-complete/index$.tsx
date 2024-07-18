import React, { useCallback, useRef } from "react";
import { useEffect, useState } from "react";
import AutoComplete from "./AutoComplete";
import debounce from "lodash-es/debounce";

interface FetchResponse {
  ok: boolean;
  status: number;
  json: () => Promise<string[]>;
}

const fetchResponse = async (query, signal): Promise<FetchResponse> => {
  const response = await fetch(`API/${query}`, {
    signal,
  });
  return response;
};

const fetchWithRetry = async (query, signal): Promise<string[]> => {
  const wait = (time) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, time);
    });

  let cnt = 3;

  while (cnt > 0) {
    try {
      const res = await fetchResponse(query, signal);
      if (!res.ok) {
        throw new Error("api fail");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      await wait(500);
      cnt -= 1;
    }
  }
  // log to monitoring, e.g. Sentry
  throw new Error("api fail after 3 retries");
};

type SearchHookRes = {
  data: any[];
  isLoading: boolean;
  isError: boolean;
  fetchData: (input: string) => Promise<void>;
};

const CACHE: Record<
  string,
  {
    data: any;
    expire: number;
  }
> = {};

const useSearch = (): SearchHookRes => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const controllerRef = useRef();

  const fetchData = async (query: string) => {
    // race condition
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // cache
    if (CACHE[query] && CACHE[query].expire < Date.now()) {
      return CACHE[query];
    }

    try {
      const controller = new AbortController();
      controllerRef.current = controller;
      const signal = controller.signal;
      setIsLoading(true);
      const _data = await fetchWithRetry(query, signal);
      setData(_data || []);
      // set cache
      CACHE[query] = {
        data: _data,
        expire: Date.now() + 1000 * 5, // timeout 5s
      };
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
      controllerRef.current = null; // clean up
    }
  };

  const debouncedFetchData = useCallback(debounce(fetchData, 300), []);

  return {
    data,
    isLoading,
    isError,
    fetchData: debouncedFetchData,
  };
};

const SearchBox = () => {
  const [input, setInput] = useState("");
  const { data, isLoading, isError, fetchData } = useSearch();

  useEffect(() => {
    if (input) {
      fetchData(input);
    }
  }, [input]);

  return (
    <AutoComplete
      inputValue={input}
      data={data}
      onInputChange={(v) => {
        setInput(v);
      }}
    />
  );
};

export default SearchBox;
