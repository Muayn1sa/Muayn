import React, { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Paper, Snackbar, Alert, useTheme } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useMessages } from '../context/MessageContext';  // تأكد من المسار الصحيح

function Callus() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const { addMessage } = useMessages(); // استخدام addMessage من Context

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'الرجاء إدخال الاسم';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'الرجاء إدخال البريد الإلكتروني';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'الرجاء إدخال رقم الجوال';
    } else if (!/^(05|5)[0-9]{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'رقم الجوال غير صحيح';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'الرجاء إدخال عنوان الرسالة';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'الرجاء إدخال نص الرسالة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Send the message to the server using an HTTP request
      const response = await fetch('/api/send-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        addMessage(formData);

        setSnackbar({
          open: true,
          message: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً',
          severity: 'success'
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      } else {
        throw new Error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setSnackbar({
        open: true,
        message: 'عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى',
        severity: 'error'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: isDarkMode ? '#202123' : '#f5f5f5', py: 8 }}>
      <Container maxWidth="lg">
        <Typography variant="h3" sx={{ mb: 4, textAlign: 'center' }}>
          تواصل معنا
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 4 }}>أرسل لنا رسالة</Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="الاسم"
                  name="name"
                  variant="outlined"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="البريد الإلكتروني"
                  name="email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="رقم الجوال"
                  name="phone"
                  variant="outlined"
                  value={formData.phone}
                  onChange={handleChange}
                  error={Boolean(errors.phone)}
                  helperText={errors.phone}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="عنوان الرسالة"
                  name="subject"
                  variant="outlined"
                  value={formData.subject}
                  onChange={handleChange}
                  error={Boolean(errors.subject)}
                  helperText={errors.subject}
                  sx={{ mb: 3 }}
                />
                <TextField
                  fullWidth
                  label="نص الرسالة"
                  name="message"
                  variant="outlined"
                  value={formData.message}
                  onChange={handleChange}
                  error={Boolean(errors.message)}
                  helperText={errors.message}
                  multiline
                  rows={4}
                  sx={{ mb: 3 }}
                />
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  endIcon={isSubmitting ? null : <SendIcon />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                </Button>
              </form>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 2 }}>معلومات التواصل</Typography>
              <Typography sx={{ mb: 1 }}>الهاتف: +966 123 456 789</Typography>
              <Typography sx={{ mb: 1 }}>البريد الإلكتروني: info@example.com</Typography>
              <Typography sx={{ mb: 1 }}>العنوان: شارع الملك فهد، الرياض، السعودية</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Callus;