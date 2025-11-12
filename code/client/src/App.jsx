/* ---------------------------------------------------------------------------
App.jsx
This is the root application that hosts all the app pages 
------------------------------------------------------------------------------ */

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
import NotFound from "./pages/notFoundPage/NotFound.jsx";

function App() {
  return (
    <>
      {/* The Routing System */}
      <Routes>
        {/* PUBLIC ROUTES: Accessible to everyone */}
        <Route path="/" element={<Home />} />
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<Login />} />

        {/* PROTECTED AREA: Uses the wrapper to secure all the child routes */}
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
