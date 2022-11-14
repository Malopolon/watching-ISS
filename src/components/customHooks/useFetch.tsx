import { useState, useEffect } from "react";
import { IData } from "../../types";

export const useFetch = (url: string) => {
  const [data, setData] = useState<IData>();
  const [isLoading, setLoading] = useState<boolean>(true);

  async function fetchData() {
    const responce = await fetch(url);
    const data = await responce.json();
    setLoading(false);
    setData(data);
  }
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return { data, isLoading };
};
