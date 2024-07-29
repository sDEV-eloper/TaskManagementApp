import React from 'react';
import AuthForm from '../components/AuthForm';


const SignupPage: React.FC = () => {
  return (
    <div>
      <h1>Signup</h1>
      <AuthForm mode="signup" />
    </div>
  );
};

export default SignupPage;
