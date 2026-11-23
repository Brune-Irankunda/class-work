
import { Routes, Route } from "react-router-dom";

import ProductsPage from "./pages/ProductsPage";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />

      <Route
        path="/products/:id"
        element={<ProductDetails />}
      />
    </Routes>
  );
}

export default App;
