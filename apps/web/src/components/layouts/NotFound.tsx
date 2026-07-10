import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { typography } from "@/tokens/style";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NotFound() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    const timer = setInterval(() => setCountdown((n) => n - 1), 1000);
    const redirect = setTimeout(() => {
      if (window.history.length > 1) navigate(-1);
      else navigate('/');
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Typography
        sx={{
          mb: 1,
          ...typography.heading2
        }}
      >
        Page Not Found
      </Typography>
      <Typography variant="body2" color="text.description">
        It will return to the previous page in {countdown} seconds...
      </Typography>
    </Box>
  );
}
