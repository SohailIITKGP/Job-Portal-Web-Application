import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  const path = pageProps.router?.pathname;
  const hideFooter = ['/login', '/register'].includes(path);

  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Component {...pageProps} />
        </main>
        {!hideFooter && <Footer />}
      </div>
      <ToastContainer />
    </AuthProvider>
  );
} 