import { Route, Routes, BrowserRouter } from "react-router-dom";
import Protected from "./Protected";
import "./App.css";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Page404 from "./pages/Page404.jsx";
import Profile from "./pages/Profile.jsx";
import {  useSelector } from 'react-redux';
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage/CartPage";

function App() {
  const signed_state = useSelector((state) => state.users.isLoggedIn);
  let public1 = [
    { path: "/signup", element: <Signup /> },
    {
      path: "/login",
      element: <Login />,
    },
  
  ];

  let private1 = [
   
    {
      path: "/profile",
      element: <Profile />,
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

    <Route path="/" element={<Home/>}/>
    <Route path="/productPage" element={<ProductPage/>}/>
    <Route path="/*" element={<Page404/>}/>


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
            element={
              <Protected signed_state={!signed_state}>{e.element}</Protected>
            }
          />
        );
      })}
    </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;