import React, { useState, useMemo, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth/AuthContext';
import { MessageProvider } from './context/MessageContext';
import createCustomTheme from './theme/theme';
import NavbarP from './components/NavbarP';
import Faq from './components/faq';
import Rest from './components/Rest';
import LoginP from './components/LoginP';
import Cart from './components/Cart';
import Home from './components/Home';
import Profile from './components/Profile';
import Cvmaker from './components/Cvmaker';
import Law from './components/Law';
import Works from './components/Works';
import InformisonWeb from './components/InformisonWeb';
import Callus from './components/Callus';
import Manger from './components/Manger';
import Registers from './components/Registers';



// Protected Route Component
function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();
  const location = useLocation();

  if (!currentUser) {
    return <Navigate to="/LoginP" state={{ from: location }} replace />;
  }

  return children;
}

function AppContent() {
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'dark';
  });

  const theme = useMemo(() => createCustomTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        position: 'relative'
      }}>
        <NavbarP />
        <Box component="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/LoginP" element={<LoginP />} />
            <Route path="/register" element={<Registers />} />
            <Route path="/cvmaker" element={<ProtectedRoute><Cvmaker /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="/rest" element={<ProtectedRoute><Rest /></ProtectedRoute>} />
            <Route path="/law" element={<Law />} />
            <Route path="/InformisonWeb" element={<InformisonWeb />} />
            <Route path="/Callus" element={<Callus />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/works" element={<Works />} />
            <Route path="/manger" element={<Manger />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}



function App() {
  return (
    <AuthProvider>
      <MessageProvider>
        <Router>
          <AppContent />
        </Router>
      </MessageProvider>
    </AuthProvider>
  );
}

export default App;
