import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Container, Alert, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    nationality: 'سعودي' // Default to "سعودي"
  });
  // Define the validateEmail function
  const validateEmail = (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.email === email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const nameRegex = /^[\u0600-\u06FF\s]+$/; // Regex for Arabic letters and spaces
    const nameWords = formData.fullName.trim().split(/\s+/);

    if (formData.fullName.length < 3) {
      setError('الاسم يجب أن يكون على الأقل 3 حروف');
      return;
    }
    if (!nameRegex.test(formData.fullName)) {
      setError('الاسم يجب أن يكون باللغة العربية وبدون أرقام');
      return;
    }
    if (nameWords.length < 3) {
      setError('الرجاء إدخال الاسم الثلاثي كاملاً');
      return;
    }
    if (validateEmail(formData.email)) {
      setError('البريد الإلكتروني مسجل مسبقاً');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    }
    if (!formData.phone.startsWith('5') || formData.phone.length !== 9) {
      setError('رقم الجوال غير صحيح');
      return;
    }
    const userData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      nationality: formData.nationality // Include nationality in user data
    };
    try {
      const success = await register(userData);
      if (success) {
        navigate('/');
      }
    } catch (err) {
      console.error(err);
      setError('Registration failed');
    }
    try {
      const response = await axios.post('/api/users', userData, { // Use relative path
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.status === 201) {
        navigate('/');
      }
    } catch (error) {
      setError('يرجى التاكد من المعلومات');
    }
  };
  const textFieldStyle = {
    '& .MuiInputBase-input': { 
      color: 'white',
      fontSize: { xs: '0.875rem', sm: '1rem' },
    },
    '& .MuiInputLabel-root': { 
      color: 'white',
      fontSize: { xs: '0.875rem', sm: '1rem' },
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': { 
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '8px',
      },
      '&:hover fieldset': { 
        borderColor: 'rgba(255, 255, 255, 0.5)',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00A783',
      }
    },
    marginBottom: '16px'
  };
  const buttonStyle = {
    bgcolor: '#00A783',
    color: '#FFFFFF',
    fontSize: { xs: '1rem', sm: '1.1rem' },
    py: { xs: 1, sm: 1.5 },
    borderRadius: 2,
    textTransform: 'none',
    '&:hover': {
      bgcolor: '#009975'
    }
  };
  return (
    <Container component="main" maxWidth="sm" sx={{ px: { xs: 2, sm: 3 } }}>
      <Box sx={{
        marginTop: { xs: 10, sm: 12, md: 14 }, // زيادة الهامش العلوي
        marginBottom: { xs: 4, sm: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(32, 33, 35, 0.5)',
        borderRadius: '16px',
        padding: { xs: '20px', sm: '32px', md: '40px' },
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: { xs: '100%', sm: '450px' },
        mx: 'auto'
      }}>
        <Typography 
          component="h1" 
          variant="h4" 
          sx={{ 
            color: 'white', 
            mb: { xs: 3, sm: 4 }, 
            fontWeight: 600, 
            fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' } 
          }}
        >
          تسجيل جديد
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="الاسم الثلاثي"
            name="fullName"
            autoFocus
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            sx={textFieldStyle}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            label="البريد الإلكتروني"
            name="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            sx={textFieldStyle}
          />

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography sx={{ color: 'white', fontSize: { xs: '0.875rem', sm: '1rem' }, width: '55px' }}>
              +966
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="رقم الجوال"
              name="phone"
              value={formData.phone.replace('+966', '')}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                setFormData({ ...formData, phone: '' + value });
              }}
              sx={textFieldStyle}
              inputProps={{ maxLength: 9 }}
            />
          </Box>

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="كلمة المرور"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: 'white' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="تأكيد كلمة المرور"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            sx={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                    sx={{ color: 'white' }}
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <RadioGroup
            row
            value={formData.nationality}
            onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
            sx={{ mb: 2 }}
          >
            <FormControlLabel value="سعودي" control={<Radio />} label="سعودي" />
            <FormControlLabel value="غير سعودي" control={<Radio />} label="غير سعودي" />
          </RadioGroup>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              ...buttonStyle,
              mt: 3,
              mb: 2
            }}
          >
            تسجيل
          </Button>

          <Box sx={{ textAlign: 'center', mt: 1 }}>
            <Button
              component={Link}
              to="/loginP"
              sx={{
                color: '#00A783',
                textDecoration: 'none',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                '&:hover': {
                  color: '#009975',
                  textDecoration: 'underline'
                }
              }}
            >
              هل لديك حساب؟ سجل دخول
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
