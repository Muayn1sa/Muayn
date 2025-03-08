import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { useTheme } from '@mui/material/styles';

function Login() {
  const navigate = useNavigate();
  const { login, currentUser, resetPassword } = useAuth();
  const [error, setError] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [openResetDialog, setOpenResetDialog] = useState(false);
  const [resetMessage, setResetMessage] = useState('');
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  React.useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!formData.email || !formData.password) {
      setError('الرجاء إدخال جميع البيانات المطلوبة');
      return;
    }
  
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        const currentUserData = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUserData) {
          if (currentUserData.subscription === 'شريك مُعين') {
            console.log('User has شريك مُعين membership');
            // You can add additional logic here if needed
          }
          navigate('/', { replace: true });
        } else {
          setError('حدث خطأ أثناء تسجيل الدخول');
        }
      } else {
        setError('البريد الإلكتروني أو كلمة المرور غير صحيحة');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('حدث خطأ أثناء تسجيل الدخول');
    }
  };

  const handleResetPassword = async () => {
    try {
      await resetPassword(resetEmail);
      setResetMessage('تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني');
      setTimeout(() => {
        setOpenResetDialog(false);
        setResetMessage('');
      }, 3000);
    } catch (error) {
      setResetMessage('حدث خطأ أثناء إرسال رابط إعادة التعيين');
    }
  };

  const textFieldStyle = {
    '& .MuiInputBase-root': {
      height: 'auto',
      color: isDarkMode ? 'white' : '#333',
      backgroundColor: isDarkMode ? '#2A2B32' : '#f5f5f5',
      fontWeight: 600,
      borderRadius: '8px',
    },
    '& .MuiInputBase-input': { 
      color: isDarkMode ? 'white' : '#333',
      direction: 'rtl',
      padding: '16px',
      textAlign: 'right',
      fontWeight: 600
    },
    '& .MuiInputLabel-root': { 
      color: isDarkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
      right: 25,
      left: 'auto',
      transformOrigin: 'right top',
      position: 'absolute',
      fontWeight: 600,
      zIndex: 1
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { 
        borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
        borderRadius: '8px',
      },
      '&:hover fieldset': { 
        borderColor: '#147a5c',
      },
      '&.Mui-focused fieldset': { 
        borderColor: '#147a5c',
        borderWidth: '2px',
      }
    },
    marginBottom: '16px'
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 12,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: isDarkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          padding: 4,
          borderRadius: 2,
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        }}
      >
        {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}
        
        <TextField
          margin="normal"
          required
          fullWidth
          label="البريد الإلكتروني"
          name="email"
          autoComplete="email"
          autoFocus
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          sx={textFieldStyle}
        />
        
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="كلمة المرور"
          type="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          sx={textFieldStyle}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: '#147a5c',
            fontSize: { xs: '1rem', sm: '1.1rem' },
            py: { xs: 1.5, sm: 2 },
            '&:hover': {
              bgcolor: '#0d8c6d'
            }
          }}
        >
          دخول
        </Button>

        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Button
            component={Link}
            to="/register"
            fullWidth
            variant="outlined"
            sx={{
              color: '#147a5c',
              borderColor: '#147a5c',
              '&:hover': {
                borderColor: '#0d8c6d',
                bgcolor: 'rgba(20, 122, 92, 0.1)'
              }
            }}
          >
            تسجيل حساب جديد
          </Button>

          <Button
            onClick={() => setOpenResetDialog(true)}
            sx={{
              color: '#147a5c',
              '&:hover': {
                bgcolor: 'rgba(20, 122, 92, 0.1)'
              }
            }}
          >
            نسيت كلمة المرور؟
          </Button>
        </Box>
      </Box>

      <Dialog open={openResetDialog} onClose={() => setOpenResetDialog(false)}>
        <DialogTitle sx={{ textAlign: 'center' }}>استعادة كلمة المرور</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="البريد الإلكتروني"
            type="email"
            fullWidth
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            sx={textFieldStyle}
          />
          {resetMessage && (
            <Alert severity={resetMessage.includes('خطأ') ? 'error' : 'success'} sx={{ mt: 2 }}>
              {resetMessage}
            </Alert>
          )}
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
          <Button onClick={() => setOpenResetDialog(false)} sx={{ color: '#666' }}>
            إلغاء
          </Button>
          <Button onClick={handleResetPassword} variant="contained" sx={{ bgcolor: '#147a5c', '&:hover': { bgcolor: '#0d8c6d' } }}>
            إرسال رابط الاستعادة
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Login;