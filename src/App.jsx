import { Route, Routes, BrowserRouter } from "react-router-dom";
import Protected from "./Protected";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Profile from "./pages/Profile.jsx";
import {  useSelector } from 'react-redux';
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
function App() {
  const signed_state = useSelector((state) => state.isLoggedIn);
  let public1 = [
    { path: "/signup", element: <Signup /> },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Home />,
    },
  ];

  let private1 = [

   
    {
      path: "/profile",
      element: <Profile />,
    },
    {
      path: "/productPage",
      element: <ProductPage />,
    },
    {
      path: "/categoryPage",
      element: <CategoryPage />,
    },
    {
      path: "/cartPage",
      element: <CartPage />,
    },
   
  ];

  return (
    <div className="App">
    <BrowserRouter>
    <Routes>
      {private1.map((e, i) => {
        return (
          <Route
            key={i}
            path={e.path}
            element={
              <Protected signed_state={signed_state}>{e.element}</Protected>
            }
          />
        );
      })}
 
   
      {public1.map((e, i) => {
        return (
          <Route
            key={i}
            path={e.path}
            element={e.element}/>
        );
      })}
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;