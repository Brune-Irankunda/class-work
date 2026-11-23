
import { useState, useEffect } from "react";
import axios from "axios";

import {
  fetchProducts,
  fetchCategories,
} from "../api/product";

function useProducts({ limit = 12, skip = 0 } = {}) {
  const [state, setState] = useState({
    status: "loading",
    data: null,
    error: null,
  });

  useEffect(() => {
    const controller = new AbortController();

    async function loadData() {
      setState((previous) => ({
        ...previous,
        status: "loading",
        error: null,
      }));

      try {
        // Run both API requests at the same time
        const [productsData, categoriesData] =
          await Promise.all([
            fetchProducts({
              limit,
              skip,
              signal: controller.signal,
            }),

            fetchCategories({
              signal: controller.signal,
            }),
          ]);

        setState({
          status: "success",
          data: {
            ...productsData,
            categories: categoriesData,
          },
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

    loadData();

    return () => controller.abort();
  }, [limit, skip]);

  return state;
}

export default useProducts;
