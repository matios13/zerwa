import React from 'react';
import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './Theme';
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Login from './pages/login/Login';
import PrivateRoute from './PrivateRoute';
import { Hompepage } from './pages/homepage/Homepage';
import { AuthProvider } from './firebase/firebaseAuth';
import { SecurityRole } from './models/UserData';
import { AdminEditPage } from './pages/admin/AdminEditPage';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import {  LocalizationProvider } from '@mui/x-date-pickers';
import { UserDetailsPage } from './pages/user/UserDetailsPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <BrowserRouter>
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/" element={<PrivateRoute>
                <Hompepage />
              </PrivateRoute>} />
              <Route path="/user-details" element={<PrivateRoute>
                <UserDetailsPage />
              </PrivateRoute>} />
              <Route path="/admin" element={<PrivateRoute role={SecurityRole.ADMIN}>
                <AdminEditPage />
              </PrivateRoute>} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
