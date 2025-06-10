import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Divider,
  Link
} from '@mui/material';
import { Lock, Email } from '@mui/icons-material';
import { motion } from 'framer-motion';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Mock authentication
    if (email === 'admin@gmail.com' && password === 'admin123') {
      login({
        id: 1,
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin'
      });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #4a148c 0%, #ff6f00 100%)',
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card sx={{ width: 400, borderRadius: 2, boxShadow: 24 }}>
          <CardContent sx={{ p: 4 }}>
            <Box textAlign="center" mb={4}>
              <Typography variant="h4" component="h1" gutterBottom>
                E-Office System
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Sign in to your account
              </Typography>
            </Box>

            {error && (
              <Box
                sx={{
                  backgroundColor: 'error.light',
                  color: 'error.contrastText',
                  p: 2,
                  mb: 3,
                  borderRadius: 1,
                }}
              >
                {error}
              </Box>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Email Address"
                variant="outlined"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />,
                }}
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                sx={{ mt: 3, py: 1.5 }}
              >
                Sign In
              </Button>
            </form>

            <Divider sx={{ my: 3 }} />

            <Box textAlign="center">
              <Link href="#" variant="body2" underline="hover">
                Forgot password?
              </Link>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
}