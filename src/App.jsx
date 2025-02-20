import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React, { useState } from "react";
import ClinicalData from "./pages/ClinicalData";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Patient from "./pages/Patient";
import Reports from "./pages/Reports";
import MainLayout from "./layouts/MainLayout";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Route */}
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              isAuthenticated={isAuthenticated}
            />
          }
        />

        {/* Protected Route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <MainLayout
                isAuthenticated={isAuthenticated}
                setIsAuthenticated={setIsAuthenticated}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="/Patient" element={<Patient />} />
          <Route path="/Reports" element={<Reports />} />
          <Route path="/ClinicalData" element={<ClinicalData />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
