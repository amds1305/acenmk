
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RegisterForm from '@/components/auth/RegisterForm';

const Register = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Header />
      <div className="min-h-screen py-16 px-4 bg-muted/30 flex items-center justify-center">
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
};

export default Register;
