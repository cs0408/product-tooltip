import { useState, useCallback } from "react";
import { useAuthenticatedFetch } from "./useAuthenticatedFetch";

const _initialStates = {
  loading: undefined,
  data: undefined,
  error: undefined,
};

const useFetch = (url, body) => {
  const fetch = useAuthenticatedFetch();

  const [states, setStates] = useState(_initialStates);

  const _fetchData = useCallback(
    async (overrideUrl, overrideBody) => {
      try {
        setStates({ ..._initialStates, loading: true });
        const response = await fetch(overrideUrl || url, body || overrideBody);
        const jsonData = await response.json();

        setStates({
          ..._initialStates,
          error: response.ok ? undefined : jsonData,
          data: response.ok ? jsonData : undefined,
        });
      } catch (error) {
        setStates({
          ..._initialStates,
          error: error.message,
        });
      }
    },
    [url]
  );

  return {
    loading: states.loading,
    data: states.data,
    error: states.error,
    fetchData: _fetchData,
  };
};

export default useFetch;
