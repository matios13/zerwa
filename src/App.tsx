import React from 'react';
import logo from './logo.svg';
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


function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<Login />} />
            <Route path="/" element={<PrivateRoute>
              <Hompepage />
            </PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
