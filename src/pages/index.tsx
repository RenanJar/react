import React from 'react';
import LoginPage from '../components/features/login/login';
import { AuthProvider } from '@/context/AuthContext';
export default function Home() {
  return (
    <div>
      <AuthProvider>
        <LoginPage></LoginPage>
      </AuthProvider>
    </div>
  );
}
