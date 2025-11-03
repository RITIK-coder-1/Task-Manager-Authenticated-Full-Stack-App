/* ---------------------------------------------------------------------------
App.jsx
This is the root application that hosts all the app pages 
------------------------------------------------------------------------------ */

// CURRENTLY IN DEVELOPMENT!

import "./styles/App.css";
import {
  Register,
  Login,
  Profile,
  UpdateDetails,
  UpdatePassword,
  UpdateAppearance,
  Dashboard,
  TaskDetails,
  Home,
} from "./pages/index.pages";
import { Header } from "./components/index.components.js";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const ProtectedRoute = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
      return <Navigate to="/users/login" replace />;
    }

    return <Outlet />;
  };
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES: Accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />

        {/* PROTECTED AREA: Uses the wrapper to secure all child routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/users/me">
            <Route index element={<Profile />} /> {/* Renders for /users/me */}
            <Route path="details" element={<UpdateDetails />} />{" "}
            {/* Renders for /users/me/details */}
            <Route path="password" element={<UpdatePassword />} />
            <Route path="appearance" element={<UpdateAppearance />} />
          </Route>

          <Route path="/users/me/dashboard">
            <Route index element={<Dashboard />} />{" "}
            {/* Renders for /users/me/dashboard */}
            <Route path=":taskId" element={<TaskDetails />} />{" "}
            {/* Renders for /users/me/dashboard/:taskId */}
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
