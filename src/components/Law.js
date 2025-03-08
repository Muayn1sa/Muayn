import React from 'react';
import { Box, Container, Typography, Divider } from '@mui/material';

function Law() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        الشروط والأحكام
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          1. مقدمة
        </Typography>
        <Typography sx={{ mb: 2 }}>
          مرحبًا بكم في موقعنا. باستخدام هذا الموقع، فإنك توافق على الالتزام بالشروط والأحكام التالية.
        </Typography>
        <Typography sx={{ mb: 2 }}>
          يرجى قراءة هذه الشروط بعناية قبل استخدام الموقع.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          2. استخدام الموقع
        </Typography>
        <Typography sx={{ mb: 2 }}>
          يجب عليك استخدام الموقع لأغراض قانونية فقط ووفقًا للشروط والأحكام.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          3. حقوق الملكية الفكرية
        </Typography>
        <Typography sx={{ mb: 2 }}>
          جميع المحتويات والمواد الموجودة على الموقع محمية بموجب حقوق الملكية الفكرية.
        </Typography>
      </Box>

      <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', textAlign: 'center' }}>
        سياسة الخصوصية
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          1. جمع المعلومات
        </Typography>
        <Typography sx={{ mb: 2 }}>
          نحن نجمع المعلومات الشخصية التي تقدمها لنا عند استخدام الموقع.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          2. استخدام المعلومات
        </Typography>
        <Typography sx={{ mb: 2 }}>
          نستخدم المعلومات التي نجمعها لتحسين خدماتنا وتقديم تجربة أفضل للمستخدم.
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
          3. حماية المعلومات
        </Typography>
        <Typography sx={{ mb: 2 }}>
          نحن نتخذ التدابير اللازمة لحماية المعلومات الشخصية الخاصة بك.
        </Typography>
      </Box>
    </Container>
  );
}

export default Law;