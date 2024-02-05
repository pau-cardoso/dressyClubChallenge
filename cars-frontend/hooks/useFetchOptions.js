import { useState, useEffect } from "react";

export default function useFetchOptions(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        const options = result.map((option) => {
          return {
            label: option.name,
            value: option._id,
          };
        });
        setData(options);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [url]);

  return [data];
}