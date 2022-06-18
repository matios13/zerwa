import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import { AppBarComponent } from './components/AppBar/AppBarComponent';
import { AuthProvider } from './firebase/firebaseAuth';
import { SecurityRole } from './models/UserData';
import { AdminEditPage } from './pages/admin/AdminEditPage';
import { Hompepage } from './pages/homepage/Homepage';
import Login from './pages/login/Login';
import { UserDetailsPage } from './pages/user/UserDetailsPage';
import PrivateRoute from './PrivateRoute';
import { theme } from './Theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <BrowserRouter>
            <Routes>
              <Route path="/Login" element={<Login />} />
              <Route path="/*" element={
                <PrivateRoute>
                  <AppBarComponent />
                  <Routes>
                    <Route path="/" element={<Hompepage />} />
                    <Route path="/user-details" element={<UserDetailsPage />} />
                  </Routes >
                </PrivateRoute>} />
              <Route path="/admin" element={
                <PrivateRoute role={SecurityRole.ADMIN}>
                  <AppBarComponent />
                  <AdminEditPage />
                </PrivateRoute>} />
            </Routes>
          </BrowserRouter>
        </LocalizationProvider>
      </AuthProvider>
    </ThemeProvider >
  );
}

export default App;
