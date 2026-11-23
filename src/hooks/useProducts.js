
import { useState, useEffect } from "react";
import axios from "axios";
import { fetchProducts } from "../api/products";

function useProducts({ limit = 12, skip = 0 } = {}) {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      setState((previous) => ({
        ...previous,
        status: "loading",
        error: null,
      }));

      try {
        const data = await fetchProducts({
          limit,
          skip,
          signal: controller.signal,
        });

        setState({
          status: "success",
          data,
          error: null,
        });
      } catch (error) {
        if (
          axios.isCancel(error) ||
          error.code === "ERR_CANCELED"
        ) {
          return;
        }

        setState({
          status: "error",
          data: null,
          error: error.message,
        });
      }
    }

    loadProducts();

    return () => controller.abort();
  }, [limit, skip]);

  return state;
}

export default useProducts;
