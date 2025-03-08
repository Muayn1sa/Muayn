import React, { useState } from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  useTheme
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function FAQ() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqs = [
    {
      question: "ما هو معين؟",
      answer: "معين هو منصة سعودية مبتكرة تستخدم الذكاء الاصطناعي لمساعدتك في العثور على الوظيفة المناسبة وتطوير مسيرتك المهنية."
    },
    {
      question: "كيف يمكنني البدء في استخدام معين؟",
      answer: "يمكنك البدء بإنشاء حساب مجاني، ثم رفع سيرتك الذاتية وتحديد تفضيلاتك الوظيفية. سيقوم نظامنا الذكي بتحليل مؤهلاتك وتقديم التوصيات المناسبة."
    },
    {
      question: "ما هي مميزات العضوية المدفوعة؟",
      answer: "تتيح لك العضوية المدفوعة مزايا إضافية مثل الوصول المبكر للوظائف، تحليل متقدم للسيرة الذاتية، دعم شخصي مباشر، وتوصيات وظيفية مخصصة."
    },
    {
      question: "هل يمكنني إلغاء اشتراكي في أي وقت؟",
      answer: "نعم، يمكنك إلغاء اشتراكك في أي وقت من خلال إعدادات حسابك."
    },
    {
      question: "كيف يتم حماية بياناتي الشخصية؟",
      answer: "نحن نستخدم أحدث تقنيات التشفير وأنظمة الحماية لضمان أمان بياناتك الشخصية. نلتزم بسياسة خصوصية صارمة تتوافق مع أنظمة حماية البيانات السعودية."
    },
    {
      question: "هل يمكنني تحديث سيرتي الذاتية لاحقاً؟",
      answer: "نعم، يمكنك تحديث سيرتك الذاتية في أي وقت من خلال لوحة التحكم الخاصة بك."
    },
    {
      question: "كيف يمكنني التواصل مع الدعم الفني؟",
      answer: "يمكنك التواصل مع فريق الدعم الفني عبر البريد الإلكتروني support@muayn.sa أو عبر الرقم الموحد."
    }
  ];

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: '2rem', md: '2.5rem' },
            fontWeight: 700,
            color: '#147a5c',
            mb: 2
          }}
        >
          الأسئلة الشائعة
        </Typography>
        <Typography
          sx={{
            color: 'text.secondary',
            fontSize: { xs: '1rem', md: '1.1rem' },
            maxWidth: '600px',
            mx: 'auto'
          }}
        >
          نجيب على استفساراتك الشائعة حول خدمات معين
        </Typography>
      </Box>

      <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
            sx={{
              mb: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '8px !important',
              border: '1px solid rgba(20, 122, 92, 0.1)',
              '&:before': {
                display: 'none',
              },
              '&:hover': {
                borderColor: 'rgba(20, 122, 92, 0.3)',
              }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: '#147a5c' }} />}
              sx={{
                '& .MuiAccordionSummary-content': {
                  my: 2
                }
              }}
            >
              <Typography sx={{ 
                fontWeight: 600,
                color: expanded === `panel${index}` ? '#147a5c' : 'inherit'
              }}>
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ 
                color: 'text.secondary',
                lineHeight: 1.7
              }}>
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
}

export default FAQ;