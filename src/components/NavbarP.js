import React, { useState, useEffect } from 'react';  // Add useEffect here
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, IconButton, Button, Badge } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function Navbar() {
  const { currentUser, logout } = useAuth();  // Add cart here
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate('/');
  };

  const scrollToMemberships = () => {
    const element = document.getElementById('memberships');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#memberships');
    }
  };

  return (
    <AppBar 
          position="fixed" 
          sx={{
            background: 'linear-gradient(to right, rgba(20, 122, 92, 0.85), rgba(13, 140, 109, 0.85))',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            boxShadow: '0 8px 32px rgba(20, 122, 92, 0.2)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              background: 'linear-gradient(to right, rgba(20, 122, 92, 0.9), rgba(13, 140, 109, 0.9))',
              boxShadow: '0 10px 40px rgba(20, 122, 92, 0.25)',
            }
          }}
        >
          <Toolbar sx={{ 
            flexDirection: 'row-reverse', 
            px: { xs: 1, sm: 4 },
            py: 0.5, // تقليل المسافة العمودية
            minHeight: '50px', // تقليل الارتفاع الأدنى
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography
              variant="h6"
              component={Link}
              to="/"
              sx={{
                textDecoration: 'none',
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 'auto',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                letterSpacing: '1px',
                position: 'relative',
                transform: 'perspective(1px) translateZ(0)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  color: 'rgba(255, 255, 255, 0.9)',
                  transform: 'scale(1.05)',
                  textShadow: '0 0 15px rgba(255, 255, 255, 0.3)'
                }
              }}
            >
              مُعَين 
            </Typography>

        <Box sx={{ display: 'flex', gap: { xs: 1, sm: 2 } }}>
          {!currentUser ? (
            <>
              <Button
                component={Link}
                to="/register"
                sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                تسجيل
              </Button>
              <Button
                component={Link}
                to="/loginP"
                sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                دخول
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={handleMenu}
                sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' } }}
                startIcon={<AccountCircleIcon />}
              >
                {currentUser.name || currentUser.fullName}
              </Button>
             

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                {!currentUser && (
                  <>
                    <MenuItem
                      component={Link}
                      to="/loginP"
                      onClick={handleClose}
                    >
                      دخول
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/register"
                      onClick={handleClose}
                    >
                      تسجيل
                    </MenuItem>
                  </>
                )}
                <MenuItem
                  component={Link}
                  to="/profile"
                  onClick={handleClose}
                >
                  الملف الشخصي
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/rest');
                  }}
                >
                  تغيير كلمة المرور
                </MenuItem>
                <MenuItem onClick={handleLogout}>خروج</MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    navigate('/informisonWeb');
                  }}
                >
                  حول
                </MenuItem>
                {currentUser?.email === 'muayn.sa@gmail.com' && (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate('/manger');
                    }}
                  >
                    إدارة
                  </MenuItem>
                )}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;