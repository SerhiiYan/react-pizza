import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Header from "./components/Header";
import Home from "./pages/Home";
import Pizza from "./components/Pizza";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cart" element={<Cart />} />
          <Route path="pizzas/:id" element={<Pizza />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
