import React, { useState } from "react";
import {
  Routes,
  Route,
  Link,
  useLocation,
  useNavigate,
  Navigate,
  Outlet,
} from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Layout from "./components/layout/Layout.jsx";
import Register from "./pages/Register.jsx";
import ErrorPage from "./error-page.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import SurveyBuilder from "./pages/SurveyBuilder.jsx";

import { AuthProvider } from "./context/auth/AuthContext";
import { SurveyBuilderProvider } from "./context/SurveyBuilderContext";
import { FocusProvider } from "./context/FocusContext.jsx";

export default function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/create-survey"
              element={
                <SurveyBuilderProvider>
                  <FocusProvider>
                    <SurveyBuilder />
                  </FocusProvider>
                </SurveyBuilderProvider>
              }
            />
          </Route>
        </Routes>
      </AuthProvider>
    </>
  );
}
