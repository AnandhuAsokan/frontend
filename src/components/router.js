import { createBrowserRouter } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import Orders from "./orders";
import Signup from "./signup";

const router = createBrowserRouter([
    {path: "home", element : <Home/>},
    {path : "", element : <Login/>},
    {path : 'orders', element : <Orders/>},
    {path : "signup", element : <Signup/>}
]);

export default router;