import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Products from "./Products";
import AddProduct from "./AddProduct";
import Cart from "./Cart";

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
