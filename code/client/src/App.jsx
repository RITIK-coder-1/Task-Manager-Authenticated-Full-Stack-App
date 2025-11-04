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
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

function App() {
  return (
    <>
      <Routes>
        {/* PUBLIC ROUTES: Accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />

        {/* PROTECTED AREA: Uses the wrapper to secure all child routes */}
        <Route element={<ProtectedRoute />}>
          {/* All the renders for /users/me */}
          <Route path="/users/me">
            <Route index element={<Profile />} />
            <Route path="details" element={<UpdateDetails />} />
            <Route path="password" element={<UpdatePassword />} />
            <Route path="appearance" element={<UpdateAppearance />} />

            {/* Renders for /users/me/dashboard */}
            <Route path="dashboard">
              <Route index element={<Dashboard />} />
              <Route path=":taskId" element={<TaskDetails />} />
            </Route>
          </Route>
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
