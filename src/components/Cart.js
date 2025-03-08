import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Card, Button, Grid, TextField, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useAuth } from '../auth/AuthContext';

function PaymentPage() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [isPartnerMember, setIsPartnerMember] = useState(false);
  const { currentUser, setCurrentUser } = useAuth();

  // تحميل بيانات المستخدم من localStorage عند فتح الصفحة
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, [setCurrentUser]);

  const subscription = () => {
    alert('تمت معالجة الاشتراك! لقد تم منحك اشتراك شريك مُعين.');
    grantTemporaryMembership();
  };

  const grantTemporaryMembership = () => {
    setIsPartnerMember(true);
    
    if (currentUser) {
      const updatedUser = { ...currentUser, subscription: 'شريك مُعين' };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser)); // Save to localStorage
    } else {
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: isDarkMode ? '#202123' : '#f5f5f5', pt: { xs: 8, sm: 10 }, pb: 4 }}>
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ textAlign: 'center', mb: 4, color: isDarkMode ? '#FFFFFF' : '#1a1a1a', fontWeight: 'bold' }}>
          ملخص الطلب
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, bgcolor: isDarkMode ? '#2d2d2d' : '#ffffff' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>ملخص الطلب</Typography>
              <Divider sx={{ mb: 2 }} />
              <Typography>مُعَين بيسك</Typography>
              <Typography sx={{ color: '#10a37f', fontWeight: 'bold', my: 1 }}>49 ريال</Typography>
              <Typography>المجموع الفرعي: 49 ريال</Typography>
              <Typography>المجموع: 49 ريال</Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 4, bgcolor: isDarkMode ? '#2d2d2d' : '#ffffff' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>الدفع</Typography>
              <Divider sx={{ mb: 2 }} />
              <TextField fullWidth label="رقم البطاقة" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label="تاريخ الانتهاء" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label="CVC/CVV" value={cvc} onChange={(e) => setCvc(e.target.value)} sx={{ mb: 2 }} />
              <TextField fullWidth label="الاسم على البطاقة" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} sx={{ mb: 2 }} />
              <Button fullWidth variant="contained" onClick={subscription} sx={{ bgcolor: '#10a37f', color: '#FFFFFF', '&:hover': { bgcolor: '#0d8c6d' } }}>
                إرسال الدفع
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default PaymentPage;