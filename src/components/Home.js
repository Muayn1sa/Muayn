import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  Accordion, 
  AccordionSummary, 
  AccordionDetails,
  Divider
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { Link } from 'react-router-dom'; // Add this import
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { 
  Stack,
  IconButton
} from '@mui/material';

function Home() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();



  const handleExploreMore = () => {
    if (currentUser?.subscription) {
    } else {
      navigate('/InformisonWeb'); 
    }
  };

  const handleSubscribe = () => {
    if (currentUser) {
      navigate('/Cart');
    } else {
      navigate('/LoginP'); 
    }
  };



  return (
    <Box 
      component="main"
      sx={{ 
        minHeight: '100vh',
        bgcolor: '#121212',
        display: 'flex',
        flexDirection: 'column',
        pt: { xs: 8, sm: 5 },
        fontFamily: 'GE SS Unique, Tajawal, sans-serif',
        fontSize: { xs: '14px', sm: '16px' },
        position: 'relative',
        overflow: 'hidden',
        direction: 'rtl' // Set direction to RTL
      }}
    >
      {/* Video Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(5px)'
          }
        }}
      >
        <video
          autoPlay
          muted
          loop
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/videos/background.mp4" type="video/mp4" />
        </video>
      </Box>

      {/* Main Content */}
      <Container 
        maxWidth={false} 
        sx={{ 
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh', // تغطية كامل ارتفاع الشاشة
          display: 'flex',
          alignItems: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(20, 122, 92, 0.2) 0%, rgba(0, 0, 0, 0) 70%)',
            zIndex: -1
          }
        }}
      >
        <Box sx={{ 
          textAlign: 'center',
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%',
          pt: { xs: 0, sm: 0 }, // إزالة الهامش العلوي
          pb: { xs: 0, sm: 0 } // إزالة الهامش السفلي
        }}>
          <Box
            component="img"
            src="/logo.png"
            alt="Moeen Logo"
            sx={{
              width: { xs: '150px', sm: '200px', md: '220px' }, // Adjust logo size for different devices
              height: 'auto',
              marginBottom: { xs: 4, sm: 6 }, // Adjust spacing for mobile and desktop
              marginX: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
              animation: 'logoFloat 3s ease-in-out infinite',
              '@keyframes logoFloat': {
                '0%': {
                  transform: 'translateY(0) scale(1)',
                  filter: 'drop-shadow(0 4px 8px rgba(20, 122, 92, 0.3))'
                },
                '50%': {
                  transform: 'translateY(-10px) scale(1.05)',
                  filter: 'drop-shadow(0 15px 15px rgba(20, 122, 92, 0.4))'
                },
                '100%': {
                  transform: 'translateY(0) scale(1)',
                  filter: 'drop-shadow(0 4px 8px rgba(20, 122, 92, 0.3))'
                }
              },
              '&:hover': {
                animation: 'logoGlow 1.5s ease-in-out infinite',
                cursor: 'pointer'
              },
              '@keyframes logoGlow': {
                '0%': {
                  filter: 'drop-shadow(0 0 5px rgba(20, 122, 92, 0.5))'
                },
                '50%': {
                  filter: 'drop-shadow(0 0 20px rgba(20, 122, 92, 0.8))'
                },
                '100%': {
                  filter: 'drop-shadow(0 0 5px rgba(20, 122, 92, 0.5))'
                }
              }
            }}
          />
          <Typography
            component="h1"
            sx={{
              fontFamily: 'GE SS Unique, sans-serif',
              fontSize: { xs: '2rem', sm: '3rem', md: '3.5rem' },
              fontWeight: 700,
              mb: { xs: 2, sm: 3, md: 4 },
              color: '#FFFFFF',
              lineHeight: 1.2,
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -20,
                left: '50%',
                width: { xs: 80, sm: 100 }, // Adjust underline width for mobile and desktop
                height: 4,
                background: 'linear-gradient(90deg, #147a5c, #4CAF50, #147a5c)',
                animation: 'shimmer 2s infinite',
                borderRadius: 2,
                transform: 'translateX(-50%)',
              }
            }}
          >
            مرحبًا بك في مُعَين
          </Typography>

          <Typography
            sx={{
              fontFamily: 'GE SS Unique, sans-serif',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.5rem' },
              mb: { xs: 3, sm: 5 },
              color: '#E0E0E0',
              lineHeight: 1.9,
              maxWidth: '800px',
              mx: 'auto'
            }}
          >
            نقربك من وظيفتك المثالية بأحدث تقنيات الذكاء الاصطناعي - لأن مستقبلك يستحق الأفضل
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={handleExploreMore}
            sx={{
              bgcolor: '#147a5c',
              color: '#FFFFFF',
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem' },
              py: { xs: 1.5, sm: 2 },
              px: { xs: 4, sm: 6 },
              borderRadius: 2,
              textTransform: 'none',
              maxWidth: { xs: '300px', sm: '400px' },
              mx: 'auto',
              mb: { xs: 12, sm: 20 },
              boxShadow: '0 4px 12px rgba(20, 122, 92, 0.3)',
              '&:hover': {
                bgcolor: '#0d8c6d',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(20, 122, 92, 0.4)'
              },
              transition: 'all 0.3s ease'
            }}
          >
            {currentUser?.subscription === 'شريك مُعين' ? 'ارفع السيرة الذاتية الخاصة بك' : 'تعرف على المزيد'}
          </Button>

      

        </Box>
      </Container>

      {/* Vision Section starts here */}
      <Box
        sx={{
          width: '100%',
          bgcolor: '#121212',
          py: { xs: 8, sm: 5 }, // زيادة المسافات العمودية
          overflow: 'hidden',
          position: 'relative',
          color: '#ffffff',
          mb: 4,
          borderTop: '1px solid rgba(20, 122, 92, 0.3)',
          borderBottom: '1px solid rgba(20, 122, 92, 0.3)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(20, 122, 92, 0.1) 0%, rgba(0, 0, 0, 0) 70%)',
            zIndex: 1
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Typography
            variant="h3"
            sx={{ 
              textAlign: 'center', 
              mb: { xs: 4, sm: 6 },
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3.2rem' },
              fontWeight: 800,
              color: '#ffffff',
              position: 'relative',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -16,
                left: '50%',
                width: { xs: 60, sm: 80, md: 100 }, // Adjust underline width for mobile and desktop
                height: 4,
                background: 'linear-gradient(90deg, #147a5c, #4CAF50, #147a5c)',
                animation: 'shimmer 2s infinite',
                borderRadius: 2,
                transform: 'translateX(-50%)',
              }
            }}
          >
            رؤية وطنية، مستقبل رقمي
          </Typography>

          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7} sx={{ order: { xs: 2, md: 1 } }}>
              <Box sx={{ 
                p: { xs: 2, sm: 4 }, // Adjust padding for mobile and desktop
                textAlign: 'right', 
                position: 'relative',
                background: 'rgba(20, 122, 92, 0.05)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(20, 122, 92, 0.1)'
              }}>
                <Typography
                  sx={{
                    fontSize: { xs: '1.2rem', sm: '1.4rem', md: '1.6rem' }, // Adjust font size for mobile and desktop
                    lineHeight: 1.8,
                    mb: 3,
                    color: '#ffffff',
                    fontWeight: 500,
                    position: 'relative',
                    '&::before': {
                      content: '"\\201D"', // Adjust quotation mark
                      position: 'absolute',
                      right: '-20px',
                      top: '-10px',
                      fontSize: '3rem',
                      color: '#147a5c',
                      opacity: 0.3,
                    }
                  }}
                >
                  نحن نعيش في زمن الابتكارات العلمية والتقنيات غير المسبوقة وآفاق نمو غير محدود، ويمكن لهذه التقنيات الجديدة مثل الذكاء الاصطناعي وإنترنت الأشياء في حال تم استخدامها على النحو الأمثل أن تجنّب العالم الكثير من المضار وتجلب للعالم الكثير من الفوائد الضخمة.
                </Typography>
                <Box sx={{ 
                  borderRight: '4px solid #147a5c',
                  pr: 2,
                  mt: 3
                }}>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      color: '#147a5c',
                      textAlign: 'right',
                      fontWeight: 'bold',
                      mb: 1
                    }}
                  >
                    صاحب السمو الملكي الأمير محمد بن سلمان بن عبدالعزيز آل سعود
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.9rem' },
                      color: 'rgba(255,255,255,0.8)',
                      textAlign: 'right'
                    }}
                  >
                    ولي العهد رئيس مجلس الوزراء حفظه الله
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5} sx={{ order: { xs: 1, md: 2 } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '120%',
                    height: '120%',
                    background: 'radial-gradient(circle, rgba(20, 122, 92, 0.2) 0%, rgba(0,0,0,0) 70%)',
                    zIndex: -1
                  }
                }}
              >
                <Box
                  component="img"
                  src="/mbs.webp"
                  alt="Crown Prince Mohammed bin Salman"
                  sx={{
                    maxWidth: '100%',
                    height: 'auto',
                    maxHeight: { xs: '300px', md: '450px' }, // Adjust image size for mobile and desktop
                    border: '3px solid #147a5c',
                    borderRadius: '20px',
                    boxShadow: '0 10px 30px rgba(20, 122, 92, 0.3)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.02)'
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>



      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, sm: 8 } }}>
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 4, sm: 6 },
            fontSize: { xs: '2.2rem', sm: '2.8rem' },
            fontWeight: 700,
            color: '#FFFFFF',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              width: 0,
              height: 4,
              background: 'linear-gradient(90deg, #147a5c, #4CAF50, #147a5c)',
              animation: 'shimmer 2s infinite',
              borderRadius: 2,
              transform: 'translateX(-50%)',
            },
            '@keyframes shimmer': {
              '0%': { width: 0, opacity: 0 },
              '50%': { width: 100, opacity: 1 },
              '100%': { width: 0, opacity: 0 }
            }
          }}
        >
          وش مميزات مُعَين ؟
        </Typography>
        <Grid container spacing={4}>
          {[
            { title: 'توصيات ذكية', description: 'احصل على توصيات وظيفية مخصضة', icon: '🔍' },
            { title: 'تحليل السيرة الذاتية', description: 'تحليل شامل لسيرتك الذاتية', icon: '📄' },
            { title: 'دعم متواصل', description: 'مساعدة على مدار الساعة', icon: '❤️' },
            { title: 'تواصل مباشر', description: 'تواصل مع أصحاب العمل مباشرة', icon: '💬' },
            { title: 'تحديثات فورية', description: 'احصل على تحديثات فورية للوظائف', icon: '✨' },
            { title: 'تخصيص البحث', description: 'ابحث عن الوظائف بناءً على تفضيلاتك', icon: '⚙️' }
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  background: 'rgba(45, 45, 45, 0.5)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '20px',
                  border: '1px solid rgba(20, 122, 92, 0.3)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 20px 40px rgba(20, 122, 92, 0.2)',
                    border: '1px solid rgba(20, 122, 92, 0.8)',
                  }
                }}
              >
                <CardContent 
                  sx={{ 
                    textAlign: 'center',
                    p: 4,
                    position: 'relative'
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '2.5rem',
                      mb: 2,
                      transition: 'all 0.3s ease-in-out',
                      display: 'inline-block',
                      '&:hover': {
                        transform: 'translateY(-5px) rotate(5deg)',
                      }
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#FFFFFF'
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: '#E0E0E0'
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>



      {/* Replace all other dividers with the same updated style */}
      <Box 
        sx={{ 
          width: '100%',
          position: 'relative',
          py: 3,
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '1200px',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(20, 122, 92, 0) 0%, #147a5c 50%, rgba(20, 122, 92, 0) 100%)',
            boxShadow: '0 0 20px rgba(20, 122, 92, 0.3)'
          }
        }}
      />

      {/* Memberships Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }} id="memberships">
        <Typography 
          variant="h3" 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 4, sm: 6 },
            fontSize: { xs: '2.2rem', sm: '2.8rem' },
            fontWeight: 700,
            color: '#FFFFFF',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              width: 0,
              height: 4,
              background: 'linear-gradient(90deg, #147a5c, #4CAF50, #147a5c)',
              animation: 'shimmer 2s infinite',
              borderRadius: 2,
              transform: 'translateX(-50%)',
            },
            '@keyframes shimmer': {
              '0%': { width: 0, opacity: 0 },
              '50%': { width: 100, opacity: 1 },
              '100%': { width: 0, opacity: 0 }
            }
          }}
        >
          الإشتراكات
        </Typography>
     
        {/* Professional Membership */}
        <Box sx={{ 
          mb: 0,
          p: 5,
          background: 'rgba(45, 45, 45, 0.5)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          border: '1px solid rgba(20, 122, 92, 0.3)',
          textAlign: 'center',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 20px 40px rgba(20, 122, 92, 0.2)',
            border: '1px solid rgba(20, 122, 92, 0.8)',
          }
        }}>
          <Typography sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.5rem', color: '#147a5c' }}>
            مُعَين بيسك 
          </Typography>
          <Typography sx={{ mb: 4, color: '#E0E0E0' }}>
            استمتع بجميع الميزات المتقدمة مثل التوصيات , التقديم , الدورات , الدعم 24/7 ، والمزيد.
          </Typography>
          <Typography sx={{ mb: 2, color: '#147a5c', fontWeight: 'bold', fontSize: '1.2rem' }}>
          49 ريال/شهرياً
          </Typography>
          <Button
            variant="contained"
            onClick={() => handleSubscribe({ title: 'مُعَين بيسك', price: '49 ريال/شهرياً' })}
            sx={{
              bgcolor: '#147a5c',
              '&:hover': { bgcolor: '#0d8c6d' }
            }}
          >
            اشترك الآن
          </Button>
        </Box>
      </Container>

      {/* Divider */}
      <Box 
        sx={{ 
          width: '100%',
          position: 'relative',
          py: 3,
          '&::after': {
            content: '""',
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '80%',
            maxWidth: '1200px',
            height: '2px',
            background: 'linear-gradient(90deg, rgba(20, 122, 92, 0) 0%, #147a5c 50%, rgba(20, 122, 92, 0) 100%)',
            boxShadow: '0 0 20px rgba(20, 122, 92, 0.3)'
          }
        }}
      />

      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, sm: 6 } }}>
        <Typography 
          variant="h4" 
          sx={{ 
            textAlign: 'center', 
            mb: { xs: 3, sm: 5 },
            fontSize: { xs: '2rem', sm: '2.5rem' },
            fontWeight: 'bold',
            color: '#FFFFFF',
            position: 'relative', // Added for shimmer effect
            '&::after': { // Added shimmer effect
              content: '""',
              position: 'absolute',
              bottom: -16,
              left: '50%',
              width: 0,
              height: 4,
              background: 'linear-gradient(90deg, #147a5c, #4CAF50, #147a5c)',
              animation: 'shimmer 2s infinite',
              borderRadius: 2,
              transform: 'translateX(-50%)',
            },
            '@keyframes shimmer': { // Added shimmer animation
              '0%': { width: 0, opacity: 0 },
              '50%': { width: 100, opacity: 1 },
              '100%': { width: 0, opacity: 0 }
            }
          }}
        >
          الأسئلة الشائعة
        </Typography>
        {[
          { question: 'ما هو مُعَين؟', answer: 'مُعَين هو أول منصة سعودية للتوظيف بالذكاء الاصطناعي.' },
          { question: 'ما هي الباقات المتوفرة؟', answer: 'لايوجد الا باقة واحدة فقط' },
          { question: 'هل يمكنني تغيير الباقة في أي وقت؟', answer: 'نعم، يمكنك تغيير الباقة في أي وقت من خلال حسابك الشخصي.' },
          { question: 'ما هي الملفات الشخصية العائلية؟', answer: 'الملفات الشخصية العائلية تتيح لك إضافة أفراد عائلتك للاستفادة من خدماتنا.' },
          { question: 'كيف يتم حماية خصوصيتي؟', answer: 'نحن نلتزم بحماية خصوصيتك من خلال تقنيات الأمان المتقدمة وسياسات الخصوصية الصارمة.' }
        ].map((faq, index) => (
          <Accordion key={index} sx={{ mb: 2, backgroundColor: '#1a1a1a' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color:'#FFFFFF' }} />}>
              <Typography sx={{ fontWeight: 'bold', color: '#FFFFFF' }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ color: '#666666' }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>

      {/* Footer Section */}
      <Box 
        sx={{ 
          bgcolor: 'rgba(26, 26, 26, 0.95)',
          backdropFilter: 'blur(10px)',
          py: 6,
          borderTop: '1px solid rgba(20, 122, 92, 0.3)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {/* About Column */}
            <Grid item xs={12} md={4}>
              <Typography variant="h6" sx={{ color: '#147a5c', mb: 2, fontWeight: 'bold' }}>
                معين
              </Typography>
              <Typography sx={{ color: '#E0E0E0', mb: 2 }}>
                أول منصة سعودية للتوظيف بواسطة الذكاء الاصطناعي
              </Typography>
            </Grid>

            {/* Quick Links Column */}
            <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}> 
              <Typography variant="h6" sx={{ color: '#147a5c', mb: 2, fontWeight: 'bold' }}>
                روابط هامة
              </Typography>
              <Stack spacing={1}>
                {[
                  { text: 'الرئيسية', link: '/' },
                  { text: 'البحث عن وظائف', link: '/works' },
                  { text: 'أنشئ سيرتك الذاتية', link: '/cv' },
                  { text: 'تواصل معنا', link: '/callus' },
                  { text: 'الأسئلة الشائعة', link: '/faq' },
                ].map((item, index) => (
                  <Link 
                    key={index} 
                    to={item.link}
                    style={{ 
                      color: '#E0E0E0', 
                      textDecoration: 'none',
                      transition: 'color 0.3s ease'
                    }}
                    sx={{
                      '&:hover': {
                        color: '#147a5c'
                      }
                    }}
                  >
                    {item.text}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Contact Info Column */}
            <Grid item xs={12} md={4} sx={{ pl: { md: 4 } }}> 
              <Typography variant="h6" sx={{ color: '#147a5c', mb: 2, fontWeight: 'bold' }}>
                معلومات التواصل
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#E0E0E0' }}>
                  <EmailIcon sx={{ mr: 1, color: '#147a5c' }} />
                  <Typography>support@muayn.sa</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#E0E0E0' }}>
                  <PhoneIcon sx={{ mr: 1, color: '#147a5c' }} />
                  <Typography>+966 123 456 789</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>

          {/* Social Media Section */}
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6" sx={{ color: '#147a5c', mb: 2, fontWeight: 'bold' }}>
              تابعنا على وسائل التواصل
            </Typography>
            <Stack 
              direction="row" 
              spacing={2} 
              justifyContent="center" 
              alignItems="center"
              sx={{ mb: 2 }}
            >
              {[
                { icon: <TwitterIcon />, link: 'https://twitter.com/Muayn_sa' },
                { icon: <LinkedInIcon />, link: 'https://linkedin.com/company/Muayn_sa' },
                { icon: <InstagramIcon />, link: 'https://instagram.com/Muayn_sa' },
                { icon: <FacebookIcon />, link: 'https://facebook.com/Muayn_sa' },
              ].map((social, index) => (
                <IconButton
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: '#147a5c',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#0d8c6d',
                      transform: 'translateY(-3px)'
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Stack>
            <Typography sx={{ color: '#147a5c', mb: 3 }}>
              @Muayn_sa
            </Typography>
          </Box>

          {/* Copyright */}
          <Divider sx={{ bgcolor: 'rgba(20, 122, 92, 0.3)', my: 3 }} />
          <Typography sx={{ color: '#E0E0E0', textAlign: 'center' }}>
            © 2024 معين. جميع الحقوق محفوظة.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}


export function getMembershipValue() {
  return 6.99; 
}

export default Home;
