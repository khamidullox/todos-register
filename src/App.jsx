//router dom
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
//Layout
import MainLayout from "./layout/MainLayout";
//pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Registor from "./pages/Registor";
// redux
import { useSelector } from "react-redux";
import ProtectRuter from "./components/ProtectRuter";
//action
import { action as registorAction } from "./pages/Registor";
import { action as loginAction } from "./pages/Login";
import { action as actionHome } from "./pages/Home";
/// loader
function App() {
  const { user } = useSelector((state) => state.user);

  let router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectRuter user={user}>
          <MainLayout />
        </ProtectRuter>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          action: actionHome,
        },
      ],
    },
    {
      path: "/login",
      element: user ? <Navigate to="/" /> : <Login />,
      action: loginAction,
    },
    {
      path: "/registor",
      element: user ? <Navigate to="/" /> : <Registor />,
      action: registorAction,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
