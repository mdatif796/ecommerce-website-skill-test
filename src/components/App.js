import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarComponent from "./NavbarComponent";
import Products from "./Products";
import AddProduct from "./AddProduct";

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/add-product" element={<AddProduct />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
