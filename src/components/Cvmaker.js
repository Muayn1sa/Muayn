import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Grid,
  Divider,
  CircularProgress,
  useTheme,
  IconButton,
  Chip,
  Card,
  CardContent,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useAuth } from '../auth/AuthContext';
import html2pdf from 'html2pdf.js';

function CVMaker() {
  const { user } = useAuth();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [cvData, setCvData] = useState({
    personalInfo: {
      fullName: user?.name || '',
      email: user?.email || '',
      phone: '',
      location: '',
      title: '',
      summary: ''
    },
    education: [],
    experience: [],
    skills: [],
    languages: [],
    certifications: []
  });

  const [currentEducation, setCurrentEducation] = useState({
    degree: '',
    school: '',
    field: '',
    startYear: '',
    endYear: '',
    description: ''
  });

  const [currentExperience, setCurrentExperience] = useState({
    position: '',
    company: '',
    location: '',    startDate: '',
    endDate: '',
    current: false,
    description: ''
  });

  const [currentCertification, setCurrentCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    description: ''
  });

  const handlePersonalInfoChange = (field) => (event) => {
    setCvData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: event.target.value
      }
    }));
  };

  const handleAddEducation = () => {
    if (currentEducation.degree && currentEducation.school) {
      setCvData(prev => ({
        ...prev,
        education: [...prev.education, currentEducation]
      }));
      setCurrentEducation({
        degree: '',
        school: '',
        field: '',
        startYear: '',
        endYear: '',
        description: ''
      });
    }
  };

  const handleRemoveEducation = (index) => {
    setCvData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleAddExperience = () => {
    if (currentExperience.position && currentExperience.company) {
      setCvData(prev => ({
        ...prev,
        experience: [...prev.experience, currentExperience]
      }));
      setCurrentExperience({
        position: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: ''
      });
    }
  };

  const handleRemoveExperience = (index) => {
    setCvData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const handleAddSkill = (skill) => {
    if (skill && !cvData.skills.includes(skill)) {
      setCvData(prev => ({
        ...prev,
        skills: [...prev.skills, skill]
      }));
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setCvData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddLanguage = (language, proficiency) => {
    if (language && proficiency && !cvData.languages.find(l => l.language === language)) {
      setCvData(prev => ({
        ...prev,
        languages: [...prev.languages, { language, proficiency }]
      }));
    }
  };

  const handleAddCertification = () => {
    if (currentCertification.name && currentCertification.issuer) {
      setCvData(prev => ({
        ...prev,
        certifications: [...prev.certifications, currentCertification]
      }));
      setCurrentCertification({
        name: '',
        issuer: '',
        date: '',
        description: ''
      });
    }
  };

  const generateAIContent = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/generate-cv-content', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          cvData,
          language: 'Arabic',
          tone: 'Professional'
        })
      });

      if (response.ok) {
        const enhancedContent = await response.json();
        setCvData(prev => ({
          ...prev,
          personalInfo: {
            ...prev.personalInfo,
            summary: enhancedContent.summary
          },
          experience: prev.experience.map((exp, index) => ({
            ...exp,
            description: enhancedContent.experienceDescriptions[index] || exp.description
          }))
        }));
      }
    } catch (error) {
      console.error('Error generating CV content:', error);
    }
    setLoading(false);
  };

  const downloadCV = () => {
    const element = document.getElementById('cv-preview');
    const opt = {
      margin: 1,
      filename: `${cvData.personalInfo.fullName.replace(/\s+/g, '_')}_CV.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const steps = [
    'المعلومات الشخصية',
    'التعليم',
    'الخبرات',
    'المهارات واللغات',
    'الشهادات',
    'المراجعة'
  ];

  const renderPersonalInfo = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="الاسم الكامل"
          value={cvData.personalInfo.fullName}
          onChange={handlePersonalInfoChange('fullName')}
          variant="outlined"
          dir="rtl"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="المسمى الوظيفي"
          value={cvData.personalInfo.title}
          onChange={handlePersonalInfoChange('title')}
          variant="outlined"
          dir="rtl"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="البريد الإلكتروني"
          value={cvData.personalInfo.email}
          onChange={handlePersonalInfoChange('email')}
          variant="outlined"
          dir="ltr"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          fullWidth
          label="رقم الهاتف"
          value={cvData.personalInfo.phone}
          onChange={handlePersonalInfoChange('phone')}
          variant="outlined"
          dir="ltr"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="الموقع"
          value={cvData.personalInfo.location}
          onChange={handlePersonalInfoChange('location')}
          variant="outlined"
          dir="rtl"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="نبذة مختصرة"
          value={cvData.personalInfo.summary}
          onChange={handlePersonalInfoChange('summary')}
          variant="outlined"
          dir="rtl"
        />
      </Grid>
    </Grid>
  );

  const renderEducation = () => (
    <Box>
      {cvData.education.map((edu, index) => (
        <Card key={index} sx={{ mb: 2, position: 'relative' }}>
          <IconButton
            size="small"
            onClick={() => handleRemoveEducation(index)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <DeleteIcon />
          </IconButton>
          <CardContent>
            <Typography variant="h6">{edu.degree}</Typography>
            <Typography color="textSecondary">{edu.school}</Typography>
            <Typography>{`${edu.startYear} - ${edu.endYear}`}</Typography>
          </CardContent>
        </Card>
      ))}
      
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="الدرجة العلمية"
            value={currentEducation.degree}
            onChange={(e) => setCurrentEducation(prev => ({
              ...prev,
              degree: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="المؤسسة التعليمية"
            value={currentEducation.school}
            onChange={(e) => setCurrentEducation(prev => ({
              ...prev,
              school: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="سنة البداية"
            value={currentEducation.startYear}
            onChange={(e) => setCurrentEducation(prev => ({
              ...prev,
              startYear: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="سنة النهاية"
            value={currentEducation.endYear}
            onChange={(e) => setCurrentEducation(prev => ({
              ...prev,
              endYear: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={3}
            label="وصف"
            value={currentEducation.description}
            onChange={(e) => setCurrentEducation(prev => ({
              ...prev,
              description: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddEducation}
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#10a37f',
              '&:hover': { bgcolor: '#0d8c6d' }
            }}
          >
            إضافة مؤهل تعليمي
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const renderExperience = () => (
    <Box>
      {cvData.experience.map((exp, index) => (
        <Card key={index} sx={{ mb: 2, position: 'relative' }}>
          <IconButton
            size="small"
            onClick={() => handleRemoveExperience(index)}
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <DeleteIcon />
          </IconButton>
          <CardContent>
            <Typography variant="h6">{exp.position}</Typography>
            <Typography color="textSecondary">{exp.company}</Typography>
            <Typography>{`${exp.startDate} - ${exp.current ? 'الحالي' : exp.endDate}`}</Typography>
            <Typography variant="body2">{exp.description}</Typography>
          </CardContent>
        </Card>
      ))}

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="المنصب"
            value={currentExperience.position}
            onChange={(e) => setCurrentExperience(prev => ({
              ...prev,
              position: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="الشركة"
            value={currentExperience.company}
            onChange={(e) => setCurrentExperience(prev => ({
              ...prev,
              company: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="تاريخ البداية"
            value={currentExperience.startDate}
            onChange={(e) => setCurrentExperience(prev => ({
              ...prev,
              startDate: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="تاريخ النهاية"
            value={currentExperience.endDate}
            onChange={(e) => setCurrentExperience(prev => ({
              ...prev,
              endDate: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
            disabled={currentExperience.current}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="وصف المهام والإنجازات"
            value={currentExperience.description}
            onChange={(e) => setCurrentExperience(prev => ({
              ...prev,
              description: e.target.value
            }))}
            variant="outlined"
            dir="rtl"
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddExperience}
            startIcon={<AddIcon />}
            sx={{
              bgcolor: '#10a37f',
              '&:hover': { bgcolor: '#0d8c6d' }
            }}
          >
            إضافة خبرة
          </Button>
        </Grid>
      </Grid>
    </Box>
  );

  const renderSkillsAndLanguages = () => (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>المهارات</Typography>
        <Box sx={{ mb: 2 }}>
          {cvData.skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleRemoveSkill(skill)}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>
        <TextField
          fullWidth
          label="أضف مهارة جديدة"
          value={currentSkill}
          onChange={(e) => setCurrentSkill(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && currentSkill.trim()) {
              handleAddSkill(currentSkill.trim());
              setCurrentSkill('');
            }
          }}
          variant="outlined"
          dir="rtl"
        />
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            if (currentSkill.trim()) {
              handleAddSkill(currentSkill.trim());
              setCurrentSkill('');
            }
          }}
          startIcon={<AddIcon />}
          sx={{
            mt: 2,
            bgcolor: '#10a37f',
            '&:hover': { bgcolor: '#0d8c6d' }
          }}
        >
          إضافة مهارة
        </Button>
      </Grid>

      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>اللغات</Typography>
        <Box sx={{ mb: 2 }}>
          {cvData.languages.map((lang, index) => (
            <Chip
              key={index}
              label={`${lang.language} - ${lang.proficiency}`}
              onDelete={() => {
                setCvData(prev => ({
                  ...prev,
                  languages: prev.languages.filter((_, i) => i !== index)
                }));
              }}
              sx={{ m: 0.5 }}
            />
          ))}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="اللغة"
              value={currentLanguage.language}
              onChange={(e) => setCurrentLanguage(prev => ({
                ...prev,
                language: e.target.value
              }))}
              variant="outlined"
              dir="rtl"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              select
              label="المستوى"
              value={currentLanguage.proficiency}
              onChange={(e) => setCurrentLanguage(prev => ({
                ...prev,
                proficiency: e.target.value
              }))}
              variant="outlined"
              dir="rtl"
            >
              {['مبتدئ', 'متوسط', 'متقدم', 'ممتاز'].map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            if (currentLanguage.language && currentLanguage.proficiency) {
              handleAddLanguage(currentLanguage.language, currentLanguage.proficiency);
              setCurrentLanguage({ language: '', proficiency: '' });
            }
          }}
          startIcon={<AddIcon />}
          sx={{
            mt: 2,
            bgcolor: '#10a37f',
            '&:hover': { bgcolor: '#0d8c6d' }
          }}
        >
          إضافة لغة
        </Button>
      </Grid>
    </Grid>
  );
}
  export default CVMaker;