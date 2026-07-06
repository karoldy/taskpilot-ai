import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

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
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-semibold mb-2">Page Not Found</h1>
      <p className="text-gray-500">It will return to the previous page in {countdown} seconds...</p>
    </div>
  );
}
