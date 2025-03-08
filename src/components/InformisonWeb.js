import React from 'react';
import { Box, Typography, Container, List, ListItem, ListItemText, Button } from '@mui/material';
import { useTheme } from '@mui/material/styles'; // Import useTheme
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Informison() {
  const theme = useTheme(); // Use the theme
  const navigate = useNavigate();
  const { currentUser } = useAuth(); 
  const handleTryNow = () => {
    if (!currentUser) {
      navigate('/LoginP');
    } else {
      navigate('/cart'); // Navigate to cart page
    }
  };

  return (
    <Box 
      component="main"
      sx={{ 
        minHeight: '100vh',
        bgcolor: theme.palette.background.default, // Use theme's background color
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: 8, sm: 10 },
        px: { xs: 2, sm: 4 }
      }}
    >
      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'right', // Align text to the right
            mb: { xs: 3, sm: 5 },
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 'bold',
            color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' // Adjust text color
          }}
        >
          تعرف على مُعَين – رفيقك نحو الوظيفة
        </Typography>

        <Typography 
          variant="h5" 
          sx={{ 
            textAlign: 'right', // Align text to the right
            mb: 2,
            fontWeight: 'bold',
            color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' // Adjust text color
          }}
        >
          وش فكرة مُعَين؟
        </Typography>
        <Typography sx={{ textAlign: 'right', mb: 4, color: theme.palette.mode === 'dark' ? '#E0E0E0' : '#666666' }}>
          مُعَين منصة سعودية تستخدم الذكاء الاصطناعي لمساعدة العاطلين في إيجاد الوظيفة المناسبة بدون تعب. نبحث عن الوظائف بدلاً منك ونخاويك حتى تلقى وظيفتك.
        </Typography>

        <Typography 
          variant="h5" 
          sx={{ 
            textAlign: 'right', // Align text to the right
            mb: 2,
            fontWeight: 'bold',
            color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' // Adjust text color
          }}
        >
          كيف نشتغل؟
        </Typography>
        <List sx={{ mb: 4 }}>
          <ListItem>
            <ListItemText 
              primary="تحليل السيرة الذاتية"
              secondary="أول ما تسجل في مُعَين وترفع سيرتك الذاتية، الذكاء الاصطناعي يقرأ بياناتك مثل المؤهل، الخبرات، والمهارات."
              primaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' }}
              secondaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#E0E0E0' : '#666666' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="بحث عن وظائف"
              secondary="نبحث كل يوم عن الوظائف اللي تناسب مؤهلاتك في المواقع الكبرى مثل (LinkedIn، وظايف دوت كوم، ومواقع الشركات)."
              primaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' }}
              secondaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#E0E0E0' : '#666666' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="تقرير يومي على واتساب"
              secondary="تجيك رسالة يومية فيها قائمة بالوظائف اللي تناسبك مع روابط التقديم مباشرة."
              primaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' }}
              secondaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#E0E0E0' : '#666666' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="مُعَين VIP 🔥"
              secondary="لو اشتركت في الباقة VIP، ما تحتاج حتى تقدم! مُعَين يرسل سيرتك الذاتية للشركات ويتابع عنك حتى يجيك رد."
              primaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' }}
              secondaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#E0E0E0' : '#666666' }}
            />
          </ListItem>
        </List>

        <Typography 
          variant="h5" 
          sx={{ 
            textAlign: 'right', // Align text to the right
            mb: 2,
            fontWeight: 'bold',
            color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' // Adjust text color
          }}
        >
          كيف الطريقة؟
        </Typography>
        <List sx={{ mb: 4 }}>
          <ListItem>
            <ListItemText 
              primary="اشترك في مُعَين عبر الصفحة الرئيسية."
              primaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="رفع سيرتك الذاتية."
              primaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="استلم تقاريرك اليومية على واتساب."
              primaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' }}
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="إذا اشتركت في VIP، خلنا نخدمك من الألف إلى الياء."
              primaryTypographyProps={{ textAlign: 'right', color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' }}
            />
          </ListItem>
        </List>

        <Typography 
          variant="h6" 
          sx={{ 
            textAlign: 'right', // Align text to the right
            fontWeight: 'bold',
            color: theme.palette.mode === 'dark' ? '#FFFFFF' : '#1a1a1a' // Adjust text color
          }}
        >
          مُعَين... نخاويك لين تلقى وظيفتك 
        </Typography>

        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 6,
          mb: 4 
        }}>
          <Button
            variant="contained"
            onClick={handleTryNow}
            sx={{
              bgcolor: '#147a5c',
              color: '#FFFFFF',
              fontSize: '1.2rem',
              py: 2,
              px: 4,
              borderRadius: 2,
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              '&:hover': {
                bgcolor: '#0d8c6d',
                transform: 'translateY(-3px)',
                boxShadow: '0 4px 20px rgba(20, 122, 92, 0.4)'
              }
            }}
          >
           مستعد تجرب وتشوف النتيجة؟
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default Informison;