import { AuthProvider } from '@/context/AuthContext';
import '@/styles/globals.css';
import Layout from '@/components/features/layout/Layout';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'antd/dist/reset.css';

const publicPages = ['/login'];

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isPublicPage = publicPages.includes(router.pathname);

  return (
    <AuthProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </AuthProvider>
  );
}
