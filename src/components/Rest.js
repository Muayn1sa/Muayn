import React, { useState, useRef } from 'react';
import { Box, Typography, Container, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

function Rest() {
  const form = useRef();
  const { currentUser } = useAuth();  // حذف updatePassword
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    if (!passwords.currentPassword || !passwords.newPassword || !passwords.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'جميع الحقول مطلوبة',
        severity: 'error'
      });
      return false;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'كلمة المرور الجديدة غير متطابقة',
        severity: 'error'
      });
      return false;
    }

    // التحقق من طول كلمة المرور
    if (passwords.newPassword.length < 8) {
      setSnackbar({
        open: true,
        message: 'كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل',
        severity: 'error'
      });
      return false;
    }

    // التحقق من وجود حرف كبير
    if (!/[A-Z]/.test(passwords.newPassword)) {
      setSnackbar({
        open: true,
        message: 'كلمة المرور يجب أن تحتوي على حرف كبير واحد على الأقل',
        severity: 'error'
      });
      return false;
    }

    // التحقق من وجود رمز خاص
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwords.newPassword)) {
      setSnackbar({
        open: true,
        message: 'كلمة المرور يجب أن تحتوي على رمز خاص واحد على الأقل',
        severity: 'error'
      });
      return false;
    }

    return true;
  };
  const sendPasswordByEmail = async (email, newPassword) => {
    try {
      const templateParams = {
        to_email: email,
        to_name: currentUser.name,
        new_password: newPassword,
      };
      await emailjs.send(
        'service_9nj0w2d',
        'Temp_m3en_team',
        templateParams,
        '-KiITHe5B1-5C3l1k'
      );
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('فشل في إرسال البريد الإلكتروني');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userIndex = users.findIndex(u => u.email === currentUser.email);
      
      if (userIndex === -1) {
        throw new Error('المستخدم غير موجود');
      }

      if (users[userIndex].password !== passwords.currentPassword) {
        setSnackbar({
          open: true,
          message: 'كلمة المرور الحالية غير صحيحة',
          severity: 'error'
        });
        return;
      }

      // تحديث كلمة المرور
      users[userIndex].password = passwords.newPassword;
      localStorage.setItem('users', JSON.stringify(users));
      
      const updatedCurrentUser = { ...currentUser, password: passwords.newPassword };
      localStorage.setItem('currentUser', JSON.stringify(updatedCurrentUser));
      
      // إرسال كلمة المرور الجديدة عبر البريد الإلكتروني
      await sendPasswordByEmail(currentUser.email, passwords.newPassword);
      
      setSnackbar({
        open: true,
        message: 'تم تغيير كلمة المرور بنجاح وإرسالها إلى بريدك الإلكتروني',
        severity: 'success'
      });

      setTimeout(() => {
        navigate('/profile');
      }, 2000);

    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message || 'حدث خطأ أثناء تغيير كلمة المرور',
        severity: 'error'
      });
    }
  };
  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const commonTextFieldStyle = {
    '& .MuiInputBase-root': {
      height: 'auto',
      color: 'white',
      backgroundColor: 'rgba(255, 255, 255, 0.05)'
    },
    '& .MuiInputBase-input': { 
      color: 'white',
      direction: 'rtl',
      padding: '16px',
      textAlign: 'right'
    },
    '& .MuiInputLabel-root': { 
      color: 'rgba(255, 255, 255, 0.7)',
      right: 25,
      left: 'auto',
      transformOrigin: 'right top',
      position: 'absolute'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { 
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '8px'
      },
      '&:hover fieldset': { 
        borderColor: 'white' 
      },
      '&.Mui-focused fieldset': { 
        borderColor: '#00A783',
        borderWidth: '1px'
      }
    },
    '& .MuiOutlinedInput-notchedOutline': {
      textAlign: 'right',
      direction: 'rtl'
    },
    marginBottom: '16px'
  };
  return (
    <Container component="main" maxWidth="sm">
      <Box sx={{
        marginTop: 6,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(32, 33, 35, 0.5)',
        borderRadius: '16px',
        padding: '32px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <Typography component="h1" variant="h4" sx={{ 
          color: 'white', 
          mb: 4,
          fontWeight: 700,
          fontSize: '2rem'
        }}>
          تغيير كلمة المرور
        </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%', mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          name="currentPassword"
          label="كلمة المرور الحالية"
          type="password"
          value={passwords.currentPassword}
          onChange={handleChange}
          sx={commonTextFieldStyle}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label="كلمة المرور الجديدة"
          type="password"
          value={passwords.newPassword}
          onChange={handleChange}
          sx={commonTextFieldStyle}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          label="تأكيد كلمة المرور الجديدة"
          type="password"
          value={passwords.confirmPassword}
          onChange={handleChange}
          sx={commonTextFieldStyle}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            bgcolor: '#00A783',
            '&:hover': {
              bgcolor: '#009975'
            }
          }}
        >
          تغيير كلمة المرور
        </Button>
      </Box>
    </Box>

      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%', direction: 'rtl' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Rest;