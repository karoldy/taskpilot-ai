import { Outlet, ScrollRestoration } from 'react-router';
import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';

export default function Layout() {
  return (
    <>
      <ScrollRestoration />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
