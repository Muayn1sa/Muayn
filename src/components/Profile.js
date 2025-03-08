import React, { useState } from 'react';
import { Box, Typography, Container, Paper, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Snackbar, Alert, MenuItem } from '@mui/material';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; 

function Profile() {
  
  const saudiCities = [
    'الرياض',
    'جدة',
    'مكة المكرمة',
    'المدينة المنورة',
    'الدمام',
    'الخبر',
    'الظهران',
    'الأحساء',
    'الطائف',
    'تبوك',
    'بريدة',
    'خميس مشيط',
    'الجبيل',
    'نجران',
    'ينبع',
    'أبها',
    'حائل',
    'جيزان',
    'القطيف',
    'الباحة',
    'سكاكا',
    'عرعر',
    'الخرج',
    'اخرى'
  ].sort();

  const educationLevels = [
    'ثانوي',
    'دبلوم',
    'بكالوريوس',
    'ماجستير',
    'دكتوراة',
    'اخرى'
  ];

  const saudiUniversities = [
    'جامعة الملك سعود',
    'جامعة الملك عبدالعزيز',
    'جامعة الملك فهد للبترول والمعادن',
    'جامعة الإمام محمد بن سعود الإسلامية',
    'جامعة الملك فيصل',
    'جامعة أم القرى',
    'جامعة الملك خالد',
    'جامعة القصيم',
    'جامعة طيبة',
    'جامعة الطائف',
    'جامعة حائل',
    'جامعة جازان',
    'جامعة الجوف',
    'جامعة الباحة',
    'جامعة تبوك',
    'جامعة نجران',
    'جامعة الحدود الشمالية',
    'جامعة الأميرة نورة بنت عبدالرحمن',
    'جامعة الملك سعود بن عبدالعزيز للعلوم الصحية',
    'الجامعة السعودية الإلكترونية',
    'جامعة المجمعة',
    'جامعة شقراء',
    'جامعة الأمير سطام بن عبدالعزيز',
    'كلية الاتصالات والمعلومات بالرياض',
    'الكلية التقنية',
    'كلية المعرفة',
    'اخرى'
  ].sort();

  const { currentUser, updateUser, uploadCV } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(currentUser || {});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const textFieldStyle = {
    '& .MuiInputBase-input': { 
      color: 'white',
      backgroundColor: 'rgba(32, 33, 35, 0.8)',
      padding: '14px',
      borderRadius: '8px',
      textAlign: 'right',
      height: '1.4em',
      boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.2)', // إضافة الظل الداخلي
    },
    '& .MuiInputLabel-root': { 
      color: 'rgba(255, 255, 255, 0.7)',
      right: 16,
      left: 'auto',
      transformOrigin: 'top right',
      fontSize: '0.95rem',
      transition: 'all 0.3s ease',
      '&.Mui-focused': {
        color: '#00A783',
      },
      '&.MuiInputLabel-shrink': {
        transform: 'translate(0, -8px) scale(0.75)',
      }
    },
    '& .MuiOutlinedInput-root': {
      direction: 'rtl',
      transition: 'all 0.3s ease',
      '& fieldset': { 
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '12px',
        borderWidth: '1px',
        textAlign: 'right',
      },
      '& legend': {
        width: 0,
      },
      '&:hover fieldset': { 
        borderColor: '#00A783',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#00A783',
        borderWidth: '2px',
      },
    },
    marginBottom: '20px',
  };

  const multilineFieldStyle = {
    ...textFieldStyle,
    '& .MuiInputBase-input': {
      ...textFieldStyle['& .MuiInputBase-input'],
      height: 'auto',
      minHeight: '80px',
    }
  };

  const buttonStyle = {
    bgcolor: '#00A783',
    color: '#FFFFFF',
    borderRadius: '12px',
    padding: '12px 24px',
    fontSize: '1rem',
    fontWeight: 500,
    transition: 'all 0.3s ease',
    textTransform: 'none',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    '&:hover': {
      bgcolor: '#009975',
      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
      transform: 'translateY(-1px)',
    }
  };

  const dialogStyle = {
    '& .MuiDialog-paper': {
      bgcolor: 'rgba(32, 33, 35, 0.95)',
      color: 'white',
      minWidth: { xs: '90%', sm: '500px' }, // Adjust minWidth for mobile
      borderRadius: '16px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
      maxHeight: '90vh', // Limit height for better mobile view
      overflowY: 'auto', // Enable scrolling if content overflows
    }
  };

  const paperStyle = {
    p: 4,
    bgcolor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: '16px',
    color: 'white',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    backdropFilter: 'blur(5px)',
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const validateForm = () => {
    // التحقق من الاسم
    const nameRegex = /^[\u0600-\u06FF\s]+$/;
    const nameWords = editedUser.name?.trim().split(/\s+/) || [];
    if (!editedUser.name || nameWords.length < 3 || !nameRegex.test(editedUser.name)) {
      setSnackbar({
        open: true,
        message: 'الاسم يجب أن يحتوي على ثلاث كلمات على الأقل وبدون أرقام وباللغة العربية',
        severity: 'error'
      });
      return false;
    }

    // التحقق من البريد الإلكتروني
    if (editedUser.email !== currentUser.email) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const emailExists = users.some(user => user.email === editedUser.email);
      if (emailExists) {
        setSnackbar({
          open: true,
          message: 'البريد الإلكتروني مستخدم مسبقاً',
          severity: 'error'
        });
        return false;
      }
    }

    // التحقق من رقم الجوال
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(editedUser.phone)) {
      setSnackbar({
        open: true,
        message: 'رقم الجوال يجب أن يتكون من 9 أرقام فقط',
        severity: 'error'
      });
      return false;
    }

    // التحقق من وجود رقم الجوال مسبقاً
    if (editedUser.phone !== currentUser.phone) {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const phoneExists = users.some(user => user.phone === editedUser.phone);
      if (phoneExists) {
        setSnackbar({
          open: true,
          message: 'رقم الجوال مستخدم مسبقاً',
          severity: 'error'
        });
        return false;
      }
    }
    
    return true;
  };

  const handleEdit = () => {
    setEditedUser(currentUser || {});
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    // تحديث المستخدم في Local Storage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    
    if (userIndex !== -1) {
      const updatedUser = {
        ...users[userIndex],
        ...editedUser,
        name: editedUser.name,
        fullName: editedUser.name
      };
      
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // تحديث حالة المستخدم في التطبيق
      await updateUser(updatedUser);
      
      // إظهار رسالة نجاح
      setSnackbar({
        open: true,
        message: 'تم تحديث المعلومات بنجاح',
        severity: 'success'
      });
      
      // إغلاق نافذة التعديل
      setIsEditing(false);
      
      // إعادة تحميل الصفحة لتحديث البيانات
      window.location.reload();
    }
  };

  return (
    <Container component="main" maxWidth="md" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
      <Box sx={{
        marginTop: { xs: 6, sm: 8, md: 10 }, // Increased marginTop for more space
        marginBottom: { xs: 4, sm: 6, md: 8 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(32, 33, 35, 0.5)',
        borderRadius: '16px',
        padding: { xs: '16px', sm: '24px', md: '32px' },
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        gap: '24px'
      }}>
        <Typography component="h1" variant="h4" sx={{ 
          color: 'white', 
          mb: 2, 
          fontWeight: 700,
          fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
        }}>
          الملف الشخصي
        </Typography>

        <Box sx={{ width: '100%', color: 'white', direction: 'rtl' }}>
          <Paper sx={{ 
            p: { xs: 2, sm: 3, md: 4 },
            bgcolor: 'rgba(255, 255, 255, 0.1)', 
            borderRadius: 3,
            color: 'white',
            mb: 4
          }}>
            <Typography variant="body1" sx={{ 
              mb: 3, 
              textAlign: 'right', 
              fontWeight: 700,
              fontSize: '1.2rem',
              color: 'white',
              display: 'block',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              paddingBottom: '8px'
            }}>
              الاسم: {currentUser?.name || currentUser?.fullName}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              البريد الإلكتروني: {currentUser.email}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              رقم الجوال: {currentUser.phone ? `0${currentUser.phone}` : 'لم يتم تسجيل رقم الجوال'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              العمر: {currentUser.age}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              المدينة: {currentUser.city}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              الحي: {currentUser.district}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              المؤهل العلمي: {currentUser.education}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              الجامعة: {currentUser.university}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              الخبرات: {currentUser.experience}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2, textAlign: 'right' }}>
              من ذوي الاحتياجات الخاصة: {currentUser.isDisabled ? 'نعم' : 'لا'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'right' }}>
              لديه خبرة عمل سابقة: {currentUser.hasWorkedBefore ? 'نعم' : 'لا'}
            </Typography>

            <Button 
              variant="contained" 
              fullWidth
              onClick={handleEdit}
              sx={buttonStyle}
            >
              تعديل المعلومات
            </Button>
          </Paper>
        </Box>
      </Box>

      <Dialog 
        open={isEditing} 
        onClose={handleCancel} 
        maxWidth="sm" 
        fullWidth
        sx={dialogStyle}
      >
        <DialogTitle sx={{ textAlign: 'right', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
          تعديل المعلومات
        </DialogTitle>
        <DialogContent sx={{ mt: { xs: 2, sm: 3, md: 4 } }}>
          <Box sx={{ direction: 'rtl' }}>
            <TextField
              fullWidth
              label="الاسم"
              value={editedUser?.name || editedUser?.fullName || ''}
              onChange={(e) => setEditedUser({ 
                ...editedUser, 
                name: e.target.value,
                fullName: e.target.value
              })}
              sx={{
                ...textFieldStyle,
                mt: 2  // إضافة مسافة إضافية فوق حقل الاسم
              }}
            />
            <TextField
              fullWidth
              label="البريد الإلكتروني"
              value={editedUser.email || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^a-zA-Z0-9@._-]/g, '');
                setEditedUser({ ...editedUser, email: value.toLowerCase() });
              }}
              inputProps={{
                style: { 
                  direction: 'ltr',
                  textAlign: 'left'
                }
              }}
              sx={textFieldStyle}
            />
            <TextField
              fullWidth
              label="رقم الجوال"
              value={editedUser.phone || 'لم يتم تسجيل رقم الجوال'}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 9);
                setEditedUser({ ...editedUser, phone: value });
              }}
              InputProps={{
                startAdornment: <span style={{
                  color: 'white', 
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none'
                }}>+966</span>
              }}
              sx={{
                ...textFieldStyle,
                '& .MuiInputBase-input': {
                  ...textFieldStyle['& .MuiInputBase-input'],
                  paddingLeft: '52px',
                  paddingRight: '14px'
                }
              }}
            />
            <TextField
              fullWidth
              label="العمر"
              type="text"
              value={editedUser.age || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setEditedUser({ ...editedUser, age: value });
              }}
              inputProps={{ 
                inputMode: 'numeric',
                pattern: '[0-9]*',
                style: { 
                  textAlign: 'right',
                  direction: 'ltr'
                }
              }}
              sx={textFieldStyle}
            />
            <TextField
              select // تحويل الحقل إلى قائمة منسدلة
              fullWidth
              label="المدينة"
              value={editedUser.city || ''}
              onChange={(e) => setEditedUser({ ...editedUser, city: e.target.value })}
              sx={{
                ...textFieldStyle,
                '& .MuiSelect-icon': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: 'rgba(32, 33, 35, 0.95)',
                      color: 'white',
                      '& .MuiMenuItem-root': {
                        direction: 'rtl',
                        textAlign: 'right',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        },
                        '&.Mui-selected': {
                          bgcolor: 'rgba(0, 167, 131, 0.2)',
                          '&:hover': {
                            bgcolor: 'rgba(0, 167, 131, 0.3)'
                          }
                        }
                      }
                    }
                  }
                }
              }}
            >
              {saudiCities.map((city) => (
                <MenuItem key={city} value={city}>
                  {city}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="الحي"
              value={editedUser.district || ''}
              onChange={(e) => setEditedUser({ ...editedUser, district: e.target.value })}
              sx={textFieldStyle}
            />
            <TextField
              select
              fullWidth
              label="المؤهل العلمي"
              value={editedUser.education || ''}
              onChange={(e) => setEditedUser({ ...editedUser, education: e.target.value })}
              sx={{
                ...textFieldStyle,
                '& .MuiSelect-icon': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: 'rgba(32, 33, 35, 0.95)',
                      color: 'white',
                      '& .MuiMenuItem-root': {
                        direction: 'rtl',
                        textAlign: 'right',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        },
                        '&.Mui-selected': {
                          bgcolor: 'rgba(0, 167, 131, 0.2)',
                          '&:hover': {
                            bgcolor: 'rgba(0, 167, 131, 0.3)'
                          }
                        }
                      }
                    }
                  }
                }
              }}
            >
              {educationLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              fullWidth
              label="الجامعة"
              value={editedUser.university || ''}
              onChange={(e) => setEditedUser({ ...editedUser, university: e.target.value })}
              sx={{
                ...textFieldStyle,
                '& .MuiSelect-icon': {
                  color: 'rgba(255, 255, 255, 0.7)'
                }
              }}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      bgcolor: 'rgba(32, 33, 35, 0.95)',
                      color: 'white',
                      '& .MuiMenuItem-root': {
                        direction: 'rtl',
                        textAlign: 'right',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.1)'
                        },
                        '&.Mui-selected': {
                          bgcolor: 'rgba(0, 167, 131, 0.2)',
                          '&:hover': {
                            bgcolor: 'rgba(0, 167, 131, 0.3)'
                          }
                        }
                      }
                    }
                  }
                }
              }}
            >
              {saudiUniversities.map((university) => (
                <MenuItem key={university} value={university}>
                  {university}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              fullWidth
              label="الخبرات"
              multiline
              rows={3}
              value={editedUser.experience || ''}
              onChange={(e) => setEditedUser({ ...editedUser, experience: e.target.value })}
              sx={multilineFieldStyle}
            />
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>من ذوي الاحتياجات الخاصة:</Typography>
              <Button
                variant={editedUser.isDisabled ? "contained" : "outlined"}
                onClick={() => setEditedUser({ ...editedUser, isDisabled: true })}
                sx={{ 
                  ml: 1,
                  bgcolor: editedUser.isDisabled ? '#00A783' : 'transparent',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    bgcolor: editedUser.isDisabled ? '#009975' : 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                نعم
              </Button>
              <Button
                variant={!editedUser.isDisabled ? "contained" : "outlined"}
                onClick={() => setEditedUser({ ...editedUser, isDisabled: false })}
                sx={{ 
                  bgcolor: !editedUser.isDisabled ? '#00A783' : 'transparent',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    bgcolor: !editedUser.isDisabled ? '#009975' : 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }
                }}
              >
              
                لا
              </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Typography sx={{ mb: 1 }}>لديه خبرة عمل سابقة:</Typography>
              <Button
                variant={editedUser.hasWorkedBefore ? "contained" : "outlined"}
                onClick={() => setEditedUser({ ...editedUser, hasWorkedBefore: true })}
                sx={{ 
                  ml: 1,
                  bgcolor: editedUser.hasWorkedBefore ? '#00A783' : 'transparent',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    bgcolor: editedUser.hasWorkedBefore ? '#009975' : 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                نعم
              </Button>
              <Button
                variant={!editedUser.hasWorkedBefore ? "contained" : "outlined"}
                onClick={() => setEditedUser({ ...editedUser, hasWorkedBefore: false })}
                sx={{ 
                  bgcolor: !editedUser.hasWorkedBefore ? '#00A783' : 'transparent',
                  color: 'white',
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  '&:hover': {
                    bgcolor: !editedUser.hasWorkedBefore ? '#009975' : 'rgba(255, 255, 255, 0.1)',
                    borderColor: 'white'
                  }
                }}
              >
                لا
              </Button>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)', p: { xs: 1, sm: 2 } }}>
          <Button onClick={handleCancel} sx={{ color: 'white' }}>
            إلغاء
          </Button>
          <Button 
            onClick={handleSave} 
            variant="contained" 
            sx={{ 
              bgcolor: '#00A783',
              '&:hover': {
                bgcolor: '#009975'
              }
            }}
          >
            حفظ
          </Button>
        </DialogActions>
      </Dialog>
      
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

export default Profile;